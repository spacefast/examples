Build me a **single-page website for my barbershop** as a plain HTML & CSS site (no
build step, no framework — just `index.html`, `styles.css`, and a little `script.js`).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the shop name and style (e.g. "old-school straight-razor, modern fades")?
2. What services and prices do you offer?
3. Who are your barbers and what's each one known for?
4. What's your address, hours, and online booking link (or phone)?

**Then build a complete, polished, responsive one-pager with:**

- A full-bleed hero with a shop-interior photo, the name big, a short tagline, and a
  prominent "Book a chair" button.
- A "Services & prices" section as a clean grid (cut, skin fade, beard trim,
  hot-towel straight-razor shave, full service, buzz, kids', senior), each with a
  price and a one-line description. Highlight one as the house favorite.
- A "Meet the barbers" section with a photo, name, chair number, specialty chips, and
  a short bio for each barber.
- A gallery of cuts and shop atmosphere (a tidy masonry-style grid).
- A "Hours & location" block: the week's hours with **today highlighted** and a live
  "Open now / Closed" status computed in JS, a walk-in policy note, address, phone,
  and transit directions.
- A booking link to my booking service, or a phone link if I provide no booking URL. A request form must describe a preferred time as a request, not a confirmed appointment.
- A footer with phone, directions, booking link, and socials.

**Design & content notes:**

- Classic-meets-modern barbershop mood: near-black charcoal background,
  warm cream paper, one brass/amber accent. Condensed uppercase display type
  (Oswald) for headings, clean sans (Inter) for body. Subtle hover lifts, no slop.
- Use my actual services, barbers, prices, hours, and reviews. Omit reviews unless I provide an exact quote and attribution. Label stock portraits as illustrative.
- Use real images. Pull free photos that fit, e.g. grayscale shots from
  `https://picsum.photos/seed/ironclad-barbershop-1/1200/800?grayscale` (vary the
  seed per image) or fitting Unsplash photos of a barbershop interior, a fade
  in progress, a hot-towel shave, and a classic barber pole — all with descriptive
  `alt` text.
- Keep it accessible (semantic HTML, labelled form fields, good contrast, keyboard
  support, a skip link) and mobile-first with a working hamburger menu.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="barber"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
