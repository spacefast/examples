Build me a **personalized, one-page sales proposal site** — a "prepared for {client}"
page with scope, timeline, pricing tiers, and a working accept/sign button — as an
**Astro site** (a real, minimal Astro project I can build with `bun run build`).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's your service and the client name? (e.g. "a brand & website refresh, for Acme Co.")
2. What are the pricing tiers/options, with prices? (give me 2–3, and which one is recommended)
3. What are the scope bullets and the timeline (phases and rough weeks)?
4. Who's it from and what are the dates? (your studio name, the contact you're sending to, proposal date, and a "valid until" date)

**Then build a complete, polished, responsive site with:**

- A **cover** that reads "Prepared for {client}", with the project title, who it's
  prepared by and for, the date and proposal number, and three headline outcome
  stat cards.
- A short **intro letter** in the studio's voice, signed by a named person.
- A **scope of work** section: a grid of workstream cards, each with a one-line
  summary and a checklist of concrete, fixed-scope deliverables.
- A **timeline**: a vertical, gated timeline of phases — each with a week range, a
  short blurb, and the milestone that ends the phase.
- **Pricing tiers**: 2–3 selectable cards with price, cadence, feature checklist,
  and a "Recommended" badge on the middle one. Clicking a tier selects it and
  updates the accept form below.
- An **accept & sign** section: an agreement summary that reflects the selected
  tier (tier name, total, and a 40% deposit line that recomputes), and a sign form
  with full name, work email, a typed e-signature that must match the name, and an
  "I agree to the terms" checkbox. On submit it validates, shows a success state
  ("Thank you, {first name} — accepted!") with a signed receipt and reference
  number, and persists the acceptance in `localStorage` so it survives a refresh.
- A short **FAQ** and a **footer** with studio contact details.

**Design & content notes:**

- Premium, paper-light "studio proposal" mood: a warm off-white page, deep navy
  ink, and one confident amber accent. A characterful serif display face (e.g.
  **Fraunces**) for headings, a clean sans (**Inter**) for body, and a mono
  (**IBM Plex Mono**) for every figure and reference number.
- A dark navy cover and a dark navy accept/sign section bookend the light reading
  sections, with a subtle reading-progress bar at the top.
- Use realistic content based on my answers — never "lorem ipsum". Invent
  believable scope bullets, milestones, and terms if I leave gaps.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/proposal-1/1200/800` (vary the seed) or Pexels,
  and add descriptive `alt` text. Use a calm, professional handshake/office photo
  behind the cover, dimmed for contrast.
- Keep all the content in a single `src/data/proposal.ts` so swapping clients,
  scope, and pricing is a one-file edit; the markup reads from it.
- It's a real Astro project: `bun install && bun run build` must produce a `dist/`.
  Keep it fully static — no SSR, no adapters. The only client-side JS is a small
  inline script for tier selection and the accept/sign interaction.
- Mark the page `noindex` (a proposal isn't for search engines), and pair it with
  Spacefast's space password so only your client can open it.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, good
  contrast, and `prefers-reduced-motion` respected).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="proposal"></script>
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
