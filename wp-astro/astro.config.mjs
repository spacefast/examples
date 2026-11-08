import { defineConfig } from 'astro/config';

// A fully static, headless-WordPress blog.
//
// At build time `astro build` calls the WordPress REST API (see src/lib/wp.ts),
// pulls every post + its embedded author / featured image / categories, and
// renders the whole site to flat HTML in dist/. There is no server, no PHP, and
// no database at request time — WordPress is just the content editor, Astro is
// the renderer, and Spacefast serves the result.
export default defineConfig({
  site: 'https://wp-astro.spacefast.app',
  compressHTML: true,
});
