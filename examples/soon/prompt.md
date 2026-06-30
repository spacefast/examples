# Soon by Northpeak — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **single-screen "coming soon" teaser page** as a vanilla-JS app
(a single `index.html` plus a small CSS and JS file — no framework, no build step).

**First, ask me these questions and wait for my answers:**

1. What's the product name and one-line promise?
2. What's the target launch date?
3. Where should signups go, or should we just demo the confirmation? (e.g. a form
   endpoint / mailing-list URL, or "demo only".)

**Then build a complete, polished, responsive single screen with:**

- A small logo mark + product name, a confident serif headline, and the
  one-line promise underneath.
- A **live launch countdown** to the target date — days / hours / minutes /
  seconds, updating every second, with a tidy "Targeting <date>" line. When the
  date passes it should flip to a "We're live" state instead of going negative.
- An **email capture** with real validation (friendly inline errors for empty
  and malformed addresses) that swaps to a warm "You're on the list" success
  state on submit, and remembers a returning visitor via localStorage so they
  see the thank-you again instead of the form.
- A subtle **waitlist counter** ("Join N builders already waiting") that ticks up
  by one once you've joined.
- A row of **social links** (X, GitHub, LinkedIn) plus a contact email.

**Design & content notes:**

- Calm, premium, pre-dawn mood: a near-black base with a soft animated
  gradient "aurora" (amber → violet → rose) glowing up from the horizon, a
  frosted-glass card, and a fine film grain. A serif display face (e.g. Fraunces)
  for the headline and a clean sans (e.g. Inter) for everything else.
- Use realistic content based on my answers — never "lorem ipsum". Invent a
  believable promise and waitlist number if I leave gaps.
- This page can stand entirely on its CSS gradient atmosphere — no hero photo
  needed. If you do add imagery (e.g. an Open Graph preview), use real free
  photos that fit, e.g. from Unsplash (`https://source.unsplash.com/1200x630/?minimal,gradient,sunrise`)
  or `https://picsum.photos/seed/soon-og/1200/630`, with descriptive `alt` text.
- No build step — a single `index.html` with a linked CSS and JS file that opens
  straight in a browser. Drive the countdown from one editable `LAUNCH` date
  constant; make the form actually validate; persist the signup in localStorage.
- Keep it accessible (semantic HTML, a labelled email field, a skip link,
  keyboard support, `aria-live` on the countdown and form status, good contrast,
  and a `prefers-reduced-motion` fallback that stills the animation).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="soon"></script>
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
