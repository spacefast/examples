# 2048

A fully playable remake of the classic **2048** sliding-tile puzzle, built as a
no-build-step vanilla-JS app (`site/index.html` plus a CSS and JS file). Slide the
4×4 grid with the arrow keys or by swiping on a phone; matching tiles merge into
one (and only once per move), the score climbs by the value of each merge, and your
**best score persists across visits via `localStorage`**. Tiles slide via CSS
transforms, new tiles pop in, merges give a little bounce, and a floating "+N" rides
up over the score. Reaching the 2048 tile shows a win overlay with a "keep going"
option; running out of moves shows a game-over overlay. There's a New Game button,
a one-step Undo, and a live moves counter. Board size, winning tile, and the tile
palette are all driven by a few constants at the top of `game.js` (and CSS variables
in `style.css`), so the prompt's setup answers map onto real config.

`prompt.md` is the copy-paste prompt that recreates the game from a few answers and
publishes it live to Spacefast.

## Files

- `site/index.html` — markup, board, overlays, and the Spacefast badge.
- `site/style.css` — theme variables, tile palette, layout, and animations.
- `site/game.js` — the game: grid state, move/merge engine, input, scoring, undo, and persistence.

Open `site/index.html` directly in any browser — no install, no build.
