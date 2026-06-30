# Margins

A writing and dev blog for a fictional frontend engineer (Mara Ellison), built as
a real, minimal **Astro** project using Markdown content collections. The
homepage is a tagged, reverse-chronological post index; article pages use
reading-first typography with Shiki-highlighted code blocks and previous/next
navigation; there's an all-tags index plus a page per tag, an about page, and an
RSS 2.0 feed at `/rss.xml` that feed readers auto-discover from the document
head. A header toggle switches between a warm-paper light theme and a calm ink
dark theme, persisted in `localStorage` and applied before first paint. Ships
with six real posts (a mix of essays and code-heavy pieces — a 40-line state
machine, framework-proof CSS, the `<details>` element, page weight, Markdown,
and yak-free static deploys).

The site lives in [`site/`](./site/) and builds with `bun install && bun run
build` to a fully static `dist/` (no SSR, no adapter, nothing at request time
beyond `astro build`). `prompt.md` is the copy-paste prompt that recreates the
whole site from a few answers and publishes it live to Spacefast.

## Build

```bash
cd site
bun install
bun run build   # → dist/
```
