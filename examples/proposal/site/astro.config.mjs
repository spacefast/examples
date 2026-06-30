import { defineConfig } from 'astro/config';

// A single-page client sales proposal — fully static, no SSR or adapters.
// All content lives in src/data/proposal.ts and renders to a plain dist/ you can
// publish anywhere. The only client-side JS is the small inline script that
// powers tier selection and the accept/sign interaction.
export default defineConfig({
  site: 'https://proposal-for-acme-co.spacefast.app',
  compressHTML: true,
});
