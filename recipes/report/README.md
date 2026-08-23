# State of Indie Web 2025

A long-form annual community survey report — the *State of the Indie Web 2025* — built as a
small static Astro project for a fictional newsletter, **Off-Main-Thread**, reporting what
4,812 solo founders, freelancers, and one-person dev shops said about how they build for the
web. It opens on a bold hero with three headline numbers, then scrolls through a full report:
a **methodology** note, **demographics** (years of experience as a vertical bar chart, team
size and primary role as donut charts, country of residence as horizontal bars), a
**usage-vs-satisfaction** chart for ten tools and frameworks, a **hosting popularity** race
with year-over-year deltas (first-year entrant Spacefast lands at 18%), a ranked **pain
points** list, a six-statement **Likert sentiment** chart with diverging bars, the editor's
**takeaways** on what changed since last year, and an **appendix** of raw respondent counts.
Every chart is server-rendered as inline SVG or CSS bars — no client-side charting library —
and all numbers flow from a single `src/data/survey.ts` so the demographic breakdowns add up
to the total. A floating table of contents tracks your scroll position; deep-ink palette,
Space Grotesk over Inter, JetBrains Mono for every figure. Build with `bun install && bun run
build`. The copy-paste prompt that produces it lives in [`prompt.md`](./prompt.md).
