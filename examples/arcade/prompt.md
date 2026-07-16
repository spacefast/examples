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
- **Book a party** — a private-event request form (name, email, date, guest count, notes) that shows a friendly success message on submit.
- A footer with social links and the address.

**Design & content notes:**

- Neon-and-CRT mood: near-black/deep-violet background, hot-pink + cyan + lime accents, a pixel display font (e.g. "Press Start 2P") for headings and a clean sans (e.g. "Space Grotesk") for body. Add subtle scanlines and glow, plus a scrolling marquee strip — but keep text high-contrast and readable.
- Make the game genuinely fun: smooth 60fps loop with delta timing, the ball's bounce angle depends on where it hits the paddle, the paddle shrinks and the ball speeds up on later waves, and a launch-on-Space/tap mechanic.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable brewery names, prices, tournament prizes, and hours.
- Use real images. Pull free photos that fit, e.g. `https://picsum.photos/seed/retro-arcade-1/1200/800` (vary the seed) or Pexels, and add descriptive `alt` text.
- No build step: a single `index.html` plus `styles.css`, `game.js`, and a tiny `ui.js`. Persist the high score in `localStorage`.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, good contrast, a skip link, and `prefers-reduced-motion` respected).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="arcade"></script>
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
