Build me a **quiet, dignified memorial tribute page for someone I've lost** as a
plain HTML & CSS site (a single `index.html`, no framework and no build step).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. Whose memorial is this — their full name, the years (born–passed), and a short epitaph or line they lived by?
2. Share a short life story (a paragraph or two is plenty) and 5–6 photos or moments worth featuring.
3. What service or celebration details should I include — date, time, place, reception, live stream, and any donation request in lieu of flowers?
4. Should visitors be able to leave memories, and if so should entries stay on
   this device, be sent somewhere for review, or link to an existing guestbook?

**Then build a complete, polished, responsive site with:**

- A serene **hero**: a framed portrait, their name, the years, and the epitaph centered beneath a thin gold rule.
- A **life story** section: flowing prose with a drop cap and one pull-quote, followed by a simple vertical timeline of life milestones.
- A **photo gallery**: a responsive grid of photographs that open in a click-to-enlarge lightbox with captions, keyboard navigation (arrow keys, Escape), and previous/next buttons.
- A **service & celebration** block: cards for the memorial service, the reception, and a live-stream note (date, time, address, and a "directions" link each), plus an "in lieu of flowers" donation card.
- A **memory wall**: a few heartfelt seeded memories, and a form (name + message) that validates, shows a gentle thank-you confirmation, and saves new memories so they appear on the wall and persist on return via `localStorage`.
- A soft footer with the name, the years, and a single candle motif.

**Design & content notes:**

- Tone is everything: warm and calm, never clinical. Use an ivory/cream base, soft sage green and a muted gold accent, and deep warm-charcoal text. Pair an elegant serif display face (e.g. Cormorant Garamond) for headings with a readable serif (e.g. EB Garamond) for body text.
- Render the portrait and gallery photographs in soft black-and-white so any source images feel like timeless family archives.
- Use realistic content based on my answers — never "lorem ipsum". Write the life story, timeline, and seeded memories in a tender, human voice; invent believable details only to fill small gaps.
- Use real images. Pull free photos that fit, e.g. from picsum (`https://picsum.photos/seed/memorial-1/1200/800?grayscale`, varying the seed) or Unsplash (`soft floral arrangement`, `candle warm memorial light`), and add descriptive `alt` text.
- No build step — a single `index.html` with embedded CSS and a small script. Make the lightbox and the memory-wall form genuinely work; persist memories in `localStorage`.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, focus management in the lightbox, good contrast) and respect `prefers-reduced-motion`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="memorial"></script>
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
