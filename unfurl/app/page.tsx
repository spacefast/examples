const EXAMPLES = [
  "https://github.com/vercel/next.js",
  "https://www.bbc.com/news",
  "https://spacefast.com",
];

/**
 * The landing page. No data fetching, no `searchParams` — Next prerenders it
 * at build time and Spacefast serves the HTML straight off disk, so the worker
 * never wakes for the front door. The form is a plain GET to `/u`, which is
 * the page that does need a server.
 */
export default function Home() {
  return (
    <main className="page" id="main">
      <section className="hero">
        <h1>
          See what your link looks like <em>before</em> you paste it.
        </h1>
        <p className="hero-lede">
          Drop in any URL. The server fetches the page, reads its OpenGraph and Twitter-card tags,
          and renders the same preview card Slack, Discord, and iMessage would build.
        </p>

        <form className="unfurl-form" action="/u" method="get">
          <label className="skip" htmlFor="url">
            URL to unfurl
          </label>
          <input
            id="url"
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            placeholder="https://example.com/article"
            aria-label="URL to unfurl"
            required
          />
          <button type="submit">Unfurl</button>
        </form>

        <p className="examples">
          <span>Or try:</span>
          {EXAMPLES.map((example) => (
            <a key={example} href={`/u?url=${encodeURIComponent(example)}`}>
              {new URL(example).hostname.replace(/^www\./, "")}
            </a>
          ))}
        </p>
      </section>

      <div className="split">
        <article>
          <h2>Why a server</h2>
          <p>
            A browser can&apos;t fetch a cross-origin page and read its <code>&lt;head&gt;</code> —
            CORS stops it. Unfurling has to happen server-side, which is exactly what this
            demonstrates.
          </p>
        </article>
        <article>
          <h2>What runs where</h2>
          <p>
            This page is prerendered and served from disk. <code>/u</code> renders per request and{" "}
            <code>/api/unfurl</code> does the fetching — both hit the worker.
          </p>
        </article>
        <article>
          <h2>Hardened on purpose</h2>
          <p>
            Visitors pick the target, so the fetcher blocks private and link-local addresses, vets
            every redirect hop, caps the body at 512 KB, and times out at 8 seconds.
          </p>
        </article>
      </div>
    </main>
  );
}
