Build me a **marketing-and-schedule site for a one-day, single-track web development
conference** as an **Astro site** (static output, no SSR, no backend).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the conference name, tagline, and one-line theme?
2. What date is it, and in which city / at which venue?
3. Name 4–6 speakers with their talk titles (and companies, if you have them).
4. What are your ticket tiers and prices (e.g. Early Bird $199 / Standard $299)?

**Then build a complete, polished, responsive site with:**

- A full-bleed hero with the conference name, tagline, date, city/venue, a live
  countdown to the first talk, and a "Get tickets" call to action.
- An "About" section: the format, who it's for, and what to expect.
- A "Speakers" grid with photos, names, companies, and talk titles — each card
  expands to reveal the talk abstract.
- A "Schedule" — a single-track vertical timeline of talks, breaks, lunch, and the
  after-party, with times, speakers, and short notes.
- "Tickets" — Early Bird / Standard / Team pricing cards with feature lists, a
  highlighted "most popular" tier, and a sold-out state for early bird.
- "Venue & travel" — the venue with address and a map link, how to get there, and a
  few nearby hotels at different price points.
- "Sponsors" — a tiered logo wall (Platinum / Gold / Community) with a "Become a
  sponsor" link.
- "FAQ" plus a short "Code of Conduct" panel.
- A footer with social links and a newsletter signup that shows a friendly success
  message on submit.

**Design & content notes:**

- Modern, technical, confident: a near-black background, an electric teal→violet
  gradient as the one signature accent, a geometric display face for headings
  (e.g. Space Grotesk), a clean sans for body (Inter), and a mono face
  (JetBrains Mono) for labels, times, and the countdown.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  talk titles, abstracts, session times, hotel names, and sponsor names.
- Use real images. Pull free photos that fit — e.g. `https://picsum.photos/seed/<unique-seed>/1200/800`
  (vary the seed per image) or Unsplash direct URLs fitting "conference keynote
  speaker on stage", "tech conference audience in auditorium", "networking coffee
  break", and "modern convention center glass exterior" — each with descriptive
  `alt` text.
- Keep all content in a single `src/data/conf.ts` file so any detail is easy to
  change. Build the countdown, the mobile nav, the speaker-card expand, and the
  newsletter signup as small inline scripts — no heavy dependencies.
- Mobile-first and accessible: semantic HTML, labelled form fields, good contrast,
  keyboard support, and a visible focus style.

**Add this exact line right before `</body>` (in your layout) so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="conference"></script>
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
