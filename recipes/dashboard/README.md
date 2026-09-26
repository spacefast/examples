# Brightside Coffee — Growth Dashboard

A single-screen "wall TV" growth dashboard for a fictional DTC specialty-coffee
subscription brand, built as a self-contained static site — one `index.html`, a
stylesheet, and one vanilla-JS file, no build step and no framework. A small seeded
data model drives live KPI tiles (revenue today, revenue MTD vs. a monthly target,
orders, average order value, and conversion rate, each with a sparkline and an
up/down delta), a 30-day revenue trend with a 7-day moving-average line, a traffic-by-
source donut, a top-products table with revenue bars and real photo thumbnails, a
marketing-channel ROAS leaderboard, and an email-list growth panel. Everything is
inline SVG, the board auto-refreshes every few seconds with subtly animated counting
numbers and a ticking "last updated" stamp, and it's mobile-first and accessible
(skip link, semantic regions, tabular figures, good contrast, and `prefers-reduced-
motion` support). Built from `prompt.md` and published to Spacefast — see `meta.json`
for the live link.
