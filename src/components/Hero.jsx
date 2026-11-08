import { useEffect, useRef } from 'react';
import { useScrollScene } from '../lib/motion';
import { CTA, BRAND, BRAND_LINE, waLink, PORTFOLIO_URL } from '../lib/content';
import { SunRays, SacredGeometry, HandsEngraving, BirdFlocks, FibSpiral } from './engravings';
import { WhatsAppIcon, ArrowIcon, PlayIcon } from './icons';
import Particles from './Particles';

const WORD = 'ZENTRA';

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const doc = document.scrollingElement || document.documentElement;
  const top = el.getBoundingClientRect().top + doc.scrollTop - 16;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

export default function Hero() {
  const heroRef = useRef(null);
  const lettersRef = useRef([]);

  /* Eased mouse state as CSS vars — the whole hero breathes with the pointer. */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const loop = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.setProperty('--mx', x.toFixed(3));
      el.style.setProperty('--my', y.toFixed(3));
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    loop();
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Kinetic typography — each letter moves in 3D as the hero scrolls away. */
  const wordRef = useScrollScene({
    from: 0.12,
    to: -0.7,
    onFrame: (p) => {
      const ls = lettersRef.current;
      for (let i = 0; i < ls.length; i++) {
        if (!ls[i]) continue;
        const wave = Math.sin(i * 0.9 + p * Math.PI * 2) * 0.5;
        const ty = -p * 26 * (1 + wave * 0.5);
        const rz = p * 14 * wave * (i % 2 === 0 ? 1 : -1);
        const rx = p * 55;
        const z = -p * 120;
        const op = 1 - p * 0.75;
        ls[i].style.transform = `translate3d(calc(var(--mx, 0) * ${(6 + i * 1.6).toFixed(1)}px), calc(${ty.toFixed(1)}px + var(--my, 0) * ${(4 + i).toFixed(1)}px), ${z.toFixed(0)}px) rotateX(${rx.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
        ls[i].style.opacity = op.toFixed(3);
      }
    },
  });

  const raysRef = useScrollScene({
    from: 0.12,
    to: -0.7,
    transform: { y: [-140, 260], scale: [1.06, 0.9], opacity: [0.9, 0.25], rz: [0, 18] },
    mouse: [10, 8],
  });
  const geoRef = useScrollScene({
    from: 0.12,
    to: -0.7,
    transform: { y: [-40, 320], rz: [0, 30], opacity: [0.55, 0.12] },
    mouse: [-12, -10],
  });
  const handsRef = useScrollScene({
    from: 0.12,
    to: -0.7,
    transform: { y: [60, -160], z: [0, -60], rx: [0, -14], opacity: [0.85, 0] },
    mouse: [16, 12],
  });
  const birdsRef = useScrollScene({
    from: 0.12,
    to: -0.7,
    transform: { y: [0, 420], x: [0, -60], rz: [0, -12], opacity: [0.5, 0] },
    mouse: [8, 6],
  });
  const fogRef = useScrollScene({
    from: 0.12,
    to: -0.7,
    transform: { y: [0, 180], opacity: [0.9, 0.1] },
  });
  const innerRef = useScrollScene({
    from: 0.12,
    to: -0.7,
    transform: { y: [0, -120], opacity: [1, 0.35], z: [0, -220] },
  });

  return (
    <section id="top" className="hero" ref={heroRef} data-component="hero">
      <Particles className="hero__particles" />
      <div className="hero__fog" ref={fogRef} />
      <div className="hero__raywrap" ref={raysRef}>
        <SunRays className="hero__rays" />
      </div>
      <div className="hero__geowrap" ref={geoRef}>
        <SacredGeometry className="hero__geo" />
      </div>
      <div className="hero__handswrap" ref={handsRef}>
        <HandsEngraving className="hero__hands" />
      </div>
      <div className="hero__birdswrap" ref={birdsRef}>
        <BirdFlocks className="hero__birds" />
      </div>

      <div className="hero__inner" ref={innerRef}>
        <p className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          {BRAND} — Creative Studio
          <span className="hero__eyebrow-line" />
        </p>

        <h1 className="hero__title" ref={wordRef}>
          {WORD.split('').map((ch, i) => (
            <span
              key={i}
              className="hero__letter"
              ref={(el) => { lettersRef.current[i] = el; }}
              style={{ '--i': i }}
            >
              {ch}
            </span>
          ))}
        </h1>

        <p className="hero__tagline">
          Crafting <em>digital experiences</em> that feel eternal —<br className="hero__br" />
          web, graphic &amp; motion, composed like old master studies.
        </p>

        <div className="hero__cta">
          <a
            className="btn btn--gold"
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="btn__icon" />
            <span>{CTA.primary}</span>
          </a>
          <a
            className="btn btn--ghost"
            href={PORTFOLIO_URL}
          >
            <span>{CTA.portfolio}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <p className="hero__inline">
          <a
            href="#featured-reel"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('featured-reel');
            }}
          >
            <PlayIcon className="hero__inline-play" />
            Watch the promotion reel
          </a>
          <span className="hero__inline-sep" aria-hidden="true" />
          <a
            href={PORTFOLIO_URL}
            onClick={(e) => {
              e.preventDefault();
              scrollToId('portfolio');
            }}
          >
            See selected work
            <ArrowIcon className="hero__inline-icon" />
          </a>
        </p>

        <div className="hero__meta">
          <FibSpiral className="hero__spiral" />
          <span>{BRAND_LINE.toUpperCase()}</span>
          <FibSpiral className="hero__spiral hero__spiral--mirror" />
        </div>
      </div>

      <div className="hero__scroll">
        <span className="hero__scroll-text">Scroll to enter</span>
        <span className="hero__scroll-line">
          <span className="hero__scroll-dot" />
        </span>
      </div>

      <div className="hero__fib" aria-hidden="true">
        1 · 2 · 3 · 5 · 8 · 13 · 21
      </div>
    </section>
  );
}
