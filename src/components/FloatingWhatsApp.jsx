import { useEffect, useState } from 'react';
import { CTA, waLink } from '../lib/content';
import { WhatsAppIcon } from './icons';

/* Persistent WhatsApp shortcut. Appears once the visitor starts reading so it
   never covers the hero, and sits inside the device safe area on phones. */
export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      className={`float-wa ${show ? 'float-wa--on' : ''}`}
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${CTA.whatsapp} — opens WhatsApp with a ready message`}
      data-component="floating-whatsapp"
    >
      <span className="float-wa__icon" aria-hidden="true">
        <WhatsAppIcon className="float-wa__svg" />
      </span>
      <span className="float-wa__label">{CTA.whatsapp}</span>
    </a>
  );
}
