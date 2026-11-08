import { useEffect, useRef } from 'react';

/* Ambient golden dust — a light canvas particle field.
   Paused off-screen / when hidden / for reduced motion. */
export default function Particles({ className }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const ctx = canvas.getContext('2d');
    let raf = 0;
    let running = true;
    let inView = true;
    let w = 0, h = 0, dpr = 1;
    let parts = [];

    const palette = [
      [194, 163, 107],
      [234, 228, 216],
      [168, 162, 148],
    ];

    const build = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      /* Phones get a lighter field and a lower pixel ratio — same look, less work. */
      const small = w < 700;
      dpr = Math.min(window.devicePixelRatio || 1, small ? 1.4 : 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = small
        ? Math.min(36, Math.max(16, Math.floor(w / 18)))
        : Math.min(90, Math.max(28, Math.floor(w / 14)));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.random() * 1.3,
        vy: 0.06 + Math.random() * 0.22,
        vx: (Math.random() - 0.5) * 0.12,
        a: 0.08 + Math.random() * 0.34,
        p: Math.random() * Math.PI * 2,
        c: palette[Math.floor(Math.random() * palette.length)],
      }));
    };

    const tick = () => {
      if (!running || !inView) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (const pt of parts) {
        pt.y -= pt.vy;
        pt.x += pt.vx + Math.sin(Date.now() * 0.0006 + pt.p) * 0.12;
        if (pt.y < -4) { pt.y = h + 4; pt.x = Math.random() * w; }
        if (pt.x < -4) pt.x = w + 4;
        if (pt.x > w + 4) pt.x = -4;
        const tw = 0.55 + 0.45 * Math.sin(Date.now() * 0.001 + pt.p * 3);
        const [r, g, b] = pt.c;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * tw, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${(pt.a * tw).toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    build();
    raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(
      (entries) => { inView = entries[0].isIntersecting; if (inView && running) raf = requestAnimationFrame(tick); },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVis = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else { running = true; raf = requestAnimationFrame(tick); }
    };
    document.addEventListener('visibilitychange', onVis);
    const onResize = () => build();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
