// Single source of truth for the docs site: product metadata, the sidebar
// navigation tree, the version switcher, and the client-side search index.

export const site = {
  name: 'Ledger',
  tagline: 'A tiny, type-safe reactive store for TypeScript.',
  blurb:
    'Local-first state for the web. Define typed collections, write reactive queries, and persist to IndexedDB — in 4 kB, with zero dependencies.',
  repo: 'https://github.com/ledger-js/ledger',
  npm: 'https://www.npmjs.com/package/ledger',
  currentVersion: 'v2.4',
};

export const versions = [
  { label: 'v2.4', note: 'latest', current: true },
  { label: 'v2.3', note: 'stable' },
  { label: 'v1.x', note: 'legacy' },
];

export type NavLink = { title: string; href: string };
export type NavGroup = { title: string; items: NavLink[] };

export const nav: NavGroup[] = [
  {
    title: 'Introduction',
    items: [
      { title: 'Overview', href: '/' },
      { title: 'Getting started', href: '/getting-started/' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { title: 'Reactive queries', href: '/guides/reactive-queries/' },
      { title: 'Persistence', href: '/guides/persistence/' },
      { title: 'Schema migrations', href: '/guides/migrations/' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { title: 'API reference', href: '/api/' },
      { title: 'Changelog', href: '/changelog/' },
    ],
  },
];

// Flat index the ⌘K search filters over. Kept hand-written so the example has
// no build-time indexing step — in a real project you'd generate this.
export type SearchDoc = {
  title: string;
  section: string;
  href: string;
  text: string;
};

export const searchIndex: SearchDoc[] = [
  {
    title: 'Overview',
    section: 'Introduction',
    href: '/',
    text: 'What Ledger is, why local-first, feature highlights, install, quick example.',
  },
  {
    title: 'Getting started',
    section: 'Introduction',
    href: '/getting-started/',
    text: 'Install ledger, create a store, define typed collections, insert and query, wire up React.',
  },
  {
    title: 'Reactive queries',
    section: 'Guides',
    href: '/guides/reactive-queries/',
    text: 'live() subscriptions, where filters, sort and limit, derived queries, fine-grained updates.',
  },
  {
    title: 'Persistence',
    section: 'Guides',
    href: '/guides/persistence/',
    text: 'IndexedDB adapter, localStorage adapter, sync flush, offline-first, storage quotas.',
  },
  {
    title: 'Schema migrations',
    section: 'Guides',
    href: '/guides/migrations/',
    text: 'Versioned schemas, migration steps, renaming fields, backfilling data, safe upgrades.',
  },
  {
    title: 'createLedger()',
    section: 'API',
    href: '/api/#createledger',
    text: 'Create a store from a map of collections with options for persistence and schema version.',
  },
  {
    title: 'collection()',
    section: 'API',
    href: '/api/#collection',
    text: 'Declare a typed collection with an id key and optional indexes.',
  },
  {
    title: 'Collection.where()',
    section: 'API',
    href: '/api/#where',
    text: 'Filter records with a predicate and chain sort, limit, and live.',
  },
  {
    title: 'Query.live()',
    section: 'API',
    href: '/api/#live',
    text: 'Turn a query into a reactive subscription that re-emits on change.',
  },
  {
    title: 'Changelog',
    section: 'Reference',
    href: '/changelog/',
    text: 'Release notes for Ledger v2.4, v2.3, v2.0, and v1.x.',
  },
];
