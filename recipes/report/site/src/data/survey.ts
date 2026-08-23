// ---------------------------------------------------------------------------
// The State of the Indie Web 2025 — single source of truth.
//
// Every number, label, and line of commentary on the site is read from this
// file, so the whole report stays internally consistent. The figures below are
// invented for a fictional community survey but are modelled to add up: the
// demographic breakdowns each sum to the total respondent count.
// ---------------------------------------------------------------------------

export const meta = {
  title: 'The State of the Indie Web',
  year: 2025,
  publisher: 'Off-Main-Thread',
  publisherUrl: 'https://example.com/off-main-thread',
  editor: 'Mara Quinn',
  tagline:
    'What 4,812 solo founders, freelancers, and one-person dev shops told us about how they build for the web in 2025.',
  fieldStart: 'September 8',
  fieldEnd: 'October 3, 2025',
  fieldDays: 26,
  respondents: 4812,
  countries: 71,
  completionRate: 82,
};

// Three headline numbers for the hero strip.
export const headline = [
  { value: '4,812', label: 'respondents' },
  { value: '71', label: 'countries' },
  { value: '26', label: 'days in the field' },
];

// --- Methodology --------------------------------------------------------------
export const methodology = [
  'The survey ran for 26 days, from September 8 to October 3, 2025. We collected 4,812 complete responses — anyone who finished at least the demographics and tooling sections counts as complete, an 82% completion rate from 5,869 starts.',
  'Respondents were sampled from the Off-Main-Thread newsletter (about 38,000 subscribers), the #indieweb and #buildinpublic communities, and organic sharing on Mastodon and Bluesky. This is a self-selecting, opt-in audience of people who already identify as indie or solo builders — it is not a random sample of all web developers, and it skews toward people who like answering surveys about their tools.',
  'Percentages are rounded to the nearest whole number, so a few stacked bars total 99 or 101. Questions where respondents could choose more than one answer are marked “pick up to 3”. Raw counts for every question are in the appendix.',
];

// --- Demographics -------------------------------------------------------------

// Years building for the web (single choice; sums to 4,812).
export const experience = {
  unit: 'respondents',
  bars: [
    { label: '0–2 yrs', value: 612 },
    { label: '3–5 yrs', value: 1108 },
    { label: '6–10 yrs', value: 1594 },
    { label: '11–15 yrs', value: 902 },
    { label: '16+ yrs', value: 596 },
  ],
};

// Size of the team they work in (single choice; sums to 4,812).
export const companySize = {
  centerLabel: 'team size',
  slices: [
    { label: 'Just me', value: 2068, color: 'var(--c1)' },
    { label: '2–10', value: 1395, color: 'var(--c2)' },
    { label: '11–50', value: 738, color: 'var(--c3)' },
    { label: '51–200', value: 351, color: 'var(--c4)' },
    { label: '200+', value: 260, color: 'var(--c5)' },
  ],
};

// Primary role (single choice; sums to 4,812).
export const role = {
  centerLabel: 'primary role',
  slices: [
    { label: 'Full-stack', value: 1973, color: 'var(--c1)' },
    { label: 'Frontend', value: 1300, color: 'var(--c2)' },
    { label: 'Founder / owner', value: 866, color: 'var(--c3)' },
    { label: 'Design + dev', value: 433, color: 'var(--c4)' },
    { label: 'Backend', value: 240, color: 'var(--c5)' },
  ],
};

// Where respondents are based (top countries + the long tail; sums to 4,812).
export const countries = {
  unit: 'respondents',
  bars: [
    { label: 'United States', value: 1540 },
    { label: 'Germany', value: 433 },
    { label: 'United Kingdom', value: 385 },
    { label: 'India', value: 351 },
    { label: 'Canada', value: 264 },
    { label: 'Brazil', value: 207 },
    { label: 'France', value: 192 },
    { label: 'Netherlands', value: 154 },
    { label: 'Australia', value: 144 },
    { label: '62 others', value: 1142, muted: true },
  ],
};

// --- Tools & frameworks: usage vs. satisfaction -------------------------------
// usage  = % of respondents who used it this year
// sat    = % of those users who would use it again
export const tools = [
  { label: 'Astro', usage: 34, sat: 92 },
  { label: 'Svelte', usage: 27, sat: 89 },
  { label: 'HTMX', usage: 22, sat: 86 },
  { label: 'Solid', usage: 11, sat: 84 },
  { label: 'Vanilla JS', usage: 44, sat: 81 },
  { label: 'Vue', usage: 31, sat: 78 },
  { label: 'Alpine.js', usage: 14, sat: 74 },
  { label: 'Qwik', usage: 6, sat: 67 },
  { label: 'React', usage: 68, sat: 61 },
  { label: 'Next.js', usage: 49, sat: 58 },
];

// --- Hosting & deployment popularity ------------------------------------------
// share = % of respondents who shipped something here this year
// delta = change in share vs. the 2024 survey (percentage points)
export const hosting = [
  { label: 'Vercel', share: 41, delta: -3 },
  { label: 'Netlify', share: 33, delta: -5 },
  { label: 'Cloudflare Pages', share: 29, delta: 7 },
  { label: 'GitHub Pages', share: 24, delta: 1 },
  { label: 'Self-hosted VPS', share: 22, delta: 4 },
  { label: 'Spacefast', share: 18, delta: null, isNew: true },
  { label: 'AWS (raw)', share: 16, delta: -2 },
  { label: 'Fly.io', share: 12, delta: 0 },
  { label: 'Render', share: 10, delta: -1 },
  { label: 'Railway', share: 9, delta: 2 },
];

// --- Biggest pain points (pick up to 3) ---------------------------------------
export const painPoints = [
  { label: 'Keeping up with framework churn', votes: 2164 },
  { label: 'Burnout / doing everything alone', votes: 1901 },
  { label: 'Finding paying customers', votes: 1755 },
  { label: 'Build-tooling complexity', votes: 1402 },
  { label: 'Pricing & monetization decisions', votes: 1188 },
  { label: 'SEO & discoverability', votes: 977 },
  { label: 'Browser / CSS inconsistencies', votes: 803 },
  { label: 'Hosting cost at scale', votes: 642 },
  { label: 'Accessibility know-how', votes: 540 },
];

// --- Sentiment: how do you feel about the web platform? -----------------------
// Each statement is a 5-point Likert scale; the five numbers are percentages
// that sum to 100 in the order: strongly disagree, disagree, neutral, agree,
// strongly agree. The chart diverges out from the neutral midpoint.
export const sentimentScale = [
  'Strongly disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly agree',
];

export const sentiment = [
  { statement: 'The web platform gets better every year', values: [4, 9, 17, 44, 26] },
  { statement: 'I can build most things without a heavy framework now', values: [6, 14, 19, 38, 23] },
  { statement: 'Keeping up with the ecosystem is exhausting', values: [3, 8, 12, 39, 38] },
  { statement: 'Shipping a side project has never been easier', values: [5, 11, 16, 41, 27] },
  { statement: 'AI tools have changed how I build for the web', values: [7, 12, 18, 35, 28] },
  { statement: 'I worry about lock-in with my hosting provider', values: [8, 19, 26, 30, 17] },
];

// --- Key takeaways / editor's commentary --------------------------------------
export const takeaways = [
  {
    heading: 'Solo is the default now',
    delta: '+6 pts',
    deltaUp: true,
    body: 'For the first time, “just me” is an outright majority of how respondents describe their team — 43%, up from 37% last year. The indie web in 2025 is overwhelmingly one person at a desk, which colors every other answer in this report: the pain points are personal, the budgets are small, and “it has to be boring and reliable” keeps winning.',
  },
  {
    heading: 'The framework pendulum is mid-swing',
    delta: 'React −4 pts',
    deltaUp: false,
    body: 'React is still the most-used tool by a mile, but its satisfaction (61%) trails the field, and Next.js sits dead last at 58%. Meanwhile Astro, Svelte, and HTMX top the satisfaction chart and “Vanilla JS — no framework” jumped to 44% usage. People aren’t abandoning frameworks; they’re reaching for lighter ones, and reaching for them later.',
  },
  {
    heading: 'Hosting got a static-first wave',
    delta: 'Cloudflare +7 pts',
    deltaUp: true,
    body: 'Cloudflare Pages was the biggest mover, and a cluster of newer static hosts — including first-year entrant Spacefast at 18% — pulled share away from the incumbents. The throughline in the write-in comments: “I want to push files and get a URL, not configure a platform.”',
  },
  {
    heading: 'The mood is tired but optimistic',
    delta: '77% agree it’s easier',
    deltaUp: true,
    body: 'Two truths sit side by side. 68% agree shipping a side project has never been easier — and 77% agree that keeping up with the ecosystem is exhausting. The indie web feels more capable and more burned out at the same time. If there’s one editorial wish for 2026, it’s tools that ask less of the person using them.',
  },
];

// --- Appendix: full respondent counts -----------------------------------------
export const appendix = [
  {
    title: 'Years building for the web',
    note: 'single choice',
    rows: experience.bars.map((b) => ({ label: b.label, count: b.value })),
  },
  {
    title: 'Team size',
    note: 'single choice',
    rows: companySize.slices.map((s) => ({ label: s.label, count: s.value })),
  },
  {
    title: 'Primary role',
    note: 'single choice',
    rows: role.slices.map((s) => ({ label: s.label, count: s.value })),
  },
  {
    title: 'Country',
    note: 'top responses',
    rows: countries.bars.map((b) => ({ label: b.label, count: b.value })),
  },
  {
    title: 'Biggest pain points',
    note: 'pick up to 3 — votes, not respondents',
    rows: painPoints.map((p) => ({ label: p.label, count: p.votes })),
  },
];
