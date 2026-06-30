# Quarter Up Barcade — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **website for my retro arcade bar, with a playable mini-game as the hero**,
as an **HTML5 canvas game** wrapped in a self-contained static site (a single
`index.html` plus `styles.css` and a couple of small JS files — no build step,
no framework).

**First, ask me these questions and wait for my answers:**

1. What's the bar's name and era/theme (e.g. "'80s arcade, all-neon")?
2. Name a few signature cabinets/games you have on the floor.
3. What are 4–6 drinks on your draft/cocktail list?
4. Address, weekly hours, and any recurring event night (e.g. "Tuesday Tetris tournament")?

**Then build a complete, polished, responsive site with:**

- A **playable canvas hero mini-game** — a Breakout/Pong-style game inside a
  glowing arcade-cabinet frame, with a "PRESS START" overlay, a live HUD
  (score, high score, balls, wave), keyboard **and** mouse **and** touch controls,
  lives, rising difficulty per wave, a game-over/restart flow, and a high score
  that persists in `localStorage`.
- **The cabinets** — a grid of your featured arcade games with year, a one-line
  description, and a genre tag.
- **On tap** — a rotating draft-beer list (name, brewery, style, ABV, price) plus
  a few house cocktails.
- **Events** — a week of tournament nights and happy-hour specials with prizes.
- **Visit** — address, a weekly hours table, age policy, and a map/photo with a
  link out to Google Maps.
- **Book a party** — a private-event request form (name, email, date, guest count,
  notes) that shows a friendly success message on submit.
- A footer with social links and the address.

**Design & content notes:**

- Neon-and-CRT mood: near-black/deep-violet background, hot-pink + cyan + lime
  accents, a pixel display font (e.g. "Press Start 2P") for headings and a clean
  sans (e.g. "Space Grotesk") for body. Add subtle scanlines and glow, plus a
  scrolling marquee strip — but keep text high-contrast and readable.
- Make the game genuinely fun: smooth 60fps loop with delta timing, the ball's
  bounce angle depends on where it hits the paddle, the paddle shrinks and the
  ball speeds up on later waves, and a launch-on-Space/tap mechanic.
- Use realistic content based on my answers — never "lorem ipsum". Invent
  believable brewery names, prices, tournament prizes, and hours.
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?retro,arcade,neon`) or Pexels, and add
  descriptive `alt` text.
- No build step: a single `index.html` plus `styles.css`, `game.js`, and a tiny
  `ui.js`. Persist the high score in `localStorage`.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support,
  good contrast, a skip link, and `prefers-reduced-motion` respected).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="arcade"></script>
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
