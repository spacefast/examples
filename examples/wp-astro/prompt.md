# Headless WordPress + Astro — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **headless WordPress blog** as an **Astro site** that fetches posts from a
public WordPress REST API **at build time** and renders them to static HTML. WordPress
stays the place I write; Astro is the renderer; Spacefast hosts the result. No server,
no PHP, and no database run when a visitor loads the page.

**First, ask me these questions and wait for my answers:**

1. What's the WordPress site you want to pull from? Give me the site URL — I'll use its
   REST API at `<url>/wp-json/wp/v2` (any public WordPress.org-hosted or self-hosted
   site works; if you're not sure, use `https://wordpress.org/news`).
2. What should the blog be called (the title in the header and browser tab)?
3. What's the accent color (a hex like `#0b6e4f`)? Everything else stays a calm
   editorial neutral.

**Then build a complete, polished, responsive site with:**

- A small build-time data layer that fetches `/<api>/posts?_embed&per_page=12` once,
  during `astro build`, and normalizes each post (title, date, author, featured image,
  categories, rendered HTML) into a tidy shape the pages consume. Use `?_embed` so the
  author and featured image come back in the same request — no N+1 follow-ups.
- A blog index: a full-width lead story followed by a responsive grid of post cards,
  each with featured image, category tags, title, excerpt, author + avatar, date, and
  reading time.
- A static page per post (`/<slug>/`) generated with `getStaticPaths`: title, category
  tags, author + avatar, date, reading time, a featured-image banner, and the post's
  rendered HTML styled as clean editorial "prose" (headings, figures, blockquotes,
  lists, code).
- A short header strip that explains: **"Content from WordPress, rendered statically
  with Astro, hosted on Spacefast."** plus a small "Source: <site>" link.
- A footer crediting the WordPress REST API source, Astro, and Spacefast.

**Design & content notes:**

- Editorial-magazine feel: a serif display face for headings (a system serif stack is
  fine — no heavy web fonts needed), a clean sans for body, generous whitespace, warm
  off-white background, and the one accent color used for tags, links, and buttons.
- Real content only — every post comes from the live WordPress API, never "lorem ipsum".
- **Handle missing featured images** with a tasteful placeholder (a soft tinted panel
  with the post's first initial), not a broken image. Some WordPress posts have no
  featured image — prefer the `_embedded` featured media, fall back to
  `jetpack_featured_media_url` if present, otherwise show the placeholder.
- Keep WordPress's rendered HTML safe to drop in, and make sure images inside post
  content keep their aspect ratio (`height: auto`) so nothing stretches.
- Use Astro's static output (`astro build` → `dist/`). No SSR adapter, no runtime fetch.
- Keep it accessible: semantic HTML, a skip link, alt text on images, labelled landmarks,
  visible focus states, and good contrast (auto-pick black/white text on the accent).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="wp-astro"></script>
```

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Build first (`npm install && npm run build`), then zip the `dist/` folder (or point at
  it) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to change it later? Edit a post in WordPress and publish again — re-running the
  build re-fetches your latest posts; every version keeps its own URL and you can roll
  back anytime.

Learn more at **https://spacefast.com**.
