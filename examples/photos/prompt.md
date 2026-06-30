# Eliot Vance Photography — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **calm, image-first portfolio for a landscape & travel photographer** as a
small static **Astro site** (no SSR, no adapters — just `astro build`).

**First, ask me these questions and wait for my answers:**

1. What's the photographer's name and one-line specialty (e.g. landscape, weddings, editorial)?
2. What are 3–4 photo series you want as galleries, and their names?
3. What's your contact email and Instagram handle?
4. Do you sell prints, or is this portfolio-and-inquiry only?

**Then build a complete, polished, responsive site with:**

- A **full-bleed hero** image with the photographer's name set large, the tagline, and
  the specialty + home base — a dark gradient keeps the type legible over the photo.
- A **work index** — a thumbnail grid of the named series (cover image, title, place,
  year, and a one-line blurb), each linking to its own gallery page.
- A **series gallery page** per series (`/series/<slug>`) with a **masonry grid** and a
  full-screen **lightbox** that is keyboard-navigable: click any frame to open, ← → to
  move between photos, `Esc` to close, with a caption and a `n / total` counter.
- An **About** page: bio in the photographer's voice, a headshot, a selected-client list,
  and a short recognition/press list.
- A **Prints / shop teaser**: a few open-edition sizes and prices, with a note that
  orders go through the contact form.
- A **Contact** section: a validating form (name, email, topic, message) that shows a
  warm, personalized success state on submit, plus direct email and Instagram links.

**Design & content notes:**

- Quiet, editorial, gallery-white mood: a warm ivory paper background, near-black ink,
  one muted oxblood accent used sparingly, lots of whitespace. An elegant serif
  (e.g. Fraunces) for the name and headings over a clean sans (e.g. Inter) for body.
  Let the photographs carry the page.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  series blurbs, photo captions, a bio, a client list, and print prices.
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?misty,mountain,landscape`) or
  `https://picsum.photos/seed/<your-seed>/1200/800` (vary the seed per image), with
  descriptive `alt` text. Use the black-and-white treatment for any portrait series.
- Keep all the content (photographer, series, photos, about, prints) in a single
  `src/data/portfolio.ts` file so one edit updates the whole site. Use Astro's
  `getStaticPaths` to generate one page per series.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, good
  contrast). Lazy-load below-the-fold images; preload the hero.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="photos"></script>
```

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Zip the site (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to add a new series later? Edit `src/data/portfolio.ts` and publish again; every
  version keeps its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
