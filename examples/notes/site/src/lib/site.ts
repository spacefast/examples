// One place for the garden's identity, so a builder can rebrand by editing a
// single file instead of hunting through templates.
export const SITE = {
  title: 'Glasshouse',
  tagline: 'a digital garden of interlinked notes',
  // The thing the garden is actually about — shown in the hero and <meta>.
  about: 'Slow, public notes on note-taking, memory, and tending ideas.',
  author: 'Mara Ellison',
  // Whether the garden is openly readable or shared behind a password. Purely
  // cosmetic here (it just sets the badge in the footer); Spacefast handles the
  // real access control if you choose to lock it.
  access: 'public' as 'public' | 'shared',
};
