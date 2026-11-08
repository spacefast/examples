// HTML rendering. No fetching here — this takes `Article[]` and returns pages.
//
// Plain template strings on purpose. The composition (WordPress at build time,
// Zero at request time) is the thing worth reading in this example; a framework
// on top of it would be one more layer between you and that idea.

import { ACCENT, BADGE_SLUG, SITE_NAME, SITE_TAGLINE } from "./config";
import type { Article } from "./wordpress";

export const BADGE = `<script src="https://spacefast.com/badge.js" data-example="${BADGE_SLUG}"></script>`;

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function articleUrl(article: Article): string {
  return `/posts/${article.slug}`;
}

type PageInput = {
  title: string;
  description: string;
  sourceHost: string;
  sourceUrl: string;
  body: string;
  /**
   * The platform import map from the generated Zero app shell. Present only on
   * pages that mount the reaction island; the index needs no client bundle.
   */
  importMap?: string;
  image?: string | null;
};

/**
 * One document template for every page.
 *
 * The interesting line is `importMap`. `sf build` writes the platform's
 * content-addressed module paths into its generated `/index.html`; any other
 * page that wants to load `/client.js` has to carry the same map, and it has to
 * come before the module script or the browser ignores it. `build.ts` reads it
 * out of the shell and passes it through here.
 */
function page(input: PageInput): string {
  const island = input.importMap
    ? `\n    ${input.importMap}\n    <script type="module" src="/client.js" defer></script>`
    : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(input.title)}</title>
    <meta name="description" content="${escapeHtml(input.description)}">
    <meta property="og:title" content="${escapeHtml(input.title)}">
    <meta property="og:description" content="${escapeHtml(input.description)}">
    <meta property="og:type" content="website">${
      input.image ? `\n    <meta property="og:image" content="${escapeHtml(input.image)}">` : ""
    }
    <meta name="color-scheme" content="light">
    <style>:root { --accent: ${ACCENT}; }</style>
    <link rel="stylesheet" href="/assets/styles.css">${island}
  </head>
  <body>
    <a class="skip" href="#main">Skip to content</a>
    ${masthead(input.sourceHost, input.sourceUrl)}
    <main id="main">
${input.body}
    </main>
    ${colophon(input.sourceHost, input.sourceUrl)}
    <script type="module" src="/assets/search.js"></script>
    ${BADGE}
  </body>
</html>
`;
}

function masthead(sourceHost: string, sourceUrl: string): string {
  return `<header class="masthead">
      <div class="shell masthead-inner">
        <a class="wordmark" href="/">${escapeHtml(SITE_NAME)}</a>
        <span class="masthead-rule" aria-hidden="true"></span>
        <form class="search" role="search" data-search>
          <label for="q">Search articles</label>
          <input id="q" name="q" type="search" placeholder="Search articles…" autocomplete="off">
        </form>
        <p class="source-note">
          Words from <a href="${escapeHtml(sourceUrl)}" rel="noopener">${escapeHtml(sourceHost)}</a>
        </p>
      </div>
    </header>
    <section class="search-panel" id="search-panel" hidden aria-label="Search results">
      <div class="shell">
        <p class="search-meta" id="search-meta" role="status" aria-live="polite"></p>
        <ol class="search-results" id="search-results"></ol>
      </div>
    </section>`;
}

function colophon(sourceHost: string, sourceUrl: string): string {
  return `<footer class="colophon">
      <div class="shell colophon-grid">
        <div>
          <h2>Static half</h2>
          <p>
            Every word and image on this page was pulled from
            <a href="${escapeHtml(sourceUrl)}" rel="noopener">${escapeHtml(sourceHost)}</a>
            through the WordPress REST API when the site was built, and written to a flat
            file. No server ran to show it to you.
          </p>
        </div>
        <div>
          <h2>Live half</h2>
          <p>
            The reaction bar and the search box talk to a Spacefast Zero capsule published
            alongside these files — a database, a realtime query, and two HTTP endpoints,
            from the same <code>sf publish</code>.
          </p>
        </div>
        <div>
          <h2>Colophon</h2>
          <p>
            Built with <a href="https://spacefast.com" rel="noopener">Spacefast</a>. Content
            belongs to its authors. Try
            <a href="/api/search?q=wordpress">/api/search?q=wordpress</a>.
          </p>
        </div>
      </div>
    </footer>`;
}

function byline(article: Article, extra?: string): string {
  const avatar = article.author.avatar
    ? `<img src="${escapeHtml(article.author.avatar)}" alt="" width="22" height="22" loading="lazy">`
    : "";
  return `<p class="byline">
            ${avatar}
            <span>${escapeHtml(article.author.name)}</span>
            <span class="sep" aria-hidden="true">/</span>
            <time datetime="${isoDate(article.date)}">${formatDate(article.date)}</time>
            <span class="sep" aria-hidden="true">/</span>
            <span>${article.readingMinutes} min read</span>${extra ? `\n            ${extra}` : ""}
          </p>`;
}

function figure(article: Article, className: string): string {
  if (!article.image) {
    return `<div class="${className} is-empty" aria-hidden="true"></div>`;
  }
  return `<figure class="${className}">
            <img src="${escapeHtml(article.image.url)}" alt="${escapeHtml(article.image.alt)}" loading="lazy" decoding="async">
          </figure>`;
}

function tags(names: string[]): string {
  if (names.length === 0) return "";
  return `<p class="tags">${names
    .slice(0, 3)
    .map((name) => escapeHtml(name))
    .join(" · ")}</p>`;
}

export function renderIndex(articles: Article[], sourceHost: string, sourceUrl: string): string {
  const [lead, ...rest] = articles;
  if (!lead) throw new Error("Cannot render an index with no articles.");

  const body = `      <div class="shell">
        <p class="tagline">${escapeHtml(SITE_TAGLINE)}</p>

        <article class="lead">
          <div>
            <p class="kicker">Lead story</p>
            <h2><a href="${articleUrl(lead)}">${escapeHtml(lead.title)}</a></h2>
            <p>${escapeHtml(lead.excerpt)}</p>
            ${byline(lead)}
          </div>
          <a href="${articleUrl(lead)}" aria-hidden="true" tabindex="-1">
            ${figure(lead, "lead-figure")}
          </a>
        </article>

        <h2 class="section-head">More from the wire</h2>
        <div class="cards">
${rest
  .map(
    (article) => `          <article class="card">
            <a href="${articleUrl(article)}" aria-hidden="true" tabindex="-1">
              ${figure(article, "card-figure")}
            </a>
            ${tags(article.categories)}
            <h3><a href="${articleUrl(article)}">${escapeHtml(article.title)}</a></h3>
            <p>${escapeHtml(article.excerpt)}</p>
            ${byline(article)}
          </article>`,
  )
  .join("\n")}
        </div>
      </div>`;

  return page({
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_TAGLINE,
    sourceHost,
    sourceUrl,
    body,
    image: lead.image?.url ?? null,
  });
}

export function renderArticle(
  article: Article,
  importMap: string,
  sourceHost: string,
  sourceUrl: string,
): string {
  const hero = article.image
    ? `<figure class="hero">
          <img src="${escapeHtml(article.image.url)}" alt="${escapeHtml(article.image.alt)}" fetchpriority="high" decoding="async">
        </figure>`
    : "";

  const body = `      <article class="shell article">
        <div class="article-header">
          <a class="back" href="/">← ${escapeHtml(SITE_NAME)}</a>
          ${tags(article.categories)}
          <h1>${escapeHtml(article.title)}</h1>
          <p class="standfirst">${escapeHtml(article.excerpt)}</p>
          ${byline(
            article,
            article.sourceUrl
              ? `<span class="sep" aria-hidden="true">/</span>
            <a href="${escapeHtml(article.sourceUrl)}" rel="noopener">Original</a>`
              : "",
          )}
        </div>
        ${hero}
        <div class="prose">
${article.contentHtml}
        </div>
        <!-- The one live element on this page. #root is where sf build's client
             bundle mounts; data-slug tells it which article it is looking at. -->
        <div class="island">
          <div id="root" data-slug="${escapeHtml(article.slug)}"></div>
        </div>
      </article>`;

  return page({
    title: `${article.title} — ${SITE_NAME}`,
    description: article.excerpt.slice(0, 180),
    sourceHost,
    sourceUrl,
    body,
    importMap,
    image: article.image?.url ?? null,
  });
}
