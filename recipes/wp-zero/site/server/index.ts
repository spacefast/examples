// The capsule: everything a static file cannot do.
//
// The pages around this server are flat HTML rendered from WordPress at build
// time. They do not change between publishes. Two things do change per request,
// and they live here:
//
//   reactions  a table, a realtime query, and a mutation. Guest identity, so
//              pressing an emoji costs nobody a sign-in.
//   search     an index compiled into this bundle at build time, searched
//              server-side so the browser downloads results, not a corpus.
//
// The HTTP endpoints exist so the same behavior is reachable with `curl`, not
// only from a page that has hydrated. A `write` endpoint broadcasts realtime
// invalidation the same way a mutation does, so a reaction posted from a
// terminal moves the count in an open browser.

import { capsule, endpoint, json, mutation, query, string, table } from "@spacefast/zero/server";

import { cleanSlug, emptyState, isReactionEmoji, REACTIONS, tallyReactions } from "../shared/reactions";
import { cleanQuery, searchDocuments } from "../shared/search";
import { SEARCH_INDEX, SEARCH_INDEX_BUILT_AT, SEARCH_INDEX_SOURCE } from "../shared/search-index";

export default capsule({
  name: "Broadsheet",

  schema: {
    // One row per person per article. `by_owner_slug` is what makes "press it
    // again to take it back" a lookup instead of a scan.
    reactions: table({
      slug: string(),
      emoji: string(),
      ownerId: string(),
    })
      .index("by_slug", ["slug"])
      .index("by_owner_slug", ["ownerId", "slug"]),
  },

  queries: {
    /** Subscribed by the island on every article page. This is the realtime seam. */
    reactions: query(async (ctx, rawSlug: string) => {
      const slug = cleanSlug(rawSlug);
      if (!slug) return emptyState("");
      const rows = await ctx.db.reactions
        .withIndex("by_slug", (range) => range.eq("slug", slug))
        .collect();
      return tallyReactions(slug, rows, ctx.auth.userId);
    }),
  },

  mutations: {
    /**
     * One reaction per visitor per article: pressing a new emoji switches,
     * pressing the current one takes it back. Returns the fresh tallies so the
     * button settles before the realtime push even lands.
     */
    toggleReaction: mutation(async (ctx, rawSlug: string, rawEmoji: string) => {
      const slug = cleanSlug(rawSlug);
      if (!slug) throw new Error("An article slug is required.");
      if (!isReactionEmoji(rawEmoji)) throw new Error("That is not one of this site's reactions.");

      const existing = await ctx.db.reactions
        .withIndex("by_owner_slug", (range) => range.eq("ownerId", ctx.auth.userId).eq("slug", slug))
        .first();

      if (!existing) {
        await ctx.db.reactions.insert({ slug, emoji: rawEmoji, ownerId: ctx.auth.userId });
      } else if (existing.emoji === rawEmoji) {
        await ctx.db.reactions.delete(existing.id);
      } else {
        await ctx.db.reactions.update(existing.id, { emoji: rawEmoji });
      }

      const rows = await ctx.db.reactions
        .withIndex("by_slug", (range) => range.eq("slug", slug))
        .collect();
      return tallyReactions(slug, rows, ctx.auth.userId);
    }),
  },

  endpoints: {
    /**
     * The build-time index, searched on the server. Responses are small enough
     * to render straight into a results list, and the index never crosses the
     * wire.
     */
    search: endpoint({ method: "GET", path: "/api/search", mode: "read" }, (_ctx, request) => {
      const q = cleanQuery(request.query.get("q"));
      const limit = Number.parseInt(request.query.get("limit") ?? "", 10);
      const index = {
        indexed: SEARCH_INDEX.length,
        builtAt: SEARCH_INDEX_BUILT_AT,
        source: SEARCH_INDEX_SOURCE,
      };
      if (!q) return json({ query: "", results: [], ...index });
      return json({
        query: q,
        results: searchDocuments(SEARCH_INDEX, q, Number.isFinite(limit) ? limit : 8),
        ...index,
      });
    }),

    /** The same tallies the island subscribes to, for anything that speaks HTTP. */
    reactionCounts: endpoint(
      { method: "GET", path: "/api/reactions", mode: "read" },
      async (ctx, request) => {
        const slug = cleanSlug(request.query.get("slug"));
        if (!slug) return json({ error: "Pass ?slug=<article-slug>." }, { status: 422 });
        const rows = await ctx.db.reactions
          .withIndex("by_slug", (range) => range.eq("slug", slug))
          .collect();
        return json(tallyReactions(slug, rows, ctx.auth.userId));
      },
    ),

    /**
     * `mode: "write"` is load-bearing twice over: it is what lets an endpoint
     * touch the database at all, and what makes the write broadcast — so a
     * reaction posted from a terminal moves an open browser's count.
     */
    react: endpoint({ method: "POST", path: "/api/react", mode: "write" }, async (ctx, request) => {
      const payload = (await request.json().catch(() => null)) as {
        slug?: unknown;
        emoji?: unknown;
      } | null;
      const slug = cleanSlug(payload?.slug);
      const emoji = payload?.emoji;
      if (!slug || !isReactionEmoji(emoji)) {
        return json(
          { error: "Send { slug, emoji }.", emoji: REACTIONS.map((reaction) => reaction.emoji) },
          { status: 422 },
        );
      }

      const existing = await ctx.db.reactions
        .withIndex("by_owner_slug", (range) => range.eq("ownerId", ctx.auth.userId).eq("slug", slug))
        .first();
      if (!existing) {
        await ctx.db.reactions.insert({ slug, emoji, ownerId: ctx.auth.userId });
      } else if (existing.emoji === emoji) {
        await ctx.db.reactions.delete(existing.id);
      } else {
        await ctx.db.reactions.update(existing.id, { emoji });
      }

      const rows = await ctx.db.reactions
        .withIndex("by_slug", (range) => range.eq("slug", slug))
        .collect();
      return json(tallyReactions(slug, rows, ctx.auth.userId));
    }),
  },
});
