# Tap-through

The mobile landing a printed QR code points to — built here as **Northbound Coffee
Roasters'** scan-to-reorder page for a bag of Cascadia Blend. It is a no-build-step
static site (`site/index.html` plus a CSS and JS file) designed phone-first: a pinned
brand header, a "you scanned the tag on your bag" intro, one featured product card with
tasting-note chips and a **tap-to-copy promo code**, a single primary "Reorder — 20%
off" call-to-action, a list of big-tap-target secondary links (brew guide, story, cafe,
Instagram, wholesale), and a **self-rendered QR code** that the page draws client-side
from its own URL so anyone can re-share the link, plus a copy-link button. Copy actions
write to the clipboard and confirm with a toast; images carry `alt` text and a picsum
fallback. `prompt.md` is the copy-paste prompt that recreates the site for any brand
from a few answers and publishes it live to Spacefast.
