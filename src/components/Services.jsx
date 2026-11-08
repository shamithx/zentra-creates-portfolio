import { useRef } from 'react';
import { useScrollScene, useInView } from '../lib/motion';
import { SERVICES, PORTFOLIO_URL, CTA } from '../lib/content';
import { GeoDiagram, HandsEngraving, SunRays, OrnamentDivider } from './engravings';

const ICONS = { geo: GeoDiagram, hand: HandsEngraving, rays: SunRays };

function Card({ s, mid, delay }) {
  const tiltRef = useRef(null);
  const iconRef = useInView(0.4);
  const sceneRef = useScrollScene({
    from: 0.94,
    to: 0.52,
    delay,
    perspective: 1100,
    transform: { rx: [32, 0], y: [80, 0], z: [-160, 0], opacity: [0, 1] },
  });
  const Icon = ICONS[s.icon];

  const onMove = (e) => {
    const el = tiltRef.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', (-py * 9).toFixed(2) + 'deg');
    el.style.setProperty('--ry', (px * 11).toFixed(2) + 'deg');
  };
  const onLeave = () => {
    const el = tiltRef.current;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <article className={`svc ${mid ? 'svc--mid' : ''}`} ref={sceneRef}>
      <div
        className={`svc__tilt ${iconRef[1] ? 'svc__tilt--in' : ''}`}
        ref={(el) => { tiltRef.current = el; iconRef[0].current = el; }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div className="svc__num">
          <span className="svc__num-fib">{s.fib}</span>
          <span className="svc__num-roman">{s.numeral}</span>
        </div>
        <Icon className="svc__icon" />
        <h3 className="svc__title">{s.title}</h3>
        <p className="svc__desc">{s.desc}</p>
        <ul className="svc__items">
          {s.items.map((it) => (
            <li key={it} className="svc__item">
              <span className="svc__item-dot" aria-hidden="true">✦</span>
              {it}
            </li>
          ))}
        </ul>
        <span className="svc__more">Compose <span aria-hidden="true">→</span></span>
      </div>
    </article>
  );
}

export default function Services() {
  const headRef = useScrollScene({
    from: 0.96,
    to: 0.55,
    transform: { y: [60, 0], opacity: [0, 1] },
  });
  return (
    <section id="services" className="section services">
      <div className="sec-head sec-head--split" ref={headRef}>
        <div>
          <p className="sec-label"><span className="sec-label-num">01</span> Services</p>
          <h2 className="sec-title">The Three <em>Arts</em></h2>
        </div>
        <p className="sec-intro">
          One studio, three instruments. Every engagement is composed across web,
          graphic and motion — video editing and promotional videos, graphic design
          and creative content, website design and development, brand identity and
          visual design, social media content strategy, and brand growth with
          creative direction. Drawn, refined and released as a single work.
        </p>
      </div>
      <div className="svc-grid">
        {SERVICES.map((s, i) => (
          <Card key={s.title} s={s} mid={i === 1} delay={i * 0.09} />
        ))}
      </div>
      <div className="svc-band">
        <p className="svc-band__text">Want to see how this looks in practice?</p>
        <a
          className="btn btn--ghost"
          href={PORTFOLIO_URL}
        >
          <span>{CTA.portfolio}</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <OrnamentDivider className="sec-ornament" />
    </section>
  );
}
