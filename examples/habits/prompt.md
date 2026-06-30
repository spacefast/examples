# Tally — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **habit tracker with GitHub-style contribution heatmaps** as a **Vite +
React app** that saves everything in the browser (no backend, no accounts).

**First, ask me these questions and wait for my answers:**

1. Which habits do you want to track to start (e.g. Workout, Read, Meditate, Drink water)?
2. For each habit, is it daily or X times per week?
3. Pick an accent color or vibe for the heatmaps (e.g. classic green, sunset, ocean).
4. Whose tracker is this — a name or title for the top of the app?

**Then build a complete, polished, responsive app with:**

- A **Today** panel: a checklist of every habit that I can tap to mark done today,
  with a progress ring showing how much of today is complete.
- A combined **"Your year"** heatmap (GitHub contribution style) whose intensity is
  how many habits I finished each day — last ~12 months.
- A **per-habit card** for each habit showing its own heatmap, current streak,
  longest streak, and 30-day completion rate, plus a "Mark today" toggle.
- An **Add / edit habit** form (name, emoji, accent color, daily vs. X-times-per-week).
- A **habit detail view** with the full 12-month heatmap (tap any square to toggle
  that day), big stat tiles, and a month calendar I can click through.
- A **Settings** panel: week-start day (Mon/Sun), light/dark theme, tracker title,
  and a reset-all-data option.

**Design & content notes:**

- Calm, focused, GitHub-meets-Things look: dark by default with a clean light mode,
  rounded cards, one accent color per habit driving its heatmap gradient, Inter for type.
- The current streak must include today only once I've checked it off; until then it
  stays "alive" from yesterday so checking today visibly extends it. Get the streak
  and completion-rate math right — these are the whole point.
- Seed the app with a believable year of history on first load so the heatmaps look
  lived-in, and use realistic habit names from my answers — never "lorem ipsum".
- Persist all state to `localStorage` so my data survives refreshes; everything stays
  on my device.
- Use real images only if a marketing/empty state needs them — pull free photos that
  fit from Unsplash (`https://source.unsplash.com/1200x800/?calendar,planner`) with
  descriptive `alt` text.
- Keep it accessible (semantic HTML, labelled controls, keyboard support, good
  contrast) and mobile-first. Keep dependencies minimal (just React + Vite).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="habits"></script>
```

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Build it, then zip the `dist/` output (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to change it later? Edit the files and publish again; every version keeps
  its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
