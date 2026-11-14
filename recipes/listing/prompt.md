Build me a **single-property listing microsite for a home that's for sale** as a
Vite + React app.

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the property address, list price, and beds/baths/square footage?
2. What are 4–6 standout features (e.g. "chef's kitchen, ocean-view primary suite, pool")?
3. Who's the listing agent — name, brokerage, phone, email?
4. Roughly what neighborhood/lifestyle should the copy lean into?

**Then build a complete, polished, responsive site with:**

- A full-bleed hero with the address, city/state, list price, and a beds / baths /
  sqft / price-per-sqft stat row over a twilight exterior photo, plus "Schedule a
  tour" and "View photos" buttons.
- A short "story" intro paragraph that sells the home in the agent's voice.
- A "Highlights" grid (one card per standout feature, with a small icon).
- A photo gallery: a tiled grid where clicking any image opens a full-screen
  lightbox with caption, prev/next, and keyboard arrows + Esc.
- A "Facts & features" table (bedrooms, baths, lot size, year built, garage, HOA…).
- An **interactive mortgage estimator**: sliders for price, down-payment %, and
  interest rate, plus a 15/20/30-year toggle, that live-updates the estimated
  monthly payment with a principal / interest / tax / insurance breakdown.
- A simple SVG floor plan with a level switcher (main / upper / lower) next to a
  neighborhood blurb with a Walk Score and nearby points of interest.
- A tour-request form with name, phone, email, preferred date and time, and message, beside an agent contact card. A requested time is not a confirmed tour. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.
- A footer with an MLS-style detail block and a "deemed reliable but not
  guaranteed / Equal Housing Opportunity" disclaimer.

**Design & content notes:**

- Coastal-luxury, editorial mood: warm ivory/sand background, deep ocean-ink text,
  a single brass accent, a serif display face (Cormorant Garamond) over a clean
  sans (Inter). Generous whitespace, soft shadows, no clutter.
- Use the actual property facts, listing identifier, and neighborhood details I provide. Ask for missing facts. Label a fictional property as a demo.
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://images.unsplash.com/photo-…?auto=format&fit=crop&w=1600&q=80`) or Pexels,
  for the exterior, living room, kitchen, primary suite, and pool, with descriptive
  `alt` text.
- Keep all the listing content in one `data.js` module so the site is easy to
  re-skin for another property. Keep the calculator in the browser. Send tour requests only to the provided destination, or label the form as a demo.
- Mortgage math: monthly P&I from the standard amortization formula; estimate tax
  (~1.18%/yr of price) and insurance (~0.35%/yr) so the total is realistic.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support for the
  lightbox, good contrast) and mobile-first.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="listing"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./dist` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./dist --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
