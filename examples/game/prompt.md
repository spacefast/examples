# Prism Breaker — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the game, and publish it live to Spacefast.

---

Build me a **playable neon brick-breaker arcade game** (paddle, bouncing ball,
destructible brick walls, falling power-ups, multiple levels) as an **HTML5 canvas
game** — a self-contained static site with no build step.

**First, ask me these questions and wait for my answers:**

1. What should the game be called, and what's the vibe — neon synthwave, candy pastel, or retro CRT green?
2. What's your accent/primary color for the ball and paddle glow?
3. How many levels should the first run have (e.g. 5), and should difficulty ramp by speed, brick rows, or both?
4. Name 2–3 power-ups you'd like (or use the defaults: multi-ball, wide paddle, slow-mo).

**Then build a complete, polished, responsive game with:**

- A **title / start screen** with a big logo, a PLAY button, a "How to play" button, and a high-score badge.
- A **canvas gameplay scene**: a paddle, ball physics with real wall/paddle/brick collisions, a colored brick grid, and a live HUD showing score, lives, and level.
- **Falling power-ups** that drop from broken bricks and are caught with the paddle — multi-ball, wide paddle, slow-mo, and a laser the player can fire.
- **Level progression** with distinct brick layouts and ball speed that increases each level.
- A **game-over / level-clear overlay** showing the score, the best score, and a Play Again button.
- A **how-to-play modal** explaining the controls (arrow keys / A-D / mouse / touch to move, Space or tap to launch and fire).

**Design & content notes:**

- Neon synthwave arcade mood: near-black violet background, a glowing perspective grid horizon, scanlines, and bright cyan/magenta neon. Use a display font (e.g. Orbitron) for the logo/HUD and a clean condensed sans (e.g. Rajdhani) for body. Lean into juice: ball trails, particle bursts when bricks shatter, screen shake, and short synth blips via the Web Audio API (no audio files).
- Write real, specific copy — level names, power-up labels, on-screen hints — never "lorem ipsum".
- Use real images only where they help (e.g. a subtle synthwave backdrop). Pull free photos that fit, e.g. from Unsplash (`https://images.unsplash.com/...`) or Pexels, with descriptive `alt` text. The playfield itself should be drawn on the canvas, not a photo.
- Make it **actually playable**: a real game loop at ~60fps, keyboard + mouse + touch controls, on-screen buttons on mobile, a working pause, and a restart. Persist the best score in `localStorage` so it survives reloads. Substep the ball so it never tunnels through bricks at high speed.
- Keep it accessible (semantic HTML for the menus/modal, labelled buttons, good contrast, keyboard support) and mobile-first (the canvas scales to fit, touch controls appear on small screens).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="game"></script>
```

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Zip the site (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to tweak a level or add a power-up later? Edit the files and publish again; every version keeps its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
