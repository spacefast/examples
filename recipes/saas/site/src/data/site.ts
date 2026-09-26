// All marketing copy lives here so the page template stays clean.
// Realistic, specific content — no placeholders.

export const site = {
  name: "Tideline",
  tagline: "Plan, track, and ship product work in one place.",
  sub: "Tideline is the issue tracker built for the way product and engineering teams actually work — fast, keyboard-first, and opinionated about getting things shipped.",
  domain: "tideline.app",
};

export const nav = [
  { label: "Product", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#customers" },
  { label: "Docs", href: "#faq" },
];

// "Trusted by" — invented but plausible companies.
export const logos = [
  "Northwind",
  "Cobalt",
  "Hearthware",
  "Paperwing",
  "Driftwood",
  "Kestrel",
  "Loomly",
  "Fathom",
];

export const features = [
  {
    id: "issues",
    eyebrow: "Issues",
    title: "Issues that keep up with your team",
    body: "Create an issue in two keystrokes, triage a backlog without ever touching the mouse, and watch updates sync across every screen in real time. No spinners, no save buttons.",
    points: [
      "Sub-50ms interactions, even on a 5,000-issue project",
      "Command bar for everything — assign, label, move, link",
      "Automatic backlog grooming with smart priority signals",
    ],
    mock: "issues",
    align: "left",
  },
  {
    id: "cycles",
    eyebrow: "Cycles",
    title: "Sprints that plan themselves",
    body: "Tideline rolls work into weekly cycles automatically. Unfinished issues carry over, scope is tracked as it changes, and the burndown updates the moment someone closes a ticket.",
    points: [
      "Auto-rollover keeps cycles honest about real velocity",
      "Live burndown and scope-change tracking",
      "Per-team cadence — weekly, biweekly, or custom",
    ],
    mock: "cycle",
    align: "right",
  },
  {
    id: "roadmap",
    eyebrow: "Roadmap",
    title: "A roadmap that tells the truth",
    body: "Projects roll up from the issues underneath them, so your roadmap reflects reality instead of a stale slide. Share a public view with stakeholders and stop fielding 'is it done yet?' pings.",
    points: [
      "Progress derived from real issue completion",
      "Quarter and initiative grouping for leadership",
      "Read-only share links for partners and execs",
    ],
    mock: "roadmap",
    align: "left",
  },
  {
    id: "flow",
    eyebrow: "Built for flow",
    title: "Keyboard-driven from the first pixel",
    body: "Every action in Tideline has a shortcut, and the command menu surfaces the rest. Your hands never leave the keyboard, so planning feels less like admin and more like thinking out loud.",
    points: [
      "Global command menu — ⌘K from anywhere",
      "Vim-style navigation and bulk edits",
      "Offline-ready desktop app for Mac, Windows & Linux",
    ],
    mock: "flow",
    align: "right",
  },
];

export const stats = [
  { value: "30%", label: "faster cycle times after switching" },
  { value: "12k+", label: "teams plan their week in Tideline" },
  { value: "<50ms", label: "median interaction latency" },
  { value: "99.99%", label: "uptime across the last 12 months" },
];

export const testimonials = [
  {
    quote:
      "We cut our average issue-to-ship time by a third in the first quarter. The keyboard workflow alone paid for the whole seat cost — our engineers stopped dreading the tracker.",
    name: "Priya Raman",
    role: "VP Engineering, Northwind",
    avatar: "https://picsum.photos/seed/tideline-priya/96/96",
  },
  {
    quote:
      "Cycles finally gave our team a planning rhythm that sticks. The auto-rollover means our velocity numbers aren't fiction anymore, and standup takes half the time.",
    name: "Marcus Bell",
    role: "Head of Product, Cobalt",
    avatar: "https://picsum.photos/seed/tideline-marcus/96/96",
  },
  {
    quote:
      "The roadmap is the first one our leadership actually trusts, because the progress bars come straight from closed issues. No more guessing in the Monday sync.",
    name: "Hana Okafor",
    role: "Director of PM, Hearthware",
    avatar: "https://picsum.photos/seed/tideline-hana/96/96",
  },
];

export const pricing = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "For small teams getting their first workflow in place.",
    cta: "Start free",
    ctaStyle: "ghost",
    featured: false,
    features: [
      "Up to 10 members",
      "Unlimited issues & 2 teams",
      "Cycles and basic roadmap",
      "Command menu & shortcuts",
      "GitHub & Slack integrations",
    ],
  },
  {
    name: "Team",
    price: "$9",
    cadence: "per user / month",
    blurb: "For growing product orgs that live in the tracker all day.",
    cta: "Start 14-day trial",
    ctaStyle: "grad",
    featured: true,
    features: [
      "Everything in Free, plus —",
      "Unlimited teams & members",
      "Roadmaps, initiatives & share links",
      "Triage rules & automations",
      "SLAs, custom views & insights",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "talk to us",
    blurb: "For larger companies with security and scale requirements.",
    cta: "Contact sales",
    ctaStyle: "ghost",
    featured: false,
    features: [
      "Everything in Team, plus —",
      "SAML SSO & SCIM provisioning",
      "Advanced audit log & data residency",
      "Dedicated success manager",
      "Custom contract & invoicing",
      "99.99% uptime SLA",
    ],
  },
];

export const faqs = [
  {
    q: "How is Tideline different from the tracker we already use?",
    a: "Most trackers are configurable to a fault and slow as a result. Tideline is opinionated: an issue, a cycle, and a roadmap, all keyboard-driven and instant. Teams switch because planning stops feeling like data entry.",
  },
  {
    q: "Can we import our existing issues?",
    a: "Yes. Tideline imports from Jira, GitHub Issues, Linear, Asana, and CSV. The importer maps statuses, labels, and assignees automatically, and you can preview the result before committing.",
  },
  {
    q: "Does it work offline?",
    a: "The desktop apps for Mac, Windows, and Linux are offline-ready. Create and edit issues on a plane; everything syncs the moment you reconnect, with conflict-free merging.",
  },
  {
    q: "What integrations are supported?",
    a: "GitHub, GitLab, Slack, Figma, Sentry, and Zapier ship in the box, plus a full REST and webhook API on every paid plan. Pull requests link to issues automatically and move them across your workflow.",
  },
  {
    q: "How does pricing work for contractors or part-time members?",
    a: "You're only billed for active members in a given month. Guests with read-only access — like execs watching a roadmap — are always free.",
  },
  {
    q: "Is my data secure?",
    a: "Tideline is SOC 2 Type II certified, encrypts data in transit and at rest, and offers SAML SSO, SCIM, and audit logs on Enterprise. Data residency in the EU is available on request.",
  },
];

export const footer = {
  columns: [
    {
      title: "Product",
      links: ["Issues", "Cycles", "Roadmap", "Integrations", "Changelog", "Download"],
    },
    {
      title: "Company",
      links: ["About", "Customers", "Careers", "Blog", "Brand"],
    },
    {
      title: "Resources",
      links: ["Documentation", "API reference", "Status", "Security", "Community"],
    },
  ],
};
