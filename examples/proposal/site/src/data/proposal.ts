// ---------------------------------------------------------------------------
// Single source of truth for the proposal. Every section on the page reads from
// here, so swapping in a real client, scope, timeline, and pricing is a matter
// of editing this one file — nothing in the markup is hard-coded.
// ---------------------------------------------------------------------------

export const meta = {
  proposalNo: 'PRO-2026-0488',
  preparedFor: 'Acme Co.',
  preparedForContact: 'Dana Whitfield, VP of Marketing',
  preparedBy: 'Meridian & Co.',
  preparedByTagline: 'Brand & website studio',
  project: 'Brand & Website Refresh',
  date: 'June 30, 2026',
  validUntil: 'July 31, 2026',
  // Hero / cover imagery
  heroImage:
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80',
  heroImageAlt:
    'Two people shaking hands across a meeting table after agreeing on a project',
  contactEmail: 'studio@meridianand.co',
  contactPhone: '+1 (415) 555-0188',
  website: 'meridianand.co',
};

// A one-paragraph framing note that opens the proposal, in the studio's voice.
export const intro = {
  greeting: `Dear Dana,`,
  body: `Thank you for inviting Meridian & Co. to reimagine the Acme Co. brand and
website. Over the past few weeks we've studied your category, your competitors,
and the way your customers actually shop — and we're convinced the opportunity is
bigger than a coat of paint. This proposal lays out exactly what we'll do, when
we'll do it, and what it costs, so you can say yes with total confidence. We'd be
proud to build the next chapter of Acme with you.`,
  signoff: `Warmly,`,
  signature: 'Priya Menon',
  signatureRole: 'Founder & Creative Director, Meridian & Co.',
};

// Three headline outcomes shown on the cover.
export const outcomes = [
  {
    stat: '14 wks',
    label: 'From kickoff to a live, fully launched site',
  },
  {
    stat: '1 system',
    label: 'A brand & component library your team owns forever',
  },
  {
    stat: '+38%',
    label: 'Projected lift in qualified leads, based on comparable rebrands',
  },
];

// Scope of work — grouped by workstream, each with concrete deliverables.
export const scope = [
  {
    title: 'Brand identity',
    summary:
      'A confident, modern identity that finally looks like the category leader Acme already is.',
    items: [
      'Logo system — primary mark, monogram, and responsive lockups',
      'Color palette, typography scale, and an iconography set',
      'Voice & tone guide with messaging pillars and example copy',
      'A 40-page brand guidelines PDF your whole team can use',
    ],
  },
  {
    title: 'Website design',
    summary:
      'A 12-page marketing site designed mobile-first, from the homepage down to the smallest empty state.',
    items: [
      'Sitemap, wireframes, and two homepage design directions',
      'High-fidelity designs for all 12 pages, desktop and mobile',
      'A reusable component & design-token library in Figma',
      'Accessibility pass to WCAG 2.2 AA contrast and focus standards',
    ],
  },
  {
    title: 'Build & launch',
    summary:
      'We build the site on a fast static stack and ship it — no hand-off-and-pray.',
    items: [
      'Production build with a CMS your marketing team can edit',
      'Analytics, SEO metadata, sitemap, and 301 redirect mapping',
      'Performance budget: sub-1.5s loads and 95+ Lighthouse scores',
      'Launch day support and a 30-day post-launch warranty',
    ],
  },
  {
    title: 'Enablement',
    summary:
      'You leave the engagement able to run the brand and the site without us.',
    items: [
      'Two live training sessions for your marketing team (recorded)',
      'A Loom library covering every common edit and publish flow',
      'A 30-day Slack channel for questions after launch',
    ],
  },
];

// Project timeline — five phases. `week` is the start week; `span` is duration.
export const timeline = [
  {
    phase: 'Phase 1',
    title: 'Discovery & strategy',
    weeks: 'Weeks 1–2',
    blurb:
      'Stakeholder interviews, a competitive audit, and a written strategy brief we both sign off on before any pixels move.',
    milestone: 'Strategy brief approved',
  },
  {
    phase: 'Phase 2',
    title: 'Brand identity',
    weeks: 'Weeks 3–5',
    blurb:
      'Two identity directions, one round of refinement, and a finished brand system delivered as guidelines plus working files.',
    milestone: 'Brand system delivered',
  },
  {
    phase: 'Phase 3',
    title: 'Website design',
    weeks: 'Weeks 5–9',
    blurb:
      'Wireframes to high-fidelity designs for all 12 pages, reviewed in weekly working sessions so there are no big surprises.',
    milestone: 'All pages approved',
  },
  {
    phase: 'Phase 4',
    title: 'Build & integrate',
    weeks: 'Weeks 9–13',
    blurb:
      'We build the site, wire up the CMS, migrate content, and put everything through QA on real devices.',
    milestone: 'Staging site ready for review',
  },
  {
    phase: 'Phase 5',
    title: 'Launch & handoff',
    weeks: 'Weeks 13–14',
    blurb:
      'Final QA, go-live, performance verification, and two training sessions that leave your team fully in control.',
    milestone: '🎉 Live & handed off',
  },
];

// Pricing tiers. `recommended` highlights the middle option; the Accept section
// reads `id`, `name`, and `price` to build the agreement summary.
export const tiers = [
  {
    id: 'essential',
    name: 'Essential',
    price: 18000,
    cadence: 'fixed project fee',
    tagline: 'A focused refresh to get you looking sharp, fast.',
    features: [
      'Brand identity refresh',
      '6-page website',
      'CMS for blog & landing pages',
      '1 training session',
      '30-day warranty',
    ],
    excludes: ['Full brand guidelines book', 'Ongoing retainer'],
    recommended: false,
  },
  {
    id: 'signature',
    name: 'Signature',
    price: 32000,
    cadence: 'fixed project fee',
    tagline: 'The complete rebrand and site, built to scale.',
    features: [
      'Full brand identity system',
      '40-page brand guidelines book',
      '12-page website + design system',
      'Editable CMS for the whole site',
      '2 training sessions + Loom library',
    ],
    excludes: [],
    recommended: true,
  },
  {
    id: 'partner',
    name: 'Partner',
    price: 54000,
    cadence: 'project + 3-month retainer',
    tagline: 'Everything, plus a team in your corner after launch.',
    features: [
      'Everything in Signature',
      '3-month post-launch retainer',
      'Monthly design & growth sessions',
      'Priority Slack support',
      'Quarterly performance reporting',
    ],
    excludes: [],
    recommended: false,
  },
];

// Terms shown above the signature block.
export const terms = [
  'A 40% deposit is due on acceptance; 30% at the brand milestone; 30% on launch.',
  'The fee covers two rounds of revisions per deliverable; further rounds are billed at $180/hr.',
  'Timeline assumes feedback within 3 business days at each review gate.',
  'Acme Co. owns all final deliverables and source files on final payment.',
];

export const faqs = [
  {
    q: 'What do you need from us to start?',
    a: 'A single point of contact for approvals, access to your current analytics and brand assets, and roughly two hours a week of review time at the gates.',
  },
  {
    q: 'What if our timeline slips?',
    a: 'Phases are gated by your approvals, so the schedule flexes with your feedback. We re-baseline the launch date together whenever a gate moves.',
  },
  {
    q: 'Can we change tiers later?',
    a: "Yes — you can upgrade from Essential to Signature mid-project and we'll credit the difference. Downgrades aren't possible once a phase is underway.",
  },
  {
    q: 'Who owns the work?',
    a: 'You do. On final payment, every source file, design token, and line of code is yours, with no lock-in to us or any platform.',
  },
];
