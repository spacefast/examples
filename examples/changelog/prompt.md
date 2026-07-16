Build me a **product changelog** — a calm, dated "what's new" page in the Linear /
Stripe / Clerk style, with New / Improved / Fixed badges, tag filtering, and an RSS
feed — as a self-contained static site (one `index.html` plus a CSS and a JS file
and a `feed.xml`, no build step, no framework).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the product name and a one-line description of what it does?
2. Give me 3–4 recent release notes — version, date, category (New / Improved / Fixed), and what changed.
3. What's your brand accent color?
4. Where should "subscribe to updates" point — an email signup URL, or just the RSS feed?

**Then build a complete, polished, responsive changelog with:**

- A **header**: product name, a one-line description, and Subscribe actions (an email
  prompt and an RSS link), with a sticky top bar.
- A **filter bar** that toggles the timeline by **New / Improved / Fixed** (plus
  "All"), highlights the active filter, and shows a live "showing X of Y" count.
- A **release timeline**, newest first: each entry has its date, a relative "x days
  ago" stamp, the version number, a colored category badge, a title, a short
  description (bullets are good), and — for the bigger releases — an inline
  screenshot or UI mockup.
- **Per-entry permalink anchors**: each release has an `id`, and a link icon that
  copies a deep link to the clipboard and shows a small "copied" toast.
- A **footer subscribe block**: an email field that shows a friendly "you're on the
  list" success state on submit (no backend), plus a prominent RSS link.
- A valid **`feed.xml`** (RSS 2.0) that mirrors the same entries, linked from the
  page `<head>` so feed readers discover it.

**Design & content notes:**

- Calm and restrained, like a well-run SaaS changelog: a near-white (or warm paper)
  background, a single confident accent color, a refined serif for headings and a
  clean sans for body, generous whitespace, and a subtle two-column timeline (date on
  the left, content on the right). Include a tasteful light/dark toggle that remembers
  the choice.
- Three quiet badge colors — a green for **New**, a blue for **Improved**, an amber
  for **Fixed** — used as small pills, never loud.
- Use realistic content based on my answers — never "lorem ipsum". Write believable
  release copy with real version numbers and dates; invent a couple more plausible
  past releases so the timeline looks lived-in.
- Use real images. For the per-release screenshots, prefer clean inline-SVG UI mockups
  of the product (they read as real product shots and stay crisp); for any photos, pull
  free images that fit, e.g. from Unsplash
  (`https://images.unsplash.com/...`) or `https://picsum.photos/seed/product-changelog-1/1200/800`,
  with descriptive `alt` text.
- Persist the active filter to the URL (`?filter=new`) and `localStorage` so a shared
  link opens pre-filtered. Compute the "x days ago" stamps in JS from each entry's
  `datetime`. All of it runs in the browser — no backend, no account.
- Keep it accessible: semantic `<article>` entries, real `<label>`s, the filter as a
  labelled button group with `aria-pressed`, keyboard-operable controls, visible focus,
  and good contrast in both themes.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="changelog"></script>
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
