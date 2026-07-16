Build me a **calm, image-first portfolio for a landscape & travel photographer** as a
small static **Astro site** (no SSR, no adapters — just `astro build`).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the photographer's name and one-line specialty (e.g. landscape, weddings, editorial)?
2. What are 3–4 photo series you want as galleries, and their names?
3. What's your contact email and Instagram handle?
4. Do you sell prints, or is this portfolio-and-inquiry only?

**Then build a complete, polished, responsive site with:**

- A **full-bleed hero** image with the photographer's name set large, the tagline, and
  the specialty + home base — a dark gradient keeps the type legible over the photo.
- A **work index** — a thumbnail grid of the named series (cover image, title, place,
  year, and a one-line blurb), each linking to its own gallery page.
- A **series gallery page** per series (`/series/<slug>`) with a **masonry grid** and a
  full-screen **lightbox** that is keyboard-navigable: click any frame to open, ← → to
  move between photos, `Esc` to close, with a caption and a `n / total` counter.
- An **About** page: bio in the photographer's voice, a headshot, a selected-client list,
  and a short recognition/press list.
- A **Prints / shop teaser**: a few open-edition sizes and prices, with a note that
  orders go through the contact form.
- A **Contact** section: a validating form (name, email, topic, message) that shows a
  warm, personalized success state on submit, plus direct email and Instagram links.

**Design & content notes:**

- Quiet, editorial, gallery-white mood: a warm ivory paper background, near-black ink,
  one muted oxblood accent used sparingly, lots of whitespace. An elegant serif
  (e.g. Fraunces) for the name and headings over a clean sans (e.g. Inter) for body.
  Let the photographs carry the page.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  series blurbs, photo captions, a bio, a client list, and print prices.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/<your-seed>/1200/800` (vary the seed per image), with
  descriptive `alt` text. Use the black-and-white treatment for any portrait series.
- Keep all the content (photographer, series, photos, about, prints) in a single
  `src/data/portfolio.ts` file so one edit updates the whole site. Use Astro's
  `getStaticPaths` to generate one page per series.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, good
  contrast). Lazy-load below-the-fold images; preload the hero.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="photos"></script>
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
