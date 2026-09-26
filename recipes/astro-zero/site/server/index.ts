import { capsule, endpoint, json, mutation, query, string, table } from "@spacefast/zero/server";

import {
  cleanBody,
  cleanSlug,
  COMMENT_PAGE_SIZE,
  displayNameFor,
  isReaction,
  REACTIONS,
  type Comment,
  type ReactionTally,
} from "../shared/comments";

/**
 * Marginalia's server half.
 *
 * Astro renders every word on this site at build time. Nothing here knows about
 * posts, Markdown, or layouts — the capsule only owns the two things a
 * prerendered page cannot: the conversation under each post, and the reactions
 * beside it. Pages address it by slug, which is the only contract between the
 * two halves.
 */
export default capsule({
  name: "Marginalia",
  schema: {
    comments: table({
      postSlug: string(),
      authorName: string(),
      body: string(),
      authorId: string(),
    }).index("by_post", ["postSlug"]),
    // One row per reader per post. Counting rows is the tally, so there is no
    // counter to increment and nothing to get out of step.
    reactions: table({
      postSlug: string(),
      emoji: string(),
      readerId: string(),
    }).index("by_post", ["postSlug"]),
  },
  queries: {
    comments: query(async (ctx, postSlug: string): Promise<Comment[]> => {
      const slug = cleanSlug(postSlug);
      if (!slug) return [];
      const rows = await ctx.db.comments
        .withIndex("by_post", (row) => row.eq("postSlug", slug))
        .order("desc")
        .take(COMMENT_PAGE_SIZE);
      // Newest page, shown oldest first.
      return (rows as Comment[]).reverse();
    }),

    reactions: query(async (ctx, postSlug: string): Promise<ReactionTally[]> => {
      const slug = cleanSlug(postSlug);
      if (!slug) return REACTIONS.map((emoji) => ({ emoji, count: 0, mine: false }));
      const rows = await ctx.db.reactions
        .withIndex("by_post", (row) => row.eq("postSlug", slug))
        .collect();
      return REACTIONS.map((emoji) => ({
        emoji,
        count: rows.filter((row) => row.emoji === emoji).length,
        mine: rows.some((row) => row.emoji === emoji && row.readerId === ctx.auth.userId),
      }));
    }),
  },
  mutations: {
    addComment: mutation(
      async (ctx, postSlug: string, authorName: string, body: string): Promise<Comment | null> => {
        const slug = cleanSlug(postSlug);
        const text = cleanBody(body);
        if (!slug || !text) return null;

        const name = displayNameFor(authorName, ctx.auth.displayName);
        const verdict = await ctx.spam.check({ content: text, type: "comment", authorName: name });
        if (verdict.spam) return null;

        const row = await ctx.db.comments.insert({
          postSlug: slug,
          authorName: name,
          body: text,
          authorId: ctx.auth.userId,
        });
        // Every open thread on this post refreshes, in every browser holding one.
        ctx.invalidate("comments");
        return row as Comment;
      },
    ),

    /**
     * One reader holds at most one emoji per post, so reacting again moves it
     * and reacting with the same one takes it back. Cheap to change your mind
     * is the whole point of a reaction.
     */
    toggleReaction: mutation(async (ctx, postSlug: string, emoji: string): Promise<void> => {
      const slug = cleanSlug(postSlug);
      if (!slug || !isReaction(emoji)) return;

      const held = (
        await ctx.db.reactions.withIndex("by_post", (row) => row.eq("postSlug", slug)).collect()
      ).filter((row) => row.readerId === ctx.auth.userId);

      await Promise.all(held.map((row) => ctx.db.reactions.delete(row.id)));
      if (!held.some((row) => row.emoji === emoji)) {
        await ctx.db.reactions.insert({ postSlug: slug, emoji, readerId: ctx.auth.userId });
      }
      ctx.invalidate("reactions");
    }),
  },
  endpoints: {
    /**
     * The thread without a browser. Same rows the island subscribes to, so an
     * agent, a feed reader, or a curl one-liner sees exactly what a reader does.
     */
    listComments: endpoint({ method: "GET", path: "/api/comments", mode: "read" }, async (ctx, req) => {
      const slug = cleanSlug(req.query.get("post") ?? "");
      if (!slug) {
        return json({ error: { code: "post_required", message: "Pass ?post=<slug>." } }, { status: 400 });
      }
      // Queries and mutations get a `ctx.db` typed from the schema. Endpoint
      // handlers do not — theirs is the generic row shape — so the column types
      // are restated here rather than inferred.
      const rows = (await ctx.db.comments
        .withIndex("by_post", (row) => row.eq("postSlug", slug))
        .order("desc")
        .take(COMMENT_PAGE_SIZE)) as unknown as Comment[];
      rows.reverse();
      return json({
        data: {
          post: slug,
          count: rows.length,
          comments: rows.map((row) => ({
            id: row.id,
            author: row.authorName,
            body: row.body,
            createdAt: row.createdAt,
          })),
        },
      });
    }),

    createComment: endpoint({ method: "POST", path: "/api/comments", mode: "write" }, async (ctx, req) => {
      const payload = await req.json<{ post?: string; author?: string; body?: string }>().catch(() => null);
      const slug = cleanSlug(payload?.post ?? "");
      const text = cleanBody(payload?.body ?? "");
      if (!slug || !text) {
        return json(
          {
            error: {
              code: "invalid_comment",
              message: "Send JSON with a post slug and a non-empty body.",
            },
          },
          { status: 400 },
        );
      }

      const author = displayNameFor(payload?.author ?? "", ctx.auth.displayName);
      const verdict = await ctx.spam.check({ content: text, type: "comment", authorName: author });
      if (verdict.spam) {
        return json(
          { error: { code: "comment_rejected", message: "That comment looks like spam." } },
          { status: 422 },
        );
      }
      const row = await ctx.db.comments.insert({
        postSlug: slug,
        authorName: author,
        body: text,
        authorId: ctx.auth.userId,
      });
      ctx.invalidate("comments");
      return json(
        { data: { id: row.id, post: slug, author, body: text, createdAt: row.createdAt } },
        { status: 201 },
      );
    }),
  },
});
