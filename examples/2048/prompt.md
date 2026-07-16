Build me a **fully playable 2048 sliding-tile puzzle game** as a vanilla-JS app
(a single `index.html` plus a small CSS and JS file — no framework, no build step).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What tile theme or color palette do you want? (e.g. the classic warm beige/orange, a neon dark mode, pastels — or describe your own.)
2. What board size should it be? (Default is 4×4; 5×5 plays slower and easier, 3×3 is frantic.)
3. What's the winning tile? (Default is 2048 — you can chase 1024 for a quicker win or 4096 for a longer grind.)

**Then build a complete, polished, responsive game with:**

- A square **board with a grid of cells** (sized from my board-size answer) sitting on a rounded board frame.
- **Arrow-key controls** (← ↑ → ↓) and **touch swipe** controls so it plays on phones too. Tiles slide as far as they can in the chosen direction.
- **Merging:** when two tiles with the same number collide they combine into one tile of double the value — and a tile can only merge once per move (so `2 2 2` becomes `4 2`, never `8`).
- A **score** that increases by the value of each merge, plus a **best score** that persists between visits via `localStorage`.
- **Smooth animations:** tiles slide via CSS transforms, new tiles pop in, and merged tiles give a little scale-up bounce. A small floating "+N" appears over the score on each merge.
- A **win overlay** when I reach the winning tile, with a "Keep going" option to chase a higher score, and a **game-over overlay** when no moves remain — both with a **restart** button.
- A **New Game** button, a one-step **Undo**, and a live moves counter.
- After every move, a new `2` (or occasionally a `4`) appears in a random empty cell.

**Design & content notes:**

- Default to the iconic 2048 look: a soft `#faf8ef` background, a `#bbada0` board, warm beige low tiles climbing through orange to a glowing gold `2048` tile — but honor my palette answer if I gave one. Use a clean sans like Inter, big bold tabular numerals, and a tasteful glow on the high-value tiles.
- This is a game, so there's no copy to write and **no images needed** — keep it clean, tactile, and fast.
- No build step — a single `index.html` with a linked CSS and JS file that opens straight in a browser. Make the game **actually work**: real keyboard and swipe input, correct merge rules, a real win/lose/restart loop, and best-score saved in `localStorage`.
- Make the board size, winning tile, and tile palette easy to change from a few constants/CSS variables at the top, so my answers map to real config.
- Keep it accessible (semantic HTML, a focusable board, visible focus ring, keyboard play, `prefers-reduced-motion` support, and good contrast).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="2048"></script>
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
