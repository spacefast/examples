Build me an **explorable pixel-art portfolio — a little room I can walk around where
each object reveals part of my work** as an **HTML5 canvas game** (a single,
self-contained `index.html` with all the JavaScript inline — no build step, no
framework, no image files; draw every sprite procedurally on a `<canvas>`).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's your name and the one-line title you want under it (e.g. "frontend engineer")?
2. Which 3–5 projects should the desk reveal — name, one-line description, tech stack, and link for each?
3. What's the short "about me" the bookshelf should tell, and what are your top skills for the resume poster?
4. What contact and social links should the mailbox open (email, GitHub, LinkedIn)?

**Then build a complete, polished, responsive canvas game with:**

- A cozy, tile-based room drawn in pixel art on a `<canvas>`: warm wood floor, a sage
  wall with a window, a rug, a plant, and a soft floor lamp. Keep a fixed low
  internal resolution (e.g. 320×208) and scale it up crisply with
  `image-rendering: pixelated`.
- A movable avatar with a real game loop: **arrow keys or WASD** to walk, a 4-direction
  walk-cycle animation, and AABB collision so it can't walk through furniture or walls.
- Four interactable objects, each with a "stand near it" trigger zone, a floating
  prompt, and **press E (or tap the object)** to open a panel:
  - **Desk / computer → Projects** — a card per project with description, tech tags, and a link.
  - **Bookshelf → About me** — the short story in my voice.
  - **Framed poster → Resume / skills** — skill bars plus a tiny work-history timeline.
  - **Mailbox → Contact** — email + social links as real, clickable rows.
- An intro overlay that explains the controls, with an "Enter the room" button.
- A mobile fallback: an on-screen D-pad + an action button, and tappable hotspots so
  the whole thing works by touch.

**Design & content notes:**

- Cozy 16-bit game mood: warm woods and a calm sage wall, one orange accent and one
  teal accent, a rounded display font for headings and a clean sans for body, plus a
  monospace for little code/label details. Dark frame around the canvas.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  project blurbs and a plausible work history if I'm light on detail.
- The panels are HTML overlays on top of the canvas, so the project links and contact
  rows are real, focusable, accessible links — not pixels.
- Optional polish: a tiny WebAudio "blip" when a panel opens, and a gentle bob on the
  interaction prompt.
- Keep it accessible: a descriptive `aria-label` on the canvas, real `<button>`s,
  labelled links, good contrast, Escape to close a panel, and keyboard support
  throughout. Respect `prefers-reduced-motion`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="portfolio"></script>
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
