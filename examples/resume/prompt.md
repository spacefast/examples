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
- Use realistic content based on my answers — never "lorem ipsum". Invent
  believable, specific bullet points (with numbers) if I leave gaps.
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

**When the site is ready, publish it to Spacefast with the direct API — no account, install, or extra instructions needed:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. First publish: send every file as multipart form data. This Bash/Zsh block preserves relative paths and works for one file or a whole folder:
   ```bash
   PUBLISH_ROOT=./site
   publish_files=()
   while IFS= read -r -d "" file; do
     relative=${file#"$PUBLISH_ROOT"/}
     publish_files+=(-F "files=@$file;filename=$relative")
   done < <(find "$PUBLISH_ROOT" -type f -print0)
   curl -sS "${publish_files[@]}" "https://api.spacefast.com/v1/publish?wait=1"
   ```
3. From the `{ "data": ... }` receipt, give me `data.space.liveUrl`, `data.version.immutableUrl`, `data.claim.url`, and `data.claim.expiresAt`. Remind me to claim within 6 hours. Keep `data.claim.token` secret.
4. Save `data.space.id` and `data.claim.token` locally (for example in an ignored, mode-600 `.spacefast/state.json`). For a quick update, rebuild the `publish_files` array above and publish to the same space:
   ```bash
   SPACEFAST_SPACE_ID=<saved-space-id>
   SPACEFAST_TOKEN=<saved-claim-token-or-access-token>
   curl -sS -H "Authorization: Bearer $SPACEFAST_TOKEN" \
     -F "spaceId=$SPACEFAST_SPACE_ID" "${publish_files[@]}" \
     "https://api.spacefast.com/v1/publish?wait=1"
   ```
   If an update after claiming returns `space_claimed_credential_available`, exchange the saved claim token once at `POST https://api.spacefast.com/v1/anonymous-claim/exchange`, save `data.credential.accessToken`, and retry with that access token.

**Optional shortcuts and reference only:** if the `sf` CLI is already installed, `sf publish ./site --wait` does the same job. A zip of the publish folder is also supported, but neither the CLI nor a zip is required. Docs: [direct agent/API publishing](https://spacefast.com/docs/agents) · [files and folders](https://spacefast.com/docs/publishing) · [claiming](https://spacefast.com/docs/anonymous-publish) · [updates and rollback](https://spacefast.com/docs/rollback)
