# State of Indie Web 2025 — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **long-form annual community survey report** — a scrollable “State of …”
write-up full of charts, rankings, and commentary, in the lineage of State of JS
and the Stack Overflow Developer Survey — as an **Astro site** (static, no SSR).

**First, ask me these questions and wait for my answers:**

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
- Use realistic content based on my answers — never “lorem ipsum.” Invent
  believable figures, rankings, and quotable write-in comments.
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?diverse,developers,coworking`) or
  Pexels, and add descriptive `alt` text.
- Keep it accessible (semantic HTML, labelled charts with text alternatives,
  keyboard support, good contrast) and respect `prefers-reduced-motion`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="report"></script>
```

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Zip the site (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to change it later? Edit the files and publish again; every version keeps
  its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
