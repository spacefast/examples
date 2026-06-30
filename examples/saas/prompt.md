# Tideline — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **marketing site for a B2B SaaS product** (a Linear-style dark-mode
landing page) as an **Astro site** (static, no SSR — just `astro build` to plain
HTML/CSS).

**First, ask me these questions and wait for my answers:**

1. What's the product name and the one-sentence outcome it delivers (e.g. "plan, track, and ship product work in one place")?
2. Who is the target customer — what kind of team or role?
3. What are your 3–4 core features to highlight?
4. Do you have customer or company names to use as social proof, or should I use realistic placeholders?

**Then build a complete, polished, responsive site with:**

- A sticky nav with product / pricing / customers / docs links and a "Start free" CTA.
- A hero: a one-line outcome headline, a sub-headline, an email-only signup, and a hero product screenshot.
- A logo cloud / "trusted by" social-proof strip.
- Three or four feature deep-dives, alternating image + copy (e.g. issues, sprints/cycles, roadmap, keyboard-driven workflow), each with a short bulleted list of specifics.
- A metric / stat band ("Ship 30% faster") with three or four big numbers.
- Customer testimonial quotes with avatars, names, and companies.
- A pricing table — Free / Team / Enterprise — with a featured plan and a feature list per tier.
- An FAQ accordion (use native `<details>`).
- A footer CTA card plus a sitemap footer.

**Design & content notes:**

- Restrained, modern dark mode — near-black background, a single violet→cyan accent gradient, clean sans (Inter), tight letter-spacing on headings, generous whitespace. Think Linear / Vercel / Height.
- For the product "screenshots", build a stylised app UI mock in HTML/CSS (a window with a sidebar, an issues board, a burndown chart, a roadmap, a command menu) rather than a stock photo — it looks far sharper and stays fast. Use real avatar photos for testimonials.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable issue titles, company names, testimonials, and pricing.
- Use real images where photos make sense (testimonial avatars, any team shots). Pull free photos that fit, e.g. from Unsplash (`https://images.unsplash.com/...`) or `https://picsum.photos/seed/yourseed/96/96`, and add descriptive `alt` text.
- Put copy in an Astro data module and loop over it in the page; split the product mock into its own component.
- Keep it accessible (semantic HTML, a labelled email field, keyboard support, good contrast) and mobile-first (sidebar hides on small screens, plans stack, the featured plan floats to the top).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="saas"></script>
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
