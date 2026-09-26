---
title: Static Isn't the Opposite of Alive
dek: We borrowed a word from filesystems and turned it into an insult.
date: 2026-06-14
tags: ["architecture", "the web"]
---

The word "static" is doing a lot of unpaid work. It came out of a filesystem —
files that sit there, bytes that don't change between requests — and somewhere
along the way it picked up a second meaning that has nothing to do with
filesystems at all. Static came to mean *inert*. Brochureware. The site you make
when you've given up on the site you wanted.

That's a category error, and it costs people real architecture.

A page is static in the useful sense when the bytes the server sends are decided
before anyone asks for them. That is a statement about *when the work happened*,
not about what the page can do once it's open. The two questions are completely
independent, and we keep collapsing them into one.

## The thing you're actually choosing

Every piece of a page has an honest answer to one question: when is this known?

The title of this post was known on Sunday afternoon. The typography was known
when the stylesheet was written. The paragraph you're reading was known when I
stopped editing it. None of that gets more correct by being computed at 200
requests per second. Rendering it per-request isn't dynamism; it's just doing
the same work over and over and calling the repetition a feature.

The comment thread under this post is a different animal. It isn't known until
someone types it. It changes while you're looking at it. It has to be true
*now*, not true-as-of-the-last-deploy.

Once you ask the question that way, the architecture writes itself. Prerender
what's known. Subscribe to what isn't. The mistake isn't picking static; the
mistake is letting one word decide the whole page.

## Where the framing went wrong

The industry spent a decade with a build step that could only produce files and
a server that could only produce responses, and no comfortable way to have both.
So the choice got framed as a personality test. Are you a static person or a
dynamic person? Do you value speed or do you value interactivity?

Nobody actually wants that trade. What people wanted was a page that shows up
instantly and then wakes up. We just didn't have a shape for it that didn't
involve running a second service, giving it a database, giving that database a
connection pool, and giving the whole apparatus a pager rotation — all to store
four hundred rows of "great post!"

That asymmetry is why so many blogs have no comments. Not because comment
sections are bad. Because the *server* was the expensive part, and one feature
couldn't justify it.

## The interesting part is the seam

When the prerendered part and the live part can ship as one thing, the design
question stops being "static or dynamic" and becomes something much better:
*where's the seam?*

A seam is a promise about what each side owns. On this site the build owns every
word — the essays, the layout, the reading order — and knows nothing about
readers. The runtime owns the conversation and knows nothing about Markdown.
They meet at a slug. That's the entire contract. I can rewrite this paragraph
and republish without touching a comment. Someone can leave a comment without
invalidating a single cached byte of the article.

Compare that to a page rendered whole on every request, where the words and the
comments are entangled in one template and one cache key. Changing the header
means busting the cache for the conversation. Nothing about that is more alive.
It's just less separated.

## Static as a discipline

Here's the reframe I'd like back: static isn't a limitation you accept, it's a
claim you make. You're claiming this part is settled. You're putting it in the
build output and standing behind it.

The parts you can't make that claim about — the ones that are still arguing,
still arriving, still being typed — those get a runtime. Not because they're
more important. Because they're not settled yet.

A page can be almost entirely settled and still be completely alive. Most good
pages are.
