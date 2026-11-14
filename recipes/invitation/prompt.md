Build me an **elegant multi-section wedding website** as an **Astro site** (a real
minimal Astro project — `package.json`, `astro.config.mjs`, `src/pages/index.astro`,
small components, no SSR adapter — that builds to static files with `astro build`).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What are both your names, your wedding date, and the venue/city?
2. Where and when are the ceremony and reception, and is there a dress code?
3. Where should guests stay/fly into, and do you have a hotel block?
4. Which registry links should we include, and what meal options should the RSVP form offer?

**Then build a complete, polished, responsive site with:**

- A full-bleed **hero** with our names, the date, the venue, and a **live countdown**
  that ticks down to the exact ceremony date/time (and switches to a sweet "We're
  married!" message once the date has passed).
- A sticky top **nav** that smooth-scrolls to each section, collapsing to a hamburger
  menu on mobile, with an always-visible RSVP button.
- **Our Story** — how we met, the proposal, told as a vertical timeline with a few
  dated milestones and a portrait photo.
- **The Details** — ceremony and reception times, the venue name and address with an
  "Open in Maps" link, and a dress-code note.
- **Travel & Stay** — nearest airports, the hotel room block (with a booking code and
  cutoff date), and directions/parking/shuttle info.
- **Photo gallery** — a tidy mosaic of 5–6 images with good `alt` text.
- **Registry** — a few linked registry cards (store registries plus a honeymoon fund),
  each with a short personal note.
- An RSVP form with full name, email, accept or decline, guest count, meal preference, and a song request. Validate required fields and reveal meal, guest, and song fields only for attending guests. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.
- **FAQ** — an accordion answering plus-ones, kids, parking, weather, and the RSVP
  deadline.
- A **footer** with our names, the date, and our hashtag.

**Design & content notes:**

- Warm editorial wedding aesthetic: ivory/cream background, deep olive green, a
  terracotta accent, and thin gold rules. An elegant serif (e.g. Cormorant Garamond)
  for headings paired with a clean humanist sans (e.g. Mulish) for body. Generous
  whitespace, a quiet ornament divider, subtle hover motion.
- Use the couple's actual story, travel details, meal choices, and FAQ answers. Ask for missing logistics instead of inventing them.
- Use real images. Pull free photos that fit, e.g. from Picsum
  (`https://picsum.photos/seed/our-wedding-1/1200/800`, varying the seed per image) or
  real Unsplash direct URLs (`https://images.unsplash.com/...`) matching terms like
  _engaged couple vineyard golden hour_, _outdoor wedding ceremony arch string
  lights_, _wedding table setting florals candles_, _couple holding hands walking
  countryside_ — with descriptive `alt` text.
- Keep dependencies minimal (just `astro`). Put all the wedding content in one
  `src/data/wedding.ts` file so a single edit updates the whole site. Persist nothing
  server-side. Send RSVPs to the provided destination or label the form as a demo.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, visible
  focus, good contrast) and mobile-first.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="invitation"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./dist` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./dist --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
