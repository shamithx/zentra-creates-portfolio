/* ============================================================
   ZENTRA Creates — Content
   Brand: ZENTRA Creates (video editing, graphic design,
   web design, brand growth).
   All contact details below are the studio's real channels.
   ============================================================ */

export const BRAND = 'ZENTRA Creates';
export const BRAND_SHORT = 'ZENTRA';
export const BRAND_LINE = 'Video Editing · Graphic Design · Web Design';

/* ————— Contact (single source of truth for every CTA) ————— */
export const WHATSAPP_NUMBER = '94726183056';
export const WHATSAPP_DISPLAY = '+94 72 618 3056';
export const WHATSAPP_MESSAGE =
  "Hi ZENTRA Creates! I'm interested in your creative services.";
export const waLink = (message = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const INSTAGRAM_URL = 'https://www.instagram.com/zentra.creates/';
export const INSTAGRAM_HANDLE = '@zentra.creates';
export const EMAIL = 'shamithchamod@gmail.com';

export const CONTACTS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: WHATSAPP_DISPLAY,
    href: waLink(),
    icon: 'whatsapp',
    external: true,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: INSTAGRAM_HANDLE,
    href: INSTAGRAM_URL,
    icon: 'instagram',
    external: true,
  },
  {
    id: 'email',
    name: 'Email',
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: 'mail',
    external: false,
  },
];

/* The dedicated portfolio site. Update this one line after deploying it. */
/* The portfolio now lives inside this site — link to the section, not a second domain. */
export const PORTFOLIO_URL = '#portfolio';

export const CTA = {
  portfolio: 'View My Portfolio',
  primary: "Let's Grow Your Brand",
  whatsapp: 'Chat on WhatsApp',
  work: 'View the Work',
  sample: 'Request a Free Sample',
  services: 'View Services',
  workWithMe: 'Work With Me',
};

/* ————— Featured film — real footage, published on the studio's Facebook page ————— */
export const FEATURED_REEL = {
  eyebrow: 'Featured Film',
  kicker: 'Showreel · 2026',
  title: 'The Promotion',
  titleAccent: 'Reel',
  lede: 'A short film cut for the feed — the hook lands in the first second, each cut holds only as long as the frame needs, and captions carry the story when the sound is off.',
  notes: ['First-second hook', 'Captioned for muted viewing', '9:16 vertical export'],
  meta: [
    { label: 'Discipline', value: 'Video Editing' },
    { label: 'Year', value: '2026' },
    { label: 'Runtime', value: '01:16' },
  ],
  runtime: '01:16',
  video: '/assets/projects/promo-reel.mp4',
  poster: '/assets/projects/promo-reel-cover.jpg',
  caption: 'Promotional Reel — Film 01. Published on the studio’s Facebook page.',
  caseHref: '#/project/video-edit-sample-02',
  source: {
    label: 'Watch on Facebook',
    href: 'https://www.facebook.com/reel/1578754684280451',
  },
};

export const NAV_LINKS = [
  { id: 'services', index: '01', label: 'Services' },
  { id: 'portfolio', index: '02', label: 'Portfolio' },
  { id: 'about', index: '03', label: 'About' },
  { id: 'tools', index: '04', label: 'Tools & Skills' },
  { id: 'philosophy', index: '05', label: 'Philosophy' },
  { id: 'cipher', index: '06', label: 'The Code' },
  { id: 'process', index: '07', label: 'Process' },
  { id: 'pricing', index: '08', label: 'Packages' },
  { id: 'contact', index: '09', label: 'Contact' },
];

export const SERVICES = [
  {
    numeral: 'I',
    fib: '1',
    title: 'Video Editing',
    desc: 'Reels, TikToks and brand films — rhythm, light and narrative cut with a surgeon\u2019s patience.',
    items: ['Instagram Reels & TikTok', 'Brand Films & Promos', 'Captions, Sound & Grade'],
    icon: 'rays',
  },
  {
    numeral: 'II',
    fib: '2',
    title: 'Graphic Design',
    desc: 'Brand systems, social sets and packaging drawn like engraved plates — precise, timeless, imperfect by design.',
    items: ['Brand Systems & Logos', 'Social Media Design', 'Posters & Packaging'],
    icon: 'hand',
  },
  {
    numeral: 'III',
    fib: '3',
    title: 'Web Design',
    desc: 'Identity sites, stores and landing pages — composed with proportion, motion and restraint.',
    items: ['Business & Portfolio Sites', 'E-Commerce & Ateliers', 'Landing Pages'],
    icon: 'geo',
  },
];

/* ------------------------------------------------------------------
   SELECTED WORK — real projects only.
   The four entries below are deliberately honest:
     • Case 01 is a real, live project you can open in a browser.
     • Cases 02-04 are held open. Their text states plainly that no
       client work is published there yet, and the images are studio
       engravings used as decoration — NOT screenshots of client sites.
   When a real project is ready, replace that entry's `title`, `cat`,
   `year`, `line` and `img` (and its `alt`). Nothing else needs to change.
   ------------------------------------------------------------------ */
export const WORK = [
  {
    case: 'Case 01',
    title: 'Kegalu Cake Hub',
    cat: 'Web Design',
    year: 'Live site',
    line: 'A live website for a homemade cake shop in Kegalle — full menu, cake galleries and ordering over WhatsApp. Open it at kegalucakehub.netlify.app.',
    img: 'https://sc04.alicdn.com/kf/Saacd086137554b84814550701333013al.jpg',
    alt: 'Kegalu Cake Hub — a cake baked by the shop, photographed for their live website',
    offset: '0',
  },
  {
    case: 'Case 02',
    title: 'Video Editing',
    cat: 'Video Editing',
    year: 'Slot Held Open',
    line: 'Held open for a real client film. Nothing is shown here yet because no project has been cleared for public display.',
    img: 'https://sc04.alicdn.com/kf/S428121897d3e4b29846546b6caf998f8N.jpg',
    alt: 'Studio engraving used as decoration — no video client work is shown here yet',
    offset: '80px',
  },
  {
    case: 'Case 03',
    title: 'Graphic Design',
    cat: 'Graphic Design',
    year: 'Slot Held Open',
    line: 'Held open for a real design set — brand system, social designs or packaging. This space will be filled only when work is ready to be shown.',
    img: 'https://sc04.alicdn.com/kf/S89750633c15f4f50b13f7d95cdc9076fD.jpg',
    alt: 'Studio engraving used as decoration — no graphic design client work is shown here yet',
    offset: '40px',
  },
  {
    case: 'Case 04',
    title: 'Brand Growth & Content',
    cat: 'Brand Growth',
    year: 'Slot Held Open',
    line: 'Held open for a real content and growth engagement. The plan, the work, and the results will appear here once a project is ready to share.',
    img: 'https://sc04.alicdn.com/kf/S9794f2e3d97b406fbe7bfae28ed25f0fT.jpg',
    alt: 'Studio engraving used as decoration — no brand growth client work is shown here yet',
    offset: '0',
  },
];

/* The studio's first market, stated plainly — kept in the studio's voice. */
export const PHILOSOPHY_MARKET =
  'We are building first for fashion and clothing — labels, boutiques, tailors and ateliers, and the small businesses around them. Their work is intensely visual and it is judged on how it is shown, which makes it the honest place to start, and the place where patience shows fastest.';

export const PHILOSOPHY_PARAGRAPHS = [
  'ZENTRA Creates is a creative studio built on a quiet conviction: the digital should be treated like the sacred. We study the old masters the way engineers study systems — for proportion, for light, for the patience hidden in every finished surface.',
  'We believe a website is not a page but a room; a brand is not a mark but a voice; a film is not footage but a held breath. Each engagement is composed like an engraving — line by line, darkness by darkness — until the work feels less made than discovered.',
  PHILOSOPHY_MARKET,
];

export const PHILOSOPHY_QUOTE = 'We do not decorate. We illuminate.';

export const CIPHER = [
  { n: '1', title: 'The Signal', text: 'Every engagement begins with a single mark — the brief, the whisper of intent that sets direction. Clarity begins here.' },
  { n: '2', title: 'The Pairing', text: 'Vision is paired with craft. Capability meets intent, and the path becomes buildable.' },
  { n: '3', title: 'The Trinity', text: 'The three arts converge — motion, graphic, web — one voice, three instruments.' },
  { n: '5', title: 'The Hand', text: 'First studies, rough sketches, imperfect lines. The hand teaches what the mind only imagines.' },
  { n: '8', title: 'The Rhythm', text: 'Typography, proportion, pacing. The invisible pulse that makes a piece feel alive.' },
  { n: '13', title: 'The Structure', text: 'Systems, grids, code. Order beneath the surface — beauty that holds.' },
  { n: '21', title: 'The Polish', text: 'Refinement. Light, detail, restraint. Where craft becomes mastery.' },
  { n: '\u221e', title: 'The Endless', text: 'The work is released to live — evolving, breathing, growing your brand beyond the studio\u2019s walls.' },
];

export const PROCESS = [
  {
    numeral: 'I',
    title: 'Listen',
    text: 'An audience, not a brief. We study the brand, the market, and the silence between the words.',
  },
  {
    numeral: 'II',
    title: 'Conceive',
    text: 'Direction through study — references, sketches and the first honest concepts, drawn by hand.',
  },
  {
    numeral: 'III',
    title: 'Compose',
    text: 'Design and build in parallel — type, image, motion, code — reviewed again and again in the light.',
  },
  {
    numeral: 'IV',
    title: 'Illuminate',
    text: 'Launch, refine, sustain. The work is placed in the world, then tended like a garden.',
  },
];

/* Kept for backwards compatibility with earlier imports. */
export const SOCIALS = CONTACTS;

/* ————— ZENTRA Local Growth — monthly content packages —————
   Copy is held here exactly as supplied. Prices are display strings, not
   numbers, so the formatting (Rs. 5,500) never gets re-rendered by locale.
   Prices stay HIDDEN on the site: amount: '' shows "Custom quote" instead.
   Number ekak daddi (e.g. 'Rs. 5,500' + per '/ month') eka witharak
   auto pennanawa. */
export const GROWTH = {
  eyebrow: 'A service by ZENTRA Creates',
  quote: 'Custom quote',
  /* The <h2> in LocalGrowth.jsx carries the title (it needs an <em> accent). */
  lede: 'Helping clothing boutiques, tailors and small fashion brands turn their products into better content and clearer customer inquiries.',
  choose: 'Choose Your Package',
  packages: [
    {
      n: '01',
      name: 'Starter',
      amount: '',
      per: '',
      items: [
        '2 short-form videos',
        '2 promotional designs',
        'Captions (Sinhala or English)',
        'Basic WhatsApp inquiry link',
      ],
    },
    {
      n: '02',
      name: 'Growth',
      tag: 'Most Popular',
      popular: true,
      amount: '',
      per: '',
      items: [
        '4 short-form videos',
        '4 matching promotional designs',
        'Captions + Monthly content plan',
        'Full WhatsApp inquiry setup',
        '1 revision per deliverable',
      ],
    },
    {
      n: '03',
      name: 'Premium',
      amount: '',
      per: '',
      items: [
        '6 short-form videos',
        '6 promotional designs',
        'Full monthly content calendar',
        'Advanced WhatsApp inquiry guidance',
        'Priority support',
        '2 revisions per deliverable',
      ],
    },
  ],
  notes: [
    'Client supplies usable product footage and information.',
    'Ad spend, travel, filming and posting are not included.',
  ],
};
