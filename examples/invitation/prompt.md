# Maya & Daniel — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me an **elegant multi-section wedding website** as an **Astro site** (a real
minimal Astro project — `package.json`, `astro.config.mjs`, `src/pages/index.astro`,
small components, no SSR adapter — that builds to static files with `astro build`).

**First, ask me these questions and wait for my answers:**

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
- **RSVP form** — full name, email, accept/decline, guest count, meal preference, and
  a song request. It must **validate** (required fields, real email), reveal the
  meal/guest/song fields only when someone is attending, and show a warm **success
  state** that echoes their choices. No backend — handle it client-side.
- **FAQ** — an accordion answering plus-ones, kids, parking, weather, and the RSVP
  deadline.
- A **footer** with our names, the date, and our hashtag.

**Design & content notes:**

- Warm editorial wedding aesthetic: ivory/cream background, deep olive green, a
  terracotta accent, and thin gold rules. An elegant serif (e.g. Cormorant Garamond)
  for headings paired with a clean humanist sans (e.g. Mulish) for body. Generous
  whitespace, a quiet ornament divider, subtle hover motion.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  copy: a real story, plausible travel logistics, specific meal names, real FAQ
  answers.
- Use real images. Pull free photos that fit, e.g. from Picsum
  (`https://picsum.photos/seed/our-wedding-1/1200/800`, varying the seed per image) or
  real Unsplash direct URLs (`https://images.unsplash.com/...`) matching terms like
  _engaged couple vineyard golden hour_, _outdoor wedding ceremony arch string
  lights_, _wedding table setting florals candles_, _couple holding hands walking
  countryside_ — with descriptive `alt` text.
- Keep dependencies minimal (just `astro`). Put all the wedding content in one
  `src/data/wedding.ts` file so a single edit updates the whole site. Persist nothing
  server-side; the RSVP success state is purely client-side.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, visible
  focus, good contrast) and mobile-first.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="invitation"></script>
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
