import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Posts live as Markdown files in src/content/posts/*.md. The frontmatter
// schema below is validated at build time, so a typo'd date or a missing
// title fails the build instead of shipping broken.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
