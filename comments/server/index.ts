import { h } from "preact";

import {
  capsule,
  endpoint,
  ImageResponse,
  mutation,
  query,
  string,
  table,
} from "@spacefast/zero/server";

function clean(value: string, max: number) {
  return value.trim().replace(/\s+/g, " ").slice(0, max);
}

export default capsule({
  name: "Comments",
  schema: {
    comments: table({
      authorName: string(),
      avatarUrl: string(),
      body: string(),
    }),
  },
  queries: {
    comments: query(async (ctx) =>
      ctx.db.comments.withIndex("by_creation").order("desc").take(100),
    ),
  },
  mutations: {
    addComment: mutation(async (ctx, authorName: string, authorEmail: string, body: string) => {
      const name = clean(authorName, 80);
      const email = clean(authorEmail, 240).toLowerCase();
      const content = clean(body, 2_000);
      if (!name || !email || !content) throw new Error("Name, email, and comment are required.");

      // Zero supplies the visitor IP, user agent, referrer, and permalink from
      // the trusted HTTP invocation. None of those values comes from args.
      const verdict = await ctx.spam.check({
        content,
        type: "comment",
        authorName: name,
        authorEmail: email,
      });
      if (verdict.spam) return { accepted: false as const };

      const from = ctx.env.COMMENTS_FROM_EMAIL;
      const notify = ctx.env.COMMENTS_NOTIFY_EMAIL;
      if (Boolean(from) !== Boolean(notify)) {
        throw new Error("Set both COMMENTS_FROM_EMAIL and COMMENTS_NOTIFY_EMAIL, or neither.");
      }
      const avatarUrl = ctx.gravatar.avatarUrl(email, {
        size: 80,
        default: "identicon",
        rating: "g",
      });

      const result = await ctx.transaction(async () => {
        const comment = await ctx.db.comments.insert({
          authorName: name,
          avatarUrl,
          body: content,
        });
        if (from && notify) {
          // This queues an outbox row on the same DB transaction as the
          // comment. It does not wait for the email provider to deliver it.
          await ctx.email.send({
            from,
            to: notify,
            replyTo: { email, name },
            subject: `New comment from ${name}`,
            text: content,
          });
        }
        return {
          accepted: true as const,
          commentId: comment.id,
          notificationQueued: Boolean(notify),
        };
      });

      // No ctx.invalidate("comments") is necessary. The write refreshes live
      // queries; naming one only narrows the refresh when a page has many.
      return result;
    }),
  },
  endpoints: {
    commentsImage: endpoint({ method: "GET", path: "/og/comments.png" }, async (ctx) => {
      const comments = await ctx.db.comments.withIndex("by_creation").order("desc").take(100);
      const latest = comments[0];
      const count = comments.length === 100 ? "100+ comments" : `${comments.length} comments`;

      return new ImageResponse(
        h(
          "div",
          {
            style: {
              alignItems: "flex-start",
              backgroundColor: "#111827",
              color: "#f9fafb",
              display: "flex",
              flexDirection: "column",
              fontFamily: "sans-serif",
              height: "100%",
              justifyContent: "space-between",
              padding: 72,
              width: "100%",
            },
          },
          h(
            "div",
            null,
            h("p", { style: { color: "#a78bfa", fontSize: 28, margin: 0 } }, "COMMENTS"),
            h(
              "h1",
              { style: { fontSize: 72, letterSpacing: -2, lineHeight: 1.05, margin: "24px 0" } },
              latest ? `Latest from ${latest.authorName}` : "Start the conversation",
            ),
            h(
              "p",
              { style: { color: "#d1d5db", fontSize: 34, lineHeight: 1.35, margin: 0 } },
              latest?.body ?? "Live comments, protected by Akismet.",
            ),
          ),
          h("p", { style: { color: "#9ca3af", fontSize: 26, margin: 0 } }, count),
        ),
        {
          width: 1200,
          height: 630,
          headers: { "cache-control": "public, max-age=60" },
        },
      );
    }),
  },
});
