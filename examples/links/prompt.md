# Jess Park — Link in Bio — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **mobile-first "link in bio" page for a food creator** as a single,
self-contained HTML file with CSS (no build step, no framework).

**First, ask me these questions and wait for my answers:**

1. What's your name, what do you make/create, and a one-line bio?
2. What's the single most important thing you want visitors to click right now (the primary CTA)?
3. List 4–6 links you want as buttons, with their labels and URLs.
4. Which social platforms should show, and do you have a recent video to feature?

**Then build a complete, polished, responsive one-pager with:**

- A centered profile header: round avatar (with a tasteful gradient ring), name with a small verified check, handle, a short bio, and a couple of topic "tags".
- One **highlighted primary CTA** card at the top that stands out from everything else (e.g. "Get my free meal-prep guide") with a kicker, title, and one-line subtitle.
- A vertical **stack of tappable link buttons** — each with a small thumbnail or icon, a title, a meta line, and a chevron. Add small "New" / "Pre-order" pills where it helps.
- A **featured latest video/reel** card: a 16:9 thumbnail with a play button overlay, a title, and a short caption, linking out.
- A row of **social icons** (Instagram, TikTok, YouTube, Pinterest — whichever I pick) as inline SVG, no icon library.
- A small **newsletter signup** (just an email field) that validates the address and shows a friendly "You're on the list" success state, and remembers it in `localStorage`.
- A subtle **footer** with a contact email.

**Design & content notes:**

- Warm, appetizing, editorial mood: cream background, a terracotta accent with a sage secondary, a serif display face (e.g. Fraunces) for headings and a clean sans (e.g. Inter) for body. Soft cards with gentle shadows and rounded corners; tasteful hover lift and a subtle entrance animation.
- Mobile-first: it should feel made for a phone — a single narrow column, big tap targets, then look great centered on desktop too.
- Write real-sounding copy from my answers — never "lorem ipsum". Invent believable recipe titles, link labels, follower counts, and a real-feeling bio voice.
- Use real images. Pull free food photos that fit from Unsplash, e.g.
  `https://images.unsplash.com/...` (food creator portrait, healthy meal-prep bowls, hands plating food, cozy kitchen herbs) or `https://source.unsplash.com/240x240/?food,kitchen,portrait`, each with descriptive `alt` text.
- Keep it accessible (semantic HTML, a labelled email field, keyboard support, good contrast, `prefers-reduced-motion`). No build step — one `index.html`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="links"></script>
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
