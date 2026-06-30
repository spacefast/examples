# 2048 — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the game, and publish it live to Spacefast.

---

Build me a **fully playable 2048 sliding-tile puzzle game** as a vanilla-JS app
(a single `index.html` plus a small CSS and JS file — no framework, no build step).

**First, ask me these questions and wait for my answers:**

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
