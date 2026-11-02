Build me a **website for my retro arcade bar, with a playable mini-game as the hero**, as an **HTML5 canvas game** wrapped in a self-contained static site (a single `index.html` plus `styles.css` and a couple of small JS files — no build step, no framework).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the bar's name and era/theme (e.g. "'80s arcade, all-neon")?
2. Name a few signature cabinets/games you have on the floor.
3. What are 4–6 drinks on your draft/cocktail list?
4. Address, weekly hours, and any recurring event night (e.g. "Tuesday Tetris tournament")?

**Then build a complete, polished, responsive site with:**

- A **playable canvas hero mini-game** — a Breakout/Pong-style game inside a glowing arcade-cabinet frame, with a "PRESS START" overlay, a live HUD (score, high score, balls, wave), keyboard **and** mouse **and** touch controls, lives, rising difficulty per wave, a game-over/restart flow, and a high score that persists in `localStorage`.
- **The cabinets** — a grid of your featured arcade games with year, a one-line description, and a genre tag.
- **On tap** — a rotating draft-beer list (name, brewery, style, ABV, price) plus a few house cocktails.
- **Events** — a week of tournament nights and happy-hour specials with prizes.
- **Visit** — address, a weekly hours table, age policy, and a map/photo with a link out to Google Maps.
- A private-event request form with name, email, date, guest count, and notes. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.
- A footer with social links and the address.

**Design & content notes:**

- Neon-and-CRT mood: near-black/deep-violet background, hot-pink + cyan + lime accents, a pixel display font (e.g. "Press Start 2P") for headings and a clean sans (e.g. "Space Grotesk") for body. Add subtle scanlines and glow, plus a scrolling marquee strip — but keep text high-contrast and readable.
- Make the game genuinely fun: smooth 60fps loop with delta timing, the ball's bounce angle depends on where it hits the paddle, the paddle shrinks and the ball speeds up on later waves, and a launch-on-Space/tap mechanic.
- Use my confirmed brewery list, prices, prizes, and hours. Omit missing business facts or label the entire site as a fictional demo.
- Use real images. Pull free photos that fit, e.g. `https://picsum.photos/seed/retro-arcade-1/1200/800` (vary the seed) or Pexels, and add descriptive `alt` text.
- No build step: a single `index.html` plus `styles.css`, `game.js`, and a tiny `ui.js`. Persist the high score in `localStorage`.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, good contrast, a skip link, and `prefers-reduced-motion` respected).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="arcade"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
