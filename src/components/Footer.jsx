import { NAV_LINKS, CONTACTS, BRAND, PORTFOLIO_URL } from '../lib/content';
import { CONTACT_ICONS } from './icons';

function goTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer className="footer" data-component="footer">
      <div className="footer__top">
        <span className="footer__brand">
          <span className="footer__mono">Z</span>
          <span className="footer__word">{BRAND}</span>
        </span>

        <nav className="footer__nav" aria-label="Footer">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="footer__link">
              {l.label}
            </a>
          ))}
          <a
            className="footer__link footer__link--portfolio"
            href={PORTFOLIO_URL}
          >
            Portfolio ↗
          </a>
        </nav>

        <button type="button" className="footer__topbtn" onClick={goTop}>
          Back to top <span aria-hidden="true">↑</span>
        </button>
      </div>

      <div className="footer__contact">
        {CONTACTS.map((c) => {
          const Icon = CONTACT_ICONS[c.icon];
          return (
            <a
              key={c.id}
              className="footer__contact-link"
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon className="footer__contact-icon" />
              <span>{c.handle}</span>
            </a>
          );
        })}
      </div>

      <div className="footer__bottom">
        <span>© MMXXVI {BRAND} — Crafted with patience.</span>
        <span className="footer__fib" aria-hidden="true">
          1 · 1 · 2 · 3 · 5 · 8 · 13 · 21 · 34 · 55
        </span>
      </div>
    </footer>
  );
}
