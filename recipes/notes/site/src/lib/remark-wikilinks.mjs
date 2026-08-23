import { visit } from 'unist-util-visit';
import { slugify } from './slugify.mjs';

// Turns Obsidian/Roam-style [[wiki links]] in the Markdown body into real
// internal anchors at build time. Supports an alias: [[Atomic notes|small notes]]
// renders the text "small notes" but still points at /notes/atomic-notes/.
//
// Backlinks (the reverse direction) are computed separately in garden.ts by
// scanning the raw bodies — this plugin only handles the forward render.
const WIKILINK = /\[\[([^\]]+?)\]\]/g;

export default function remarkWikilinks() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === null || index === undefined) return;
      const value = node.value;
      if (!value.includes('[[')) return;

      const children = [];
      let lastIndex = 0;
      let match;
      WIKILINK.lastIndex = 0;

      while ((match = WIKILINK.exec(value)) !== null) {
        if (match.index > lastIndex) {
          children.push({ type: 'text', value: value.slice(lastIndex, match.index) });
        }
        const [target, alias] = match[1].split('|').map((s) => s.trim());
        const slug = slugify(target);
        children.push({
          type: 'link',
          url: `/notes/${slug}/`,
          data: { hProperties: { className: ['wikilink'], 'data-note': slug } },
          children: [{ type: 'text', value: alias || target }],
        });
        lastIndex = match.index + match[0].length;
      }

      if (children.length === 0) return;
      if (lastIndex < value.length) {
        children.push({ type: 'text', value: value.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...children);
      return index + children.length;
    });
  };
}
