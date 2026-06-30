import { useState } from "react";
import { fetchPosts } from "../api.js";
import { useAsync, useDebounced } from "../hooks.js";
import { EmptyState, ErrorState, Link, SmartImage, formatDate } from "./common.jsx";

export function PostList() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const search = useDebounced(query, 350);

  // Reset to page 1 whenever the search term changes.
  const effectivePage = useResetOnSearch(search, page, setPage);

  const { status, data, error, retry } = useAsync(
    (signal) => fetchPosts({ page: effectivePage, search, signal }),
    [effectivePage, search]
  );

  return (
    <main className="container">
      <section className="lede">
        <h1 className="lede-title">Latest reading</h1>
        <p className="lede-sub">
          Fresh from the newsroom — pulled live from a WordPress site over its public REST API.
        </p>
        <div className="search">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            className="search-input"
            placeholder="Search stories…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search stories"
          />
        </div>
      </section>

      {status === "loading" && <SkeletonGrid />}

      {status === "error" && <ErrorState error={error} onRetry={retry} />}

      {status === "success" && data.posts.length === 0 && (
        <EmptyState
          title={search ? "No stories match that search" : "No stories yet"}
          body={search ? "Try a different word or clear the search." : "Check back soon."}
        />
      )}

      {status === "success" && data.posts.length > 0 && (
        <>
          <ul className="card-grid" aria-label="Articles">
            {data.posts.map((post, i) => (
              <PostCard key={post.id} post={post} featured={i === 0 && effectivePage === 1 && !search} />
            ))}
          </ul>
          <Pager page={effectivePage} totalPages={data.totalPages} onPage={setPage} />
        </>
      )}
    </main>
  );
}

function useResetOnSearch(search, page, setPage) {
  const [lastSearch, setLastSearch] = useState(search);
  if (search !== lastSearch) {
    setLastSearch(search);
    if (page !== 1) setPage(1);
    return 1;
  }
  return page;
}

function PostCard({ post, featured }) {
  return (
    <li className={`card ${featured ? "card-featured" : ""}`}>
      <Link to={`/post/${post.id}`} className="card-link">
        <SmartImage src={post.featuredImage?.src} alt={post.featuredImage?.alt} className="card-media" ratio={featured ? "16 / 9" : "3 / 2"} />
        <div className="card-body">
          {post.categories[0] && <span className="tag">{post.categories[0]}</span>}
          <h2 className="card-title">{post.title}</h2>
          {post.excerpt && <p className="card-excerpt">{post.excerpt}</p>}
          <div className="card-meta">
            {post.author?.name && <span className="byline">{post.author.name}</span>}
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </div>
      </Link>
    </li>
  );
}

function Pager({ page, totalPages, onPage }) {
  if (!totalPages || totalPages <= 1) return null;
  return (
    <nav className="pager" aria-label="Pagination">
      <button
        type="button"
        className="btn btn-ghost"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
      >
        ← Newer
      </button>
      <span className="pager-status">
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        className="btn btn-ghost"
        disabled={page >= totalPages}
        onClick={() => onPage(page + 1)}
      >
        Older →
      </button>
    </nav>
  );
}

function SkeletonGrid() {
  return (
    <ul className="card-grid" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className={`card card-skeleton ${i === 0 ? "card-featured" : ""}`}>
          <span className="sk sk-media" />
          <div className="card-body">
            <span className="sk sk-tag" />
            <span className="sk sk-title" />
            <span className="sk sk-line" />
            <span className="sk sk-line short" />
          </div>
        </li>
      ))}
    </ul>
  );
}
