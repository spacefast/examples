# Avery Chen's Room — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me an **explorable pixel-art portfolio — a little room I can walk around where
each object reveals part of my work** as an **HTML5 canvas game** (a single,
self-contained `index.html` with all the JavaScript inline — no build step, no
framework, no image files; draw every sprite procedurally on a `<canvas>`).

**First, ask me these questions and wait for my answers:**

1. What's your name and the one-line title you want under it (e.g. "frontend engineer")?
2. Which 3–5 projects should the desk reveal — name, one-line description, tech stack, and link for each?
3. What's the short "about me" the bookshelf should tell, and what are your top skills for the resume poster?
4. What contact and social links should the mailbox open (email, GitHub, LinkedIn)?

**Then build a complete, polished, responsive canvas game with:**

- A cozy, tile-based room drawn in pixel art on a `<canvas>`: warm wood floor, a sage
  wall with a window, a rug, a plant, and a soft floor lamp. Keep a fixed low
  internal resolution (e.g. 320×208) and scale it up crisply with
  `image-rendering: pixelated`.
- A movable avatar with a real game loop: **arrow keys or WASD** to walk, a 4-direction
  walk-cycle animation, and AABB collision so it can't walk through furniture or walls.
- Four interactable objects, each with a "stand near it" trigger zone, a floating
  prompt, and **press E (or tap the object)** to open a panel:
  - **Desk / computer → Projects** — a card per project with description, tech tags, and a link.
  - **Bookshelf → About me** — the short story in my voice.
  - **Framed poster → Resume / skills** — skill bars plus a tiny work-history timeline.
  - **Mailbox → Contact** — email + social links as real, clickable rows.
- An intro overlay that explains the controls, with an "Enter the room" button.
- A mobile fallback: an on-screen D-pad + an action button, and tappable hotspots so
  the whole thing works by touch.

**Design & content notes:**

- Cozy 16-bit game mood: warm woods and a calm sage wall, one orange accent and one
  teal accent, a rounded display font for headings and a clean sans for body, plus a
  monospace for little code/label details. Dark frame around the canvas.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  project blurbs and a plausible work history if I'm light on detail.
- The panels are HTML overlays on top of the canvas, so the project links and contact
  rows are real, focusable, accessible links — not pixels.
- Optional polish: a tiny WebAudio "blip" when a panel opens, and a gentle bob on the
  interaction prompt.
- Keep it accessible: a descriptive `aria-label` on the canvas, real `<button>`s,
  labelled links, good contrast, Escape to close a panel, and keyboard support
  throughout. Respect `prefers-reduced-motion`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="portfolio"></script>
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
