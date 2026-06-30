import DOMPurify from "dompurify";
import { API_BASE, PER_PAGE } from "./config.js";

// --- Network --------------------------------------------------------------

// A small fetch wrapper that gives us friendly errors and respects an
// AbortSignal so navigating away cancels in-flight requests.
async function getJSON(url, signal) {
  let res;
  try {
    res = await fetch(url, { signal, headers: { Accept: "application/json" } });
  } catch (err) {
    if (err && err.name === "AbortError") throw err;
    // Network failure, DNS, CORS preflight rejection, offline, etc.
    throw new ApiError(
      "Couldn't reach the WordPress site. Check the API URL or your connection."
    );
  }
  if (!res.ok) {
    throw new ApiError(
      res.status === 404
        ? "That post couldn't be found."
        : `The WordPress site responded with an error (${res.status}).`,
      res.status
    );
  }
  return res.json();
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// --- Endpoints ------------------------------------------------------------

// List posts. `_embed` asks WordPress to inline the author and featured image
// so we don't have to make a request per card. Returns { posts, totalPages }.
export async function fetchPosts({ page = 1, search = "", signal } = {}) {
  const params = new URLSearchParams({
    _embed: "1",
    per_page: String(PER_PAGE),
    page: String(page),
    orderby: "date",
    order: "desc",
  });
  if (search.trim()) params.set("search", search.trim());

  // We need the headers (total pages) so we do this fetch by hand.
  let res;
  try {
    res = await fetch(`${API_BASE}/posts?${params}`, {
      signal,
      headers: { Accept: "application/json" },
    });
  } catch (err) {
    if (err && err.name === "AbortError") throw err;
    throw new ApiError(
      "Couldn't reach the WordPress site. Check the API URL or your connection."
    );
  }
  // A search with no matches returns 400 on some WP installs — treat as empty.
  if (res.status === 400 && search.trim()) {
    return { posts: [], totalPages: 0 };
  }
  if (!res.ok) {
    throw new ApiError(`The WordPress site responded with an error (${res.status}).`, res.status);
  }
  const totalPages = Number(res.headers.get("X-WP-TotalPages") || "1");
  const raw = await res.json();
  return { posts: raw.map(normalizePost), totalPages };
}

// One post by id, embedded.
export async function fetchPost(id, signal) {
  const data = await getJSON(`${API_BASE}/posts/${id}?_embed=1`, signal);
  return normalizePost(data);
}

// --- Shaping --------------------------------------------------------------

// Flatten the WP REST shape into a tidy object the UI can render, and sanitize
// every piece of HTML we'll inject so a compromised feed can't run script.
function normalizePost(p) {
  const embedded = p._embedded || {};
  const author = (embedded.author && embedded.author[0]) || null;
  const media = (embedded["wp:featuredmedia"] && embedded["wp:featuredmedia"][0]) || null;
  const terms = (embedded["wp:term"] || []).flat().filter(Boolean);
  const categories = terms.filter((t) => t.taxonomy === "category").map((t) => t.name);

  const contentHtml = clean(p.content && p.content.rendered);

  return {
    id: p.id,
    title: stripTags(clean(p.title && p.title.rendered)) || "Untitled",
    excerpt: stripTags(clean(p.excerpt && p.excerpt.rendered)),
    contentHtml,
    date: p.date,
    link: p.link,
    readingMinutes: estimateReadingMinutes(contentHtml),
    categories,
    author: author
      ? {
          name: author.name || "Unknown",
          avatar: author.avatar_urls ? author.avatar_urls["96"] || author.avatar_urls["48"] : null,
          description: stripTags(clean(author.description)),
        }
      : null,
    featuredImage: media
      ? {
          src: media.source_url,
          alt: stripTags(clean(media.alt_text)) || "",
          caption: stripTags(clean(media.caption && media.caption.rendered)),
        }
      : null,
  };
}

function clean(html) {
  if (!html) return "";
  return DOMPurify.sanitize(html, { ADD_ATTR: ["target"] });
}

function stripTags(html) {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
}

function estimateReadingMinutes(html) {
  const words = stripTags(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
