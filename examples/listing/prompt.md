# 1428 Vista Del Mar — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **single-property listing microsite for a home that's for sale** as a
Vite + React app.

**First, ask me these questions and wait for my answers:**

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
- A "Schedule a tour" form (name, phone, email, preferred date + time, message)
  that shows a friendly confirmation state on submit, beside an agent contact card.
- A footer with an MLS-style detail block and a "deemed reliable but not
  guaranteed / Equal Housing Opportunity" disclaimer.

**Design & content notes:**

- Coastal-luxury, editorial mood: warm ivory/sand background, deep ocean-ink text,
  a single brass accent, a serif display face (Cormorant Garamond) over a clean
  sans (Inter). Generous whitespace, soft shadows, no clutter.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  copy, room names, neighborhood landmarks, and an MLS number.
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://images.unsplash.com/photo-…?auto=format&fit=crop&w=1600&q=80`) or Pexels,
  for the exterior, living room, kitchen, primary suite, and pool, with descriptive
  `alt` text.
- Keep all the listing content in one `data.js` module so the site is easy to
  re-skin for another property. Persist nothing to a backend — the form and
  calculator are client-side only.
- Mortgage math: monthly P&I from the standard amortization formula; estimate tax
  (~1.18%/yr of price) and insurance (~0.35%/yr) so the total is realistic.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support for the
  lightbox, good contrast) and mobile-first.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="listing"></script>
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
