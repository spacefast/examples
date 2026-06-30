# Tap-through — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **mobile-first "tap-through" landing page that a printed QR code points
to** — the screen someone sees right after they scan the code on my packaging,
poster, or table tent — as a **plain HTML & CSS** site with a little vanilla
JavaScript (a single `index.html` plus a CSS and JS file, no build step).

**First, ask me these questions and wait for my answers:**

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
- A **self-rendered QR code** — the page draws its *own* QR code (pointing at its
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
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  product details, addresses, and hours if I leave gaps.
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?product packaging close up`) or Pexels,
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
