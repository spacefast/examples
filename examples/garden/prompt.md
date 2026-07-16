Build me a **one-page website for my neighborhood community garden** as plain HTML &
CSS with a touch of vanilla JavaScript (no build step, no framework — just an
`index.html`, a stylesheet, and a small script).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the garden's name and which neighborhood or street is it on?
2. What plot sizes do you rent and what's the annual fee for each?
3. How many volunteer hours are members expected to contribute (e.g. 2 hours/month)?
4. What's the best contact email or person for the waitlist?

**Then build a complete, polished, responsive one-pager with:**

- A full-bleed **hero**: the garden's name big over a sunny raised-beds photo, the
  neighborhood and "since {year}" as a tagline, and two buttons — "Join the plot
  waitlist" and "See plots & pricing".
- An **About** section: the garden's mission and a short origin story (an empty lot
  turned into beds), who tends it (volunteer-run, a steering committee), and a little
  stat strip (number of beds, member households, volunteer hours, % organic).
- A **Plots & pricing** section: a card per bed size (e.g. 4×4, 4×8, 4×12, plus a
  waist-high accessible bed) with dimensions, the annual fee, and a one-line pitch —
  flag the most popular — followed by an "every plot includes" list (water, shared
  tools, compost, seed library, gate access) and a quiet note about a scholarship
  fund.
- A **How to join** section: a 3-step explainer and a **waitlist signup form** (name,
  email, street/block, preferred bed size, optional note). On submit it validates and
  shows a friendly "You're on the list" success state — and remembers the visitor with
  `localStorage` so a return visit greets them. State the **48-hour response policy**.
- A **Volunteer workdays** section: explain the required hours, list the ways to
  contribute, and show a live "next drop-in workday" badge computed in the browser
  (e.g. the 2nd Saturday of the month, 9 am–12 pm).
- A **Garden rules** section: five or six friendly rule cards — organic-only, tend
  your plot, share the commons, be a good neighbor, water wisely, log your hours.
- An **Events** section: a dated list of seasonal events — a seed swap, a spring
  kickoff, summer potlucks, and a harvest festival — each with a date chip, time, and
  a sentence of flavor.
- A **Find us** section: address, gate-access notes (members keyed in, visitors
  welcome on workdays, accessible entrance), an embedded Google map, and a "Get
  directions" button.
- A **photo gallery** of the beds across the seasons as a responsive grid, where
  tapping a photo opens it larger in a lightbox (keyboard + arrow-key navigation, Esc
  to close).
- A **footer** with the address, email, quick links, and Instagram / email / map
  icons.

**Design & content notes:**

- Warm, growing mood: deep leaf-green and soil-brown with a terracotta accent and a
  touch of sun-gold, all on a cream-paper background. A friendly serif (e.g. Fraunces)
  for headings and the brand, a clean sans (e.g. Inter) for body. Small leaf/sprout
  flourishes are welcome.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  bed descriptions, an origin story, plausible event dates, and a coordinator's name.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/community-garden-1/1200/800` (vary the seed) or Pexels,
  with descriptive `alt` text. Good search terms: community garden raised beds
  vegetables volunteers; hands planting seedlings in soil close up; ripe tomatoes and
  leafy greens garden harvest; community potluck outdoor table garden.
- No build step — a single `index.html` plus a `styles.css` and a small `app.js`.
  Keep the JavaScript a progressive enhancement (the page must read fine if JS
  doesn't run); the only thing it persists is the visitor's own "I joined" flag.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support for the
  form and lightbox, good contrast, respects reduced-motion).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="garden"></script>
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
