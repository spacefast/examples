Build me a **typographic home and archive for my curated weekly newsletter** as a
small set of plain HTML & CSS pages (no build step, no framework). It should list
every numbered issue with a one-line blurb and render past issues as clean, readable
web pages with a prominent subscribe form.

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

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
- Use real images. Pull free photos that fit, e.g. from Picsum
  (`https://picsum.photos/seed/newsletter-issue-1/1200/800`, varying the seed), for the
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
