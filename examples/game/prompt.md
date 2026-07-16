Build me a **playable neon brick-breaker arcade game** (paddle, bouncing ball, destructible brick walls, falling power-ups, multiple levels) as an **HTML5 canvas game** — a self-contained static site with no build step.

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What should the game be called, and what's the vibe — neon synthwave, candy pastel, or retro CRT green?
2. What's your accent/primary color for the ball and paddle glow?
3. How many levels should the first run have (e.g. 5), and should difficulty ramp by speed, brick rows, or both?
4. Name 2–3 power-ups you'd like (or use the defaults: multi-ball, wide paddle, slow-mo).

**Then build a complete, polished, responsive game with:**

- A **title / start screen** with a big logo, a PLAY button, a "How to play" button, and a high-score badge.
- A **canvas gameplay scene**: a paddle, ball physics with real wall/paddle/brick collisions, a colored brick grid, and a live HUD showing score, lives, and level.
- **Falling power-ups** that drop from broken bricks and are caught with the paddle — multi-ball, wide paddle, slow-mo, and a laser the player can fire.
- **Level progression** with distinct brick layouts and ball speed that increases each level.
- A **game-over / level-clear overlay** showing the score, the best score, and a Play Again button.
- A **how-to-play modal** explaining the controls (arrow keys / A-D / mouse / touch to move, Space or tap to launch and fire).

**Design & content notes:**

- Neon synthwave arcade mood: near-black violet background, a glowing perspective grid horizon, scanlines, and bright cyan/magenta neon. Use a display font (e.g. Orbitron) for the logo/HUD and a clean condensed sans (e.g. Rajdhani) for body. Lean into juice: ball trails, particle bursts when bricks shatter, screen shake, and short synth blips via the Web Audio API (no audio files).
- Write real, specific copy — level names, power-up labels, on-screen hints — never "lorem ipsum".
- Use real images only where they help (e.g. a subtle synthwave backdrop). Pull free photos that fit, e.g. from Unsplash (`https://images.unsplash.com/...`) or Pexels, with descriptive `alt` text. The playfield itself should be drawn on the canvas, not a photo.
- Make it **actually playable**: a real game loop at ~60fps, keyboard + mouse + touch controls, on-screen buttons on mobile, a working pause, and a restart. Persist the best score in `localStorage` so it survives reloads. Substep the ball so it never tunnels through bricks at high speed.
- Keep it accessible (semantic HTML for the menus/modal, labelled buttons, good contrast, keyboard support) and mobile-first (the canvas scales to fit, touch controls appear on small screens).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="game"></script>
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
