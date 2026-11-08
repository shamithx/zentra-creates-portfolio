import { useEffect, useState } from 'react';
import { NAV_LINKS, CONTACTS, CTA, waLink } from '../lib/content';
import { goHome } from '../lib/router';
import { SunRays } from './engravings';
import { WhatsAppIcon, CONTACT_ICONS } from './icons';

function go(id, open, setOpen) {
  const scroll = () => {
    const el = document.getElementById(id);
    /* On a project page the sections are not mounted: hand the anchor to the
       router, which returns home and scrolls once the page has rendered. */
    if (!el) {
      goHome(id);
      return;
    }
    const doc = document.scrollingElement || document.documentElement;
    const top = el.getBoundingClientRect().top + doc.scrollTop - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    /* Safety net for environments where native smooth scroll stalls. */
    setTimeout(() => {
      if (Math.abs(el.getBoundingClientRect().top) > 200) {
        document.documentElement.style.scrollBehavior = 'auto';
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
        document.documentElement.style.scrollBehavior = '';
      }
    }, 1200);
  };
  if (open) {
    setOpen(false);
    setTimeout(scroll, 520);
  } else {
    scroll();
  }
}

function MenuOverlay({ open, onClose }) {
  return (
    <div
      className={`menu ${open ? 'menu--open' : ''}`}
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget || e.target.classList.contains('menu__fog')) onClose();
      }}
    >
      <div className="menu__fog" />
      <SunRays className="menu__rays" />
      <nav className="menu__nav" aria-label="Menu">
        {NAV_LINKS.map((l, i) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className="menu__link"
            style={{ '--i': i }}
            onClick={(e) => {
              e.preventDefault();
              go(l.id, true, onClose);
            }}
          >
            <span className="menu__link-index">{l.index}</span>
            <span className="menu__link-label">{l.label}</span>
            <span className="menu__link-arrow">↗</span>
          </a>
        ))}
        <a
          className="menu__link"
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            go('contact', true, onClose);
          }}
        >
          <span className="menu__link-index">✦</span>
          <span className="menu__link-label">{CTA.workWithMe}</span>
          <span className="menu__link-arrow">→</span>
        </a>
      </nav>

      <aside className="menu__aside">
        <p className="menu__aside-eyebrow">Get in touch</p>
        <p className="menu__aside-quote">
          We do not decorate.
          <br />
          <em>We illuminate.</em>
        </p>
        <div className="menu__contact">
          {CONTACTS.map((c) => {
            const Icon = CONTACT_ICONS[c.icon];
            return (
              <a
                key={c.id}
                className={`menu__contact-link menu__contact-link--${c.id}`}
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon className="menu__contact-icon" />
                <span className="menu__contact-text">
                  <span className="menu__contact-name">{c.name}</span>
                  <span className="menu__contact-handle">{c.handle}</span>
                </span>
              </a>
            );
          })}
        </div>
      </aside>

      <div className="menu__foot">
        <span>© MMXXVI ZENTRA Creates</span>
        <span className="menu__fib">1 · 1 · 2 · 3 · 5 · 8 · 13 · 21 · 34 · 55</span>
      </div>
    </div>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
        <a
          className="nav__brand"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go('top', open, setOpen);
          }}
        >
          <span className="nav__mono">Z</span>
          <span className="nav__word">ZENTRA</span>
        </a>

        <span className="nav__center">ZENTRA Creates · Creative Studio</span>

        <div className="nav__actions">
          <a
            className="nav__wa"
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={CTA.whatsapp}
          >
            <WhatsAppIcon className="nav__wa-icon" />
            <span className="nav__wa-label">{CTA.whatsapp}</span>
          </a>

          <button
            type="button"
            className="nav__toggle"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="nav__toggle-text">{open ? 'Close' : 'Menu'}</span>
            <span className="nav__toggle-lines" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
