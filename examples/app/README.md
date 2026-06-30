# Tasklane

A polished multi-view task tracker built as a minimal Vite + React app — no
backend, no accounts, everything saved in `localStorage`. It opens on a **kanban
board** whose cards drag between workflow lanes (Backlog → To Do → In Progress →
In Review → Done), each card showing labels, a priority dot, an assignee avatar,
a relative due date, a subtask progress bar, and a comment count. A **List view**
toggle shows the same tasks as a table you can sort by status, priority, or due
date and group by lane, collapsing cleanly on mobile.

Clicking any card opens a **detail drawer** that slides in from the right: edit
the title inline, change status / assignee / priority / due date / labels, write
a description, add and check off subtasks (with a live progress bar), and post
comments to an activity thread. The toolbar adds full-text **search** and
**filters** by person, priority, and label, and the header carries live sprint
stats with a conic-gradient "cycle done" ring.

It seeds a believable "Orbit — Q3 mobile sprint" with five teammates and a dozen
real tasks on first load, persists every edit (tasks, theme, and current view),
and ships a **reset** button plus a light/dark theme. Mobile-first, fully
keyboard-operable (Enter/Space opens a card, Esc closes the drawer), with good
contrast in both themes. Built from `prompt.md` and published to Spacefast — see
`meta.json` for the live link.

## Run it locally

```bash
cd site
bun install      # or npm install
bun run dev      # or npm run dev
```

Build the static bundle with `bun run build` — output lands in `site/dist/`.
