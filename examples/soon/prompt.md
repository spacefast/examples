Build me a **single-screen "coming soon" teaser page** as a vanilla-JS app
(a single `index.html` plus a small CSS and JS file — no framework, no build step).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the product name, one-line promise, and intended audience?
2. What's the target launch date, and should the page show an exact date or a
   looser season/month?
3. Where should signups go, and what consent or privacy note belongs beside the
   form? (Give me the form endpoint or mailing-list URL, or say "demo only".)
4. Which contact and social links should appear, if any?

**Then build a complete, polished, responsive single screen with:**

- A small logo mark + product name, a confident serif headline, and the
  one-line promise underneath.
- A **live launch countdown** to the target date — days / hours / minutes /
  seconds, updating every second, with a tidy "Targeting <date>" line. When the
  date passes it should flip to a "We're live" state instead of going negative.
- An **email capture** with real validation (friendly inline errors for empty
  and malformed addresses) that swaps to a warm "You're on the list" success
  state on submit, and remembers a returning visitor via localStorage so they
  see the thank-you again instead of the form.
- A subtle **waitlist counter** ("Join N builders already waiting") that ticks up
  by one once you've joined.
- A row of **social links** (X, GitHub, LinkedIn) plus a contact email.

**Design & content notes:**

- Calm, premium, pre-dawn mood: a near-black base with a soft animated
  gradient "aurora" (amber → violet → rose) glowing up from the horizon, a
  frosted-glass card, and a fine film grain. A serif display face (e.g. Fraunces)
  for the headline and a clean sans (e.g. Inter) for everything else.
- Use realistic content based on my answers — never "lorem ipsum". Invent a
  believable promise and waitlist number if I leave gaps.
- This page can stand entirely on its CSS gradient atmosphere — no hero photo
  needed. If you do add imagery (e.g. an Open Graph preview), use real free
  photos that fit, e.g. `https://picsum.photos/seed/soon-og/1200/630`, with
  descriptive `alt` text.
- No build step — a single `index.html` with a linked CSS and JS file that opens
  straight in a browser. Drive the countdown from one editable `LAUNCH` date
  constant; make the form actually validate; persist the signup in localStorage.
- Keep it accessible (semantic HTML, a labelled email field, a skip link,
  keyboard support, `aria-live` on the countdown and form status, good contrast,
  and a `prefers-reduced-motion` fallback that stills the animation).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="soon"></script>
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
