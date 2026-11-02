Build me a **long-form annual community survey report** — a scrollable “State of …”
write-up full of charts, rankings, and commentary, in the lineage of State of JS
and the Stack Overflow Developer Survey — as an **Astro site** (static, no SSR).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What community or audience is this survey for?
2. How many people responded, and when did the survey run?
3. What are the 3–4 headline questions or findings you want to feature?
4. What tools, platforms, or options should appear in the ranking charts?

**Then build a complete, polished, responsive report with:**

- A bold hero: the report title, a one-line summary, and three headline numbers
  (respondents, countries, days in the field), over a faint coworking photo.
- **Intro + methodology** — how many responded, how they were sampled, the dates
  the survey ran, and an honest note that the audience self-selects.
- **Demographics** — years of experience (vertical bar chart), team size and
  primary role (donut charts), and country of residence (horizontal bars).
- **Tools & frameworks** — a usage-vs-satisfaction chart: two bars per tool, one
  for “used it” and one for “would use again,” sorted by satisfaction.
- **Hosting & deployment popularity** — a horizontal bar “race” with a
  year-over-year delta chip next to each platform, and a “new this year” badge.
- **Biggest pain points** — a ranked list with vote counts and bars (respondents
  could pick up to three).
- **Sentiment** — a set of agree/disagree statements as a five-point Likert
  diverging-bar chart, fanning out from a shared centre line.
- **Key takeaways** — the editor’s commentary on what changed since last year,
  each with a small up/down delta.
- **Appendix** — full respondent-count tables behind every chart, plus a
  “share this report” footer.

**Design & content notes:**

- Dark, editorial “survey results” aesthetic: deep ink background, a curated
  multi-color chart palette, a characterful display font for headings over a clean
  reading sans, and a monospace for every number on the page. A floating
  table-of-contents that highlights the current section is a nice touch.
- Render every chart as **server-side inline SVG or CSS bars** — no client-side
  charting library to download. Keep one source-of-truth data file so all the
  numbers stay internally consistent (the demographic breakdowns should sum to
  the total respondent count).
- Use the survey dataset and methodology I provide. Do not invent responses, rankings, or quotes. If no dataset is available, build a report labelled "Sample survey data" with fictional results identified beside each chart.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/coworking-1/1200/800` (vary the seed) or
  Pexels, and add descriptive `alt` text.
- Keep it accessible (semantic HTML, labelled charts with text alternatives,
  keyboard support, good contrast) and respect `prefers-reduced-motion`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="report"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./dist` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./dist --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
