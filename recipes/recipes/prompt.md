Build me a **weeknight recipe blog with a filterable recipe index and printable, scalable recipe pages** as a **Vite + React app** (keep dependencies minimal — just React; no UI kit).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's your name and the blog's name?
2. What cuisine or style is the focus (e.g. Mediterranean weeknight, baking, one-pot)?
3. Give me 3–5 starter recipes, including one signature dish, with ingredients and steps.
4. Which dietary tags should the filters support (e.g. vegetarian, gluten-free, 30-minute)?

**Then build a complete, polished, responsive site with:**

- **Home** — a full-bleed hero featuring this week's signature recipe (big title, blurb, "Get the recipe" button) plus a "Fresh from the kitchen" grid of the latest recipes.
- **Recipe index** — every recipe as a card, with a live search box (matches title and ingredients) and chip filters for course, cuisine, and dietary tags. The result count updates as I filter, and there's a friendly empty state and a "clear filters" button.
- **Recipe page** — hero photo, intro in the cook's voice, a prep / cook / total / serves stat bar, an **ingredients list with a serving-size scaler** (a slider plus +/− that recomputes every quantity into nice kitchen fractions like ¾ and 1½), checkable ingredients, a numbered step-by-step method, and a "Nora's tip" callout.
- **Print card** — a "Print card" button that opens the browser print dialog showing a clean, single-page card (title, scaled ingredients, numbered method, tip) with all the site chrome hidden via a print stylesheet.
- **About the cook** — a warm, personal bio with a photo and a few playful stats.
- A newsletter signup with labelled name and email fields. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.

**Design & content notes:**

- Warm, appetizing editorial feel: cream paper background, a copper/terracotta accent, a deep-olive secondary, an elegant serif (e.g. Fraunces) for headings and a clean sans (e.g. Inter) for body. Generous whitespace, rounded cards, soft shadows.
- Write real, specific recipe copy from my answers — never "lorem ipsum". Invent believable intros, quantities, steps, and tips. Make the signature dish genuinely appealing.
- Use real images. Pull free food photos that fit each recipe, e.g.
  `https://picsum.photos/seed/pasta-1/1200/800` (vary the seed for ingredients, dessert, and a cook-in-the-kitchen shot), with descriptive `alt` text.
- Use a small client-side hash router so Home / Recipes / each recipe / About are real shareable URLs, and keep the serving scaler state on each recipe page.
- Keep it accessible (semantic HTML, labelled form fields and filters, keyboard support, good contrast) and mobile-first (collapsing nav, filters stack above results on small screens).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="recipes"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./dist` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./dist --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
