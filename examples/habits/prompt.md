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

**When the site is ready, publish it to Spacefast with the direct API — no account, install, or extra instructions needed:**

1. Use `./dist` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. First publish: send every file as multipart form data. This Bash/Zsh block preserves relative paths and works for one file or a whole folder:
   ```bash
   PUBLISH_ROOT=./dist
   publish_files=()
   while IFS= read -r -d "" file; do
     relative=${file#"$PUBLISH_ROOT"/}
     publish_files+=(-F "files=@$file;filename=$relative")
   done < <(find "$PUBLISH_ROOT" -type f -print0)
   curl -sS "${publish_files[@]}" "https://api.spacefast.com/v1/publish?wait=1"
   ```
3. From the `{ "data": ... }` receipt, give me `data.space.liveUrl`, `data.version.immutableUrl`, `data.claim.url`, and `data.claim.expiresAt`. Remind me to claim within 6 hours. Keep `data.claim.token` secret.
4. Save `data.space.id` and `data.claim.token` locally (for example in an ignored, mode-600 `.spacefast/state.json`). For a quick update, rebuild the `publish_files` array above and publish to the same space:
   ```bash
   SPACEFAST_SPACE_ID=<saved-space-id>
   SPACEFAST_TOKEN=<saved-claim-token-or-access-token>
   curl -sS -H "Authorization: Bearer $SPACEFAST_TOKEN" \
     -F "spaceId=$SPACEFAST_SPACE_ID" "${publish_files[@]}" \
     "https://api.spacefast.com/v1/publish?wait=1"
   ```
   If an update after claiming returns `space_claimed_credential_available`, exchange the saved claim token once at `POST https://api.spacefast.com/v1/anonymous-claim/exchange`, save `data.credential.accessToken`, and retry with that access token.

**Optional shortcuts and reference only:** if the `sf` CLI is already installed, `sf publish ./dist --wait` does the same job. A zip of the publish folder is also supported, but neither the CLI nor a zip is required. Docs: [direct agent/API publishing](https://spacefast.com/docs/agents) · [files and folders](https://spacefast.com/docs/publishing) · [claiming](https://spacefast.com/docs/anonymous-publish) · [updates and rollback](https://spacefast.com/docs/rollback)
