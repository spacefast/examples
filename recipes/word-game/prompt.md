Build me a **daily five-letter word-guessing game** (a Wordle-style puzzle) as a
self-contained **vanilla-JS app** — plain `index.html`, `style.css`, and JS files,
no framework and no build step.

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What should the game be named, and is there a theme for the word list (general English, movies, food, or your own custom word pack)?
2. What accent color should the correct (green) tiles use to match your brand?
3. What hashtag or site name should appear when players share their result grid?
4. Should it be a fresh word every day, or an unlimited "play again" practice mode?

**Then build a complete, polished, responsive game with:**

- A **6×5 guess board** with flip-reveal tile animations — type a five-letter word,
  press Enter, and each tile flips to reveal green (right letter, right spot),
  yellow (right letter, wrong spot), or gray (not in the word).
- An **on-screen QWERTY keyboard** that recolors each key by its best-known status,
  plus full physical-keyboard support (letters, Enter, Backspace).
- **Daily-word logic**: a deterministic word-of-the-day derived from the date, so
  everyone gets the same puzzle each day. (Also offer the unlimited practice mode if
  I asked for it.)
- A **stats modal**: games played, win %, current streak, max streak, and a
  guess-distribution bar chart that highlights today's result.
- A **share button** that produces the spoiler-free emoji grid (🟩🟨⬛) and copies it
  to the clipboard (use the Web Share API where available).
- A **how-to-play modal** with example tiles, shown automatically on a player's first
  visit.
- **`localStorage` persistence** so refreshing keeps the in-progress board, stats,
  streak, and theme, and a countdown to the next puzzle.

**Design & content notes:**

- Clean, modern, mobile-first: a calm dark theme by default with a light-mode toggle,
  a serif display face for the wordmark and headings, a crisp sans for the UI, and the
  green/yellow/gray tile palette as the visual signature.
- Get the **duplicate-letter scoring right** — this is the part most clones get wrong.
  Color greens first, then hand out yellows only while unused copies of a letter remain
  in the answer, so a guessed letter never shows more times than it actually appears.
- Use a real, curated five-letter word list (a few hundred answers is plenty) and a
  larger set of accepted guesses; reject anything that isn't a valid word with a gentle
  "Not in word list" shake. Never use "lorem ipsum".
- Decorative imagery (the how-to-play card, social preview) can pull free photos that
  fit, e.g. from Unsplash (`https://images.unsplash.com/...`) with scrabble-tile or bold
  typographic themes and descriptive `alt` text.
- Keep it accessible: semantic HTML, ARIA on the board and keys, labelled buttons, good
  contrast in both themes, full keyboard play, and a `prefers-reduced-motion` fallback.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="word-game"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
