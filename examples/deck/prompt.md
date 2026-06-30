# Northwind Seed Deck — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the deck, and publish it live to Spacefast.

---

Build me a **presentable investor pitch deck that runs in the browser** as a
vanilla-JS app — a single `index.html` plus a small CSS and JS file, with
[reveal.js](https://revealjs.com) loaded from a CDN (no build step).

**First, ask me these questions and wait for my answers:**

1. What's the company and one-line pitch?
2. What are the 6–8 slide topics? (default: Title, Problem, Solution, Market, Traction, The Ask)
3. What's the ask / closing slide content? (round size, use of funds, milestones, team)
4. Any brand colors, a logo, or photos I should use? (optional — pick a tasteful default if I skip this)

**Then build a complete, polished, responsive deck with:**

- A **title slide**: logo mark, company name, the one-line pitch, and a "Seed round · 2026 · Confidential" meta row over a subtle, darkened background photo.
- A **Problem** slide: a sharp headline, a one-line setup, three stat cards with big numbers, and a real customer quote.
- A **Solution** slide with three pillars (Build / Govern / Trust), plus a nested vertical "how it works" slide showing a short config snippet and a left-to-right flow diagram (use reveal.js vertical slides — press ↓).
- A **Market** slide with a TAM / SAM / SOM concentric-ring diagram, a labeled legend, and a bottom-up sizing line.
- A **Traction** slide: four KPI tiles (ARR, growth, retention, churn), a CSS bar chart of monthly recurring revenue, and a row of customer logo chips.
- A **The Ask** slide: round size in the headline, a use-of-funds bar breakdown, a checklist of milestones to the next round, and a one-line team bio.
- A **closing** slide: logo, a warm closing line, and contact details.
- **Speaker notes** on every slide (reveal.js `<aside class="notes">`), opened with the `S` key in a second presenter window with a timer.
- Working **keyboard navigation** (← → to move, ↓ ↑ within a slide group, `F` fullscreen, `O` overview), a `?` **help overlay** listing the shortcuts, and **PDF export** (press `E` to switch into reveal.js print-pdf mode, then Save as PDF).

**Design & content notes:**

- A confident, modern boardroom palette: a deep ink background (`#0A0E17`), an indigo→teal accent gradient (`#7C9BFF → #4FD8C4`), Space Grotesk for headings and Inter for body. Generous whitespace, rounded cards, no clip-art.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable, internally-consistent numbers (ARR, growth %, retention, market size) if I leave gaps, and label any estimates as estimates.
- Use real images. Pull a free photo that fits the title background, e.g. from Unsplash
  (`https://source.unsplash.com/1600x900/?startup,pitch,meeting`) or a placeholder like
  `https://picsum.photos/seed/northwind-board/1920/1080`, darken it behind the text, and add an empty `alt` (it's decorative).
- Load reveal.js, its notes plugin, and its highlight plugin from a CDN (e.g. jsDelivr). reveal.js v5 handles PDF pagination itself when the URL carries `?print-pdf` — no extra print stylesheet needed.
- Keep it accessible (semantic landmarks, real heading levels, `aria-label` on the chart, good contrast, full keyboard support) and responsive — single-column stacking on phones.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="deck"></script>
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
