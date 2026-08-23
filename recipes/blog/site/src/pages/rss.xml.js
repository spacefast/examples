import { getCollection } from 'astro:content';
import { site } from '../lib/site';

// A hand-rolled RSS 2.0 feed — no dependency, just a string. Static blogs
// don't need a library to emit a few hundred bytes of XML.
const esc = (s = '') =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function GET(context) {
  const origin = context.site?.href?.replace(/\/$/, '') ?? '';
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const items = posts
    .map((post) => {
      const link = `${origin}/posts/${post.id}/`;
      const cats = post.data.tags
        .map((t) => `<category>${esc(t)}</category>`)
        .join('');
      return `    <item>
      <title>${esc(post.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${esc(post.data.description)}</description>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      ${cats}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.title)}</title>
    <link>${origin}/</link>
    <atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${esc(site.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
