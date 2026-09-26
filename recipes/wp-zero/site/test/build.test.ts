// Three seams, three tests. Each covers something a real WordPress feed or a
// real visitor breaks, and each fails on its own.

import { expect, test } from "bun:test";

import { makeContentResponsive, plain } from "../tools/wordpress";
import { tallyReactions } from "../shared/reactions";
import { searchDocuments, type SearchDocument } from "../shared/search";

test("a real editor's HTML survives a narrow column", () => {
  const wordpressHtml = [
    '<p>Intro with an <a href="https://example.com">link</a>.</p>',
    '<img src="/a.png" width="1200" height="800" alt="A wide screenshot">',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/x"></iframe>',
    '<table><tr><td style="width:900px">Wide cell</td></tr></table>',
    "<pre><code>const x = 1;</code></pre>",
  ].join("\n");

  const html = makeContentResponsive(wordpressHtml);

  // Images lazy-load and lose the pixel dimensions that break a fluid layout.
  expect(html).toContain('loading="lazy"');
  expect(html).not.toContain('width="1200"');
  // Embeds get an aspect-ratio wrapper instead of a fixed 560×315 box.
  expect(html).toContain('<div class="embed">');
  expect(html).not.toContain('width="560"');
  // Tables scroll rather than blow out the page, and inline styles are dropped.
  expect(html).toContain('<div class="table-scroll"><table>');
  expect(html).toContain("</table></div>");
  expect(html).not.toContain("style=");
  // Code blocks are left exactly as the editor wrote them.
  expect(html).toContain("<pre><code>const x = 1;</code></pre>");
  // The words and the links are untouched.
  expect(plain(html)).toContain("Intro with an link.");
});

test("search ranks a title match over a body mention and drops partial matches", () => {
  const documents: SearchDocument[] = [
    {
      slug: "gutenberg-ships",
      title: "Gutenberg ships",
      excerpt: "The editor lands.",
      url: "/posts/gutenberg-ships",
      date: "2026-08-01T00:00:00.000Z",
      categories: ["Releases"],
      text: "gutenberg ships the editor lands",
    },
    {
      slug: "community-notes",
      title: "Community notes",
      excerpt: "Meetups everywhere.",
      url: "/posts/community-notes",
      date: "2026-07-01T00:00:00.000Z",
      categories: ["Community"],
      text: "community notes mentions gutenberg once in passing",
    },
  ];

  const hits = searchDocuments(documents, "gutenberg");
  expect(hits.map((hit) => hit.slug)).toEqual(["gutenberg-ships", "community-notes"]);
  expect(hits[0]!.score).toBeGreaterThan(hits[1]!.score);

  // Every token has to land somewhere, so an unrelated second word excludes both.
  expect(searchDocuments(documents, "gutenberg helicopters")).toEqual([]);
  // A one-character query is not a search.
  expect(searchDocuments(documents, "g")).toEqual([]);
});

test("reaction tallies count everyone but only mark the viewer's own", () => {
  const state = tallyReactions(
    "a-post",
    [
      { emoji: "👏", ownerId: "guest:1" },
      { emoji: "👏", ownerId: "guest:2" },
      { emoji: "🔥", ownerId: "guest:3" },
      // An emoji retired from REACTIONS still sits in the table; ignore it.
      { emoji: "🥔", ownerId: "guest:4" },
    ],
    "guest:3",
  );

  expect(state.counts["👏"]).toBe(2);
  expect(state.counts["🔥"]).toBe(1);
  expect(state.total).toBe(3);
  expect(state.mine).toBe("🔥");
  // Every known emoji is present at zero, so the buttons never reflow.
  expect(state.counts["❤️"]).toBe(0);
});
