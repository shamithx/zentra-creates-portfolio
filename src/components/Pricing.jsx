import { useScrollScene } from '../lib/motion';
import { PRICING } from '../data/pricing';
import { waLink } from '../lib/content';
import { OrnamentDivider } from './engravings';

function Plan({ plan, delay }) {
  const ref = useScrollScene({
    from: 0.94,
    to: 0.55,
    delay,
    transform: { y: [64, 0], opacity: [0, 1] },
  });
  return (
    <article className={`price ${plan.featured ? 'price--featured' : ''}`} ref={ref}>
      {plan.badge ? <span className="price__badge">{plan.badge}</span> : null}
      <h3 className="price__name">{plan.name}</h3>
      <p className="price__amount">
        {plan.price ? (
          <>
            <span className="price__cur">{plan.currency ?? 'LKR'}</span>
            <span className="price__val">{plan.price}</span>
            <span className="price__unit">{plan.unit ?? ''}</span>
          </>
        ) : (
          <span className="price__val price__val--quote">{PRICING.quoteText}</span>
        )}
      </p>
      <p className="price__desc">{plan.desc}</p>
      <ul className="price__items">
        {plan.features.map((f) => (
          <li key={f} className="price__item">
            <span className="price__item-dot" aria-hidden="true">✦</span>
            {f}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Pricing() {
  const headRef = useScrollScene({
    from: 0.96,
    to: 0.55,
    transform: { y: [60, 0], opacity: [0, 1] },
  });
  return (
    <section id="pricing" className="section pricing">
      <div className="sec-head sec-head--split" ref={headRef}>
        <div>
          <p className="sec-label"><span className="sec-label-num">08</span> {PRICING.kicker}</p>
          <h2 className="sec-title">{PRICING.title} <em>{PRICING.titleAccent}</em></h2>
        </div>
        <p className="sec-intro">{PRICING.intro}</p>
      </div>

      <div className="price-grid">
        {PRICING.plans.map((p, i) => (
          <Plan key={p.name} plan={p} delay={i * 0.09} />
        ))}
      </div>

      <p className="price__note">{PRICING.footnote}</p>

      <div className="svc-band">
        <p className="svc-band__text">Not sure which one fits your project?</p>
        <a className="btn btn--ghost" href="#contact">
          <span>{PRICING.ctaPrimary}</span>
          <span aria-hidden="true">→</span>
        </a>
        <a className="btn btn--ghost" href={waLink()} target="_blank" rel="noreferrer">
          <span>{PRICING.ctaSecondary}</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <OrnamentDivider className="sec-ornament" />
    </section>
  );
}
