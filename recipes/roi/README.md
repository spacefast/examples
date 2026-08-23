# Beacon ROI Calculator

A B2B ROI / lead-gen calculator landing page for a fictional AI customer-support tool
("Beacon"), built as a no-build-step vanilla-JS app (`site/index.html` plus a CSS and
JS file). A visitor enters three numbers about their support desk — current monthly
spend, team size, and ticket volume — and a live results panel recomputes on every
keystroke or slider drag: net annual savings, net monthly savings, agent hours
reclaimed, payback period, and a return multiple. Two inline-SVG charts (a before/after
monthly-cost bar comparison and a 12-month cumulative-savings area chart) animate as the
numbers change. The page closes with a gated "email me the report" CTA that validates the
work email and shows a friendly success state echoing the visitor's computed savings.

The math is transparent and defensible (deflection rate and per-seat price are shown
beside the inputs, with a "reset to a typical mid-market desk" link), inputs are clamped
to sane ranges, and currency is formatted with `Intl.NumberFormat`. It's responsive,
accessible (labelled fields, `aria-live` results, keyboard-operable sliders, reduced-
motion support), and uses real images with `onerror` fallbacks.

`prompt.md` is the copy-paste prompt that recreates this site from a few answers about
your own product and publishes it live to Spacefast.

## Files

- `site/index.html` — markup for the whole page
- `site/assets/styles.css` — styles (light slate, indigo→violet brand, emerald savings accent)
- `site/assets/app.js` — live computation, animated SVG charts, and the lead form
- `prompt.md` — the build-it-yourself prompt
- `meta.json` — gallery metadata
