Build me a **mobile-first post-scan landing page that a printed QR code points
to** — the screen someone sees right after they scan the code on my packaging,
poster, or table tent — as a **plain HTML & CSS** site with a little vanilla
JavaScript (a single `index.html` plus a CSS and JS file, no build step).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What does the QR live on — packaging, a poster, a table tent, a sticker, a
   business card? And what's the one line of "scan to…" framing it should open with?
2. What's the single action you most want the visitor to take (reorder, book a
   table, claim a discount, follow, sign up, leave a review)?
3. What's the brand name, what's the one product or promo to feature (with a price
   or offer), and what accent color should we use?
4. (Optional) Give me 3–5 secondary links to list underneath (menu, brew guide,
   our story, hours/location, Instagram), plus your address and contact.

**Then build a complete, polished, responsive site with:**

- A **brand header** — a small logo mark, the brand name, and a one-line locator
  (city / tagline). It can stay pinned at the top.
- A **"you scanned this" intro** — the "scan to…" framing, a confident headline,
  and one short sentence that connects the physical thing they're holding to this
  page.
- **One product / promo card** — a real photo, the product name, price, tasting
  notes / key details as little chips, a short believable blurb, and a freshness
  or trust line. Include a **promo code** with a tap-to-copy button that confirms
  when copied.
- A **single primary call-to-action** — one big, unmistakable button for the action
  from question 2, with a short line of fine print (what the code does, shipping,
  etc.).
- A **secondary links list** — tappable rows with an icon, a title, and a one-line
  description, each a big touch target with a chevron.
- A **self-rendered QR code** — the page draws its _own_ QR code (pointing at its
  own live URL) so anyone can re-share it, plus a "Copy link" button. Generate it
  client-side; don't paste in a static image.
- A small **footer** with address, hours, contact, and fine print.

**Design & content notes:**

- Mobile-first: design for a phone held one-handed. Everything lives in a single
  centered column (~460px); on desktop it floats as a phone-shaped card. Tap targets
  at least ~48px tall.
- Warm, premium, retail feel: a cream/paper base, deep espresso text, and the brand
  accent color used sparingly for the primary button, the promo, and link icons. A
  characterful serif (e.g. Fraunces) for the brand name and headlines, a clean sans
  (e.g. Inter) for everything else.
- Use the product details, prices, addresses, hours, and offer terms I provide. Ask for missing business facts.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/product-qr-1/1200/800` (vary the seed) or Pexels,
  and add descriptive `alt` text. Add an `onerror` fallback to
  `https://picsum.photos/seed/<something>/900/900` so an image never breaks.
- No build step — a single `index.html` with a linked CSS and JS file that opens
  straight in a browser. Render the QR client-side (a tiny library like
  `qrcode-generator` from a CDN is perfect) and point it at `window.location` with a
  sensible fallback for local previews. Make copy-code and copy-link actually write
  to the clipboard and show feedback.
- Keep it accessible (semantic HTML, labelled buttons, visible focus states,
  keyboard support, and strong contrast). Respect `prefers-reduced-motion`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="qr"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
