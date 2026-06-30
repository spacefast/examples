# The Copper Skillet — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **weeknight recipe blog with a filterable recipe index and printable, scalable recipe pages** as a **Vite + React app** (keep dependencies minimal — just React; no UI kit).

**First, ask me these questions and wait for my answers:**

1. What's your name and the blog's name?
2. What cuisine or style is the focus (e.g. Mediterranean weeknight, baking, one-pot)?
3. Give me 3–5 starter recipes, including one signature dish, with ingredients and steps.
4. Which dietary tags should the filters support (e.g. vegetarian, gluten-free, 30-minute)?

**Then build a complete, polished, responsive site with:**

- **Home** — a full-bleed hero featuring this week's signature recipe (big title, blurb, "Get the recipe" button) plus a "Fresh from the kitchen" grid of the latest recipes.
- **Recipe index** — every recipe as a card, with a live search box (matches title and ingredients) and chip filters for course, cuisine, and dietary tags. The result count updates as I filter, and there's a friendly empty state and a "clear filters" button.
- **Recipe page** — hero photo, intro in the cook's voice, a prep / cook / total / serves stat bar, an **ingredients list with a serving-size scaler** (a slider plus +/− that recomputes every quantity into nice kitchen fractions like ¾ and 1½), checkable ingredients, a numbered step-by-step method, and a "Nora's tip" callout.
- **Print card** — a "Print card" button that opens the browser print dialog showing a clean, single-page card (title, scaled ingredients, numbered method, tip) with all the site chrome hidden via a print stylesheet.
- **About the cook** — a warm, personal bio with a photo and a few playful stats.
- **Newsletter / save-this-recipe signup** — name + email that validates the email and shows a friendly "You're on the list!" success state on submit.

**Design & content notes:**

- Warm, appetizing editorial feel: cream paper background, a copper/terracotta accent, a deep-olive secondary, an elegant serif (e.g. Fraunces) for headings and a clean sans (e.g. Inter) for body. Generous whitespace, rounded cards, soft shadows.
- Write real, specific recipe copy from my answers — never "lorem ipsum". Invent believable intros, quantities, steps, and tips. Make the signature dish genuinely appealing.
- Use real images. Pull free food photos that fit each recipe, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?overhead,pasta,rustic` and similar for ingredients, dessert, and a cook-in-the-kitchen shot), with descriptive `alt` text.
- Use a small client-side hash router so Home / Recipes / each recipe / About are real shareable URLs, and keep the serving scaler state on each recipe page.
- Keep it accessible (semantic HTML, labelled form fields and filters, keyboard support, good contrast) and mobile-first (collapsing nav, filters stack above results on small screens).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="recipes"></script>
```

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Zip the site (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to add a recipe later? Edit the files and publish again; every version keeps
  its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
