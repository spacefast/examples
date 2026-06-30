# Driftfield — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **generative flow-field art toy** — a single full-bleed canvas where
thousands of particles drift through a Perlin-noise vector field, painting layered
organic line work I can tune, reseed, and export — as a **plain HTML & CSS + vanilla-JS
app** with no build step (a single `index.html` plus a couple of `.js`/`.css` files,
zero dependencies).

**First, ask me these questions and wait for my answers:**

1. What should the toy be called, and what palette mood do you want — sunset warm, ocean cool, monochrome ink, or pastel?
2. What background — light paper, deep black, or a soft gradient?
3. How busy should the default piece feel (sparse and elegant vs. dense and painterly)?
4. Should pieces auto-evolve forever, or settle into a finished still I can export?

**Then build a complete, polished, responsive site with:**

- A full-bleed animated canvas that continuously paints the flow field in real time (a proper `requestAnimationFrame` loop).
- A control panel with: a color-palette picker, a particle-count (density) slider, a flow-speed slider, a line-width (stroke) slider, and a background-tone selector.
- A "New piece" button that reseeds the noise field from a fresh seed, so every press is a brand-new composition.
- Clear (wipe the ink) and Pause / Resume controls.
- Export-to-PNG that downloads the current canvas, with the seed string baked into the filename so a piece can be saved or reproduced exactly.
- A short "What is a flow field?" note explaining the idea in one friendly paragraph.

**Design & content notes:**

- Gallery-studio mood: a dark, refined chrome that gets out of the canvas's way — a glassy floating control panel, a serif display face for the title (e.g. Fraunces), a clean sans for UI, and a monospace seed readout. One warm accent (a soft coral) against cool neutrals.
- Implement the flow field for real: a seedable PRNG plus Perlin/value noise so the **same seed always reproduces the same artwork**. Draw particle trails as translucent strokes (use `lighter` blending on dark backdrops, `multiply` on paper) so the line work layers into rich, marbled color.
- Make the seed shareable: show it in the UI, sync it to the URL hash, let me paste a seed in to reload a piece, and persist my control settings in `localStorage`.
- Add an auto-evolve toggle: on, the field keeps breathing and never settles; off, the particles trace a fixed field until the piece resolves into a finished still.
- Mobile-first and accessible: semantic HTML, labelled controls, keyboard support (Space = pause, R = reseed, S = save, C = clear), visible focus rings, good contrast, and a `prefers-reduced-motion` fallback. Make it responsive — the panel becomes a bottom sheet with a floating action dock on phones.
- Use realistic content — never "lorem ipsum". Write the real microcopy, palette names, and the about paragraph.
- Use real images where appropriate (e.g. an Open Graph cover) — pull free photos that fit, such as `https://picsum.photos/seed/driftfield-cover/1200/630` or Unsplash (`https://images.unsplash.com/...`) matching terms like *generative flow field art print* or *soft gradient color palette abstract*, with descriptive `alt` text.
- No build step: it must run by just opening `index.html`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="generative-art"></script>
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
