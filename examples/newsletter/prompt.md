# Offcuts — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **typographic home and archive for my curated weekly newsletter** as a
small set of plain HTML & CSS pages (no build step, no framework). It should list
every numbered issue with a one-line blurb and render past issues as clean, readable
web pages with a prominent subscribe form.

**First, ask me these questions and wait for my answers:**

1. What's the newsletter's name and a one-line tagline?
2. What topic or niche does it cover?
3. Who's the author, and what's their short bio?
4. Give me 2–3 recent issue titles with a sentence of what each covered.

**Then build a complete, polished, responsive site with:**

- A **home page**: a short "what it is" intro, a featured/sample issue card, and an
  email subscribe form. Make the value obvious in one screen.
- An **issue archive**: a reverse-chronological list of numbered issues, each with
  its number, date, title, and a one-line summary. Make the rows feel like a real
  back catalogue (a dozen or so), linking to the full issues you write out.
- **Issue pages** (write out the recent ones in full): a numbered, dated header, a
  short intro/essay, a "hand-picked links" list with a sentence on each, and a
  "Tool of the week" callout. Add prev/next navigation between issues.
- An **about page** with the author's photo, bio, the why-behind-the-letter, and a
  couple of honest stats (issues sent, readers, cadence).
- A **subscribe page** with the email capture front-and-centre plus a short, plain
  "fine print" (cadence, privacy, how to leave).

**Design & content notes:**

- Editorial and typography-led: a warm paper background, near-black ink, one
  restrained accent colour, a characterful serif for display (e.g. Fraunces or
  Newsreader), a readable serif for body, and a small mono for labels and dates.
  Think Dense Discovery / The Browser — generous whitespace, real reading hierarchy,
  numbered issues, a drop cap on issue pages.
- Write real, specific copy from my answers — never "lorem ipsum". Invent believable
  issue titles, link blurbs, and a plausible issue number and dates.
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?minimal,desk,workspace`) or Picsum
  (`https://picsum.photos/seed/offcuts-1/1200/800`, varying the seed), for the
  sample issue, issue headers, and an author portrait — all with descriptive `alt`
  text matching: minimal desk workspace flatlay, stack of design books on a table,
  abstract textured paper background, author portrait at desk window light.
- The subscribe form should work client-side: validate the email and show a friendly,
  personalised "You're on the list" success state (no backend). Persist the
  subscriber in `localStorage` so returning readers see the confirmed state.
- Keep it accessible (semantic HTML, a skip link, labelled fields, keyboard support,
  good contrast).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="newsletter"></script>
```

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Zip the site (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to add next week's issue later? Edit the files and publish again; every version
  keeps its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
