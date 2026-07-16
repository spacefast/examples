Build me a **presentable investor pitch deck that runs in the browser** as a
vanilla-JS app — a single `index.html` plus a small CSS and JS file, with
[reveal.js](https://revealjs.com) loaded from a CDN (no build step).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

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
- Use real images. Pull a free photo that fits the title background, e.g.
  `https://picsum.photos/seed/northwind-board/1920/1080`, darken it behind the text, and add an empty `alt` (it's decorative).
- Load reveal.js, its notes plugin, and its highlight plugin from a CDN (e.g. jsDelivr). reveal.js v5 handles PDF pagination itself when the URL carries `?print-pdf` — no extra print stylesheet needed.
- Keep it accessible (semantic landmarks, real heading levels, `aria-label` on the chart, good contrast, full keyboard support) and responsive — single-column stacking on phones.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="deck"></script>
```

**When the site is ready, publish it to Spacefast with the direct API — no account, install, or extra instructions needed:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. First publish: send every file as multipart form data. This Bash/Zsh block preserves relative paths and works for one file or a whole folder:
   ```bash
   PUBLISH_ROOT=./site
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

**Optional shortcuts and reference only:** if the `sf` CLI is already installed, `sf publish ./site --wait` does the same job. A zip of the publish folder is also supported, but neither the CLI nor a zip is required. Docs: [direct agent/API publishing](https://spacefast.com/docs/agents) · [files and folders](https://spacefast.com/docs/publishing) · [claiming](https://spacefast.com/docs/anonymous-publish) · [updates and rollback](https://spacefast.com/docs/rollback)
