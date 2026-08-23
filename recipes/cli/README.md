# Drift

A homepage for a fictional open-source developer tool — *Drift*, a type-safe
database-migration CLI ("Database migrations that never drift.") — built as a small static
**Astro** project. It opens on a dark, grid-lined hero whose centerpiece is a working
**copy-to-clipboard install command** (`npm i -D drift-cli`, with a Copy button that flips
to "Copied ✓" and a clipboard fallback), backed by a live-looking GitHub star badge and a
row of supported databases. From there it walks the dev-tool genre end to end: a
**syntax-highlighted** quick-start terminal block plus a side-by-side "schema → generated
migration" pair (highlighted at build time with Astro's Shiki `<Code>`, zero runtime JS), a
six-card feature grid, a connect → generate → apply how-it-works flow, a benchmark band with
horizontal comparison bars and a customer testimonial, a "used by" logo wall, GitHub/Discord/
Contributing cards, docs link cards, and a four-column footer. Teal-and-violet on near-black,
Space Grotesk over Inter with JetBrains Mono for code, and every word, command, feature, and
benchmark row driven from a single `src/data/site.ts`. Build with `bun install && bun run
build`. The copy-paste prompt that produces it lives in [`prompt.md`](./prompt.md).
