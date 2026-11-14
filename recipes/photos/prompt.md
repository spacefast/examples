Build me a **calm, image-first portfolio for a landscape & travel photographer** as a
small static **Astro site** (no SSR, no adapters — just `astro build`).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the photographer's name and one-line specialty (e.g. landscape, weddings, editorial)?
2. What are 3–4 photo series you want as galleries, and their names?
3. What's your contact email and Instagram handle?
4. Do you sell prints, or is this portfolio-and-inquiry only?

**Then build a complete, polished, responsive site with:**

- A **full-bleed hero** image with the photographer's name set large, the tagline, and
  the specialty + home base — a dark gradient keeps the type legible over the photo.
- A **work index** — a thumbnail grid of the named series (cover image, title, place,
  year, and a one-line blurb), each linking to its own gallery page.
- A **series gallery page** per series (`/series/<slug>`) with a **masonry grid** and a
  full-screen **lightbox** that is keyboard-navigable: click any frame to open, ← → to
  move between photos, `Esc` to close, with a caption and a `n / total` counter.
- An **About** page: bio in the photographer's voice, a headshot, a selected-client list,
  and a short recognition/press list.
- A **Prints / shop teaser**: a few open-edition sizes and prices, with a note that
  orders go through the contact form.
- A contact form with name, email, topic, and message, plus direct email and Instagram links. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.

**Design & content notes:**

- Quiet, editorial, gallery-white mood: a warm ivory paper background, near-black ink,
  one muted oxblood accent used sparingly, lots of whitespace. An elegant serif
  (e.g. Fraunces) for the name and headings over a clean sans (e.g. Inter) for body.
  Let the photographs carry the page.
- Write captions and a bio from my answers. Include clients and print prices only when I supply them.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/<your-seed>/1200/800` (vary the seed per image), with
  descriptive `alt` text. Use the black-and-white treatment for any portrait series.
- Keep all the content (photographer, series, photos, about, prints) in a single
  `src/data/portfolio.ts` file so one edit updates the whole site. Use Astro's
  `getStaticPaths` to generate one page per series.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, good
  contrast). Lazy-load below-the-fold images; preload the hero.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="photos"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./dist` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./dist --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
