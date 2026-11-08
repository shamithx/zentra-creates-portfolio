/* ═══════════════════════════════════════════════════════════════
   PACKAGES — ME FILE EKE WITHARAI WENAS KARANNA
   ───────────────────────────────────────────────────────────────
   Site eke Packages section eke okkoma names, descriptions,
   features me file eken witharai ganne. Meke edit karala save
   karoth website eka auto update wenne.

   • price    – NUMBER EKAK DAMMAWAMA witharak site eke pennanawa
                ('5,000'). price: '' (empty) dammama "Custom quote"
                label eka pennanawa — numbers hide wenawa.
                Number ekak daddi `currency` saha `unit` fields thiyanna.
   • badge    – optional; card eke uda pita label eka (empty = none)
   • featured – true nam card eka gold highlight wenawa (eka witharai)
   ═══════════════════════════════════════════════════════════════ */

export const PRICING = {
  kicker: 'Packages',
  title: 'Service',
  titleAccent: 'Packages',
  quoteText: 'Custom quote',
  intro:
    'Three ways to engage the studio. Every project is scoped first, so the exact quote always matches the work — send a short brief and the number comes back the same day.',
  plans: [
    {
      name: 'Reels & Editing',
      badge: '',
      price: '',
      desc: 'Short-form reels, promos and social cuts — hook, captions, sound and colour handled end to end.',
      features: ['Up to 60-second cut', 'Captions & hook text', 'Sound & colour pass', '2 revision rounds'],
      featured: false,
    },
    {
      name: 'Design & Branding',
      badge: 'Most requested',
      price: '',
      desc: 'Logos, brand kits and social media design that stay consistent across every platform.',
      features: ['Logo + mini brand kit', 'Social media template set', 'Colour & type system', 'Source files included'],
      featured: true,
    },
    {
      name: 'Websites',
      badge: '',
      price: '',
      desc: 'Fast, mobile-first business websites — designed, built and launched with the contact flow included.',
      features: ['Up to 5-page business site', 'Mobile-first design', 'WhatsApp contact setup', 'Launch & handover support'],
      featured: false,
    },
  ],
  footnote:
    'Every project is scoped individually and quoted in writing before any work begins — so the final number always matches the brief.',
  ctaPrimary: 'Get an exact quote',
  ctaSecondary: 'Chat on WhatsApp',
};
