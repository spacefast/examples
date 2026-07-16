Build me an **energetic landing page for a student hackathon** as a vanilla-JS app
(a single `index.html` plus `styles.css` and `app.js`, no framework, no build step).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the hackathon called and which school or org is hosting?
2. When does it start, and how long does it run (e.g. 36 hours starting Sat 10am)?
3. What are the prize amounts and any sponsor track names?
4. Who are your sponsors (a few names is fine)?

**Then build a complete, polished, responsive site with:**

- A bold hero with the event name, host school, dates, and a **live countdown timer**
  that ticks down to kickoff (days / hours / minutes / seconds). Handle the moment it
  goes live ("Hacking is live!") and after it ends ("That's a wrap — see you next year").
- An **About** section explaining what a hackathon is, who can join, team size (1–4),
  and that it's free — beginners explicitly welcome.
- A **Schedule** with a Saturday / Sunday day toggle that swaps the agenda: opening
  ceremony, workshops, meals, a midnight snack, judging, and the closing ceremony.
- A **Prizes & tracks** section: a hero grand prize plus sponsor category tracks
  (Best Beginner Hack, Best Use of AI, Best Hardware Hack, Best Design, etc.).
- A **Sponsors** section with tiered logos (Title / Gold / Startup) and a "Sponsor us" CTA.
- An **FAQ accordion** (do I need experience, what to bring, is travel reimbursed, can I come alone).
- A **Register** banner with a short form (name + email) that validates and shows a
  friendly "You're in!" success state.
- A footer with the **MLH Code of Conduct** link and Discord / Instagram / X links.

**Design & content notes:**

- Dark, high-energy hackathon mood: near-black indigo background, an electric-lime
  accent with a violet secondary and a coral pop, a faint dot-grid behind the hero,
  geometric display type (e.g. Space Grotesk) with a mono face (JetBrains Mono) for
  the countdown digits and timestamps.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  schedule items, prize tracks, sponsor names, and FAQ answers.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/ramhacks-2026-1/1200/800` (vary the seed per image),
  with descriptive `alt` text.
- The countdown, the day toggle, the FAQ accordion, and the form all run in plain
  vanilla JS — no framework, no build step, just three static files.
- Keep it accessible (semantic HTML, labelled fields, keyboard-operable tabs and
  accordion, good contrast, a skip link).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="hackathon"></script>
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
