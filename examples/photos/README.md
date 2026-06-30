# Eliot Vance Photography

A calm, image-first portfolio for a fictional landscape-and-travel photographer, built
as a small static Astro project. It opens on a full-bleed hero, then a **work index** of
four named series — *The Cold Coast* (Iceland), *Long Exposure* (the Oregon coast),
*In Studio* (black-and-white portraits), and *From Above* (desert aerials) — each on its
own `getStaticPaths`-generated `/series/<slug>` page with a CSS masonry grid and a
full-screen **lightbox** that is keyboard-navigable (click to open, ← → to page, `Esc`
to close, with caption and counter and neighbour preloading). It also carries an About
page (bio, headshot, client and press lists), a print-sizes teaser, and a client-side
**contact form** that validates and swaps to a warm, personalized confirmation. Warm
ivory-and-ink palette, Fraunces over Inter, every word and image driven from a single
`src/data/portfolio.ts`. Build with `bun install && bun run build`. The copy-paste prompt
that produces it lives in [`prompt.md`](./prompt.md).
