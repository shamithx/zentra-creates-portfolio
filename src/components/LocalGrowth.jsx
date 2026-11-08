import { useScrollScene } from '../lib/motion';
import { GROWTH } from '../lib/content';
import { OrnamentDivider } from './engravings';

/* One package. Reuses the `.svc__tilt` card shell and the `.svc__item` list
   rows from the Services section, so the surface, border, hover and list
   rhythm are literally the same rules — nothing new is introduced. */
function Package({ p, delay, quote }) {
  const ref = useScrollScene({
    from: 0.94,
    to: 0.52,
    delay,
    perspective: 1100,
    transform: { rx: [32, 0], y: [80, 0], z: [-160, 0], opacity: [0, 1] },
  });

  return (
    <article
      className={`svc__tilt growth__card ${p.popular ? 'growth__card--pop' : ''}`}
      ref={ref}
    >
      <div className="growth__row">
        <span className="growth__num">{p.n}</span>
        {p.tag && <span className="growth__tag">{p.tag}</span>}
      </div>

      <h3 className="growth__name">{p.name}</h3>

      <p className="growth__price">
        {p.amount ? (
          <>
            <span className="growth__amount">{p.amount}</span>
            <span className="growth__per">{p.per}</span>
          </>
        ) : (
          <span className="growth__amount growth__amount--quote">{quote}</span>
        )}
      </p>

      <ul className="svc__items growth__items">
        {p.items.map((it) => (
          <li key={it} className="svc__item">
            <span className="svc__item-dot" aria-hidden="true">
              ✦
            </span>
            {it}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function LocalGrowth() {
  const headRef = useScrollScene({
    from: 0.96,
    to: 0.55,
    transform: { y: [60, 0], opacity: [0, 1] },
  });

  return (
    <section id="growth" className="section growth">
      <div className="growth__head" ref={headRef}>
        <p className="sec-label sec-label--center">{GROWTH.eyebrow}</p>
        <h2 className="sec-title">
          ZENTRA Local <em>Growth</em>
        </h2>
        <p className="growth__lede">{GROWTH.lede}</p>
      </div>

      <p className="growth__choose">{GROWTH.choose}</p>

      <div className="growth__grid">
        {GROWTH.packages.map((p, i) => (
          <Package key={p.name} p={p} delay={i * 0.09} quote={GROWTH.quote} />
        ))}
      </div>

      <ul className="growth__notes">
        {GROWTH.notes.map((n) => (
          <li key={n} className="growth__note">
            {n}
          </li>
        ))}
      </ul>

      <OrnamentDivider className="sec-ornament" />
    </section>
  );
}
