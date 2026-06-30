# Sam Rivera — CV — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **clean, single-page web resume (CV)** as a **plain HTML & CSS** site —
one `index.html` plus a small CSS and JS file, no framework and no build step, so it
opens straight in a browser.

**First, ask me these questions and wait for my answers:**

1. What's your name and current role/title?
2. What are your 3–4 most recent roles? (employer, dates, and a line on what you did)
3. What key skills should I highlight, and do you want a "Download PDF" button?
4. Where should people reach you — email, location, and any links (site, LinkedIn)?

**Then build a complete, polished, responsive site with:**

- A **header** with my photo, name, role, a one-line summary, and a contact row
  (email, phone, location, website, LinkedIn) with small inline icons.
- A short **Profile** paragraph in my voice.
- An **Experience timeline** — each role with title, employer, dates, a one-line
  summary, and 2–3 bullet points that lead with concrete outcomes and numbers.
- A **Selected work** list with links to case studies or projects.
- A **Skills** sidebar — tag chips for craft and tools, plus a few labelled
  proficiency meters that fill in as they scroll into view.
- An **Education** block, and a small "Beyond work" / languages block.
- A **"Download PDF"** button that triggers the browser print dialog.

**Design & content notes:**

- Editorial and calm: an off-white canvas with a single white "paper" card, a
  serif display face (e.g. Fraunces) for headings and a clean sans (e.g. Inter)
  for body, one restrained accent color (a deep evergreen works well), and a real
  two-column layout (main + sidebar) that stacks on mobile.
- Include a dedicated **print-to-PDF stylesheet** (`@media print`) that hides the
  toolbar and badge, switches to high-contrast black ink, keeps the two columns,
  prevents roles from breaking across pages, and fits cleanly onto one page.
- Use realistic content based on my answers — never "lorem ipsum". Invent
  believable, specific bullet points (with numbers) if I leave gaps.
- Use real images. Pull free photos that fit — a professional headshot and a
  minimal desk/notebook footer image — e.g. from Unsplash
  (`https://source.unsplash.com/480x480/?professional,headshot,neutral`), and add
  descriptive `alt` text.
- No build step — a single `index.html` with a linked CSS and JS file. Make the
  "Download PDF" button call `window.print()`, and animate the proficiency meters
  with an `IntersectionObserver` (respecting `prefers-reduced-motion`).
- Keep it accessible (semantic HTML, a skip link, labelled contact links, good
  contrast, visible focus styles, keyboard support).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="resume"></script>
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
