# Northbound Studio — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **portfolio site for my brand &amp; web design studio** as a vanilla-JS app
(no build step, no framework — just `index.html`, `styles.css`, and a little `app.js`).

**First, ask me these questions and wait for my answers:**

1. What's the studio name and your one-line positioning?
2. What disciplines do you offer (branding, web, motion, packaging)?
3. Name 3–4 projects and their clients to feature as work.
4. What's the contact email and where are you based?

**Then build a complete, polished, responsive site with:**

- A bold, full-bleed statement hero — a big confident headline (e.g. "We build brands
  people remember"), a one-line studio description, two calls to action, and a few
  proof-point stats (founded year, brands shipped, team size).
- A **Selected work** section: a project grid where each card has a cover image,
  discipline tags, project name, and a one-line description. Add filter chips
  (All / Branding / Web / Motion) that **toggle the grid in JavaScript**, with a
  graceful empty state.
- A **featured case study** highlight on a dark band — short narrative, a few result
  stats, a client quote, and a **before/after** image you can toggle in JS.
- A **Services** list (brand identity, web design &amp; build, art direction, motion),
  numbered, each with a short description and a tag of sub-deliverables.
- An **About / studio philosophy** section with a couple of paragraphs in the studio's
  voice and a small team grid (photo, name, role).
- A **client logo strip** as a row of wordmarks.
- A **contact form** (name, email, project type, message) that validates inline and
  shows a friendly, personalized success state — no backend.
- A footer with the studio email, social links, and location.

**Design &amp; content notes:**

- Editorial boutique-studio mood: warm paper/cream background, near-black ink, and one
  bold accent (a vermilion/coral). Pair a high-contrast serif display (Fraunces) for
  headlines with a clean grotesque (Space Grotesk) for body. Generous whitespace, a
  thin running marquee of disciplines, subtle hover lifts and image zooms — no slop.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  project names, client quotes, result numbers, team members, and bios.
- Use real images. Pull free photos that fit, e.g. from
  `https://picsum.photos/seed/northbound-studio-1/1200/800` (vary the seed per image)
  or fitting Unsplash photos of branding mockup flatlays, a design-studio workspace,
  bold typographic posters, and packaging — all with descriptive `alt` text.
- Keep it accessible (semantic HTML, labelled form fields, good contrast, keyboard
  support, a skip link) and mobile-first with a working hamburger menu. Persist nothing
  to a server; do all interactivity (filter, before/after, form) in plain JS.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="studio"></script>
```

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Zip the site (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to add a new project later? Edit the files and publish again; every version
  keeps its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
