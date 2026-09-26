# Glasshouse

A warm, greenhouse-themed **digital garden** — a personal site of interlinked notes
that grow over time — built as a real Astro project (`site/`) that compiles to
static HTML with no server or database.

Notes live as Markdown files in `site/src/content/notes/` (an Astro content
collection). Each carries a growth status (🌱 planted / 🌿 growing / 🌲 evergreen),
a planted date, a last-tended date, and a summary. Inside the prose, references to
other notes use `[[wiki link]]` syntax:

- A small **remark plugin** (`site/src/lib/remark-wikilinks.mjs`) rewrites
  `[[Evergreen notes]]` and `[[Atomic notes|small notes]]` into real internal links
  at build time.
- `site/src/lib/garden.ts` walks every note to compute the reverse direction — the
  **backlinks** ("Linked from") panel on each page — and to run a tiny deterministic
  **force-directed layout** so the home page ships a real knowledge **graph** as
  static SVG (the browser only does hover highlighting).
- The home page also has an instant **client-side search** (titles, summaries, and
  body text; `/` to focus, `Esc` to dismiss) and a full **index** grouped by status.

The garden's example content is a meta digital garden — ten linked notes on
note-taking, memory, and tending ideas (evergreen notes, atomic notes, the
Zettelkasten, spaced repetition, learning in public, and so on).

## Run it

```bash
cd site
bun install
bun run dev      # local dev server
bun run build    # static output in site/dist/
```

`prompt.md` is the copy-paste prompt that recreates this site, personalised to your
own topic and starter notes, and publishes it live to Spacefast.
