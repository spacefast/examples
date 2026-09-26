# Spacefast Zero comments

A minimal Zero app with live comments, runtime-owned Akismet request
metadata, Gravatar avatars, transactional email, and a live social image at
`/og/comments.png` generated with `ImageResponse`.

```sh
bun install
sf dev
sf build
sf publish
```

## What `sf dev` cannot show you

`sf dev` brokers no platform services, so `addComment` stops at its first
`ctx.spam.check` call with `zero_spam_unavailable`. Guarding that one call is
enough to post a comment locally, because `ctx.email.send` sits behind
`if (from && notify)` and the two email variables are unset by default. Set
them and it fails the same way, with `zero_email_unavailable`.
`ctx.gravatar.avatarUrl` is fine offline: it is a hash and a query string, not
a request.

The local transaction boundary is also the whole invocation rather than the
`ctx.transaction()` block, so use a published Space to check that the comment
row and the email outbox row really commit together.

The mutation does not call `ctx.invalidate("comments")`. A successful table
write already causes live queries to refresh; explicit invalidation only narrows
which named subscriptions refresh.

Optionally configure a verified sender and a fixed notification recipient:

```sh
sf env set COMMENTS_FROM_EMAIL comments@example.com
sf env set COMMENTS_NOTIFY_EMAIL team@example.com
```

When both are set, the comment row and email outbox row share the mutation's
transaction: both commit or both roll back. Delivery happens later and
is not part of the database transaction.
