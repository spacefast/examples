// One slugify, used by both the remark plugin (when it turns [[A Title]] into a
// link) and the rest of the site (filenames, graph node ids). Keeping it in one
// place is what guarantees that [[Evergreen notes]] resolves to the file named
// evergreen-notes.md and nowhere else.
export function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
