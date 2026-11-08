import { useScrollScene } from '../lib/motion';
import { CIPHER } from '../lib/content';
import { FibSpiral } from './engravings';

function Row({ item, i }) {
  const ref = useScrollScene({
    from: 0.95,
    to: 0.6,
    delay: i * 0.04,
    transform: { rx: [26, 0], y: [46, 0], opacity: [0, 1] },
    perspective: 900,
  });
  return (
    <article className={`cipher__row ${i % 2 === 0 ? 'cipher__row--gold' : ''}`} ref={ref}>
      <span className="cipher__n">{item.n}</span>
      <div className="cipher__body">
        <h3 className="cipher__t">{item.title}</h3>
        <p className="cipher__d">{item.text}</p>
      </div>
    </article>
  );
}

export default function Cipher() {
  const headRef = useScrollScene({
    from: 0.96,
    to: 0.55,
    transform: { y: [60, 0], opacity: [0, 1] },
  });
  return (
    <section id="cipher" className="section cipher">
      <FibSpiral className="cipher__ghost" aria-hidden="true" />
      <div className="sec-head" ref={headRef}>
        <p className="sec-label"><span className="sec-label-num">06</span> The ZENTRA Code</p>
        <h2 className="sec-title">A sequence for <em>craft</em></h2>
        <p className="sec-intro sec-intro--full">
          The Fibonacci order that governs every engagement —
          from the first signal to the work set free.
        </p>
      </div>
      <div className="cipher__list">
        {CIPHER.map((item, i) => (
          <Row key={item.n} item={item} i={i} />
        ))}
      </div>
    </section>
  );
}
