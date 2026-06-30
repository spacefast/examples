# Kimchi Taco Co. — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **mobile-first website for my food truck whose centerpiece is a weekly
schedule that auto-highlights where the truck is parked today** as a vanilla-JS app
(single `index.html` plus `styles.css` and `app.js` — no build step, no framework).

**First, ask me these questions and wait for my answers:**

1. What's the truck's name and cuisine / signature item?
2. What are 3–5 menu items with prices?
3. Where will you be each day this week (day, place, hours)?
4. Instagram handle and a catering contact email?

**Then build a complete, polished, responsive site with:**

- A full-bleed hero with a truck photo, the name big, a tagline, and a **live
  "We're at … today" banner** that JavaScript fills in from the schedule (and shows
  "Open now / Opens at … / next stop on …" depending on the current day and time).
- A **"This week's route"** section: a list of day → location → hours, ordered so
  today comes first and today's row is visually highlighted. Each open day has a
  one-tap **Directions** link that opens Google Maps to that address. Day-off rows
  read as closed.
- A **Menu** grouped into tacos, burritos/bowls, sides, and drinks, each item with a
  price and a one-line description; mark veg options.
- A **Catering / private events** blurb with perks and a **quote-request form** that
  validates name + email and shows a friendly success state on submit (plus a
  `mailto:` and `tel:` fallback).
- A **gallery strip** of food/truck photos.
- A footer with contact info and Instagram / TikTok links.

**Design & content notes:**

- Bright, appetizing food-truck mood: warm cream paper background, a bold chili-red
  primary with gochujang-orange and sesame-gold accents, near-black warm ink for
  text. Big condensed display type (e.g. Anton) for headings, clean Inter for body.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  LA-style stops, menu copy, and prices if I'm vague.
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?korean,tacos,food-truck`) or
  `https://picsum.photos/seed/kimchi-taco-truck-1/1200/800` (vary the seed per
  image), with descriptive `alt` text.
- Put the schedule as data in `app.js` (days indexed Sun=0…Sat=6, open/close as
  minutes from midnight) and compute "today" + "open now" client-side. Build the
  Google Maps links with `https://www.google.com/maps/dir/?api=1&destination=`.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, good
  contrast) and mobile-first.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="foodtruck"></script>
```

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Zip the site (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to change a stop later? Edit the files and publish again; every version keeps
  its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
