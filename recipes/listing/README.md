# 1428 Vista Del Mar

A single-property listing microsite for a fictional $4.295M coastal-contemporary home in
La Jolla, CA, built as a minimal Vite + React app. It pairs an editorial, coastal-luxury
look (ivory and ocean-ink with a brass accent, Cormorant Garamond over Inter) with the
stateful UI a real listing site needs: a full-screen photo gallery with a keyboard-driven
lightbox, a live mortgage estimator (sliders for price, down payment, and rate plus a
term toggle, with a P&I / tax / insurance breakdown), an interactive SVG floor plan with a
level switcher, a neighborhood panel, and a schedule-a-tour form that resolves to a
confirmation state. All content lives in `site/src/data.js` so it re-skins for any
property in minutes; nothing touches a backend. Build with `cd site && bun install && bun
run build`.
