Build me a **mobile-first "link in bio" page for a food creator** as a single,
self-contained HTML file with CSS (no build step, no framework).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's your name, what do you make/create, and a one-line bio?
2. What's the single most important thing you want visitors to click right now (the primary CTA)?
3. List 4–6 links you want as buttons, with their labels and URLs.
4. Which social platforms should show, and do you have a recent video to feature?

**Then build a complete, polished, responsive one-pager with:**

- A centered profile header: round avatar (with a tasteful gradient ring), name with a small verified check, handle, a short bio, and a couple of topic "tags".
- One **highlighted primary CTA** card at the top that stands out from everything else (e.g. "Get my free meal-prep guide") with a kicker, title, and one-line subtitle.
- A vertical **stack of tappable link buttons** — each with a small thumbnail or icon, a title, a meta line, and a chevron. Add small "New" / "Pre-order" pills where it helps.
- A **featured latest video/reel** card: a 16:9 thumbnail with a play button overlay, a title, and a short caption, linking out.
- A row of **social icons** (Instagram, TikTok, YouTube, Pinterest — whichever I pick) as inline SVG, no icon library.
- A small **newsletter signup** (just an email field) that validates the address and shows a friendly "You're on the list" success state, and remembers it in `localStorage`.
- A subtle **footer** with a contact email.

**Design & content notes:**

- Warm, appetizing, editorial mood: cream background, a terracotta accent with a sage secondary, a serif display face (e.g. Fraunces) for headings and a clean sans (e.g. Inter) for body. Soft cards with gentle shadows and rounded corners; tasteful hover lift and a subtle entrance animation.
- Mobile-first: it should feel made for a phone — a single narrow column, big tap targets, then look great centered on desktop too.
- Write real-sounding copy from my answers — never "lorem ipsum". Invent believable recipe titles, link labels, follower counts, and a real-feeling bio voice.
- Use real images. Pull free food photos that fit from Unsplash, e.g. `https://images.unsplash.com/...` (food creator portrait, healthy meal-prep bowls, hands plating food, cozy kitchen herbs) or `https://picsum.photos/seed/food-links-1/240/240`, each with descriptive `alt` text.
- Keep it accessible (semantic HTML, a labelled email field, keyboard support, good contrast, `prefers-reduced-motion`). No build step — one `index.html`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="links"></script>
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
