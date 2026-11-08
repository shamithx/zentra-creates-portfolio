import { useRef } from 'react';
import { useScrollScene, clamp01 } from '../lib/motion';
import { PROCESS } from '../lib/content';
import { CompassRose } from './engravings';

function Step({ s, i }) {
  const ref = useScrollScene({
    from: 0.95,
    to: 0.55,
    delay: i * 0.05,
    transform: { x: [-40, 0], opacity: [0, 1] },
  });
  return (
    <article className="proc__step" ref={ref}>
      <span className="proc__num">{s.numeral}</span>
      <div>
        <h3 className="proc__title">{s.title}</h3>
        <p className="proc__text">{s.text}</p>
      </div>
    </article>
  );
}

export default function Process() {
  const lineRef = useRef(null);
  const headRef = useScrollScene({
    from: 0.96,
    to: 0.55,
    transform: { y: [60, 0], opacity: [0, 1] },
  });

  /* The timeline's golden thread draws itself as the list scrolls through. */
  const trackRef = useScrollScene({
    from: 1.15,
    to: 0.15,
    onFrame: (_, rect) => {
      const line = lineRef.current;
      if (!line) return;
      const vh = window.innerHeight || 800;
      const p = clamp01((vh * 0.9 - rect.top) / (rect.height + vh * 0.35));
      line.style.transform = `scaleY(${p.toFixed(4)})`;
    },
  });

  return (
    <section id="process" className="section proc">
      <div className="sec-head sec-head--split" ref={headRef}>
        <div>
          <p className="sec-label"><span className="sec-label-num">07</span> Process</p>
          <h2 className="sec-title">How Zentra <em>works</em></h2>
        </div>
        <p className="sec-intro">
          A slow, deliberate method — four movements, each completed before
          the next begins. Nothing is hurried; everything is witnessed.
        </p>
      </div>

      <div className="proc__track" ref={trackRef}>
        <div className="proc__rail" aria-hidden="true">
          <span className="proc__thread" ref={lineRef} />
          <CompassRose className="proc__rose" />
        </div>
        {PROCESS.map((s, i) => (
          <Step key={s.numeral} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}
