# Tally

A polished habit tracker built as a minimal Vite + React app — no backend, no
accounts, everything saved in `localStorage`. The **Today** panel lists every habit
with one-tap check-offs and a progress ring, while a combined GitHub-style "Your year"
heatmap grades how many habits you finished each day. Each habit gets its own card
with a contribution heatmap and live current-streak, longest-streak, and 30-day
completion-rate stats; the detail view adds a click-to-toggle 12-month grid and a
month calendar, and Settings covers week-start, light/dark theme, and reset. It seeds
a believable year of history on first load, has correct streak math (today counts once
you check it; the streak stays alive from yesterday until then), and works mobile-first
with full keyboard and light/dark support. Built from `prompt.md` and published to
Spacefast — see `meta.json` for the live link.
