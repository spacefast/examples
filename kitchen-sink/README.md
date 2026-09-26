# Spacefast kitchen sink

A deliberately small blog that exercises a deliberately large part of Spacefast from one project,
one `sf.jsonc`, and one publish.

## What is mixed together

The repository root is the deployable project:

- a Zero capsule with SQL tables, realtime queries, drafts, reactions, comments, Akismet,
  transactional email, auth, Gravatar, endpoints, OpenGraph images, and logs;
- native PHP actions in `functions/*.php`;
- TypeScript and JavaScript modules in the same `functions/` file router;
- a custom `_layout.html`, access screen, and 404 page;
- redirects, headers, theme, and ordinary static content.

The TypeScript and JavaScript modules compile into one Functions worker. PHP remains a native site
action. Static files and Zero routes resolve first; the worker handles only routes its compiled
table claims. A Zero route wins an intentional path conflict.

## Run it

```sh
bun install
bun test

sf dev
sf publish
```

That single `sf publish` carries the capsule, worker, PHP actions, pages, and static shell in one
version. `sf dev` currently previews the Zero client and server locally. Native PHP and the worker
are compiled and exercised by tests until local site-worker and workerd emulation land.

## Email configuration

Comments, contact forms, and newsletter signups pass through the runtime-owned Akismet broker. The
`/api/spam/check` endpoint demonstrates all six supported content types: `comment`, `reply`,
`forum-post`, `contact-form`, `signup`, and `message`. Verdicts distinguish ordinary spam from
pervasive spam that can be discarded. The authenticated `trainAkismet` mutation demonstrates both
`reportSpam` and `reportHam` corrections using the original submission evidence.

To also queue comment notification email, set both variables on the Space:

```sh
sf env set BLOG_FROM_EMAIL comments@example.com
sf env set BLOG_NOTIFY_EMAIL editor@example.com
```

`BLOG_FROM_EMAIL` must be a verified sender. The comment row and email outbox row are committed in
one Zero transaction. Delivery happens later.

The native PHP route's `GET` response is self-contained. Its `POST` path demonstrates the email
broker and returns a structured `503` until the Space has a verified sender and email outbox
configured.

## Routes

| Route                              | Surface                                                      |
| ---------------------------------- | ------------------------------------------------------------ |
| `/`                                | Blog index                                                   |
| `/posts/the-useful-edge`           | Zero article, reactions, and live comments                   |
| `/api/health`                      | Zero endpoint                                                |
| `/api/feed.xml`                    | Zero endpoint                                                |
| `/api/og.png?slug=the-useful-edge` | Data-backed 1200×630 OpenGraph image                         |
| `/api/spam/check`                  | Request-aware Akismet check for every supported content type |
| `/api/contact`                     | Akismet-protected contact endpoint                           |
| `/author-note`                     | Native PHP plus email broker                                 |
| `/php-note`                        | Native PHP                                                   |
| `/health`                          | TypeScript Function                                          |
| `/quote?n=1`                       | JavaScript Function                                          |
| `/function-posts/:slug`            | TypeScript parameter route                                   |

`_pages/access.html` customizes the runtime access screen and is never served directly. Generated
`.spacefast/` directories are local state and build output; never commit them.
