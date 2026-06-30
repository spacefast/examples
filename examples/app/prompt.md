# Tasklane — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **multi-view task-tracking app — a kanban board, a list view, and a
task detail drawer** as a **Vite + React app** that saves everything in the
browser (no backend, no accounts, all state in `localStorage`).

**First, ask me these questions and wait for my answers:**

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
  photos that fit, e.g. seeded `https://picsum.photos/seed/tasklane-1/96/96`
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

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Zip the site (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to change it later? Edit the files and publish again; every version keeps
  its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
