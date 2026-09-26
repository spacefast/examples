import { h, type VNode } from "preact";

import {
  boolean,
  capsule,
  endpoint,
  ImageResponse,
  json,
  mutation,
  query,
  string,
  table,
  text,
} from "@spacefast/zero/server";

import { cleanEmail, cleanMarkdown, cleanSlug, cleanText, type Post } from "../shared/model";

const spamContentTypes = [
  "comment",
  "reply",
  "forum-post",
  "contact-form",
  "signup",
  "message",
] as const;
type SpamContentType = (typeof spamContentTypes)[number];

const starterPosts = [
  {
    slug: "the-useful-edge",
    title: "The useful edge",
    dek: "A fast site is less about spectacle and more about removing the moments that make people wait.",
    body: `# The useful edge

The web gets better when the machinery stays out of the reader's way. A page should arrive, settle, and make its point without asking for patience.

## Keep the boundary boring

Static files do the obvious work. A small runtime handles the parts that genuinely need identity, data, or a decision. Neither side should impersonate the other.

> Good infrastructure is felt as an absence of friction.

That split gives us a practical rule: put content close to the reader, keep credentials on the server, and make every dynamic path earn its complexity.

## Proof over posture

- Open the real URL
- Exercise the state that matters
- Keep the receipt
- Say clearly what was not verified

The result is not only faster. It is easier to trust.`,
    authorName: "Mara Vale",
    publishedAt: "August 11, 2026",
    readingMinutes: "4 min read",
    featured: true,
  },
  {
    slug: "notes-from-a-small-release",
    title: "Notes from a small release",
    dek: "The smallest release can still deserve a clean plan, one owner, and a real finish line.",
    body: `# Notes from a small release

Small does not mean casual. It means the surface is narrow enough to understand.

## The short checklist

1. Name the behavior
2. Change one authority
3. Run the closest real test
4. Open what shipped

Everything else is supporting detail.`,
    authorName: "Mara Vale",
    publishedAt: "August 8, 2026",
    readingMinutes: "3 min read",
    featured: false,
  },
  {
    slug: "the-comment-box-is-a-system",
    title: "The comment box is a system",
    dek: "A tiny form crosses identity, abuse, storage, notifications, and realtime updates.",
    body: `# The comment box is a system

A comment form looks like three fields and a button. Behind it sit several promises: the author is represented honestly, abuse is checked, the row is durable, and the editor is notified once.

The useful abstraction is not a bigger form component. It is a transaction boundary with trusted request metadata.`,
    authorName: "Ivo North",
    publishedAt: "August 2, 2026",
    readingMinutes: "2 min read",
    featured: false,
  },
] as const;

export default capsule({
  name: "Field Notes kitchen sink",
  schema: {
    posts: table({
      slug: string(),
      title: string(),
      dek: string(),
      body: string(),
      authorName: string(),
      publishedAt: string(),
      readingMinutes: string(),
      featured: boolean().default(false),
    }).index("by_slug", ["slug"]),
    comments: table({
      postSlug: string(),
      authorName: string(),
      avatarUrl: string(),
      body: string(),
      ownerId: string(),
    }).index("by_post", ["postSlug"]),
    reactions: table({
      postSlug: string(),
      kind: string(),
      ownerId: string(),
    })
      .index("by_post", ["postSlug"])
      .index("by_owner_post", ["ownerId", "postSlug"]),
    drafts: table({
      slug: string(),
      title: string(),
      dek: string(),
      body: string(),
      ownerId: string(),
    }).index("by_owner", ["ownerId"]),
    subscribers: table({
      email: string(),
      source: string(),
      ownerId: string(),
    }).index("by_email", ["email"]),
    activity: table({
      kind: string(),
      label: string(),
      ownerId: string(),
    }).index("by_owner", ["ownerId"]),
  },

  queries: {
    home: query(async (ctx) => {
      const [posts, comments, reactions] = await Promise.all([
        ctx.db.posts.withIndex("by_creation").order("desc").collect(),
        ctx.db.comments.withIndex("by_creation").collect(),
        ctx.db.reactions.withIndex("by_creation").collect(),
      ]);
      return {
        ready: posts.length > 0,
        posts,
        commentCount: comments.length,
        reactionCount: reactions.length,
      };
    }),
    post: query(async (ctx, slug: string) => {
      const resolved = cleanSlug(slug);
      const [post, comments, reactions] = await Promise.all([
        ctx.db.posts.withIndex("by_slug", (range) => range.eq("slug", resolved)).first(),
        ctx.db.comments
          .withIndex("by_post", (range) => range.eq("postSlug", resolved))
          .order("desc")
          .take(100),
        ctx.db.reactions.withIndex("by_post", (range) => range.eq("postSlug", resolved)).collect(),
      ]);
      return { post, comments, reactionCount: reactions.length };
    }),
    editor: query(async (ctx) => {
      if (!ctx.auth.isAuthenticated) return { drafts: [], activity: [] };
      const ownerId = ctx.auth.userId;
      const [drafts, activity] = await Promise.all([
        ctx.db.drafts
          .withIndex("by_owner", (range) => range.eq("ownerId", ownerId))
          .order("desc")
          .collect(),
        ctx.db.activity
          .withIndex("by_owner", (range) => range.eq("ownerId", ownerId))
          .order("desc")
          .take(40),
      ]);
      return { drafts, activity };
    }),
  },

  mutations: {
    bootstrapBlog: mutation(async (ctx) => {
      const existing = await ctx.db.posts
        .withIndex("by_slug", (range) => range.eq("slug", starterPosts[0].slug))
        .first();
      if (existing) return false;
      await Promise.all(starterPosts.map((post) => ctx.db.posts.insert(post)));
      await ctx.db.activity.insert({
        kind: "blog.seeded",
        label: "Starter posts created",
        ownerId: ctx.auth.userId,
      });
      ctx.log.info("field notes seeded", { posts: starterPosts.length });
      return true;
    }),

    addComment: mutation(
      async (ctx, postSlug: string, authorName: string, authorEmail: string, body: string) => {
        const slug = cleanSlug(postSlug);
        const name = cleanText(authorName, 80);
        const email = cleanEmail(authorEmail);
        const content = cleanText(body, 2_000);
        if (!slug || !name || !email || !content) {
          throw new Error("Name, email, and comment are required.");
        }
        const post = await ctx.db.posts
          .withIndex("by_slug", (range) => range.eq("slug", slug))
          .first();
        if (!post) throw new Error("Post not found.");

        // The runtime supplies trusted visitor IP, user agent, referrer, and
        // permalink. None of those abuse signals comes from mutation args.
        const verdict = await ctx.spam.check({
          content,
          type: "comment",
          authorName: name,
          authorEmail: email,
        });
        if (verdict.spam) {
          ctx.log.warn(
            verdict.discard ? "comment discarded as pervasive spam" : "comment held as spam",
            { postSlug: slug },
          );
          return {
            accepted: false as const,
            discarded: verdict.discard,
            notificationQueued: false,
          };
        }

        const from = ctx.env.BLOG_FROM_EMAIL;
        const notify = ctx.env.BLOG_NOTIFY_EMAIL;
        if (Boolean(from) !== Boolean(notify)) {
          throw new Error("Set both BLOG_FROM_EMAIL and BLOG_NOTIFY_EMAIL, or neither.");
        }
        const avatarUrl = ctx.gravatar.avatarUrl(email, {
          size: 96,
          default: "identicon",
          rating: "g",
        });

        const comment = await ctx.db.comments.insert({
          postSlug: slug,
          authorName: name,
          avatarUrl,
          body: content,
          ownerId: ctx.auth.userId,
        });
        if (from && notify) {
          await ctx.email.send({
            from,
            to: notify,
            replyTo: { email, name },
            subject: `New comment on “${post.title}”`,
            text: `${name} wrote:\n\n${content}`,
          });
        }
        const result = {
          accepted: true as const,
          commentId: comment.id,
          discarded: false,
          notificationQueued: Boolean(notify),
        };
        ctx.log.info("comment accepted", { postSlug: slug, commentId: result.commentId });
        return result;
      },
    ),

    trainAkismet: mutation(
      async (
        ctx,
        correction: string,
        content: string,
        userIp: string,
        type: string,
        authorName: string,
        authorEmail: string,
        authorUrl: string,
        userAgent: string,
        referrer: string,
        permalink: string,
        createdAt: string,
        languages: string,
      ) => {
        if (!ctx.auth.isAuthenticated) throw new Error("Sign in to submit spam corrections.");
        const report = correction === "spam" ? "spam" : correction === "ham" ? "ham" : null;
        const submissionType = spamContentType(type);
        const cleanContent = cleanText(content, 2_000);
        const cleanIp = cleanText(userIp, 64);
        if (!report || !submissionType || !cleanContent || !cleanIp) {
          throw new Error(
            "Correction, content, user IP, and a supported content type are required.",
          );
        }
        const languageHints = languages
          .split(",")
          .map((language) => language.trim().toLowerCase())
          .filter((language) => /^[a-z]{2}$/.test(language));
        const timestamp =
          createdAt && Number.isFinite(Date.parse(createdAt))
            ? new Date(createdAt).toISOString()
            : undefined;
        const cleanUserAgent = cleanText(userAgent, 500);
        const cleanReferrer = cleanText(referrer, 2_000);
        const cleanPermalink = cleanText(permalink, 2_000);
        const cleanAuthorName = cleanText(authorName, 80);
        const cleanAuthorEmail = cleanEmail(authorEmail);
        const cleanAuthorUrl = cleanText(authorUrl, 2_000);
        const submission = {
          content: cleanContent,
          userIp: cleanIp,
          type: submissionType,
          ...(cleanUserAgent ? { userAgent: cleanUserAgent } : {}),
          ...(cleanReferrer ? { referrer: cleanReferrer } : {}),
          ...(cleanPermalink ? { permalink: cleanPermalink } : {}),
          ...(cleanAuthorName ? { authorName: cleanAuthorName } : {}),
          ...(cleanAuthorEmail ? { authorEmail: cleanAuthorEmail } : {}),
          ...(cleanAuthorUrl ? { authorUrl: cleanAuthorUrl } : {}),
          ...(timestamp ? { createdAt: timestamp } : {}),
          ...(languageHints.length > 0 ? { languages: languageHints } : {}),
        };
        if (report === "spam") await ctx.spam.reportSpam(submission);
        else await ctx.spam.reportHam(submission);
        await ctx.db.activity.insert({
          kind: `akismet.${report}`,
          label: `Reported ${submissionType} as ${report}`,
          ownerId: ctx.auth.userId,
        });
        ctx.log.info("akismet correction submitted", { correction: report, type: submissionType });
        return { reported: report, type: submissionType };
      },
    ),

    react: mutation(async (ctx, postSlug: string, kind: string) => {
      const slug = cleanSlug(postSlug);
      const reaction = kind === "useful" ? "useful" : "thoughtful";
      const existing = await ctx.db.reactions
        .withIndex("by_owner_post", (range) =>
          range.eq("ownerId", ctx.auth.userId).eq("postSlug", slug),
        )
        .first();
      if (existing) {
        await ctx.db.reactions.update(existing.id, { kind: reaction });
        return { created: false, kind: reaction };
      }
      await ctx.db.reactions.insert({
        postSlug: slug,
        kind: reaction,
        ownerId: ctx.auth.userId,
      });
      return { created: true, kind: reaction };
    }),

    subscribe: mutation(async (ctx, rawEmail: string) => {
      const email = cleanEmail(rawEmail);
      if (!email || !email.includes("@")) throw new Error("Enter a valid email address.");
      const verdict = await ctx.spam.check({ content: email, type: "signup", authorEmail: email });
      if (verdict.spam) {
        ctx.log.warn("subscription rejected as spam", { discard: verdict.discard });
        return { created: false, discarded: verdict.discard, rejected: true };
      }
      const existing = await ctx.db.subscribers
        .withIndex("by_email", (range) => range.eq("email", email))
        .first();
      if (existing) return { created: false, discarded: false, rejected: false };
      await ctx.db.subscribers.insert({ email, source: "blog-footer", ownerId: ctx.auth.userId });
      ctx.log.info("subscriber added", { source: "blog-footer" });
      return { created: true, discarded: false, rejected: false };
    }),

    saveDraft: mutation(async (ctx, draftId: string, title: string, dek: string, body: string) => {
      if (!ctx.auth.isAuthenticated) throw new Error("Sign in to edit drafts.");
      const ownerId = ctx.auth.userId;
      const cleanTitle = cleanText(title, 140) || "Untitled";
      const values = {
        slug: cleanSlug(cleanTitle) || `draft-${Date.now()}`,
        title: cleanTitle,
        dek: cleanText(dek, 280),
        body: cleanMarkdown(body),
        ownerId,
      };
      const existing = draftId ? await ctx.db.drafts.get(draftId) : null;
      const draft =
        existing && existing.ownerId === ownerId
          ? await ctx.db.drafts.update(existing.id, values)
          : await ctx.db.drafts.insert(values);
      await ctx.db.activity.insert({
        kind: "draft.saved",
        label: `Saved “${cleanTitle}”`,
        ownerId,
      });
      return draft;
    }),

    publishDraft: mutation(async (ctx, draftId: string) => {
      if (!ctx.auth.isAuthenticated) throw new Error("Sign in to publish drafts.");
      const draft = await ctx.db.drafts.get(draftId);
      if (!draft || draft.ownerId !== ctx.auth.userId) throw new Error("Draft not found.");
      const existing = await ctx.db.posts
        .withIndex("by_slug", (range) => range.eq("slug", draft.slug))
        .first();
      if (existing) throw new Error("A post already owns that slug.");
      const post = await ctx.db.posts.insert({
        slug: draft.slug,
        title: draft.title,
        dek: draft.dek,
        body: draft.body,
        authorName: ctx.auth.displayName || "Field Notes editor",
        publishedAt: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        readingMinutes: `${Math.max(1, Math.ceil(draft.body.split(/\s+/).length / 220))} min read`,
        featured: false,
      });
      await ctx.db.drafts.delete(draft.id);
      await ctx.db.activity.insert({
        kind: "post.published",
        label: `Published “${post.title}”`,
        ownerId: ctx.auth.userId,
      });
      return post;
    }),

    removeOwnComment: mutation(async (ctx, commentId: string) => {
      const comment = await ctx.db.comments.get(commentId);
      if (!comment || comment.ownerId !== ctx.auth.userId) return false;
      await ctx.db.comments.delete(comment.id);
      return true;
    }),
  },

  endpoints: {
    health: endpoint({ mode: "read", method: "GET", path: "/api/health" }, async (ctx) => {
      const first = await ctx.db.posts.withIndex("by_creation").first();
      return json({
        ok: true,
        database: first ? "ready" : "empty",
        identity: ctx.auth.isGuest ? "guest" : "authenticated",
        environment: ctx.env.BLOG_ENV || "production",
      });
    }),
    feed: endpoint({ mode: "read", method: "GET", path: "/api/feed.xml" }, async (ctx) => {
      // Endpoint ctx.db is not schema-typed in @spacefast/zero 0.4.1; these are posts rows.
      const posts = (await ctx.db.posts.withIndex("by_creation").order("desc").take(20)) as Post[];
      const items = posts
        .map(
          (post) =>
            `<item><title>${xml(post.title)}</title><link>/posts/${post.slug}</link>` +
            `<description>${xml(post.dek)}</description></item>`,
        )
        .join("");
      return text(
        `<?xml version="1.0"?><rss version="2.0"><channel><title>Field Notes</title>${items}</channel></rss>`,
        {
          headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
        },
      );
    }),
    openGraphImage: endpoint(
      { mode: "read", method: "GET", path: "/api/og.png" },
      async (ctx, request) => {
        const requestedSlug = cleanSlug(request.query.get("slug") ?? "");
        // Endpoint ctx.db is not schema-typed in @spacefast/zero 0.4.1; this is a posts row.
        const post = (
          requestedSlug
            ? await ctx.db.posts
                .withIndex("by_slug", (range) => range.eq("slug", requestedSlug))
                .first()
            : await ctx.db.posts.withIndex("by_creation").order("desc").first()
        ) as Post | null;
        const title = post?.title ?? "Small ideas, tested in the real world.";
        const description =
          post?.dek ?? "Independent notes on useful software, publishing, and infrastructure.";

        return new ImageResponse(
          // ImageResponse takes a bare VNode; preact's h() infers a props-typed one.
          h(
            "div",
            {
              style: {
                backgroundColor: "#151713",
                color: "#f7f4ec",
                display: "flex",
                flexDirection: "column",
                fontFamily: "Georgia, serif",
                height: "100%",
                justifyContent: "space-between",
                padding: 72,
                width: "100%",
              },
            },
            h(
              "div",
              { style: { display: "flex", justifyContent: "space-between", width: "100%" } },
              h(
                "p",
                {
                  style: {
                    color: "#ef7658",
                    fontFamily: "sans-serif",
                    fontSize: 26,
                    fontWeight: 700,
                    letterSpacing: 3,
                    margin: 0,
                    textTransform: "uppercase",
                  },
                },
                "Field Notes",
              ),
              h(
                "p",
                { style: { color: "#b7b3a9", fontFamily: "sans-serif", fontSize: 24, margin: 0 } },
                post?.publishedAt ?? "A Spacefast publication",
              ),
            ),
            h(
              "div",
              { style: { display: "flex", flexDirection: "column", maxWidth: 980 } },
              h(
                "h1",
                {
                  style: {
                    fontSize: title.length > 54 ? 62 : 76,
                    fontWeight: 400,
                    letterSpacing: -2,
                    lineHeight: 1.04,
                    margin: "0 0 28px",
                  },
                },
                title,
              ),
              h(
                "p",
                {
                  style: {
                    color: "#cbc7bd",
                    fontFamily: "sans-serif",
                    fontSize: 30,
                    lineHeight: 1.35,
                    margin: 0,
                  },
                },
                description,
              ),
            ),
            h(
              "div",
              {
                style: {
                  alignItems: "center",
                  display: "flex",
                  fontFamily: "sans-serif",
                  fontSize: 24,
                  justifyContent: "space-between",
                  width: "100%",
                },
              },
              h("p", { style: { color: "#b7b3a9", margin: 0 } }, post?.authorName ?? "Field Notes"),
              h("p", { style: { color: "#ef7658", margin: 0 } }, "spacefast.com"),
            ),
          ) as VNode,
          {
            width: 1200,
            height: 630,
            headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
          },
        );
      },
    ),
    spamCheck: endpoint(
      { mode: "read", method: "POST", path: "/api/spam/check" },
      async (ctx, request) => {
        const payload = (await request.json().catch(() => null)) as {
          content?: unknown;
          type?: unknown;
          authorName?: unknown;
          authorEmail?: unknown;
          authorUrl?: unknown;
          createdAt?: unknown;
          languages?: unknown;
        } | null;
        const content = cleanText(
          typeof payload?.content === "string" ? payload.content : "",
          2_000,
        );
        const type = spamContentType(typeof payload?.type === "string" ? payload.type : "");
        if (!content || !type) {
          return json(
            { error: "Content and a supported Akismet content type are required." },
            { status: 422 },
          );
        }
        const createdAt =
          typeof payload?.createdAt === "string" && Number.isFinite(Date.parse(payload.createdAt))
            ? new Date(payload.createdAt).toISOString()
            : undefined;
        const languages = Array.isArray(payload?.languages)
          ? payload.languages
              .filter((language): language is string => typeof language === "string")
              .map((language) => language.trim().toLowerCase())
              .filter((language) => /^[a-z]{2}$/.test(language))
          : [];
        const authorName = cleanText(
          typeof payload?.authorName === "string" ? payload.authorName : "",
          80,
        );
        const authorEmail = cleanEmail(
          typeof payload?.authorEmail === "string" ? payload.authorEmail : "",
        );
        const authorUrl = cleanText(
          typeof payload?.authorUrl === "string" ? payload.authorUrl : "",
          2_000,
        );
        const verdict = await ctx.spam.check({
          content,
          type,
          ...(authorName ? { authorName } : {}),
          ...(authorEmail ? { authorEmail } : {}),
          ...(authorUrl ? { authorUrl } : {}),
          ...(createdAt ? { createdAt } : {}),
          ...(languages.length > 0 ? { languages } : {}),
        });
        return json({ type, ...verdict });
      },
    ),
    contact: endpoint(
      { mode: "read", method: "POST", path: "/api/contact" },
      async (ctx, request) => {
        const payload = (await request.json().catch(() => null)) as {
          name?: unknown;
          email?: unknown;
          message?: unknown;
        } | null;
        const name = cleanText(typeof payload?.name === "string" ? payload.name : "", 80);
        const email = cleanEmail(typeof payload?.email === "string" ? payload.email : "");
        const message = cleanText(
          typeof payload?.message === "string" ? payload.message : "",
          2_000,
        );
        if (!name || !email || !message) return json({ accepted: false }, { status: 422 });
        const verdict = await ctx.spam.check({
          content: message,
          type: "contact-form",
          authorName: name,
          authorEmail: email,
        });
        if (verdict.spam) return json({ accepted: false, discarded: verdict.discard });
        return json({ accepted: true, discarded: false });
      },
    ),
  },
});

function spamContentType(value: string): SpamContentType | null {
  return spamContentTypes.find((type) => type === value) ?? null;
}

function xml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
