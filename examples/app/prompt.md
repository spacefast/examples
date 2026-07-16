Build me a **multi-view task-tracking app — a kanban board, a list view, and a
task detail drawer** as a **Vite + React app** that saves everything in the
browser (no backend, no accounts, all state in `localStorage`).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What does the app track and who's it for (e.g. "a product sprint for a small
   mobile-app team", "my freelance client work", "a content calendar")?
2. What are the workflow lanes/columns (e.g. Backlog → To Do → In Progress →
   In Review → Done)?
3. Who's on the team — 3–5 names with a role each — and what labels do you use
   (e.g. Design, Frontend, Backend, Bug, Growth)?
4. Seed it with a believable starter set of ~12 tasks across the lanes, or tell
   me a project and I'll invent realistic ones.

**Then build a complete, polished, responsive app with:**

- A **kanban board**: one column per lane, each with a colored status dot, a live
  task count, and a quick "add task" button. Cards are **draggable between
  columns** (HTML5 drag-and-drop) and the target column highlights as you hover.
- **Cards** that show the title, label chips, a priority dot, an assignee avatar,
  a relative due-date pill (with "soon" and "overdue" states), a subtask
  progress bar, and a comment count — plus an optional cover image.
- A **List view** toggle: the same tasks as a sortable table grouped by status,
  sortable by status / priority / due date, collapsing to a clean stacked layout
  on mobile.
- A **task detail drawer** that slides in from the right: edit the title inline,
  change status / assignee / priority / due date / labels, edit the description,
  add and check off **subtasks** (with a live progress bar), and post **comments**
  to an activity thread. Includes a delete action. Closes on Esc or backdrop click.
- A **toolbar** with full-text **search** (matches title, description, and
  subtasks) and **filters** by person, priority, and label, with a one-click
  "clear filters" that shows how many tasks are visible.
- A **header** with at-a-glance stats: in-flight, shipped, overdue, and a
  conic-gradient ring for "cycle done" percent.
- **Seeded sample data** on first load and a **reset** button to restore it.
- A **light/dark theme** toggle.

**Design & content notes:**

- Modern productivity-tool aesthetic — think Linear / Trello / Height: a deep,
  slightly blue-tinted dark default with a soft radial glow, a violet accent
  (`#6d5efc`), crisp cards with subtle lift on hover, and rounded corners. Use
  **Sora** for headings and **Inter** for body. Ship a clean white light theme too.
- Use realistic content based on my answers — never "lorem ipsum". Invent
  believable task titles, owners, priorities, and short comment threads if I
  leave gaps.
- Use real images for the team avatars and the occasional card cover. Pull free
  photos that fit, e.g. seeded `https://picsum.photos/seed/team-avatar-1/96/96`
  (vary the seed) or Unsplash photos matching `kanban board sticky notes` /
  `team product planning workspace`, and add descriptive `alt` text.
- Persist all state (tasks, theme, current view) in `localStorage` so edits
  survive a refresh; reseed on reset.
- Keep it accessible: semantic HTML, labelled controls, keyboard support
  (Enter/Space to open a card, Esc to close the drawer, focus-visible rings),
  and good contrast in both themes. Mobile-first — the board stacks to a single
  column and the drawer goes full-width on small screens.
- Vite + React with `base: "./"` so it works from any subpath, and a
  `public/_redirects` file containing `/*  /index.html  200`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="app"></script>
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
