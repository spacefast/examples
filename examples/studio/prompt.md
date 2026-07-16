Build me a **portfolio site for my brand &amp; web design studio** as a vanilla-JS app
(no build step, no framework — just `index.html`, `styles.css`, and a little `app.js`).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

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
