Build me a **mobile-first website for my food truck whose centerpiece is a weekly schedule that auto-highlights where the truck is parked today** as a vanilla-JS app (single `index.html` plus `styles.css` and `app.js` — no build step, no framework).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the truck's name and cuisine / signature item?
2. What are 3–5 menu items with prices?
3. Where will you be each day this week (day, place, hours)?
4. Instagram handle and a catering contact email?

**Then build a complete, polished, responsive site with:**

- A full-bleed hero with a truck photo, the name big, a tagline, and a **live "We're at … today" banner** that JavaScript fills in from the schedule (and shows "Open now / Opens at … / next stop on …" depending on the current day and time).
- A **"This week's route"** section: a list of day → location → hours, ordered so today comes first and today's row is visually highlighted. Each open day has a one-tap **Directions** link that opens Google Maps to that address. Day-off rows read as closed.
- A **Menu** grouped into tacos, burritos/bowls, sides, and drinks, each item with a price and a one-line description; mark veg options.
- A catering section with a quote-request form for name, email, and event details, plus email and phone links. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.
- A **gallery strip** of food/truck photos.
- A footer with contact info and Instagram / TikTok links.

**Design & content notes:**

- Bright, appetizing food-truck mood: warm cream paper background, a bold chili-red primary with gochujang-orange and sesame-gold accents, near-black warm ink for text. Big condensed display type (e.g. Anton) for headings, clean Inter for body.
- Use my actual stops, menu, prices, and opening hours. Ask for missing locations instead of inventing directions.
- Use real images. Pull free photos that fit, e.g. `https://picsum.photos/seed/kimchi-taco-truck-1/1200/800` (vary the seed per image), with descriptive `alt` text.
- Put the schedule as data in `app.js` (days indexed Sun=0…Sat=6, open/close as minutes from midnight) and compute "today" + "open now" client-side. Build the Google Maps links with `https://www.google.com/maps/dir/?api=1&destination=`.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, good contrast) and mobile-first.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="foodtruck"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
