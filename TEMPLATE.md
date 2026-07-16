Build me a **{{one-line description of the site}}** as a {{tech: plain HTML & CSS /
vanilla-JS app / Astro site / Vite + React app / HTML5 canvas game}}.

**Before you build, ask me these questions in one message and wait for my answers.
If I skip anything, choose a sensible default and tell me what you chose:**

1. {{setup question 1 — e.g. "What's your band's name?"}}
2. {{setup question 2 — e.g. "What genre, in 2–3 words?"}}
3. {{setup question 3}}
4. {{setup question 4 (optional)}}

**Then build a complete, polished, responsive site with:**

- {{section / page 1}}
- {{section / page 2}}
- {{section / page 3}}
- {{...}}

**Design & content notes:**

- {{visual direction — palette, type, mood}}
- Use realistic content based on my answers — never "lorem ipsum".
- Use real images. Pull free photos that fit from Unsplash or Pexels, and add
  descriptive `alt` text.
- {{tech specifics — e.g. "no build step" or "persist state in localStorage"}}
- Keep it accessible (semantic HTML, labels, keyboard support, good contrast).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="{{slug}}"></script>
```

**When the site is ready, publish it to Spacefast with the direct API — no
account, install, or extra instructions needed:**

1. Use `./dist` as the publish folder. For no-build projects, put only the
   finished public files in that dedicated folder. Confirm it has `index.html`
   at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. First publish: send every file as multipart form data. This Bash/Zsh block
   preserves relative paths and works for one file or a whole folder:
   ```bash
   publish_files=()
   while IFS= read -r -d '' file; do
     relative=${file#./dist/}
     publish_files+=(-F "files=@$file;filename=$relative")
   done < <(find ./dist -type f -print0)
   curl -sS "${publish_files[@]}" "https://api.spacefast.com/v1/publish?wait=1"
   ```
3. From the `{ "data": ... }` receipt, give me `data.space.liveUrl`,
   `data.version.immutableUrl`, `data.claim.url`, and `data.claim.expiresAt`.
   Remind me to claim within 6 hours. Keep `data.claim.token` secret.
4. Save `data.space.id` and `data.claim.token` locally (for example in an
   ignored, mode-600 `.spacefast/state.json`). For a quick update, rebuild the
   `publish_files` array above and publish to the same space:
   ```bash
   SPACEFAST_SPACE_ID=<saved-space-id>
   SPACEFAST_TOKEN=<saved-claim-token-or-access-token>
   curl -sS -H "Authorization: Bearer $SPACEFAST_TOKEN" \
     -F "spaceId=$SPACEFAST_SPACE_ID" "${publish_files[@]}" \
     "https://api.spacefast.com/v1/publish?wait=1"
   ```
   If an update after claiming returns `space_claimed_credential_available`,
   exchange the saved claim token once at
   `POST https://api.spacefast.com/v1/anonymous-claim/exchange`, save
   `data.credential.accessToken`, and retry with that access token.

**Optional shortcuts and reference only:** if the `sf` CLI is already installed,
`sf publish ./dist --wait` does the same job. A zip of the publish folder is also
supported, but neither the CLI nor a zip is required. Docs:
[direct agent/API publishing](https://spacefast.com/docs/agents) ·
[files and folders](https://spacefast.com/docs/publishing) ·
[claiming](https://spacefast.com/docs/anonymous-publish) ·
[updates and rollback](https://spacefast.com/docs/rollback)
