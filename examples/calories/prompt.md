Build me a **single-page daily macro tracker** — a food diary that logs meals and
tracks calories plus protein/carbs/fat against my goals — as a **vanilla-JS app**
(one `index.html`, one CSS file, one JS file, no build step, no framework). Persist
everything in `localStorage` so my diary is still there when I come back.

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's your daily calorie goal, and your protein/carb/fat targets (in grams or percentages)?
2. What should the app be called, and whose diary is it (a name for the header)?
3. Any dietary style to theme it around — e.g. high-protein, keto, vegetarian, balanced?
4. List 4–6 go-to foods or meals you eat often so we can preload them as quick-add favorites (with rough calories/macros).

**Then build a complete, polished, responsive app with:**

- A **Today dashboard**: a big animated calorie ring (eaten vs. goal, showing
  calories remaining in the center) and protein/carbs/fat progress bars that fill
  toward each target and flag when I go over.
- A **meal diary** split into Breakfast, Lunch, Dinner, and Snacks. Each meal shows
  its running calorie subtotal; each logged item shows its calories and P/C/F, with
  a one-tap delete.
- An **add-food form** (in a dialog) with name, meal, calories, protein, carbs, fat,
  and a **servings multiplier** slider so I can log 1.5× of something. Typing the
  name of a known favorite autofills its macros.
- A **quick-add favorites** list of my go-to foods — one tap logs them into the meal
  that fits the time of day. The add form can also save a new food as a favorite.
- A **date switcher** (prev/next + a date picker, plus left/right arrow keys) so I
  can review or back-fill previous days. Each day keeps its own entries.
- A **goals & settings** dialog to edit my name, dietary style, and calorie + macro
  targets, with a live check that my macros add up to my calorie goal.
- A **weekly summary**: a 7-day calorie bar chart (today highlighted, on-target days
  in green) with average calories, average protein, and days-logged.

**Design & content notes:**

- Calm, modern dark UI: near-black background, warm coral as the primary/calorie
  accent, blue for carbs and gold for fat, a serif display face (e.g. Fraunces) for
  headings and a clean sans (e.g. Inter) for everything else. Rounded cards, soft
  shadows, smooth ring/bar animations.
- Preload the diary with realistic seed data for the named person and dietary style
  (a partly-logged "today" so the rings look alive, a full "yesterday," and a few
  prior days of plausible totals). Use believable food names and macro numbers —
  never "lorem ipsum."
- Food photos aren't required (the UI is data-first), but if you add any imagery use
  real free photos that fit, e.g.
  `https://picsum.photos/seed/meal-prep-1/1200/800` (vary the seed) with descriptive
  `alt` text. Emoji food icons are great for the favorites list.
- Persist all state in `localStorage` and keep it robust: write synchronously so
  nothing is lost if I close the tab right after logging.
- Keep it accessible (semantic HTML, real `<label>`s on every field, a
  `<dialog>`-based modal, keyboard support, good contrast, and `prefers-reduced-motion`
  respected).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="calories"></script>
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
