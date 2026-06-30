# Drift — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **landing page for an open-source developer tool** — a CLI with a one-line
install command, a star badge, and syntax-highlighted code samples — as a small static
**Astro site** (no SSR, no adapters — just `astro build`).

**First, ask me these questions and wait for my answers:**

1. What's the project name and the one-line description of what it does?
2. What's the install command and which ecosystem/language is it for (npm, pip, brew, cargo)?
3. What are the 3–4 key selling points (speed, type-safety, zero-config)?
4. What's the GitHub repo URL and do you have a Discord/community link?

**Then build a complete, polished, responsive site with:**

- A sticky **nav** with the logo, a version pill, section links, a GitHub star count, and
  a "Get started" button.
- A **hero**: the project name, a sharp tagline, a short blurb, and — front and center — a
  **copy-to-clipboard install command** (a `$ npm i …` box with a Copy button that flips
  to "Copied ✓"). Below it: "Get started" + "Star on GitHub" buttons and a row of the
  databases/platforms it supports.
- A **quick code example**: a terminal block showing the core four-command workflow, then
  a side-by-side "you write the schema → the tool writes the migration" pair, all
  **syntax-highlighted** (use Astro's built-in `<Code>` / Shiki — highlighted at build
  time, zero runtime JS).
- A **feature grid** (e.g. fast, type-safe, zero-config, framework-agnostic, reviewable
  output, safe rollbacks) — each with an icon, title, and a real sentence of detail.
- A **"How it works"** three-step flow (connect → generate → apply), each step showing the
  exact command.
- A **benchmark / comparison band**: horizontal bars comparing the tool to the status quo,
  with your tool highlighted, plus a short caveat note and a developer testimonial.
- A **"Used by" / sponsors logo wall** of plausible companies.
- A **community section**: GitHub, Discord, and Contributing cards, then a grid of docs
  link cards.
- A **footer** with product / docs / community / supported-DB columns and a license line.

**Design & content notes:**

- Developer-tool aesthetic: near-black background, one bright accent (a teal/mint that
  reads as "in sync"), a violet secondary for gradients, a faint grid in the hero. Use a
  geometric display face (e.g. Space Grotesk) for headings, a clean sans (Inter) for body,
  and a monospace (JetBrains Mono) for commands, code chrome, and labels.
- Write realistic content based on my answers — never "lorem ipsum". Invent believable
  code samples, feature copy, benchmark numbers, company names, and a testimonial.
- The install command and the code blocks are the heart of the page — make the copy button
  actually work (write to the clipboard, show a "Copied" state for ~2s, with a fallback for
  browsers without the async clipboard API).
- Use real images where they help. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?terminal,code,dark`) or
  `https://picsum.photos/seed/<your-seed>/1200/800` (vary the seed per image, e.g. for the
  testimonial avatar and the OG image), with descriptive `alt` text.
- Keep **all** the content (project, install command, features, steps, benchmark rows,
  logo wall, docs cards) in a single `src/data/site.ts` file so one edit updates the whole
  page. Split the page into small Astro components.
- Keep it accessible: semantic HTML, a skip link, labelled controls, keyboard support,
  visible focus rings, and good contrast. Preconnect the fonts; lazy-load below-the-fold
  images.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="cli"></script>
```

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Zip the site (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to bump the version or add a feature later? Edit `src/data/site.ts` and publish
  again; every version keeps its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
