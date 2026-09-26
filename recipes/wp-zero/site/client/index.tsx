// The island.
//
// Every page of this site is a flat file rendered from WordPress. This component
// is the one live thing on it. `sf build` compiles this entry into `/client.js`
// and mounts it into `#root` — and each rendered page puts `#root` exactly where
// the reaction bar belongs, carrying the article's slug on a data attribute.
//
// `useQuery` subscribes rather than polls: when anyone anywhere reacts, the
// runtime pushes the new tallies over Cast and this re-renders. Open the same
// article in two browsers to watch it.

import { useState } from "preact/hooks";

import { useMutation, useQuery } from "@spacefast/zero/client";

import { emptyState, REACTIONS, type ReactionState } from "../shared/reactions";

/** The slug the static page baked into its mount point. */
function mountSlug(): string {
  if (typeof document === "undefined") return "";
  return document.getElementById("root")?.dataset.slug ?? "";
}

export function App() {
  const [slug] = useState(mountSlug);
  // The index page mounts the same bundle with no slug — nothing to react to.
  if (!slug) return null;
  return <ReactionBar slug={slug} />;
}

function ReactionBar({ slug }: { slug: string }) {
  const live = useQuery<ReactionState>("reactions", slug);
  const toggle = useMutation<[string, string], ReactionState>("toggleReaction");
  const [pending, setPending] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  const state = live && !Array.isArray(live) ? live : emptyState(slug);
  const loading = live === undefined;

  async function press(emoji: string) {
    setPending(emoji);
    setFailed(false);
    try {
      await toggle(slug, emoji);
    } catch {
      setFailed(true);
    } finally {
      setPending(null);
    }
  }

  return (
    <div class="reactions" data-loading={loading ? "true" : "false"}>
      <p class="reactions-lede">
        <span class="reactions-title">Was this any good?</span>
        <span class="reactions-hint">
          No sign-in. Counts update live for everyone reading right now.
        </span>
      </p>

      <div class="reaction-buttons" role="group" aria-label="React to this article">
        {REACTIONS.map((reaction) => {
          const mine = state.mine === reaction.emoji;
          return (
            <button
              key={reaction.emoji}
              type="button"
              class="reaction"
              aria-pressed={mine}
              aria-label={`${reaction.label} — ${state.counts[reaction.emoji] ?? 0} so far`}
              disabled={pending !== null}
              onClick={() => void press(reaction.emoji)}
            >
              <span class="reaction-emoji" aria-hidden="true">
                {reaction.emoji}
              </span>
              <span class="reaction-count">{loading ? "·" : (state.counts[reaction.emoji] ?? 0)}</span>
            </button>
          );
        })}
      </div>

      <p class="reactions-status" role="status" aria-live="polite">
        {failed
          ? "That didn't go through. Try again."
          : loading
            ? "Reading reactions…"
            : state.total === 0
              ? "No reactions yet. Go first."
              : `${state.total} ${state.total === 1 ? "reaction" : "reactions"}${
                  state.mine ? ` · yours is ${state.mine}` : ""
                }`}
      </p>
    </div>
  );
}
