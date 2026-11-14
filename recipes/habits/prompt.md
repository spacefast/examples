Build me a **habit tracker with GitHub-style contribution heatmaps** as a **Vite + React app** that saves everything in the browser (no backend, no accounts).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. Which habits do you want to track to start (e.g. Workout, Read, Meditate, Drink water)?
2. For each habit, is it daily or X times per week?
3. Pick an accent color or vibe for the heatmaps (e.g. classic green, sunset, ocean).
4. Whose tracker is this — a name or title for the top of the app?

**Then build a complete, polished, responsive app with:**

- A **Today** panel: a checklist of every habit that I can tap to mark done today, with a progress ring showing how much of today is complete.
- A combined **"Your year"** heatmap (GitHub contribution style) whose intensity is how many habits I finished each day — last ~12 months.
- A **per-habit card** for each habit showing its own heatmap, current streak, longest streak, and 30-day completion rate, plus a "Mark today" toggle.
- An **Add / edit habit** form (name, emoji, accent color, daily vs. X-times-per-week).
- A **habit detail view** with the full 12-month heatmap (tap any square to toggle that day), big stat tiles, and a month calendar I can click through.
- A **Settings** panel: week-start day (Mon/Sun), light/dark theme, tracker title, and a reset-all-data option.

**Design & content notes:**

- Calm, focused, GitHub-meets-Things look: dark by default with a clean light mode, rounded cards, one accent color per habit driving its heatmap gradient, Inter for type.
- The current streak must include today only once I've checked it off; until then it stays "alive" from yesterday so checking today visibly extends it. Get the streak and completion-rate math right — these are the whole point.
- Seed the app with a believable year of history on first load so the heatmaps look lived-in, and use realistic habit names from my answers — never "lorem ipsum".
- Persist all state to `localStorage` so my data survives refreshes; everything stays on my device.
- Use real images only if a marketing/empty state needs them — pull free photos that fit, e.g. `https://picsum.photos/seed/planner-1/1200/800`, with descriptive `alt` text.
- Keep it accessible (semantic HTML, labelled controls, keyboard support, good contrast) and mobile-first. Keep dependencies minimal (just React + Vite).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="habits"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./dist` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./dist --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
