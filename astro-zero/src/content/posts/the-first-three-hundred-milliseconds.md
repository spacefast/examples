---
title: The First Three Hundred Milliseconds
dek: Nobody reads your loading spinner. Design the empty state instead.
date: 2026-08-09
tags: ["design", "performance"]
---

Open any modern page and there's a window — call it three hundred milliseconds —
where the layout has arrived and the data hasn't. It's the most-viewed screen on
most websites, and it is almost universally designed by accident.

The standard treatment is a spinner. A spinner says: *something is happening,
and I have chosen not to tell you what.* It's the interface equivalent of hold
music.

## What the reader is doing

In that window, a reader is doing exactly one thing: deciding whether this page
is going to be worth their attention. They are not reading. They're scanning for
a reason to stay.

A spinner gives them nothing to scan. Worse, it usually replaces the thing they
came for with a gray disc, so the page briefly gets *less* informative than it
was a moment ago. Then the content pops in, the layout shifts, and they lose
their place in a paragraph they'd already started.

The fix is not to make the spinner prettier. It's to notice that most of the
page didn't need to wait at all.

## Split the page by when it's known

On this site, the article text ships in the HTML. It's on screen in one paint,
before any script has run, because it was decided at build time and there is
nothing to wait for.

The comment thread can't do that. It has to ask.

So the interesting design question is only ever about that second region: what
does the conversation look like in the moment before it exists? And the answer
is *not* "a spinner where the conversation goes."

## Three states, all of them designed

There are three, and each of them deserves real words.

**Loading.** The reader should be able to tell that this region is a comment
thread even when it's empty of comments. Keep the heading. Keep the form —
enabled, focusable, ready. Someone who arrived intending to reply can start
typing at 40ms and never once look at the state of the fetch. Reserve the
vertical space the thread will take so nothing jumps when it lands.

**Empty.** This is the state you'll ship most often, because most posts have no
comments for most of their life, and it's the one that gets the least thought.
"No comments yet" is a status report. It's accurate and it's dead. What you want
is an invitation with a slight edge to it — something that acknowledges the
reader is first and makes that feel like a good position rather than a lonely
one.

**Broken.** Somebody's on hotel Wi-Fi. Say so plainly, keep the form usable, and
offer the retry. A thread that fails silently is indistinguishable from a thread
with nothing in it, and that's the worst possible ambiguity: the reader concludes
nobody cares about this post, when actually a request timed out.

## The layout-shift tax

The reason all of this feels like fussy detail is that we measure it wrong.
"Comments loaded in 240ms" sounds fine. What the reader experienced was the
paragraph they were reading sliding four hundred pixels down the screen at the
exact moment their eye reached the end of a line.

Reserve the space. Match the skeleton to the real thing's metrics — same line
height, same avatar size, same gap — and the arrival becomes a fill rather than
a shove.

## The one-line version

Fast isn't a number, it's the absence of moments where the reader doesn't know
what's going on.

Ship the settled parts in the HTML. For the parts that have to ask, write the
three states like they're copy — because they are the copy, for the first three
hundred milliseconds, for everyone.
