// FY2025 Revenue Review — Lumen Analytics
// All figures are illustrative but internally reconciled: the ARR bridge sums,
// the MRR movement months sum to the net ARR change, and the tier/segment splits
// each total to ending ARR. See the assertions at the bottom of this file.

export const company = {
  name: "Lumen Analytics",
  product: "product analytics for B2B software teams",
  fiscalYear: "FY2025",
  period: "January 1 – December 31, 2025",
  preparedBy: "Priya Nadkarni",
  preparedByTitle: "VP of Finance",
  preparedByPhoto:
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=240&h=240&q=80",
  heroImage:
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&h=900&q=80",
  reviewedAt: "January 14, 2026",
  confidentiality: "Board materials · Confidential",
};

// ── Executive summary KPIs ────────────────────────────────────────────────
export const kpis = [
  {
    label: "Ending ARR",
    value: 14_200_000,
    format: "currencyM",
    delta: 0.29,
    deltaLabel: "+29% YoY",
    good: true,
    note: "Up from $11.0M at the start of the year",
  },
  {
    label: "Net Revenue Retention",
    value: 1.12,
    format: "pct",
    delta: 0.03,
    deltaLabel: "+3 pts YoY",
    good: true,
    note: "Expansion outran contraction + churn",
  },
  {
    label: "Gross Logo Churn",
    value: 0.064,
    format: "pct",
    delta: -0.011,
    deltaLabel: "−1.1 pts YoY",
    good: true,
    note: "49 of 772 accounts did not renew",
  },
  {
    label: "Blended ACV",
    value: 18_400,
    format: "currency0",
    delta: 0.08,
    deltaLabel: "+8% YoY",
    good: true,
    note: "Mix shift toward Growth & Enterprise",
  },
  {
    label: "CAC Payback",
    value: 14,
    format: "months",
    delta: -2,
    deltaLabel: "−2 mo YoY",
    good: true,
    note: "Sales efficiency improving",
  },
];

// ── ARR bridge / waterfall ────────────────────────────────────────────────
// Starting + New + Expansion − Contraction − Churned = Ending
export const arrBridge = {
  startingArr: 11_000_000,
  steps: [
    { label: "Starting ARR", kind: "total", value: 11_000_000 },
    { label: "New", kind: "up", value: 1_880_000 },
    { label: "Expansion", kind: "up", value: 2_400_000 },
    { label: "Contraction", kind: "down", value: -600_000 },
    { label: "Churned", kind: "down", value: -480_000 },
    { label: "Ending ARR", kind: "total", value: 14_200_000 },
  ],
};

// ── MRR movement by month (dollars of MRR added/lost) ─────────────────────
// Net of all 12 months = +$266K MRR = the ending − starting ARR change / 12.
export const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const mrrMovement = {
  // values in dollars of MRR
  new: [10, 11, 9, 13, 14, 12, 15, 16, 13, 14, 16, 13].map((v) => v * 1000),
  expansion: [14, 15, 13, 16, 18, 15, 17, 19, 16, 18, 21, 18].map((v) => v * 1000),
  contraction: [4, 5, 3, 4, 5, 4, 4, 5, 3, 4, 5, 4].map((v) => -v * 1000),
  churned: [3, 4, 2, 3, 4, 3, 3, 4, 3, 3, 4, 4].map((v) => -v * 1000),
};

// ── Cohort net-revenue-retention heatmap ──────────────────────────────────
// Rows = signup cohort, columns = months since signup. Values are % of cohort's
// month-0 ARR retained (expansion can push a strong cohort above 100%).
export const cohorts = [
  { label: "2024-07", values: [100, 98, 97, 99, 101, 103, 104, 106, 105, 107, 109, 111] },
  { label: "2024-08", values: [100, 99, 97, 98, 100, 102, 101, 103, 104, 106, 108] },
  { label: "2024-09", values: [100, 97, 95, 96, 98, 99, 101, 102, 103, 105] },
  { label: "2024-10", values: [100, 98, 96, 97, 99, 100, 102, 103, 104] },
  { label: "2024-11", values: [100, 96, 93, 92, 94, 95, 96, 97] },
  { label: "2024-12", values: [100, 99, 98, 99, 101, 102, 103] },
  { label: "2025-01", values: [100, 98, 97, 98, 100, 101] },
  { label: "2025-02", values: [100, 97, 96, 97, 99] },
  { label: "2025-03", values: [100, 99, 98, 100] },
  { label: "2025-04", values: [100, 98, 97] },
  { label: "2025-05", values: [100, 99] },
  { label: "2025-06", values: [100] },
];
export const cohortMaxMonths = 12;

// ── Revenue by plan tier ──────────────────────────────────────────────────
export const tiers = [
  { label: "Starter", arr: 1_700_000, customers: 410, color: "var(--c-blue)" },
  { label: "Growth", arr: 6_100_000, customers: 280, color: "var(--c-violet)" },
  { label: "Enterprise", arr: 6_400_000, customers: 82, color: "var(--c-green)" },
];

// ── Revenue by customer segment ───────────────────────────────────────────
export const segments = [
  { label: "SMB", arr: 2_600_000, customers: 520, color: "var(--c-blue)" },
  { label: "Mid-Market", arr: 5_400_000, customers: 198, color: "var(--c-violet)" },
  { label: "Enterprise", arr: 6_200_000, customers: 54, color: "var(--c-green)" },
];

// ── Churn analysis ────────────────────────────────────────────────────────
export const churnReasons = [
  { reason: "Switched to in-house / competitor", share: 0.31 },
  { reason: "Budget cuts / cost", share: 0.24 },
  { reason: "Low usage / weak adoption", share: 0.19 },
  { reason: "Missing features", share: 0.14 },
  { reason: "Shut down / acquired", share: 0.08 },
  { reason: "Other", share: 0.04 },
];

export const atRisk = [
  { account: "Vireo Health Systems", segment: "Enterprise", arr: 204_000, health: 47, renews: "2026-02-28", reason: "Stalled rollout, low adoption" },
  { account: "Brightwave Media", segment: "Enterprise", arr: 156_000, health: 44, renews: "2026-03-01", reason: "Evaluating an in-house build" },
  { account: "Northwind Logistics", segment: "Mid-Market", arr: 84_000, health: 38, renews: "2026-02-14", reason: "Champion left; usage −40% QoQ" },
  { account: "Hammond Retail Group", segment: "Mid-Market", arr: 73_000, health: 49, renews: "2026-03-20", reason: "Executive sponsor reorg" },
  { account: "Cobalt Freight", segment: "Mid-Market", arr: 61_000, health: 51, renews: "2026-04-09", reason: "Pricing pushback at renewal" },
  { account: "Pelican Audio", segment: "SMB", arr: 12_000, health: 29, renews: "2026-01-22", reason: "Seat reduction, budget freeze" },
  { account: "Lattice & Co.", segment: "SMB", arr: 9_000, health: 33, renews: "2026-01-15", reason: "No logins in 60 days" },
];

// ── FY2026 forecast scenarios (quarterly ending ARR, $) ───────────────────
export const forecastQuarters = ["Q4 2025", "Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026"];
export const scenarios = {
  base: {
    label: "Base",
    blurb: "NRR holds at 112%, new-logo ARR grows 18% YoY, CAC payback steady at 14 months.",
    endingArr: 18_200_000,
    growth: 0.28,
    arr: [14_200_000, 15_100_000, 16_100_000, 17_100_000, 18_200_000],
    assumptions: [
      ["Net revenue retention", "112%"],
      ["New-logo ARR growth", "+18% YoY"],
      ["CAC payback", "14 months"],
    ],
  },
  bull: {
    label: "Bull",
    blurb: "Two enterprise expansions land, NRR climbs to 118%, and the new outbound motion ramps.",
    endingArr: 20_200_000,
    growth: 0.42,
    arr: [14_200_000, 15_500_000, 17_000_000, 18_500_000, 20_200_000],
    assumptions: [
      ["Net revenue retention", "118%"],
      ["New-logo ARR growth", "+35% YoY"],
      ["CAC payback", "12 months"],
    ],
  },
  bear: {
    label: "Bear",
    blurb: "One large logo churns, NRR slips to 104%, and new-logo bookings stay flat into H2.",
    endingArr: 16_300_000,
    growth: 0.15,
    arr: [14_200_000, 14_700_000, 15_200_000, 15_700_000, 16_300_000],
    assumptions: [
      ["Net revenue retention", "104%"],
      ["New-logo ARR growth", "Flat YoY"],
      ["CAC payback", "17 months"],
    ],
  },
};

// ── Self-check: fail loudly in dev if the numbers stop reconciling ────────
if (import.meta.env?.DEV) {
  const bridgeEnd = arrBridge.steps
    .filter((s) => s.kind !== "total")
    .reduce((a, s) => a + s.value, arrBridge.startingArr);
  console.assert(bridgeEnd === 14_200_000, "ARR bridge must end at $14.2M, got", bridgeEnd);

  const tierTotal = tiers.reduce((a, t) => a + t.arr, 0);
  console.assert(tierTotal === 14_200_000, "Tier ARR must total $14.2M, got", tierTotal);

  const segTotal = segments.reduce((a, s) => a + s.arr, 0);
  console.assert(segTotal === 14_200_000, "Segment ARR must total $14.2M, got", segTotal);

  const netMrr =
    sum(mrrMovement.new) +
    sum(mrrMovement.expansion) +
    sum(mrrMovement.contraction) +
    sum(mrrMovement.churned);
  console.assert(netMrr === 266_000, "Net MRR movement must be +$266K, got", netMrr);

  const churnSum = churnReasons.reduce((a, r) => a + r.share, 0);
  console.assert(Math.abs(churnSum - 1) < 1e-9, "Churn reasons must sum to 100%, got", churnSum);
}

function sum(a) {
  return a.reduce((x, y) => x + y, 0);
}
