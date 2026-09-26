# Northwind Seed Deck

A presentable, browser-native investor pitch deck for a fictional seed-stage startup
(Northwind — "the control plane for internal operations"), built as a no-build-step
vanilla-JS app (`site/index.html` plus a CSS and JS file) on top of reveal.js loaded
from a CDN. It walks the classic seed structure — title, problem, solution, market,
traction, the ask, close — with bespoke data slides: a TAM/SAM/SOM concentric-ring
diagram, an MRR bar chart, KPI tiles, use-of-funds bars, and a policy-snippet "how a
write flows" slide. It ships speaker notes on every slide (press `S`), full keyboard
navigation, a `?` help overlay, and PDF export (press `E`). `prompt.md` is the
copy-paste prompt that recreates the deck from a few answers and publishes it live to
Spacefast.
