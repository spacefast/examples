Build me a **landing page for an open-source developer tool** — a CLI with a one-line
install command, a star badge, and syntax-highlighted code samples — as a small static
**Astro site** (no SSR, no adapters — just `astro build`).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

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
- Use real images where they help. Pull free photos that fit, e.g.
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

**When the site is ready, publish it to Spacefast with the direct API — no account, install, or extra instructions needed:**

1. Use `./dist` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. First publish: send every file as multipart form data. This Bash/Zsh block preserves relative paths and works for one file or a whole folder:
   ```bash
   PUBLISH_ROOT=./dist
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

**Optional shortcuts and reference only:** if the `sf` CLI is already installed, `sf publish ./dist --wait` does the same job. A zip of the publish folder is also supported, but neither the CLI nor a zip is required. Docs: [direct agent/API publishing](https://spacefast.com/docs/agents) · [files and folders](https://spacefast.com/docs/publishing) · [claiming](https://spacefast.com/docs/anonymous-publish) · [updates and rollback](https://spacefast.com/docs/rollback)
