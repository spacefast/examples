# Lumen Analytics — FY2025 Revenue Review

An interactive end-of-year revenue review for a fictional Series B analytics SaaS,
built as a self-contained Vite + React app with no chart libraries — every visual is
inline SVG or CSS. It walks a board audience from the headline KPIs (ARR, net revenue
retention, gross logo churn, ACV, CAC payback) through an ARR bridge waterfall that
actually sums, monthly MRR movement, a cohort retention heatmap, the revenue mix by
plan tier and segment, a churn breakdown with a logos-at-risk table, and a FY2026
forecast you can flip between base, bull, and bear scenarios. The numbers are
illustrative but internally reconciled, so it doubles as a template a real finance lead
can fork and repopulate. See `prompt.md` to build your own; the source lives in `site/`.
