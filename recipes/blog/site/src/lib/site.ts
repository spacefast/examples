// One place for the blog's identity — name, voice, author, social links.
// Swap these and the whole site re-skins itself.
export const site = {
  title: 'Margins',
  tagline: 'Notes from the edges of building for the web.',
  description:
    'A writing and dev blog about the craft of software, the slow web, and the small details that make interfaces feel good. Essays and code by Mara Ellison.',
  author: {
    name: 'Mara Ellison',
    role: 'Frontend engineer & occasional essayist',
    bio: "I build interfaces for a living and read about typography for fun. Margins is where I keep the things I figure out — half of them are code, half of them are arguments with myself.",
    location: 'Lisbon, Portugal',
    avatar: 'https://i.pravatar.cc/240?img=47',
  },
  nav: [
    { label: 'Writing', href: '/' },
    { label: 'Tags', href: '/tags/' },
    { label: 'About', href: '/about/' },
    { label: 'RSS', href: '/rss.xml' },
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Mastodon', href: 'https://mastodon.social' },
    { label: 'Email', href: 'mailto:hello@margins.blog' },
  ],
};

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

// A rough reading-time estimate from the raw markdown body. Good enough to
// set expectations; nobody is auditing the math.
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
