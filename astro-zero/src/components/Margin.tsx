import { useAuth, useMutation, useQuery } from "@spacefast/zero/client";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";

import {
  cleanBody,
  MAX_BODY_LENGTH,
  MAX_NAME_LENGTH,
  type Comment,
  type ReactionTally,
} from "../../shared/comments";

/**
 * The live half of a post.
 *
 * Astro renders the article at build time and hands this component one thing:
 * the slug. Everything else — the runtime's address, the reader's identity, the
 * websocket — the Zero client discovers from the page's own origin, so this
 * island needs no configuration and no props it cannot get from the URL.
 */

const NAME_STORAGE_KEY = "marginalia:name";
/** How long to wait for the runtime before saying so out loud. */
const RUNTIME_TIMEOUT_MS = 8000;

function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.valueOf())) return "just now";
  const minutes = Math.round((Date.now() - date.valueOf()) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 60 * 24) return `${Math.round(minutes / 60)}h ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function Skeleton() {
  return (
    <ul class="skeleton" aria-hidden="true">
      {[0, 1].map((row) => (
        <li key={row}>
          <span class="s1" />
          <span class="s2" />
          <span class="s3" />
        </li>
      ))}
    </ul>
  );
}

export default function Margin({ postSlug }: { postSlug: string }) {
  const auth = useAuth();
  const comments = useQuery<Comment[]>("comments", postSlug);
  const tallies = useQuery<ReactionTally[]>("reactions", postSlug);
  const addComment = useMutation<[string, string, string], Comment | null>("addComment");
  const toggleReaction = useMutation<[string, string], void>("toggleReaction");

  // `useQuery` hands back `[]` until its first value arrives, so an empty
  // comment list cannot tell you whether the thread is empty or still asking.
  // The reactions query always resolves to one row per emoji, so its length is
  // an honest "the runtime has answered" signal for the whole margin.
  const ready = tallies.length > 0;
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (ready) return;
    const timer = setTimeout(() => setTimedOut(true), RUNTIME_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [ready]);

  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setName(localStorage.getItem(NAME_STORAGE_KEY) ?? "");
  }, []);

  const trimmed = useMemo(() => cleanBody(body), [body]);
  const remaining = MAX_BODY_LENGTH - body.length;

  async function onSubmit(event: Event) {
    event.preventDefault();
    if (!trimmed || pending) return;
    setPending(true);
    setError(null);
    try {
      await addComment(postSlug, name, trimmed);
      localStorage.setItem(NAME_STORAGE_KEY, name.trim());
      setBody("");
      bodyRef.current?.focus();
    } catch {
      setError("That didn't go through. Try again?");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <fieldset class="reactions">
        <legend class="visually-hidden">React to this post</legend>
        {(ready ? tallies : []).map((tally) => (
          <button
            key={tally.emoji}
            type="button"
            class="reaction"
            aria-pressed={tally.mine}
            aria-label={`${tally.emoji} — ${tally.count} ${tally.count === 1 ? "reader" : "readers"}`}
            onClick={() => void toggleReaction(postSlug, tally.emoji)}
          >
            <span class="glyph" aria-hidden="true">
              {tally.emoji}
            </span>
            <span class="tally">{tally.count}</span>
          </button>
        ))}
      </fieldset>

      {/* One live region that outlives every state, so a comment arriving from
          another browser is announced instead of silently replacing a skeleton. */}
      <div aria-live="polite">
        {!ready && timedOut && (
          <p class="thread-state">
            The margin can't reach the runtime right now. The article is all
            still here — reload when your connection settles.
          </p>
        )}

        {!ready && !timedOut && <Skeleton />}

        {ready && comments.length === 0 && (
          <p class="thread-state">
            Nothing in the margin yet. Being first is the good slot — everyone
            reads the top comment.
          </p>
        )}

        {ready && comments.length > 0 && (
          <ul class="thread">
            {comments.map((comment) => (
              <li class="comment" key={comment.id}>
                <p class="comment-byline">
                  <span class="comment-author">{comment.authorName}</span>
                  <time datetime={comment.createdAt}>{formatWhen(comment.createdAt)}</time>
                  {comment.authorId === auth.userId && <span>you</span>}
                </p>
                <p class="comment-body">{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form class="reply" onSubmit={(event) => void onSubmit(event)}>
        <div class="field">
          <label for="reply-name">Name (optional)</label>
          <input
            id="reply-name"
            name="name"
            type="text"
            autocomplete="nickname"
            maxLength={MAX_NAME_LENGTH}
            placeholder={auth.displayName || "Anonymous"}
            value={name}
            onInput={(event) => setName((event.target as HTMLInputElement).value)}
          />
        </div>

        <div class="field">
          <label for="reply-body">Leave a comment</label>
          <textarea
            id="reply-body"
            name="body"
            ref={bodyRef}
            maxLength={MAX_BODY_LENGTH}
            placeholder="Say the thing."
            value={body}
            onInput={(event) => setBody((event.target as HTMLTextAreaElement).value)}
          />
        </div>

        <div class="reply-actions">
          <span class="counter" data-over={remaining < 60}>
            {remaining} characters left
          </span>
          <button class="post-button" type="submit" disabled={!trimmed || pending}>
            {pending ? "Posting…" : "Post comment"}
          </button>
        </div>

        {error && (
          <p class="reply-error" role="alert">
            {error}
          </p>
        )}
      </form>

      <p class="identity">
        You're commenting as a guest. No account, no email, no confirmation link —
        your identity travels with this browser.
      </p>
    </>
  );
}
