Build me a **scrollable, art-directed web zine — a single self-contained issue with
unconventional, magazine-style spreads** as a **plain HTML & CSS** site (one
`index.html`, no build step, no framework).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the theme/mood of the issue, and a title for it (e.g. "Night Bloom", "Concrete & Moss")?
2. What are the 4–6 spreads of content? (e.g. an editor's letter, a photo essay, a poem, an interview, field notes — tell me what each one is about.)
3. Aesthetic: retro-web, brutalist, or riso? (And any colors you want me to lean into.)
4. Optional: any real contributors, quotes, or images you want featured — otherwise I'll invent believable ones.

**Then build a complete, polished, responsive zine with:**

- A **cover spread**: the zine's name set huge in a display face, an issue number, a tagline for the theme, and a "scroll to turn the page" cue. Treat it like a real magazine cover.
- **4–6 art-directed spreads**, each filling the viewport and each visually distinct — for example: an editor's letter with a drop-cap, a photo essay in an asymmetric image mosaic, a full-bleed poem or pull-quote spread, an interview with Q&A and a pulled quote, and a "field notes" collage of cards.
- **Custom type + texture**: pair a bold display font with a serif body and a monospace for captions (load from Google Fonts). Add a film-grain and halftone-dot overlay so it reads as printed, not flat. Allow deliberate "misregistration" — offset color shadows on the headlines.
- A **colophon** spread: the fine print — who made it, what fonts and "inks" were used, contributors, and an **"issue-as-version"** note that frames each issue as a permanent, immutable version (it ties naturally to how Spacefast keeps every publish at its own URL).
- A running header that doubles as a **version tag** (e.g. "№01 · v1.0") and a spread counter that updates as you scroll.
- A small newsletter signup in the colophon that validates the email, shows a friendly confirmation, and remembers returning readers via `localStorage`.

**Design & content notes:**

- **Riso print aesthetic** by default: a warm uncoated-paper cream base with three
  fluorescent spot inks (e.g. fluorescent pink, federal blue, sunshine yellow) over a
  near-black key plate. Big condensed display type, generous negative space, off-kilter
  layouts. If I picked brutalist or retro-web instead, lean into that mood instead.
- Treat photos as **duotone riso prints**: desaturate them and tint each with a spot
  color via CSS blend modes, with a halftone dot pattern on top, so random photos still
  look like one cohesive printed issue.
- Use realistic content based on my answers — never "lorem ipsum". Write a real editor's
  letter, a real poem, a believable interview, real field notes.
- Use real images. Pull free photos that fit — e.g. `https://picsum.photos/seed/zine-1/1200/800?grayscale`
  (vary the seed per image) or direct Unsplash URLs matching `riso print texture colorful`
  and `experimental editorial layout` — and add descriptive `alt` text.
- **No build step** — a single `index.html` with the CSS in a `<style>` tag and a little
  vanilla JS for the scroll progress, spread counter, reveal-on-scroll, and the signup.
- Keep it accessible: semantic HTML, a labelled signup field, good contrast, and honor
  `prefers-reduced-motion` (no bobbing arrows or pulsing dots for those readers).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="zine"></script>
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
