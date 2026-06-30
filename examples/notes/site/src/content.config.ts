import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every note is a Markdown file in src/content/notes. The id Astro assigns each
// entry is its filename without the extension (e.g. evergreen-notes), which is
// exactly what slugify() produces from the title — so [[Evergreen notes]] links
// land on the right page.
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    // Growth stage, borrowed from the digital-gardening community:
    //   planted  — a rough seedling, just a thought
    //   growing  — being actively tended, still changing
    //   evergreen— settled, something I'd stand behind
    status: z.enum(['planted', 'growing', 'evergreen']),
    planted: z.coerce.date(),
    updated: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { notes };
