# Kaze Ramen House — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **one-page website for my neighborhood ramen shop** as plain HTML & CSS
with a touch of vanilla JavaScript (no build step, no framework — just an
`index.html`, a stylesheet, and a small script).

**First, ask me these questions and wait for my answers:**

1. What's the shop's name and one-line vibe (e.g. "rich 18-hour tonkotsu, counter seating")?
2. What's your signature ramen plus 3–4 other menu items with prices?
3. What neighborhood/address are you in and what are your weekly hours?
4. Phone number and any Instagram or reservation link?

**Then build a complete, polished, responsive one-pager with:**

- A full-bleed hero: a big steaming bowl of tonkotsu behind the shop name, a short
  appetizing tagline, and two buttons — "View the menu" and "Find us & hours".
- A **menu** section grouped into Ramen, Small Plates / Gyoza, and Rice Bowls &
  Drinks, each item with a name, a one-line description, and a price (use a dotted
  leader line between name and price like a real menu). Star the house favorite and
  pull the signature bowl out into a featured card with its own photo. Include a
  small "build your bowl" toppings list with add-on prices.
- An **"Our Story"** section about the broth — who the chef is, how long the
  tonkotsu simmers, why the room feels the way it does — with a photo and a signature.
- A **photo gallery** of dishes and the room as a responsive grid, where tapping a
  photo opens it larger in a lightbox (keyboard + arrow-key navigation, Esc to close).
- A **Hours + Location** section: a styled hours table that highlights *today* and
  shows a live "Open now / Closed now · opens at…" badge computed in the browser, the
  full address, an embedded Google map, and a "Get directions" button.
- A **footer** with phone, email, a "walk-ins only / call ahead for big parties"
  reservations note, and Instagram / TikTok / map links.

**Design & content notes:**

- Warm izakaya mood: near-black charcoal-brown, washi-paper cream, one bold
  persimmon-red accent and a soft lantern-gold. An elegant serif (e.g. Shippori
  Mincho) for headings and the brand, a clean sans (e.g. Inter) for body. A small
  kanji/lantern flourish is welcome.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  dish descriptions, a chef backstory, and plausible hours.
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?tonkotsu,ramen,bowl`) or Pexels, with
  descriptive `alt` text. Good search terms: tonkotsu ramen bowl chashu soft egg
  overhead; steaming ramen bowl dark moody close up; pork gyoza dumplings on plate;
  japanese ramen shop interior wood counter lanterns.
- No build step — a single `index.html` plus a `styles.css` and a small `app.js`.
  Keep the JavaScript a progressive enhancement (the page must read fine if JS
  doesn't run) and persist nothing — it's a static site.
- Keep it accessible (semantic HTML, labelled controls, keyboard support for the
  menu and lightbox, good contrast, respects reduced-motion).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="menu"></script>
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
