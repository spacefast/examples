# Plateful — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **single-page daily macro tracker** — a food diary that logs meals and
tracks calories plus protein/carbs/fat against my goals — as a **vanilla-JS app**
(one `index.html`, one CSS file, one JS file, no build step, no framework). Persist
everything in `localStorage` so my diary is still there when I come back.

**First, ask me these questions and wait for my answers:**

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
  real free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?healthy,meal,prep`) with descriptive
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

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Zip the site (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to change your goals or favorites later? Edit the files and publish again;
  every version keeps its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
