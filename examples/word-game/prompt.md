# Lexicle — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **daily five-letter word-guessing game** (a Wordle-style puzzle) as a
self-contained **vanilla-JS app** — plain `index.html`, `style.css`, and JS files,
no framework and no build step.

**First, ask me these questions and wait for my answers:**

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

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Zip the site (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to change it later? Edit the files and publish again; every version keeps its
  own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
