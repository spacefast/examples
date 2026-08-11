import { Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";

import {
  Link,
  Route,
  Router,
  Routes,
  useLocation,
  useMutation,
  useQuery,
} from "@spacefast/zero/client";

import { parseInline, parseMarkdown, type InlineToken } from "../shared/markdown";
import type { HomeData, Post, PostData } from "../shared/model";
import { APP_CSS } from "./styles";

const emptyHome: HomeData = { ready: false, posts: [], commentCount: 0, reactionCount: 0 };

export function App() {
  return (
    <Router>
      <style>{APP_CSS}</style>
      <SiteFrame />
    </Router>
  );
}

function SiteFrame() {
  return (
    <div class="site-shell">
      <SiteHeader />
      <main class="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/*" element={<Article />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const location = useLocation();
  const links = [
    ["/", "Writing"],
    ["/about", "About"],
  ] as const;
  return (
    <header class="site-header">
      <div class="header-inner">
        <Link class="wordmark" to="/" aria-label="Homepage">
          Field Notes
        </Link>
        <nav class="desktop-nav" aria-label="Primary navigation">
          {links.map(([to, label]) => (
            <Link key={to} class={location.pathname === to ? "current" : ""} to={to}>
              {label}
            </Link>
          ))}
          <a href="/api/feed.xml">RSS</a>
        </nav>
        <details class="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            {links.map(([to, label]) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
            <a href="/api/feed.xml">RSS</a>
          </nav>
        </details>
      </div>
    </header>
  );
}

function Home() {
  const value = useQuery<HomeData>("home");
  const data = Array.isArray(value) ? emptyHome : value;
  const bootstrap = useMutation<boolean>("bootstrapBlog");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!data.ready && !started) {
      setStarted(true);
      void bootstrap().catch(() => setStarted(false));
    }
  }, [bootstrap, data.ready, started]);

  const featured = data.posts.find((post) => post.featured) ?? data.posts[0];
  const others = data.posts.filter((post) => post.id !== featured?.id);

  return (
    <Fragment>
      <section class="hero section">
        <div class="section-inner hero-grid">
          <div>
            <p class="eyebrow">Independent notes on useful software</p>
            <h1>Small ideas, tested in the real world.</h1>
            <p class="hero-copy">
              Field Notes is a quiet publication about shipping, infrastructure, and the details
              that make digital work feel dependable.
            </p>
          </div>
          <p class="issue-note">
            Issue 18
            <span>Three essays, live discussion, no feed algorithm.</span>
          </p>
        </div>
      </section>

      {featured ? (
        <section class="section featured-section">
          <div class="section-inner featured-grid">
            <p class="section-label">Featured essay</p>
            <div class="featured-copy">
              <PostMeta post={featured} />
              <h2>
                <Link to={`/posts/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p>{featured.dek}</p>
              <Link class="primary-link" to={`/posts/${featured.slug}`}>
                Read the essay
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section class="section loading-copy" aria-live="polite">
          <div class="section-inner">Preparing the first issue…</div>
        </section>
      )}

      <section class="section archive-section">
        <div class="section-inner archive-grid">
          <div>
            <p class="section-label">Recent writing</p>
            <p class="archive-intro">
              Notes for people who would rather open the result than read the promise.
            </p>
          </div>
          <ol class="post-list" aria-label="Recent posts">
            {others.map((post) => (
              <li key={post.id}>
                <Link to={`/posts/${post.slug}`}>
                  <PostMeta post={post} />
                  <h2>{post.title}</h2>
                  <p>{post.dek}</p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section class="section signal-section">
        <div class="section-inner signal-grid">
          <p class="section-label">Reader signal</p>
          <dl>
            <div>
              <dt>Comments</dt>
              <dd>{data.commentCount}</dd>
            </div>
            <div>
              <dt>Reactions</dt>
              <dd>{data.reactionCount}</dd>
            </div>
            <div>
              <dt>Runtime</dt>
              <dd>Live</dd>
            </div>
          </dl>
        </div>
      </section>
    </Fragment>
  );
}

function Article() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\/posts\//, "").split("/")[0] ?? "";
  const value = useQuery<PostData>("post", slug);
  const data: PostData = Array.isArray(value)
    ? { post: null, comments: [], reactionCount: 0 }
    : value;
  const react = useMutation<{ created: boolean; kind: string }>("react");
  const [reactionStatus, setReactionStatus] = useState("");

  if (!data.post) {
    return (
      <section class="section article-loading">
        <div class="article-width">Opening the note…</div>
      </section>
    );
  }

  async function markUseful() {
    await react(slug, "useful");
    setReactionStatus("Marked useful.");
  }

  return (
    <Fragment>
      <article class="section article">
        <header class="article-width article-header">
          <Link class="back-link" to="/">
            All writing
          </Link>
          <PostMeta post={data.post} />
          <h1>{data.post.title}</h1>
          <p class="article-dek">{data.post.dek}</p>
        </header>
        <Markdown body={data.post.body} />
        <footer class="article-width article-end">
          <p>Was this useful?</p>
          <button class="secondary-button" type="button" onClick={markUseful}>
            Yes, keep writing
          </button>
          <span role="status">{reactionStatus || `${data.reactionCount} reader signals`}</span>
        </footer>
      </article>
      <Comments postSlug={slug} comments={data.comments} />
    </Fragment>
  );
}

function Comments({ postSlug, comments }: { postSlug: string; comments: PostData["comments"] }) {
  const addComment = useMutation<{
    accepted: boolean;
    discarded: boolean;
    notificationQueued: boolean;
  }>("addComment");
  const [status, setStatus] = useState("");

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    setStatus("Checking and posting…");
    try {
      const result = await addComment(
        postSlug,
        field(data, "name"),
        field(data, "email"),
        field(data, "comment"),
      );
      if (!result.accepted) {
        setStatus(
          result.discarded
            ? "That comment was rejected as pervasive spam."
            : "That comment was held as possible spam.",
        );
        return;
      }
      form.reset();
      setStatus(result.notificationQueued ? "Posted. The editor was notified." : "Posted.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not post the comment.");
    }
  }

  return (
    <section class="section comments-section" aria-labelledby="comments-heading">
      <div class="section-inner comments-grid">
        <div>
          <p class="section-label">Discussion</p>
          <h2 id="comments-heading">{comments.length} comments</h2>
          <p>Comments are checked by Akismet before they become part of the live thread.</p>
        </div>
        <div>
          <form class="comment-form" onSubmit={submit}>
            <div class="field-row">
              <label>
                Name
                <input id="comment-name" name="name" required maxLength={80} autoComplete="name" />
              </label>
              <label>
                Email
                <input
                  id="comment-email"
                  name="email"
                  type="email"
                  required
                  maxLength={240}
                  autoComplete="email"
                />
              </label>
            </div>
            <label>
              Comment
              <textarea id="comment-body" name="comment" required maxLength={2000} rows={5} />
            </label>
            <div class="form-actions">
              <button class="primary-button" type="submit">
                Post comment
              </button>
              <p role="status">{status}</p>
            </div>
          </form>
          <ol class="comment-list" aria-label="Comments">
            {comments.map((comment) => (
              <li key={comment.id}>
                <img src={comment.avatarUrl} width={44} height={44} alt="" />
                <div>
                  <div class="comment-meta">
                    <strong>{comment.authorName}</strong>
                    <time dateTime={comment.createdAt}>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                  <p>{comment.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section class="section about-page">
      <div class="section-inner about-grid">
        <p class="section-label">About</p>
        <div>
          <h1>A small publication with a large backend.</h1>
          <p>
            Field Notes is the Spacefast kitchen sink: a sparse blog above SQL, realtime data,
            identity, storage, actions, endpoints, Akismet, email, custom visitor pages, and three
            function runtimes in one published version. Its OpenGraph image is rendered from live
            post data by the capsule.
          </p>
          <p>
            The design stays quiet on purpose. Infrastructure is most convincing when the product
            does not look like a capability checklist.
          </p>
        </div>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section class="section not-found">
      <div class="section-inner">
        <p class="eyebrow">404</p>
        <h1>This note does not exist.</h1>
        <Link class="primary-link" to="/">
          Return to the writing
        </Link>
      </div>
    </section>
  );
}

function SiteFooter() {
  const subscribe = useMutation<{ created: boolean; discarded: boolean; rejected: boolean }>(
    "subscribe",
  );
  const [status, setStatus] = useState("");

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const email = field(new FormData(form), "newsletter-email");
    try {
      const result = await subscribe(email);
      if (result.rejected) {
        setStatus(
          result.discarded
            ? "That signup was rejected as pervasive spam."
            : "That signup was held as possible spam.",
        );
        return;
      }
      form.reset();
      setStatus(result.created ? "You are on the list." : "You are already on the list.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not subscribe.");
    }
  }

  return (
    <footer class="site-footer">
      <div class="section-inner footer-grid">
        <div>
          <Link class="wordmark" to="/" aria-label="Homepage">
            Field Notes
          </Link>
          <p>Occasional essays. No feed games.</p>
        </div>
        <form onSubmit={submit}>
          <label for="newsletter-email">Get the next issue</label>
          <div class="subscribe-row">
            <input
              id="newsletter-email"
              name="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
            />
            <button class="secondary-button" type="submit">
              Subscribe
            </button>
          </div>
          <p role="status">{status}</p>
        </form>
      </div>
    </footer>
  );
}

function PostMeta({ post }: { post: Post }) {
  return (
    <p class="post-meta">
      <span>{post.publishedAt}</span>
      <span>{post.readingMinutes}</span>
      <span>{post.authorName}</span>
    </p>
  );
}

function Markdown({ body }: { body: string }) {
  return (
    <div class="prose article-width">
      {parseMarkdown(body).map((block, index) => {
        if (block.kind === "heading") {
          const content = <Inline tokens={parseInline(block.text)} />;
          if (block.level === 1) return null;
          if (block.level === 2) return <h2 key={index}>{content}</h2>;
          return <h3 key={index}>{content}</h3>;
        }
        if (block.kind === "paragraph")
          return (
            <p key={index}>
              <Inline tokens={parseInline(block.text)} />
            </p>
          );
        if (block.kind === "quote")
          return (
            <blockquote key={index}>
              <Inline tokens={parseInline(block.text)} />
            </blockquote>
          );
        if (block.kind === "code") return <pre key={index}>{block.text}</pre>;
        if (block.kind === "rule") return <hr key={index} />;
        const List = block.ordered ? "ol" : "ul";
        return (
          <List key={index}>
            {block.items.map((item) => (
              <li key={item}>
                <Inline tokens={parseInline(item)} />
              </li>
            ))}
          </List>
        );
      })}
    </div>
  );
}

function Inline({ tokens }: { tokens: InlineToken[] }) {
  return (
    <Fragment>
      {tokens.map((token, index) => {
        if (token.kind === "strong") return <strong key={index}>{token.text}</strong>;
        if (token.kind === "em") return <em key={index}>{token.text}</em>;
        if (token.kind === "code") return <code key={index}>{token.text}</code>;
        if (token.kind === "link")
          return (
            <a key={index} href={token.href}>
              {token.text}
            </a>
          );
        return token.text;
      })}
    </Fragment>
  );
}

function field(data: FormData, name: string): string {
  const value = data.get(name);
  return typeof value === "string" ? value : "";
}
