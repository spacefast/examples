---
title: Why I Still Write in Plain Markdown
description: I've tried every fashionable writing tool with a database under it. I keep crawling back to a folder of text files. Here's the case for boring, durable formats.
pubDate: 2026-05-14
tags: ['writing', 'tools', 'essays']
---

Every couple of years a beautiful new writing app appears, and every couple of
years I move in, decorate, and then quietly move back out. The notebooks with
the bidirectional links. The all-in-one workspaces. The editors that sync to a
proprietary cloud and render your prose in a font you didn't choose.

They're genuinely nice. And I keep returning to a folder of `.md` files because
of one stubborn property: I can still open them.

## The format you can read in fifty years

Here's the entire syntax I use, and it has not changed in fifteen years:

```markdown
# A heading

A paragraph with **bold**, *italic*, and a [link](https://example.com).

- a list
- of things

> a quote worth keeping

`inline code`, and a fenced block:

​```js
const durable = true;
​```
```

That's it. There's no version. There's no migration. A Markdown file from 2011
renders identically today, and — this is the part that matters — it's *legible
as plain text even if nothing renders it at all*. Open it in Notepad on a
borrowed computer and it still reads like the thing you wrote.

Compare that to the document I genuinely lost in 2017 because the app that made
it shut down and exported to a format only it could read. The words were in
there somewhere. I just couldn't get them out.

## Plain text is a power tool in disguise

Because the files are just text, every tool I already own works on them. I don't
need the writing app to ship a feature; the feature already exists in the
operating system.

```bash
# How many words have I published this year?
cat content/posts/2026-*.md | wc -w

# Find every post where I hedged.
grep -rln "I think maybe" content/posts/

# Every draft I haven't finished, oldest first.
grep -rl "draft: true" content/posts/ | xargs ls -t | tail
```

My version history is `git log`. My backup is three copies in three places that
cost nothing because text is tiny. My search is `grep`, which has never once
been down for maintenance. The "platform" is forty years of Unix that isn't
going anywhere.

## It separates writing from formatting — on purpose

The thing fancy editors get backwards is that they make you style while you
write. You stop mid-sentence to fix a heading level. With Markdown the styling
lives somewhere else entirely — a stylesheet, a theme — and the document only
carries *structure*. This very blog is proof: I wrote this in a text editor, and
a build step turned the same file into the page you're reading, with syntax
highlighting and typography I never thought about while writing.

> Write the meaning. Let a separate, replaceable layer decide the look.

## The honest tradeoff

Markdown is bad at tables, hostile to footnotes, and useless for anything that
wants to be a spreadsheet. For those I leave. But for prose — essays, posts,
documentation, the long emails I draft before sending — the boring format wins
on the only axis I've come to care about: I will still be able to read it after
the apps I'm tempted by today are gone. That's not nostalgia. It's just picking
the format most likely to outlast me.
