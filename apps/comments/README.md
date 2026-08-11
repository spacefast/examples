# Comments

A minimal two-file Zero app with live comments, runtime-owned Akismet request
metadata, Gravatar avatars, transactional email, and a live social image at
`/og/comments.png` generated with `ImageResponse`.

```sh
sf dev
sf publish
```

The mutation does not call `ctx.invalidate("comments")`. A successful table
write already causes live queries to refresh; explicit invalidation only narrows
which named subscriptions refresh.

Optionally configure a verified sender and a fixed notification recipient:

```sh
sf env set COMMENTS_FROM_EMAIL comments@example.com
sf env set COMMENTS_NOTIFY_EMAIL team@example.com
```

When both are set, the comment row and email outbox row share one
`ctx.transaction()`: both commit or both roll back. Delivery happens later and
is not part of the database transaction.
