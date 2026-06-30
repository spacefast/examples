# Ironclad Barber Co. — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **single-page website for my barbershop** as a plain HTML & CSS site (no
build step, no framework — just `index.html`, `styles.css`, and a little `script.js`).

**First, ask me these questions and wait for my answers:**

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
- A booking form (name, phone, service, barber, preferred time) that validates and
  shows a friendly, personalized "You're on the books" success state — no backend.
- A footer with phone, directions, booking link, and socials.

**Design & content notes:**

- Masculine, classic-meets-modern barbershop mood: near-black charcoal background,
  warm cream paper, one brass/amber accent. Condensed uppercase display type
  (Oswald) for headings, clean sans (Inter) for body. Subtle hover lifts, no slop.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  barber names, bios, prices, and a couple of real-sounding reviews.
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

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Zip the site (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to change a price or your hours later? Edit the files and publish again; every
  version keeps its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
