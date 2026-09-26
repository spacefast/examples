# Driftfield

A self-contained generative art studio where thousands of particles drift through a
Perlin-noise flow field, layering translucent strokes into rich, marbled line work that
paints itself live on a full-bleed canvas. A glassy control panel drives it in real time
— six color palettes, three backdrops (deep ink, warm paper, soft dusk), and sliders for
density, flow speed, stroke weight, and field scale — alongside an auto-evolve toggle, a
"New piece" reseed, pause/clear, and one-click PNG export. The whole thing is seedable:
a tiny mulberry32 PRNG shuffles the noise permutation table so the same seed always
reproduces the same artwork, and the seed syncs to the URL hash, accepts pasted seeds,
and rides along in the export filename, while control settings persist to `localStorage`.
It ships as a no-build static site (`index.html` + `styles.css` + `field.js` + `app.js`,
zero dependencies), is mobile-first with a bottom-sheet panel and action dock, and is
keyboard-accessible (Space pause, R reseed, S save, C clear) with a `prefers-reduced-motion`
fallback.
