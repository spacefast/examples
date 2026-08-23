# Proposal for Acme Co.

A personalized client **sales proposal** page, built as a small static Astro project for a
fictional brand-and-website studio, **Meridian & Co.**, pitching a *Brand & Website Refresh*
to **Acme Co.** It opens on a dark navy cover that reads "Prepared for Acme Co." over a dimmed
handshake photo, with the project title set in Fraunces, the proposal number and validity dates
in mono, and three headline outcome cards (14 weeks to launch, one brand system, +38% projected
leads). From there it scrolls through a real proposal: a signed **intro letter**, a **scope of
work** grid of four workstreams each with a fixed-scope deliverable checklist, a **five-phase
gated timeline** with week ranges and end-of-phase milestones, three **selectable pricing tiers**
(Essential $18k / Signature $32k, recommended / Partner $54k), an **accept & sign** section, a
short **FAQ**, and a studio contact footer.

The interactive heart is the close: clicking a pricing tier selects it and live-updates the
agreement summary below — tier name, total, and a 40% deposit line all recompute — and the
accept form takes a full name, work email, and a typed e-signature that must match the name,
plus an "I agree" checkbox. On submit it validates, shows a "Thank you, Dana — accepted!" success
state with a signed receipt and a generated reference number, and persists the acceptance in
`localStorage` so it survives a refresh. A reading-progress bar tracks the top of the page;
sections reveal on scroll, with `prefers-reduced-motion` respected.

Everything lives in a single `src/data/proposal.ts`, so swapping in a real client, scope,
timeline, and pricing is a one-file edit — the markup just reads from it. The page is marked
`noindex` because a proposal isn't for search engines; pair it with a Spacefast space password
and only your client can open it. Palette: warm paper, deep navy ink, one amber accent; Fraunces
display over Inter, IBM Plex Mono for every figure.

## Build

```bash
cd site
bun install
bun run build      # emits site/dist/ — fully static, no SSR or adapters
```

The copy-paste prompt that reproduces this site (personalized by your own answers) lives in
[`prompt.md`](./prompt.md).
