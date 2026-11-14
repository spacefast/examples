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

**When the site is ready, publish it to Spacefast:**

1. Use `./dist` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./dist --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
