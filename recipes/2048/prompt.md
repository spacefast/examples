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

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
