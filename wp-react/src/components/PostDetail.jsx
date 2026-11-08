import { useEffect } from "react";
import { fetchPost } from "../api.js";
import { SITE_TITLE } from "../config.js";
import { useAsync } from "../hooks.js";
import { ErrorState, Link, SmartImage, Spinner, formatDate } from "./common.jsx";

export function PostDetail({ id }) {
  const { status, data: post, error, retry } = useAsync((signal) => fetchPost(id, signal), [id]);

  // Keep the document title in sync for nice tabs and shareable links.
  useEffect(() => {
    document.title = post ? `${post.title} — ${SITE_TITLE}` : SITE_TITLE;
    return () => {
      document.title = SITE_TITLE;
    };
  }, [post]);

  return (
    <main className="container article-wrap">
      <Link to="/" className="back-link">← All stories</Link>

      {status === "loading" && (
        <div className="article-loading">
          <Spinner label="Loading story" />
        </div>
      )}

      {status === "error" && <ErrorState error={error} onRetry={retry} />}

      {status === "success" && <Article post={post} />}
    </main>
  );
}

function Article({ post }) {
  return (
    <article className="article">
      <header className="article-head">
        {post.categories[0] && <span className="tag">{post.categories[0]}</span>}
        <h1 className="article-title">{post.title}</h1>
        <div className="article-byline">
          {post.author?.avatar && (
            <img className="avatar" src={post.author.avatar} alt="" width="40" height="40" loading="lazy" />
          )}
          <div className="article-byline-text">
            {post.author?.name && <span className="byline-name">{post.author.name}</span>}
            <span className="byline-meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true"> · </span>
              {post.readingMinutes} min read
            </span>
          </div>
        </div>
      </header>

      {post.featuredImage?.src && (
        <figure className="article-hero">
          <SmartImage src={post.featuredImage.src} alt={post.featuredImage.alt} className="article-hero-img" ratio="16 / 9" />
          {post.featuredImage.caption && (
            <figcaption className="article-hero-cap">{post.featuredImage.caption}</figcaption>
          )}
        </figure>
      )}

      {/* Content is sanitized in api.js before it ever reaches the DOM. */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml || "<p>This story has no content.</p>" }}
      />

      <footer className="article-foot">
        {post.author?.description && (
          <div className="author-card">
            {post.author.avatar && <img className="avatar avatar-lg" src={post.author.avatar} alt="" width="56" height="56" />}
            <div>
              <span className="author-card-name">{post.author.name}</span>
              <p className="author-card-bio">{post.author.description}</p>
            </div>
          </div>
        )}
        {post.link && (
          <a className="source-link" href={post.link} target="_blank" rel="noreferrer noopener">
            Read on the original site ↗
          </a>
        )}
      </footer>
    </article>
  );
}
