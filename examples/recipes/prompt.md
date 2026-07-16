Build me a **weeknight recipe blog with a filterable recipe index and printable, scalable recipe pages** as a **Vite + React app** (keep dependencies minimal — just React; no UI kit).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's your name and the blog's name?
2. What cuisine or style is the focus (e.g. Mediterranean weeknight, baking, one-pot)?
3. Give me 3–5 starter recipes, including one signature dish, with ingredients and steps.
4. Which dietary tags should the filters support (e.g. vegetarian, gluten-free, 30-minute)?

**Then build a complete, polished, responsive site with:**

- **Home** — a full-bleed hero featuring this week's signature recipe (big title, blurb, "Get the recipe" button) plus a "Fresh from the kitchen" grid of the latest recipes.
- **Recipe index** — every recipe as a card, with a live search box (matches title and ingredients) and chip filters for course, cuisine, and dietary tags. The result count updates as I filter, and there's a friendly empty state and a "clear filters" button.
- **Recipe page** — hero photo, intro in the cook's voice, a prep / cook / total / serves stat bar, an **ingredients list with a serving-size scaler** (a slider plus +/− that recomputes every quantity into nice kitchen fractions like ¾ and 1½), checkable ingredients, a numbered step-by-step method, and a "Nora's tip" callout.
- **Print card** — a "Print card" button that opens the browser print dialog showing a clean, single-page card (title, scaled ingredients, numbered method, tip) with all the site chrome hidden via a print stylesheet.
- **About the cook** — a warm, personal bio with a photo and a few playful stats.
- **Newsletter / save-this-recipe signup** — name + email that validates the email and shows a friendly "You're on the list!" success state on submit.

**Design & content notes:**

- Warm, appetizing editorial feel: cream paper background, a copper/terracotta accent, a deep-olive secondary, an elegant serif (e.g. Fraunces) for headings and a clean sans (e.g. Inter) for body. Generous whitespace, rounded cards, soft shadows.
- Write real, specific recipe copy from my answers — never "lorem ipsum". Invent believable intros, quantities, steps, and tips. Make the signature dish genuinely appealing.
- Use real images. Pull free food photos that fit each recipe, e.g.
  `https://picsum.photos/seed/pasta-1/1200/800` (vary the seed for ingredients, dessert, and a cook-in-the-kitchen shot), with descriptive `alt` text.
- Use a small client-side hash router so Home / Recipes / each recipe / About are real shareable URLs, and keep the serving scaler state on each recipe page.
- Keep it accessible (semantic HTML, labelled form fields and filters, keyboard support, good contrast) and mobile-first (collapsing nav, filters stack above results on small screens).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="recipes"></script>
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
