Build me a **clean, single-page web resume (CV)** as a **plain HTML & CSS** site —
one `index.html` plus a small CSS and JS file, no framework and no build step, so it
opens straight in a browser.

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

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
- Use my actual roles, experience, and achievements. Include numerical results only when I provide them. Ask for missing details instead of inventing qualifications.
- Use real images. Pull free photos that fit — a professional headshot and a
  minimal desk/notebook footer image — e.g.
  `https://picsum.photos/seed/headshot-1/480/480` (vary the seed), and add
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

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
