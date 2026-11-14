Build me a **generative flow-field art toy** — a single full-bleed canvas where
thousands of particles drift through a Perlin-noise vector field, painting layered
organic line work I can tune, reseed, and export — as a **plain HTML & CSS + vanilla-JS
app** with no build step (a single `index.html` plus a couple of `.js`/`.css` files,
zero dependencies).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

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
- Use real images where appropriate (e.g. an Open Graph cover) — pull free photos that fit, such as `https://picsum.photos/seed/flow-field-cover/1200/630` or Unsplash (`https://images.unsplash.com/...`) matching terms like _generative flow field art print_ or _soft gradient color palette abstract_, with descriptive `alt` text.
- No build step: it must run by just opening `index.html`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="generative-art"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
