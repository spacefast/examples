# OFFCUTS №01 — build your own web zine

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **scrollable, art-directed web zine — a single self-contained issue with
unconventional, magazine-style spreads** as a **plain HTML & CSS** site (one
`index.html`, no build step, no framework).

**First, ask me these questions and wait for my answers:**

1. What's the theme/mood of the issue, and a title for it (e.g. "Night Bloom", "Concrete & Moss")?
2. What are the 4–6 spreads of content? (e.g. an editor's letter, a photo essay, a poem, an interview, field notes — tell me what each one is about.)
3. Aesthetic: retro-web, brutalist, or riso? (And any colors you want me to lean into.)
4. Optional: any real contributors, quotes, or images you want featured — otherwise I'll invent believable ones.

**Then build a complete, polished, responsive zine with:**

- A **cover spread**: the zine's name set huge in a display face, an issue number, a tagline for the theme, and a "scroll to turn the page" cue. Treat it like a real magazine cover.
- **4–6 art-directed spreads**, each filling the viewport and each visually distinct — for example: an editor's letter with a drop-cap, a photo essay in an asymmetric image mosaic, a full-bleed poem or pull-quote spread, an interview with Q&A and a pulled quote, and a "field notes" collage of cards.
- **Custom type + texture**: pair a bold display font with a serif body and a monospace for captions (load from Google Fonts). Add a film-grain and halftone-dot overlay so it reads as printed, not flat. Allow deliberate "misregistration" — offset color shadows on the headlines.
- A **colophon** spread: the fine print — who made it, what fonts and "inks" were used, contributors, and an **"issue-as-version"** note that frames each issue as a permanent, immutable version (it ties naturally to how Spacefast keeps every publish at its own URL).
- A running header that doubles as a **version tag** (e.g. "№01 · v1.0") and a spread counter that updates as you scroll.
- A small newsletter signup in the colophon that validates the email, shows a friendly confirmation, and remembers returning readers via `localStorage`.

**Design & content notes:**

- **Riso print aesthetic** by default: a warm uncoated-paper cream base with three
  fluorescent spot inks (e.g. fluorescent pink, federal blue, sunshine yellow) over a
  near-black key plate. Big condensed display type, generous negative space, off-kilter
  layouts. If I picked brutalist or retro-web instead, lean into that mood instead.
- Treat photos as **duotone riso prints**: desaturate them and tint each with a spot
  color via CSS blend modes, with a halftone dot pattern on top, so random photos still
  look like one cohesive printed issue.
- Use realistic content based on my answers — never "lorem ipsum". Write a real editor's
  letter, a real poem, a believable interview, real field notes.
- Use real images. Pull free photos that fit — e.g. `https://picsum.photos/seed/zine-1/1200/800?grayscale`
  (vary the seed per image) or direct Unsplash URLs matching `riso print texture colorful`
  and `experimental editorial layout` — and add descriptive `alt` text.
- **No build step** — a single `index.html` with the CSS in a `<style>` tag and a little
  vanilla JS for the scroll progress, spread counter, reveal-on-scroll, and the signup.
- Keep it accessible: semantic HTML, a labelled signup field, good contrast, and honor
  `prefers-reduced-motion` (no bobbing arrows or pulsing dots for those readers).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="zine"></script>
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
