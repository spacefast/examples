<!--
  The canonical Spacefast example PROMPT template.

  Every examples/<slug>/prompt.md follows this shape. Replace the {{...}}
  placeholders. Keep the three fixed blocks intact: the setup questions, the
  badge line, and the publish-to-Spacefast instructions. The whole point is that
  a normal person can copy the part below the line into any agent and get the
  exact site — personalized by their answers — live on the web.
-->

# {{Example name}} — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **{{one-line description of the site}}** as a {{tech: plain HTML & CSS /
vanilla-JS app / Astro site / Vite + React app / HTML5 canvas game}}.

**First, ask me these questions and wait for my answers:**

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
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?{{photo terms}}`) or Pexels, and add
  descriptive `alt` text.
- {{tech specifics — e.g. "no build step, single index.html" or "use Astro
  content collections" or "persist state in localStorage"}}
- Keep it accessible (semantic HTML, labels, keyboard support, good contrast).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="{{slug}}"></script>
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
