# Lexicle

Lexicle is a polished, dependency-free daily word game in the Wordle mold: six tries to
guess a deterministic five-letter word-of-the-day, with flip-reveal tiles that color
green / yellow / gray (duplicate-letter scoring done correctly), an on-screen QWERTY
keyboard that recolors keys by their best-known status, a stats modal tracking games
played, win %, and streaks with a guess-distribution chart, one-tap spoiler-free emoji-grid
sharing, a how-to-play walkthrough, a light/dark toggle, and `localStorage` persistence so
refreshing keeps your board, streak, and theme. It's a single static `index.html` plus
`style.css`, `app.js`, and a validated `words.js` word list — no build step — and it's the
source for the matching entry in Spacefast's public examples gallery.
