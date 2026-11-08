/* Inline SVG icons — no icon font, no external requests. */

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export function WhatsAppIcon({ className = 'icon' }) {
  return (
    <svg className={className} {...base}>
      <path d="M12 3.2a8.8 8.8 0 0 0-7.5 13.4L3.2 20.8l4.3-1.3A8.8 8.8 0 1 0 12 3.2Z" />
      <path d="M8.9 8.3c.2-.5.9-.6 1.2-.2l.8 1.1c.2.3.2.6 0 .9l-.5.6c.5 1 1.3 1.7 2.2 2.2l.6-.5c.3-.2.6-.2.9 0l1.1.8c.4.3.3 1-.2 1.2-1.8.8-5.7-2.3-6.1-6.1Z" />
    </svg>
  );
}

export function InstagramIcon({ className = 'icon' }) {
  return (
    <svg className={className} {...base}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17.1" cy="6.9" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MailIcon({ className = 'icon' }) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="5.2" width="18" height="13.6" rx="2.2" />
      <path d="m3.8 7 8.2 5.7L20.2 7" />
    </svg>
  );
}

export function ArrowIcon({ className = 'icon' }) {
  return (
    <svg className={className} {...base}>
      <path d="M5 12h13m0 0-5-5m5 5-5 5" />
    </svg>
  );
}

export function FacebookIcon({ className = 'icon' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M13.6 21v-7.4h2.5l.4-2.9h-2.9V8.8c0-.84.23-1.41 1.44-1.41h1.54V4.79c-.27-.04-1.18-.11-2.24-.11-2.22 0-3.74 1.35-3.74 3.84v2.14H8.4v2.9h2.23V21h2.97Z" />
    </svg>
  );
}

export const CONTACT_ICONS = {
  whatsapp: WhatsAppIcon,
  instagram: InstagramIcon,
  mail: MailIcon,
};

export function PlayIcon({ className = 'icon' }) {
  return (
    <svg className={className} {...base}>
      <path d="M8.6 5.5v13l10.8-6.5Z" />
    </svg>
  );
}
