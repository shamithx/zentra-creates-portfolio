/* ============================================================
   ZENTRA Creates — Project data
   ------------------------------------------------------------
   ▸ THIS IS THE ONLY FILE YOU EDIT TO MANAGE THE PORTFOLIO.
   ▸ To ADD a project: copy one block below, change the values and
     give it a unique `slug`.
   ▸ ORDER IS LIST ORDER. The grid shows projects in the order they
     appear below — put an entry at the top of the list to show it
     first. (`featured` is inert: it does not reorder anything.)
   ▸ To REMOVE a project: delete its block.
   ▸ To EDIT: change the text in place.
   ------------------------------------------------------------
   YOUR OWN IMAGES AND VIDEOS
   1. Put the files in `public/assets/projects/`
      (e.g. `public/assets/projects/suit-reel.mp4`).
   2. Reference them with a leading slash and NO `public`:
        thumb:   '/assets/projects/suit-reel-still.jpg'
        cover:   '/assets/projects/suit-reel-wide.jpg'   (optional — falls back to `thumb`)
        media: [
          { type: 'image', src: '/assets/projects/suit-poster.jpg',
            caption: 'Campaign poster' },
          { type: 'video', src: '/assets/projects/suit-reel.mp4',
            poster: '/assets/projects/suit-reel-still.jpg',
            caption: 'Instagram Reel — 0:28' },
        ]
   ▸ `thumb` fills the gallery card. Leave it `null` and the card shows
     the engraved motif for that category instead.
   ▸ `cover` is the wide image at the top of the case study.
   ▸ SOCIAL VIDEO LINKS: paste a YouTube / Vimeo / TikTok / Instagram / Facebook URL —
     no file upload and nothing large in your repo. Two places accept one:
        video: { url: '…', poster: '…', caption: '…' }   → a "Watch" player
        media: [ { url: '…', poster: '…', caption: '…' } ] → in the media grid
     The platform, the official embed URL and the frame shape (16:9 or 9:16)
     are detected automatically. A poster still is optional but recommended.
     Facebook: use the canonical link (facebook.com/reel/<id> or /watch/?v=<id>).
     Share links (facebook.com/share/r/…, fb.watch/…) carry no video id and
     cannot be embedded — open the reel and use ⋯ → Copy link.
   ▸ `media` renders below the write-up: images and video players can be
     mixed in any order. Always add `poster` for video so the frame is not
     blank before it plays.
   ▸ Recommended: JPG/PNG images ~1600px wide, MP4 (H.264) video, ideally
     under ~10 MB per file so phones load them quickly.
   ▸ `placeholder: true` shows a small "Sample slot" badge and a
     short note on the detail view. Set it to `false` once the
     entry describes real work, and the badges disappear.
   ▸ `results` stays `null` unless you have real results to show —
     nothing is invented for you.
   ============================================================ */

export const CATEGORIES = [
  { id: 'all', label: 'All Work' },
  { id: 'video', label: 'Video Editing' },
  { id: 'graphic', label: 'Graphic Design' },
  { id: 'web', label: 'Web Design' },
  { id: 'growth', label: 'Brand Growth & Content Strategy' },
  { id: 'automation', label: 'Business Automation' },
];

const TEMPLATE = {
  client: 'Add the client or brand name',
  year: 'Add the year',
  challenge: 'Describe the problem or objective the client came with.',
  role: 'List what you personally handled on this project.',
  tools: ['Add the tools you used'],
  process: [
    'Describe step one of how you approached the work.',
    'Describe step two.',
    'Describe step three.',
  ],
  media: [],
  cover: null,
  coverCaption: null,
  deliverables: ['Add the final deliverables you handed over'],
  results: null,
};

/* ------------------------------------------------------------------
   COPY-PASTE TEMPLATE — the fastest way to add your own project.
   Copy the block below, paste it at the END of the PROJECTS list,
   then change every value. Give it a unique `slug`.

   {
     slug: 'my-new-project',              // URL becomes #/project/my-new-project
     title: 'My Project Name',
     category: 'video',                   // video | graphic | web | growth | automation
     summary: 'One line that describes what you made.',
     featured: false,                     // inert — order follows the list, not this flag
     placeholder: false,                  // false removes the "Details pending" badge
     thumb: '/assets/projects/my-still.jpg',   // card image
     cover: '/assets/projects/my-wide.jpg',    // optional wide image for the case study
     coverCaption: 'Optional caption under the wide image',
     liveUrl: 'https://the-live-site.example.com',  // optional "Visit the live site" button
     client: 'Brand or business name',
     year: '2026',
     overview: 'What the project was.',
     challenge: 'What problem you were asked to solve.',
     role: 'What you personally did on it.',
     tools: ['Premiere Pro', 'Photoshop'],
     process: ['Step one', 'Step two', 'Step three'],
     video: {
       url: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',   // or a Vimeo / TikTok / Instagram link
       poster: '/assets/projects/my-still.jpg',                // optional still
       caption: 'Promotional video editing project',           // optional
     },
     media: [
       { type: 'image', src: '/assets/projects/my-poster.jpg', caption: 'Poster set' },
       { url: 'https://www.instagram.com/reel/YOUR_REEL_CODE/', poster: '/assets/projects/my-still.jpg', caption: 'Instagram Reel' },
       { type: 'video', src: '/assets/projects/my-reel.mp4',
         poster: '/assets/projects/my-still.jpg', caption: 'Instagram Reel — 0:28' },
     ],
     deliverables: ['What you handed over'],
     results: null,                       // only fill this in when you have real results
   },
   ------------------------------------------------------------------ */
export const PROJECTS = [
  {
    slug: 'ron-tailors',
    title: 'Ron Tailors — Promotional Reel',
    category: 'video',
    summary:
      'A short promo for a tailoring and blazer rental business — hook in the first second, clean cuts and captions.',
    featured: false,
    /* Real client work. The write-up below only describes the edit itself;
       no performance numbers are claimed because none were recorded. */
    placeholder: false,
    thumb: '/assets/projects/ron-tailors.jpg',
    cover: '/assets/projects/ron-tailors.jpg',
    coverCaption: 'Still from the promo — tailoring and blazer rental.',
    client: 'Ron Tailors',
    year: '2026',
    overview:
      'A short promotional reel built for a tailoring and blazer rental business. The piece opens on the garment in the first second, then carries the suit and the rental service through clean cuts and on-screen captions, cut short for a social feed.',
    challenge:
      'A tailor competes with ready-made fashion in the same feed, where a suit has about a second to register before someone scrolls past. The reel had to make the garment worth stopping for without a script or a voiceover.',
    role: 'Video editing — structure, pacing, captions and the social export.',
    process: [
      'Opened on the garment so the hook lands in the first second, before any slow reveal.',
      'Cut tight, holding each shot only as long as it takes to read the silhouette.',
      'Set captions for silent playback, since most feed views start muted.',
      'Closed on the service rather than the product, so the reel reads as something you can rent.',
    ],
    deliverables: ['One short promotional reel, captioned'],
    results: null,
  },
  {
    slug: 'video-edit-sample-02',
    title: 'Promotional Reels',
    category: 'video',
    client: 'ZENTRA Creates — own channel',
    year: '2026',
    summary: 'Short promotional reels produced for social media.',
    thumb: '/assets/projects/promo-reel-cover.jpg',
    cover: '/assets/projects/promo-reel-cover.jpg',
    coverCaption: 'Still from Film 01 — one of the promotional reels in this set.',
    video: {
      /* Film 01, kept exactly as published on the studio's Facebook page. */
      url: 'https://www.facebook.com/reel/1578754684280451',
      poster: '/assets/projects/promo-reel-cover.jpg',
      caption: 'Promotional reel — Film 01, published on Facebook',
    },
    featured: false,
    placeholder: false,
    media: [
      /* Film 01 is the main player above. These are the Instagram cut and three
         more films from the same run; reel 04 is no longer embeddable. */
      { url: 'https://www.facebook.com/reel/1515469000415494', poster: '/assets/projects/reel-cover-02.jpg', caption: 'Promotional reel — Film 02' },
      { url: 'https://www.facebook.com/reel/1145734917786987', poster: '/assets/projects/reel-cover-03.jpg', caption: 'Promotional reel — Film 03' },
      { url: 'https://www.facebook.com/reel/27891362440524465', poster: '/assets/projects/reel-cover-05.jpg', caption: 'Promotional reel — Film 05' },
      { url: 'https://www.instagram.com/reel/DemVpOXi2V0/', caption: 'Promotional reel — Instagram cut' },
    ],
    overview:
      'Short promotional reels cut for social media. The film above is Film 01, published on Facebook; the grid below collects the Instagram cut and three more films from the same run.',
  },
  {
    slug: 'ad-premium-fashion-campaign',
    concept: true,
    title: 'Premium Fashion Campaign',
    category: 'graphic',
    summary:
      'A concept campaign poster for a fictional premium label — one garment, a single light, restrained type.',
    featured: false,
    /* Concept sample — the brand is invented for this piece. */
    placeholder: false,
    thumb: '/assets/projects/ad-atelier-noir.jpg',
    cover: '/assets/projects/ad-atelier-noir.jpg',
    coverCaption: 'Concept campaign. Atelier Noir is a fictional brand created for this sample.',
    client: 'Concept sample — Atelier Noir (fictional)',
    year: '2026',
    overview:
      'A concept social campaign for a fictional premium clothing label. One tailored overcoat carries the whole message: deep charcoal, a single rim light, and editorial type that stays out of the garment’s way.',
    challenge:
      'Premium clothing campaigns usually crowd the frame with product and offer copy, which flattens a considered garment into a catalogue shot. The brief was to let a single piece hold the poster on its own.',
    role: 'Concept work — art direction, composition, typography and layout.',
    process: [
      'Built the frame around one overcoat in three-quarter profile, so the lapel and the fall of the cloth do the work.',
      'Lit it with a single warm source from the upper left and let the rest fall to black.',
      'Kept the headline in a high-contrast serif on the middle band, with the brand mark small above it.',
      'Held the palette to charcoal, warm black and one brass accent.',
      'Composed square so it crops safely into both feed and story.',
    ],
    deliverables: ['1:1 social campaign poster, 1400px'],
    media: [
      {
        type: 'image',
        src: '/assets/projects/ad-atelier-noir.jpg',
        caption: 'Full artwork — 1:1, 1400px',
      },
    ],
    results: null,
  },
  {
    slug: 'ad-beauty-ritual',
    title: 'Beauty Brand Campaign',
    category: 'graphic',
    concept: true,
    summary:
      'A concept campaign for a fictional skincare house — one bottle, a raking light, quiet type.',
    featured: false,
    placeholder: false,
    thumb: '/assets/projects/ad-beauty-ritual.jpg',
    cover: '/assets/projects/ad-beauty-ritual.jpg',
    coverCaption: 'Concept campaign. Maison Lumière is a fictional brand created for this sample.',
    client: 'Concept sample — Maison Lumière (fictional)',
    year: '2026',
    overview:
      'A concept campaign for a fictional skincare house, built to show that the same restrained art direction used for fashion carries into beauty and salon work. One serum bottle holds the frame; the light does the rest.',
    challenge:
      'Beauty advertising tends to over-lit the product and stack claims until nothing reads. The brief was a single bottle that feels expensive at thumbnail size, with no claims at all.',
    role: 'Concept work — art direction, composition, typography and layout.',
    process: [
      'Set the bottle on rough slate rather than a clean surface, so the glass reads against texture.',
      'Raked one warm light across the glass edge and let everything else fall to black.',
      'Held the palette to charcoal, frosted glass and a single brass accent.',
      'Kept the type to three lines — wordmark, headline, product name — with nothing else competing.',
      'Made no performance or ingredient claims, since none could be evidenced.',
    ],
    deliverables: ['1:1 social campaign poster, 1400px'],
    media: [
      {
        type: 'image',
        src: '/assets/projects/ad-beauty-ritual.jpg',
        caption: 'Full artwork — 1:1, 1400px',
      },
    ],
    results: null,
  },
  {
    slug: 'ad-blazer-rental',
    concept: true,
    title: 'Blazer Rental Promotion',
    category: 'graphic',
    summary:
      'A concept rental advert for a fictional tailoring house — one blazer on a brass rail, quiet confident type.',
    featured: false,
    placeholder: false,
    thumb: '/assets/projects/ad-the-wardrobe-room.jpg',
    cover: '/assets/projects/ad-the-wardrobe-room.jpg',
    coverCaption: 'Concept advert. The Wardrobe Room is a fictional brand created for this sample.',
    client: 'Concept sample — The Wardrobe Room (fictional)',
    year: '2026',
    overview:
      'A concept advertisement for a fictional blazer rental service. A single double-breasted blazer on a brass rail does the selling, so rental reads as something considered rather than something borrowed.',
    challenge:
      'Rental advertising tends to lead with price and urgency, which makes formalwear feel cheap. This one had to make renting feel like the more tasteful choice.',
    role: 'Concept work — art direction, composition, typography and layout.',
    process: [
      'Shot one blazer on the rail rather than a model, so the cut of the garment is the subject.',
      'Let a second blazer fall out of focus behind it to suggest a wardrobe rather than a single item.',
      'Warmed the wall and the brass so the deep navy reads as expensive.',
      'Placed the headline across the centre with a thin rule and one qualifying line beneath.',
      'Kept prices, dates and contact details out of the artwork entirely.',
    ],
    deliverables: ['1:1 social advert, 1400px'],
    media: [
      {
        type: 'image',
        src: '/assets/projects/ad-the-wardrobe-room.jpg',
        caption: 'Full artwork — 1:1, 1400px',
      },
    ],
    results: null,
  },
  {
    slug: 'ad-season-sale',
    concept: true,
    title: 'Modern Clothing Brand Sale',
    category: 'graphic',
    summary:
      'A concept sale poster for a fictional label — cream rail, oversized type, no discount clutter.',
    featured: false,
    placeholder: false,
    thumb: '/assets/projects/ad-studio-nord.jpg',
    cover: '/assets/projects/ad-studio-nord.jpg',
    coverCaption: 'Concept poster. Studio Nord is a fictional brand created for this sample.',
    client: 'Concept sample — Studio Nord (fictional)',
    year: '2026',
    overview:
      'A concept season sale poster for a fictional clothing label. It leans entirely on typographic hierarchy — the rail of garments supplies texture, and the headline carries the information.',
    challenge:
      'Sale posters usually fill the frame with percentages, dates and badges until nothing is readable at thumbnail size. The brief was a sale that still looks like a brand.',
    role: 'Concept work — art direction, typography and layout.',
    process: [
      'Moved to a warm paper ground so the poster separates from a dark feed without shouting.',
      'Let the garment rail sit low and crop hard, keeping the upper half quiet for type.',
      'Set the headline in a tall grotesque at the largest size the square allows, with tight tracking.',
      'Reduced the supporting line to one phrase, so the hierarchy is headline then nothing.',
      'Left prices, percentages and dates out of the artwork.',
    ],
    deliverables: ['1:1 social sale poster, 1400px'],
    media: [
      {
        type: 'image',
        src: '/assets/projects/ad-studio-nord.jpg',
        caption: 'Full artwork — 1:1, 1400px',
      },
    ],
    results: null,
  },
  {
    slug: 'web-design-sample-01',
    title: 'Kegalu Cake Hub',
    liveUrl: 'https://kegalucakehub.netlify.app/',
    category: 'web',
    summary:
      'A live business website for a homemade cake shop in Kegalle — birthday and wedding cakes, jar cakes, cupcakes, pastries and brownies, ordered over WhatsApp.',
    featured: true,
    placeholder: false,
    thumb: '/assets/projects/kegalu-cake-hub.jpg',
    cover: '/assets/projects/kegalu-cake-hub.jpg',
    coverCaption: 'A cake from Kegalu Cake Hub, photographed for their own website.',
    client: 'Kegalu Cake Hub',
    overview:
      'A live website for Kegalu Cake Hub, a homemade cake shop in Kegalle, Sri Lanka. It presents the full menu — birthday cakes, wedding cakes, no-fondant cakes, cupcakes, jar cakes, pastries and brownies — and takes orders over WhatsApp and by phone rather than through a checkout. The page also carries the shop’s story, customer reviews, its delivery area and the advance notice it asks for on wedding cakes.',
  },
  {
    slug: 'content-plan-fashion-brand',
    concept: true,
    title: '7-Day Fashion Brand Content Plan',
    category: 'growth',
    summary:
      'A week of content for a small label — audience, pillars, a seven-day calendar and the reel hooks behind it.',
    featured: false,
    /* Concept sample — a strategy written to show the thinking, not a
       delivered campaign. */
    placeholder: false,
    /* A planning artefact, not more clothing photography — the card should
       read as strategy at a glance. */
    thumb: '/assets/projects/board-content-calendar.jpg',
    cover: '/assets/projects/board-content-calendar.jpg',
    coverCaption: 'Concept board — a planning artefact, not client photography.',
    client: 'Concept sample — independent fashion label',
    year: '2026',
    overview:
      'A concept content plan for an independent fashion label. It sets a target audience and three objectives, defines four content pillars, then turns them into a seven-day calendar with reel hooks, caption prompts and one call to action per post. The value is repetition: the same four pillars every week make a small account look deliberate instead of occasional.',
    challenge:
      'A small label posts when there is stock to push, so the feed reads as a run of one-off sales posts. Nothing builds recognition, and the same pieces get re-shot instead of re-framed.',
    role: 'Concept work — audience and pillar definition, calendar, hooks and copy prompts.',
    process: [
      'Audience: 22–34, urban, buying two or three considered pieces a year rather than fast fashion.',
      'Objectives: make the label recognisable, show how the clothes are actually worn, and move interest into WhatsApp inquiries.',
      'Pillars: The Piece (detail and cloth), The Making (process), The Fit (styling on real bodies), The Proof (customers and repeat orders).',
      'Calendar: Monday styling reel, Tuesday cloth close-up carousel, Wednesday customer story, Thursday fit guide, Friday new arrival, Saturday behind the rail, Sunday quiet still life.',
      'Hooks: each reel opens on a question the audience already asks — what do I wear this with, will it work on my height.',
      'Calls to action: one per post — save it, comment a size, or message on WhatsApp. Never three at once.',
    ],
    deliverables: [
      'Audience and objective brief',
      'Four content pillars',
      'Seven-day posting calendar',
      'Reel hooks for each posting day',
      'Caption prompts per post',
      'One-call-to-action guide',
    ],
    results: null,
  },
  {
    slug: 'growth-blueprint-clothing-store',
    concept: true,
    title: 'Social Media Growth Blueprint for a Clothing Store',
    category: 'growth',
    summary:
      'A diagnostic blueprint for a store that already posts daily but is not growing — the mistakes, a content mix, a weekly review.',
    featured: false,
    placeholder: false,
    thumb: '/assets/projects/board-growth-desk.jpg',
    cover: '/assets/projects/board-growth-desk.jpg',
    coverCaption: 'Concept board — a planning desk, not client photography.',
    client: 'Concept sample — independent clothing store',
    year: '2026',
    overview:
      'A concept growth blueprint for a clothing store that already posts daily but is not growing. It names the mistakes costing reach, sets a recommended content mix, supplies reel and carousel concepts, and gives a one-page method for reviewing performance each week.',
    challenge:
      'Daily posting with no format the audience can recognise. Reach stays flat and the same small group of followers likes every post.',
    role: 'Concept work — diagnosis, content mix, format concepts and review method.',
    process: [
      'Mistakes: only product shots, no faces or movement, captions that repeat the price, no repeatable format, and nothing worth saving.',
      'Content mix: 40% styling and outfit ideas, 25% product and new arrivals, 20% behind the scenes, 15% community and customer posts.',
      'Reels: one outfit three ways, fitting-room try-on, the detail nobody zooms into, would you wear this.',
      'Carousels: size and fit guide, one piece styled for work and for the weekend, cloth care.',
      'Behind the scenes: packing an order, steaming before a shoot, choosing between two fabrics.',
      'Community: answer comments within the hour, ask a question in every caption, repost customer photos with permission.',
      'Review: one page a week — saves and shares first, reach second, follows third — so each week only one thing changes.',
    ],
    deliverables: [
      'Content mistake audit',
      'Recommended content mix',
      'Four reel concepts',
      'Three carousel concepts',
      'Weekly review template',
    ],
    results: null,
  },
  {
    slug: 'content-strategy-modern-tailoring',
    concept: true,
    title: 'Content Strategy for a Modern Tailoring Brand',
    category: 'growth',
    summary:
      'A concept strategy for a tailoring house — showcases, before-and-after, styling, customer journey and WhatsApp CTAs.',
    featured: false,
    placeholder: false,
    thumb: '/assets/projects/board-tailoring-strategy.jpg',
    cover: '/assets/projects/board-tailoring-strategy.jpg',
    coverCaption: 'Concept board — illustrative imagery, not client photography.',
    client: 'Concept sample — modern tailoring house',
    year: '2026',
    overview:
      'A concept content strategy for a tailoring business. It covers how to show suits and blazers, how to use before-and-after work, styling posts, the customer journey from first fitting to collection, two campaign ideas and a weekly rhythm that always ends on WhatsApp.',
    challenge:
      'Tailoring is a high-trust purchase with a long decision, but it is usually shown as finished garments only. The process is the most persuasive asset the business owns and it is almost never posted.',
    role: 'Concept work — content structure, formats and campaign outlines.',
    process: [
      'Showcase: one suit or blazer a week, shot first on the mannequin then on a person, so the fit reads twice.',
      'Before and after: the same jacket at the shoulder and sleeve, framed side by side with the adjustment named.',
      'Styling: one blazer worn three ways — wedding, work, evening.',
      'Customer journey: first fitting, measurement, cloth choice, final press — four posts across a month.',
      'Campaigns: wedding season and blazer rental, each a two-week run with a defined opening and closing post.',
      'Weekly rhythm: Monday showcase, Wednesday styling, Friday before-and-after, Saturday customer.',
      'Every post closes on WhatsApp, because that is where the inquiry actually happens — send your measurements on WhatsApp.',
    ],
    deliverables: [
      'Suit and blazer showcase concepts',
      'Before-and-after format',
      'Styling post series',
      'Customer journey sequence',
      'Two campaign outlines',
      'Weekly posting rhythm',
      'WhatsApp call-to-action set',
    ],
    results: null,
  },
  {
    slug: 'ron-tailors-sheets-automation',
    title: 'Ron Tailors — Google Sheets Workflow Automation',
    category: 'automation',
    summary:
      'Structured Google Sheets workflows for a tailoring business — customer measurement records and business data, organised and automated.',
    featured: false,
    /* Real work. No screenshots were available, so the card uses the category
       motif rather than a fabricated interface shot. */
    placeholder: false,
    thumb: null,
    client: 'Ron Tailors',
    year: '2026',
    overview:
      'Developed structured Google Sheets workflows for Ron Tailors to organise customer measurement records and business data more efficiently. Created spreadsheet-based automation to reduce repetitive manual data entry and improve record organisation, accessibility and day-to-day workflow management.',
    challenge:
      'Measurement details and customer information lived in separate places, so the same values were written out again for every order. Finding a past customer meant scrolling to find the right row.',
    role: 'Google Sheets setup — record structure, automation and day-to-day workflow.',
    tools: ['Google Sheets'],
    process: [
      'Mapped what the business actually records for each customer — chest, shoulder, sleeve, trouser length and the date the measurements were taken.',
      'Built one structured record per customer, so a measurement is entered once and referenced everywhere else.',
      'Added spreadsheet formulas so repeated fields fill themselves instead of being retyped for every new order.',
      'Organised the records so a past customer is found by name or number in seconds instead of scrolling a list.',
      'Kept the layout plain enough that the shop can maintain it without me.',
    ],
    deliverables: [
      'Customer Measurement Record Management',
      'Google Sheets Workflow Automation',
      'Structured Business Data',
      'Reduced Repetitive Manual Data Entry',
      'Improved Record Accessibility',
    ],
    results: null,
  },
];

export const bySlug = (slug) => PROJECTS.find((p) => p.slug === slug);
export const categoryLabel = (id) =>
  (CATEGORIES.find((c) => c.id === id) || { label: id }).label;
export const countByCategory = () =>
  CATEGORIES.reduce((acc, c) => {
    acc[c.id] = c.id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.category === c.id).length;
    return acc;
  }, {});
