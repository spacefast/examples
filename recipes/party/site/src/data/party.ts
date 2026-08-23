// Everything the invite says lives here, so changing one detail never means
// hunting through markup. Swap a value and the whole page updates.

export const party = {
  host: 'Mia',
  hostFull: 'Mia Castellano',
  occasion: 'is turning 30',
  // A short, punchy line under the name.
  tagline: 'Thirty, flirty, and throwing a rooftop bash',
  hashtag: '#Mia30',

  // The party start time as an ISO string in the venue's timezone (US Eastern,
  // UTC-4 in July). The countdown ticks toward this exact moment.
  dateISO: '2026-07-25T19:00:00-04:00',
  dateLong: 'Saturday, July 25th, 2026',
  dateShort: '07.25.26',
  timeRange: '7:00 PM – late',
  doorsNote: 'Doors at 7, toast at 8, cake when the sun goes down.',

  venueName: 'The Lantern Rooftop',
  venueFloor: '14th floor, above the Foundry Hotel',
  address: '88 Greenpoint Avenue, Brooklyn, NY 11222',
  city: 'Brooklyn, New York',
  // Plain map link + an embeddable query.
  mapQuery: 'Foundry+Hotel+88+Greenpoint+Ave+Brooklyn+NY',
  mapUrl: 'https://maps.google.com/?q=88+Greenpoint+Avenue+Brooklyn+NY+11222',

  dressCode: 'Cocktail glam',
  dressCodeNote:
    "Bring your sparkle. Sequins, a sharp suit, a bold lip, that jacket you never get to wear — this is the night for it. Heels are great on the dance floor but the rooftop has a few cobbles, so block heels or flats for the terrace are your friend.",

  // The RSVP deadline.
  rsvpBy: 'July 11th',
  rsvpByLong: 'Friday, July 11th, 2026',

  // Quiet little personal note from the host.
  note:
    "No gifts, please — your presence is the present. If you really must, a bottle of something bubbly or a song for the playlist will be received with great joy.",
} as const;

// The run of show — what's happening when, shown as a vertical timeline.
export const schedule = [
  { time: '7:00', title: 'Doors & welcome drinks', detail: 'Grab a glass, find the balloons, find me.' },
  { time: '8:00', title: 'The toast', detail: 'Thirty seconds of feelings, then back to the fun. Be there.' },
  { time: '8:30', title: 'Dinner from the grill', detail: 'Wood-fired flatbreads, skewers, and a very serious cheese situation.' },
  { time: '9:30', title: 'Cake & the big wish', detail: 'Three tiers, far too many candles, one collective gasp.' },
  { time: '10:00', title: 'Dance floor opens', detail: "DJ Remy takes over until the building politely asks us to stop." },
  { time: 'Late', title: 'Last song', detail: "We'll know it when we hear it." },
];

// Practical details rendered as a tidy card grid.
export const details = [
  {
    icon: '🍸',
    title: 'Open bar all night',
    body: 'Signature "Mia at Midnight" cocktail, natural wines, local beer, and proper mocktails. Tip jar is purely decorative.',
  },
  {
    icon: '🔥',
    title: 'Real food, not snacks',
    body: 'A full spread off the grill plus late-night fries. Tell us in the RSVP if you have allergies and we will look after you.',
  },
  {
    icon: '🌆',
    title: 'Rooftop, weather-proofed',
    body: 'Heated, covered terrace with skyline views. It happens rain or shine — bring a layer for when the breeze picks up after dark.',
  },
  {
    icon: '🎁',
    title: 'No gifts, truly',
    body: 'Your company is the whole point. A song for the playlist or a bottle of fizz is more than enough if you feel the urge.',
  },
];

// How to actually get there.
export const directions = [
  {
    name: 'By subway',
    body: 'Take the G to Greenpoint Avenue — the venue is a 3-minute walk, second exit. The L to Bedford then a short cab also works if you are coming from Manhattan.',
  },
  {
    name: 'By car & rideshare',
    body: 'Drop-off is right at the Foundry Hotel entrance on Greenpoint Ave. Street parking is easy after 7 PM, and there is a paid lot half a block east on West Street.',
  },
  {
    name: 'Getting upstairs',
    body: 'Walk into the Foundry lobby and tell the host you are with the Castellano party — they will point you to the express elevator up to the 14th-floor rooftop.',
  },
];

// Meal / dietary options for the RSVP.
export const meals = [
  { value: 'everything', label: 'Everything, bring it on' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-free' },
  { value: 'pescatarian', label: 'Pescatarian' },
];

// A handful of photos that set the mood.
export const gallery = [
  { seed: 'mia30-balloons', alt: 'A cluster of gold and blush balloons against a dark wall' },
  { seed: 'mia30-rooftop', alt: 'A rooftop terrace strung with warm fairy lights at dusk' },
  { seed: 'mia30-cheers', alt: 'Friends clinking champagne glasses in a toast' },
  { seed: 'mia30-confetti', alt: 'Confetti raining down over a crowd on a dance floor' },
];
