import { useMemo, useRef } from 'react';
import { useScrollScene } from '../lib/motion';
import { PHILOSOPHY_PARAGRAPHS, PHILOSOPHY_QUOTE } from '../lib/content';
import { EyeDivine, FibSpiral, OrnamentDivider, SunRays } from './engravings';

/* Word-by-word reveal driven by scroll progress — poetic, cheap, cinematic. */
function ScrollWords({ text, className }) {
  const words = useMemo(() => text.split(' '), [text]);
  const spanRefs = useRef([]);

  const ref = useScrollScene({
    from: 0.98,
    to: 0.32,
    onFrame: (p) => {
      const N = words.length;
      for (let i = 0; i < N; i++) {
        const el = spanRefs.current[i];
        if (!el) continue;
        const t = p * (N + 10) - i;
        const op = Math.min(1, Math.max(0.1, t / 4));
        const ty = (1 - op) * 7;
        el.style.opacity = op.toFixed(3);
        el.style.transform = `translateY(${ty.toFixed(1)}px)`;
      }
    },
  });

  return (
    <p className={className} ref={ref}>
      {words.map((w, i) => (
        <span
          key={i}
          className="phil__w"
          ref={(el) => { spanRefs.current[i] = el; }}
        >
          {w}{' '}
        </span>
      ))}
    </p>
  );
}

export default function Philosophy() {
  const headRef = useScrollScene({
    from: 0.96,
    to: 0.55,
    transform: { y: [60, 0], opacity: [0, 1] },
  });
  const visualRef = useScrollScene({
    from: 1.0,
    to: -0.2,
    transform: { y: [0, -60], rz: [0, -6], opacity: [0.9, 0.4] },
    mouse: [-8, 6],
  });

  return (
    <section id="philosophy" className="section phil">
      <div className="phil__visual" ref={visualRef}>
        <SunRays className="phil__rays" />
        <EyeDivine className="phil__eye" />
        <FibSpiral className="phil__spiral" />
        <p className="phil__stamp">Z — MMXXVI</p>
      </div>
      <div className="phil__body">
        <div className="sec-head" ref={headRef}>
          <p className="sec-label"><span className="sec-label-num">05</span> Philosophy</p>
          <h2 className="sec-title">The studio believes in <em>patience</em></h2>
        </div>
        {PHILOSOPHY_PARAGRAPHS.map((p, i) => (
          <ScrollWords key={i} text={p} className="phil__words" />
        ))}
        <OrnamentDivider className="phil__ornament" />
        <blockquote className="phil__quote">“{PHILOSOPHY_QUOTE}”</blockquote>
      </div>
    </section>
  );
}
