/* ============================================================
   ZENTRA — Motion engine
   One shared rAF loop drives scroll-progress 3D scenes,
   parallax layers, eased mouse state, and kinetic callbacks.
   ============================================================ */
import { useEffect, useRef, useState } from 'react';

export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const lerp = (a, b, t) => a + (b - a) * t;

/* ————— prefers-reduced-motion ————— */
export function usePrefersReducedMotion() {
  const ref = useRef(
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fn = (e) => { ref.current = e.matches; };
    mq.addEventListener?.('change', fn);
    return () => mq.removeEventListener?.('change', fn);
  }, []);
  return ref;
}

/* ————— shared eased mouse state (-1..1) ————— */
const mouse = { tx: 0, ty: 0, x: 0, y: 0, fine: false };
if (typeof window !== 'undefined') {
  mouse.fine = window.matchMedia('(pointer: fine)').matches;
  window.addEventListener(
    'mousemove',
    (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true }
  );
}

/* ————— scene registry ————— */
const scenes = new Set();
let vh = 800;
let ticking = false;

function buildTransform(opts, p) {
  const t = opts.transform;
  if (!t) return null;
  const parts = [];
  if (opts.perspective) parts.push(`perspective(${opts.perspective}px)`);
  const rx = t.rx ? lerp(t.rx[0], t.rx[1], p) : 0;
  const ry = t.ry ? lerp(t.ry[0], t.ry[1], p) : 0;
  const rz = t.rz ? lerp(t.rz[0], t.rz[1], p) : 0;
  const y = t.y ? lerp(t.y[0], t.y[1], p) : 0;
  const z = t.z ? lerp(t.z[0], t.z[1], p) : 0;
  const s = t.scale ? lerp(t.scale[0], t.scale[1], p) : 1;
  const sy = t.sy ? lerp(t.sy[0], t.sy[1], p) : 1;
  const mx = opts.mouse ? mouse.x * opts.mouse[0] : 0;
  const my = opts.mouse ? mouse.y * opts.mouse[1] : 0;
  const px = t.px ? lerp(t.px[0], t.px[1], p) : 0;
  parts.push(
    `translate3d(${(px + mx).toFixed(2)}px, ${(y + my).toFixed(2)}px, ${z.toFixed(2)}px)`
  );
  if (rx || ry || rz) parts.push(`rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`);
  if (s !== 1 || sy !== 1) parts.push(`scale(${s.toFixed(4)}, ${sy.toFixed(4)})`);
  return parts.join(' ');
}

function applyScene(s) {
  if (!s.el || !s.el.isConnected) {
    scenes.delete(s);
    return;
  }
  const rect = s.el.getBoundingClientRect();
  const span = vh * (s.from - s.to);
  let p = span > 0 ? clamp01((vh * s.from - rect.top) / span) : 1;
  if (s.opts.delay) p = clamp01((p - s.opts.delay) / (1 - s.opts.delay));

  if (s.opts.transform) {
    const tr = buildTransform(s.opts, p);
    if (tr) s.el.style.transform = tr;
    const o = s.opts.transform.opacity;
    if (o) s.el.style.opacity = lerp(o[0], o[1], p).toFixed(3);
  }
  if (s.opts.onFrame) s.opts.onFrame(p, rect);
}

function frame() {
  ticking = false;
  mouse.x += (mouse.tx - mouse.x) * 0.055;
  mouse.y += (mouse.ty - mouse.y) * 0.055;
  for (const s of scenes) {
    if (!s.active) continue;
    applyScene(s);
  }
}

function requestTick() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(frame);
  }
}

function onScrollOrResize() {
  vh = window.innerHeight || 800;
  requestTick();
}

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize, { passive: true });
}

/* ————— the hook —————
   opts: {
     from, to        viewport fractions driving progress  (default 0.95 → 0.4)
     delay           0..1  extra ease-in delay for stagger
     perspective     px for the transform
     transform: { rx:[a,b], ry, rz, y, z, scale, px, opacity:[a,b] }
     mouse: [mx, my] max px of mouse influence
     onFrame(p, rect)  kinetic callback
   }
*/
export function useScrollScene(opts = {}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (reduced.current) {
      // Render at final state for reduced-motion users.
      if (opts.transform) {
        el.style.transform = '';
        if (opts.transform.opacity) el.style.opacity = opts.transform.opacity[1];
      }
      return undefined;
    }

    const scene = {
      el,
      opts,
      active: false,
      from: opts.from ?? 0.95,
      to: opts.to ?? 0.4,
    };

    let io;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            scene.active = en.isIntersecting;
            if (scene.active) {
              el.style.willChange = opts.transform ? 'transform, opacity' : 'transform';
              requestTick();
            } else {
              el.style.willChange = '';
              // snap to the state at this scroll position when leaving
              applyScene(scene);
            }
          }
        },
        { rootMargin: '160% 0px 160% 0px' }
      );
      io.observe(el);
    } else {
      scene.active = true;
    }

    scenes.add(scene);
    el.style.willChange = opts.transform ? 'transform, opacity' : 'transform';
    applyScene(scene); // set initial state (prevents flash)
    requestTick();

    return () => {
      io?.disconnect();
      scenes.delete(scene);
      el.style.willChange = '';
      el.style.transform = '';
      if (opts.transform?.opacity) el.style.opacity = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/* ————— simple in-view once reveal (class based, for CSS-driven pieces) ————— */
export function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return undefined; }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, seen];
}
