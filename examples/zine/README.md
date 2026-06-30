# OFFCUTS №01 — Night Bloom

A scrollable, art-directed web zine built as a single self-contained `site/index.html`
with no build step. It's a fictional risograph art-and-writing issue — "Night Bloom",
about the city after dark — laid out as seven full-viewport magazine spreads: a display-type
cover, an editor's letter with a drop-cap, an asymmetric photo essay ("After Hours"), a
full-bleed poem ("Sodium"), an interview with a neon-sign restorer ("The Neon Doctor"), a
field-notes card collage ("Specimens of the Dark"), and a colophon. The riso look is rendered
live in the browser — film-grain and halftone overlays, three fluorescent spot inks over a
black key plate, deliberately misregistered headline shadows, and photos duotoned with CSS
blend modes so random images read as one cohesive printed issue. A running header doubles as a
version tag (№01 · v1.0) with a scroll-driven spread counter, and the colophon frames each
issue as a permanent version — a nod to how Spacefast keeps every publish at its own URL. The
newsletter signup validates input, confirms friendlily, and remembers returning readers via
localStorage. `prompt.md` is the copy-paste prompt that recreates the zine from a few answers
and publishes it live to Spacefast.
