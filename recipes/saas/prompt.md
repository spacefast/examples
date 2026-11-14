Build me a **marketing site for a B2B SaaS product** (a Linear-style dark-mode
landing page) as an **Astro site** (static, no SSR — just `astro build` to plain
HTML/CSS).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the product name and the one-sentence outcome it delivers (e.g. "plan, track, and ship product work in one place")?
2. Who is the target customer — what kind of team or role?
3. What are your 3–4 core features to highlight?
4. Do you have customer or company names to use as social proof, or should I use realistic placeholders?

**Then build a complete, polished, responsive site with:**

- A sticky nav with product / pricing / customers / docs links and a "Start free" CTA.
- A hero with a one-line outcome headline, a subhead, a signup link or form, and an HTML/CSS product mockup labelled as a demo. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.
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
- Use my actual features and prices. Include customer logos and testimonials only when I supply approved assets, quotes, and attribution. Label invented issue titles and product screens as demo content.
- Use real images where photos make sense (testimonial avatars, any team shots). Pull free photos that fit, e.g. from Unsplash (`https://images.unsplash.com/...`) or `https://picsum.photos/seed/yourseed/96/96`, and add descriptive `alt` text.
- Put copy in an Astro data module and loop over it in the page; split the product mock into its own component.
- Keep it accessible (semantic HTML, a labelled email field, keyboard support, good contrast) and mobile-first (sidebar hides on small screens, plans stack, the featured plan floats to the top).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="saas"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./dist` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./dist --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
