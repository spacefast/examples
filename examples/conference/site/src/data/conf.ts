// Every piece of content for the conference lives here, so changing a speaker,
// a session time, or a ticket price never means hunting through markup.

export const conf = {
  name: 'DevHorizon',
  year: '2026',
  tagline: 'One room. One day. The web, looking forward.',
  theme:
    'A single-track, single-day conference about the modern web platform — practical front-end talks you can use the Monday after.',

  // The conference start, written in venue local time (Lisbon, WEST = UTC+1 in October).
  // The hero countdown ticks toward this exact moment.
  dateISO: '2026-10-16T09:15:00+01:00',
  dateLong: 'Friday, October 16, 2026',
  dateShort: '16 OCT 2026',
  doorsTime: '08:30',

  venue: 'Lisbon Congress Centre',
  venueRoom: 'Auditorium I',
  city: 'Lisbon, Portugal',
  address: 'Praça das Indústrias 1, 1300-307 Lisboa, Portugal',
  mapUrl: 'https://maps.google.com/?q=Centro+de+Congressos+de+Lisboa',

  capacity: '480',
  format: 'single track',
  ticketUrl: '#tickets',
  cfpUrl: '#',
  newsletterNote: 'One email when the 2027 dates and the first speakers are confirmed. Nothing else.',
} as const;

export const stats = [
  { value: '8', label: 'speakers' },
  { value: '1', label: 'track, zero clashes' },
  { value: '480', label: 'seats' },
  { value: '7h', label: 'of talks + hallway' },
];

export const about = {
  lede:
    'DevHorizon is a one-day, single-track conference for people who build for the browser. No parallel tracks, no FOMO, no choosing between two talks you both wanted — everyone sees everything, together, in one room.',
  points: [
    {
      title: 'Built for builders',
      body:
        'Eight talks, each grounded in something the speaker actually shipped. We brief every speaker to leave you with a technique you can try the next working day — not a roadmap slide.',
    },
    {
      title: 'One track, on purpose',
      body:
        'A single track means a shared experience. The hallway conversations over coffee are about the same talk everyone just watched, and they are usually the best part of the day.',
    },
    {
      title: 'The whole platform',
      body:
        'CSS that finally does what you wanted, less JavaScript on the wire, forms that validate, view transitions, local-first sync, and accessibility as an API. The modern web, end to end.',
    },
  ],
  who:
    'Front-end and full-stack engineers, design engineers, and tech leads who ship to the browser and want to keep their edge sharp. Whether you live in React all day or write the platform raw, you will leave with something to use.',
};

export type Speaker = {
  name: string;
  role: string;
  company: string;
  talk: string;
  abstract: string;
  seed: string;
  keynote?: boolean;
};

export const speakers: Speaker[] = [
  {
    name: 'Una Castellano',
    role: 'Principal Engineer',
    company: 'Vercel',
    talk: 'The Layout Engine in Your Head',
    abstract:
      'Container queries, subgrid, and :has() have quietly turned CSS into a real layout language. We will rebuild a stubborn responsive component three ways and watch the JavaScript disappear.',
    seed: 'devhorizon-2026-spk-una',
    keynote: true,
  },
  {
    name: 'Kenji Watanabe',
    role: 'Staff Engineer',
    company: 'Shopify',
    talk: 'Shipping Less JavaScript',
    abstract:
      'Islands, streaming, and the edge are not buzzwords — they are a budget. A live look at trimming a real storefront from 480 KB of JS to 90 KB without losing a single interaction.',
    seed: 'devhorizon-2026-spk-kenji',
  },
  {
    name: 'Amara Okonkwo',
    role: 'Web Platform Lead',
    company: 'Adobe',
    talk: 'Forms Are a Platform',
    abstract:
      'Form-associated custom elements, the Constraint Validation API, and the new Popover and Anchor primitives let you build a real design-system input that validates natively. No framework required.',
    seed: 'devhorizon-2026-spk-amara',
  },
  {
    name: 'Theo Brandt',
    role: 'Developer Advocate',
    company: 'Chrome',
    talk: 'View Transitions Everywhere',
    abstract:
      'Native cross-document view transitions ship today. We will take a plain multi-page site and give it app-like page animations in about fifteen lines of CSS — then talk about when not to.',
    seed: 'devhorizon-2026-spk-theo',
  },
  {
    name: 'Priya Raman',
    role: 'Co-founder',
    company: 'Driftsync',
    talk: 'Local-First, Finally',
    abstract:
      'Sync engines and CRDTs have grown up. A pragmatic tour of building an app that works offline, syncs in the background, and never shows a spinner — and the three places it will bite you.',
    seed: 'devhorizon-2026-spk-priya',
  },
  {
    name: 'Marco Silva',
    role: 'Design Engineer',
    company: 'Linear',
    talk: 'oklch in Production',
    abstract:
      'Wide-gamut color, perceptual lightness, and relative color syntax change how you build a theme. How we moved an entire product palette to oklch — and the accessibility wins we did not expect.',
    seed: 'devhorizon-2026-spk-marco',
  },
  {
    name: 'Hannah Lindqvist',
    role: 'Engineering Manager',
    company: 'Figma',
    talk: 'Testing the Untestable',
    abstract:
      'Playwright, the Trace Viewer, and component testing have made end-to-end tests something you actually want to write. A workflow for tests that catch real regressions and never flake.',
    seed: 'devhorizon-2026-spk-hannah',
  },
  {
    name: 'Diego Fuentes',
    role: 'Accessibility Engineer',
    company: 'GitHub',
    talk: 'The Accessibility Tree Is Your API',
    abstract:
      'Closing keynote. Stop bolting on ARIA at the end. When you treat the accessibility tree as the contract your UI exposes, better semantics and better tests fall out for free.',
    seed: 'devhorizon-2026-spk-diego',
    keynote: true,
  },
];

export type Slot = {
  time: string;
  title: string;
  kind: 'talk' | 'break' | 'milestone';
  speaker?: string;
  company?: string;
  note?: string;
};

export const schedule: Slot[] = [
  { time: '08:30', title: 'Doors, coffee & pastéis de nata', kind: 'break', note: 'Badge pickup opens in the foyer.' },
  { time: '09:15', title: 'Welcome & housekeeping', kind: 'milestone', note: 'Your hosts kick off the day.' },
  { time: '09:30', title: 'The Layout Engine in Your Head', kind: 'talk', speaker: 'Una Castellano', company: 'Vercel' },
  { time: '10:10', title: 'Shipping Less JavaScript', kind: 'talk', speaker: 'Kenji Watanabe', company: 'Shopify' },
  { time: '10:50', title: 'Coffee break', kind: 'break', note: '30 minutes. Stretch, refill, find a stranger to argue with.' },
  { time: '11:20', title: 'Forms Are a Platform', kind: 'talk', speaker: 'Amara Okonkwo', company: 'Adobe' },
  { time: '12:00', title: 'View Transitions Everywhere', kind: 'talk', speaker: 'Theo Brandt', company: 'Chrome' },
  { time: '12:40', title: 'Lunch', kind: 'break', note: 'Hot buffet in the foyer. Vegan, veggie, and gluten-free clearly labelled.' },
  { time: '14:00', title: 'Local-First, Finally', kind: 'talk', speaker: 'Priya Raman', company: 'Driftsync' },
  { time: '14:40', title: 'oklch in Production', kind: 'talk', speaker: 'Marco Silva', company: 'Linear' },
  { time: '15:20', title: 'Coffee break', kind: 'break', note: '30 minutes. The good espresso machine is by the windows.' },
  { time: '15:50', title: 'Testing the Untestable', kind: 'talk', speaker: 'Hannah Lindqvist', company: 'Figma' },
  { time: '16:30', title: 'The Accessibility Tree Is Your API', kind: 'talk', speaker: 'Diego Fuentes', company: 'GitHub', note: 'Closing keynote.' },
  { time: '17:10', title: 'Closing remarks & raffle', kind: 'milestone' },
  { time: '17:30', title: 'After-party on the river terrace', kind: 'milestone', note: 'Drinks, DJ, and the Tagus at sunset. Runs until 19:30.' },
];

export type Tier = {
  name: string;
  price: string;
  per: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
  soldOut?: boolean;
};

export const tickets: Tier[] = [
  {
    name: 'Early Bird',
    price: '€219',
    per: 'per person',
    blurb: 'The first 150 seats. Gone now — but this is the price returning attendees still talk about.',
    features: [
      'Full day, all eight talks',
      'Lunch, coffee & pastries',
      'After-party on the terrace',
      'Talk recordings within two weeks',
    ],
    cta: 'Sold out',
    soldOut: true,
  },
  {
    name: 'Standard',
    price: '€319',
    per: 'per person',
    blurb: 'The main ticket. Everything you need for the day, plus the recordings to revisit it.',
    features: [
      'Full day, all eight talks',
      'Lunch, coffee & pastries',
      'After-party on the terrace',
      'Talk recordings within two weeks',
      'Conference T-shirt & sticker pack',
    ],
    cta: 'Get a ticket',
    featured: true,
  },
  {
    name: 'Team',
    price: '€279',
    per: 'per seat · 4 or more',
    blurb: 'Bring the whole front-end team. One invoice, reserved seating together, and a real discount.',
    features: [
      'Everything in Standard',
      '4+ seats on a single invoice',
      'Reserved block of seats together',
      'Swap names up to 48h before',
      'Priority lunch seating',
    ],
    cta: 'Buy team seats',
  },
];

export const venue = {
  intro:
    'DevHorizon takes over Auditorium I at the Lisbon Congress Centre — a riverside venue in Alcântara with a glass façade, terrible acoustics for side conversations and excellent ones for talks, and a terrace looking straight out over the Tagus.',
  getThere: [
    {
      head: 'From the airport',
      body:
        'Humberto Delgado Airport (LIS) is about 20 minutes by taxi or 30 by metro + tram. A ride-share to the venue runs roughly €15–€20.',
    },
    {
      head: 'By tram & train',
      body:
        'The 15E tram and the Cascais line both stop a short walk away at Alcântara. From central Lisbon it is 15 minutes; from Cais do Sodré, ten.',
    },
    {
      head: 'On foot from the river',
      body:
        'If you are staying in Alcântara or LX Factory, it is a flat, pleasant 10-minute walk along the waterfront. We will have signage from the tram stop.',
    },
  ],
  hotels: [
    {
      name: 'Pestana Palace Lisboa',
      note: '7-minute drive. A grand 19th-century palace hotel. Use code DEVHORIZON for 15% off until September 18.',
      tag: 'Splurge',
    },
    {
      name: 'The Vintage House — Alcântara',
      note: '10-minute walk. Mid-range, design-forward rooms right by LX Factory and the venue.',
      tag: 'Recommended',
    },
    {
      name: 'HUB Lisbon Hostel & Suites',
      note: '12-minute tram. Private rooms and dorms for attendees keeping it lean. Walkable to the after-party.',
      tag: 'Budget',
    },
  ],
};

export type SponsorTier = {
  tier: string;
  blurb: string;
  sponsors: { name: string; kind: string }[];
};

export const sponsors: SponsorTier[] = [
  {
    tier: 'Platinum',
    blurb: 'They make the day possible.',
    sponsors: [
      { name: 'Vercel', kind: 'The frontend cloud' },
      { name: 'Sentry', kind: 'Error & performance monitoring' },
    ],
  },
  {
    tier: 'Gold',
    blurb: 'They keep the coffee hot.',
    sponsors: [
      { name: 'PlanetScale', kind: 'Serverless MySQL' },
      { name: 'Linear', kind: 'Issue tracking, done right' },
      { name: 'Clerk', kind: 'Auth for the modern web' },
      { name: 'Raycast', kind: 'Your command line, for everything' },
    ],
  },
  {
    tier: 'Community',
    blurb: 'Friends of the front end.',
    sponsors: [
      { name: 'Resend', kind: 'Email for developers' },
      { name: 'Turso', kind: 'SQLite at the edge' },
      { name: 'Neon', kind: 'Serverless Postgres' },
      { name: 'Inngest', kind: 'Durable workflows' },
      { name: 'Trigger.dev', kind: 'Background jobs' },
      { name: 'Astro', kind: 'The web framework for content' },
    ],
  },
];

export const faqs = [
  {
    q: 'Is it really a single track?',
    a: 'Yes. One room, one talk at a time, all day. You will never have to pick between two sessions, and every conversation at the break is about the thing everyone just watched.',
  },
  {
    q: 'Will the talks be recorded?',
    a: 'Every talk is professionally recorded. Ticket holders get the full set within two weeks, and they go public on the DevHorizon channel a month after that.',
  },
  {
    q: 'What is included with a ticket?',
    a: 'The full day of talks, lunch, all-day coffee and pastries, and entry to the after-party on the river terrace. Standard and Team tickets also include the conference T-shirt and sticker pack.',
  },
  {
    q: 'Can I get an invoice for my company?',
    a: 'Of course. Every ticket type generates a proper VAT invoice at checkout, and Team tickets settle on a single invoice. Email tickets@devhorizon.dev if your finance team needs anything specific.',
  },
  {
    q: 'Do you offer diversity or hardship tickets?',
    a: 'We hold back a block of free and discounted tickets every year for folks who would otherwise not be able to attend. Apply through the link in the footer — no long form, no questions about why.',
  },
  {
    q: 'What about refunds?',
    a: 'Full refund up to 30 days before the event, 50% up to 14 days before. After that you can transfer your ticket to someone else for free, right up to the morning of the conference.',
  },
];

export const coc = {
  summary:
    'DevHorizon is dedicated to a harassment-free experience for everyone, regardless of gender, identity, orientation, disability, ethnicity, religion, or experience level. We do not tolerate harassment in any form.',
  points: [
    'Be kind. Assume good faith. The room is full of people at every stage of their career.',
    'Harassment, slurs, and unwelcome attention are never okay — on stage, in the hallway, or online.',
    'Sponsors and staff are held to the same standard as everyone else.',
    'See something? Tell any organiser in a teal lanyard, or message the on-call number on your badge. We will act, quietly and quickly.',
  ],
  contact: 'conduct@devhorizon.dev',
};

export const socials = [
  { name: 'Mastodon', url: 'https://fosstodon.org/@devhorizon' },
  { name: 'Bluesky', url: 'https://bsky.app/profile/devhorizon.dev' },
  { name: 'GitHub', url: 'https://github.com/devhorizon' },
  { name: 'YouTube', url: 'https://youtube.com/@devhorizon' },
];
