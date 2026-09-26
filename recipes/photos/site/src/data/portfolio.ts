// Everything the site shows lives here, so the whole portfolio updates from one
// place. Swap a name, a series, or a photo seed and the pages follow.

export const studio = {
  name: 'Eliot Vance',
  role: 'Landscape & travel photographer',
  tagline: 'Quiet light, far places.',
  // Where he's based / works out of — shown in the hero and footer.
  base: 'Reykjavík & Portland, Oregon',
  email: 'hello@eliotvance.com',
  instagram: 'eliot.vance',
  instagramUrl: 'https://instagram.com/eliot.vance',
  // A one-line intro used under the work index.
  intro:
    'A decade of chasing weather across the North Atlantic and the American West. I shoot for the hour before the light goes — the cold, patient end of the day when a place finally shows you what it is.',
} as const;

export type Photo = {
  // picsum seed → a stable, real image. Grayscale flag is honored for the B&W series.
  seed: string;
  alt: string;
  // Optional caption shown in the lightbox and under featured frames.
  caption?: string;
  // 'tall' frames get extra height in the masonry to vary the rhythm.
  shape?: 'tall' | 'wide';
};

export type Series = {
  slug: string;
  title: string;
  place: string;
  year: string;
  // Short blurb shown on the series page and the work index card.
  blurb: string;
  // The cover image for the work-index grid.
  cover: { seed: string; alt: string };
  grayscale?: boolean;
  photos: Photo[];
};

export const series: Series[] = [
  {
    slug: 'iceland',
    title: 'The Cold Coast',
    place: 'Iceland',
    year: '2024',
    blurb:
      'Eleven days driving the ring road in shoulder season, when the tour buses are gone and the mountains keep disappearing into their own weather. Made on a 4x5 field camera and a beat-up Mamiya 7.',
    cover: {
      seed: 'eliot-vance-iceland-cover',
      alt: 'A misty volcanic mountain rising out of low cloud in the Icelandic highlands',
    },
    photos: [
      {
        seed: 'eliot-vance-iceland-1',
        alt: 'A black-sand valley with a single ribbon of river under flat grey light',
        caption: 'Þórsmörk, first light — Iceland, 2024',
        shape: 'wide',
      },
      {
        seed: 'eliot-vance-iceland-2',
        alt: 'A waterfall pouring off a moss-green cliff into mist',
        caption: 'Seljalandsfoss from behind the curtain',
      },
      {
        seed: 'eliot-vance-iceland-3',
        alt: 'A lone red-roofed farmhouse beneath an enormous snow-streaked mountain',
        caption: 'The last farm before the highlands',
        shape: 'tall',
      },
      {
        seed: 'eliot-vance-iceland-4',
        alt: 'Glacial ice stranded on black volcanic sand at dusk',
        caption: 'Diamond Beach, low tide',
      },
      {
        seed: 'eliot-vance-iceland-5',
        alt: 'Steam rising from a geothermal field into a slate-coloured sky',
        caption: 'Hverir, before the wind turned',
        shape: 'wide',
      },
      {
        seed: 'eliot-vance-iceland-6',
        alt: 'A narrow fjord road vanishing into fog between two dark headlands',
        caption: 'The road to Seyðisfjörður',
      },
      {
        seed: 'eliot-vance-iceland-7',
        alt: 'A flock of birds wheeling over a grey sea below basalt cliffs',
        caption: 'Látrabjarg, the westernmost edge',
        shape: 'tall',
      },
      {
        seed: 'eliot-vance-iceland-8',
        alt: 'Snow blowing across an empty highland pass at golden hour',
        caption: 'Kjölur, the long way home',
      },
    ],
  },
  {
    slug: 'coastline',
    title: 'Long Exposure',
    place: 'Oregon Coast',
    year: '2023',
    blurb:
      'A winter spent driving Highway 101 between Astoria and Bandon, waiting out the rain in the truck for the ten golden minutes it gave back. Sea stacks, fog, and a lot of cold coffee.',
    cover: {
      seed: 'eliot-vance-coast-cover',
      alt: 'Sea stacks silhouetted against a glowing golden-hour sky on the Oregon coast',
    },
    photos: [
      {
        seed: 'eliot-vance-coast-1',
        alt: 'Tall sea stacks catching the last orange light above a wet beach',
        caption: 'Bandon, the gap in the clouds — Oregon, 2023',
        shape: 'wide',
      },
      {
        seed: 'eliot-vance-coast-2',
        alt: 'A long-exposure surf smoothing into mist around a dark rock',
        caption: 'Two minutes at f/16, Cape Kiwanda',
        shape: 'tall',
      },
      {
        seed: 'eliot-vance-coast-3',
        alt: 'A lighthouse on a headland half-swallowed by incoming fog',
        caption: 'Heceta Head in the haar',
      },
      {
        seed: 'eliot-vance-coast-4',
        alt: 'Sunlight breaking through cloud onto a wide empty beach',
        caption: 'The break at Manzanita',
        shape: 'wide',
      },
      {
        seed: 'eliot-vance-coast-5',
        alt: 'Wet sand mirroring a pink and amber sky at sunset',
        caption: 'Low tide reflections, Cannon Beach',
      },
      {
        seed: 'eliot-vance-coast-6',
        alt: 'A weathered headland of layered rock dropping into the surf',
        caption: 'Shore Acres, after the storm',
        shape: 'tall',
      },
      {
        seed: 'eliot-vance-coast-7',
        alt: 'Silhouetted figures small against towering golden-hour cliffs',
        caption: 'For scale — Samuel H. Boardman',
      },
      {
        seed: 'eliot-vance-coast-8',
        alt: 'A calm cove glowing amber as the sun drops below the horizon',
        caption: "The day's last frame, Brookings",
        shape: 'wide',
      },
    ],
  },
  {
    slug: 'portraits',
    title: 'In Studio',
    place: 'Black & White',
    year: '2022–2024',
    blurb:
      'Between trips I keep a small north-light studio in Portland. These are the faces of the people I met on the road — guides, fishers, farmers — shot on a single soft window and a roll of Tri-X.',
    grayscale: true,
    cover: {
      seed: 'eliot-vance-portrait-cover',
      alt: 'A black-and-white studio portrait of a weathered face lit by a single window',
    },
    photos: [
      {
        seed: 'eliot-vance-portrait-1',
        alt: 'A black-and-white portrait of an older fisherman in a wool sweater',
        caption: 'Gunnar, harbourmaster — Höfn',
        shape: 'tall',
      },
      {
        seed: 'eliot-vance-portrait-2',
        alt: 'A close black-and-white portrait of a young woman looking off-camera',
        caption: 'Salka, glacier guide',
      },
      {
        seed: 'eliot-vance-portrait-3',
        alt: 'A black-and-white half-light portrait of a man with a deeply lined face',
        caption: 'A study in north light',
        shape: 'tall',
      },
      {
        seed: 'eliot-vance-portrait-4',
        alt: 'A black-and-white portrait of hands holding a coil of rope',
        caption: 'Forty years of the same knot',
      },
      {
        seed: 'eliot-vance-portrait-5',
        alt: 'A soft black-and-white portrait of a child against a plain backdrop',
        caption: 'Untitled, Tri-X',
      },
      {
        seed: 'eliot-vance-portrait-6',
        alt: 'A black-and-white profile of a woman with windblown hair',
        caption: 'Between takes',
        shape: 'tall',
      },
    ],
  },
  {
    slug: 'dunes',
    title: 'From Above',
    place: 'Desert Aerials',
    year: '2023',
    blurb:
      'A week over the dune fields of the American Southwest, shot straight down from a small plane with the door off. At noon the desert is just sand; at the edges of the day it becomes a drawing.',
    cover: {
      seed: 'eliot-vance-dunes-cover',
      alt: 'A minimalist aerial of rippling desert dunes with a single curving shadow line',
    },
    photos: [
      {
        seed: 'eliot-vance-dunes-1',
        alt: 'A near-abstract aerial of wind-rippled sand dividing light and shadow',
        caption: 'White Sands at 1,200 feet — New Mexico, 2023',
        shape: 'wide',
      },
      {
        seed: 'eliot-vance-dunes-2',
        alt: 'An overhead view of a lone curving dune ridge casting a long shadow',
        caption: 'One ridge, one shadow',
      },
      {
        seed: 'eliot-vance-dunes-3',
        alt: 'A pattern of overlapping dune crests like brushstrokes from above',
        caption: 'Brushwork, Great Sand Dunes',
        shape: 'tall',
      },
      {
        seed: 'eliot-vance-dunes-4',
        alt: 'A minimalist aerial of pale sand meeting a dark dry riverbed',
        caption: 'Where the wash runs dry',
      },
      {
        seed: 'eliot-vance-dunes-5',
        alt: 'Tiny vehicle tracks crossing an immense field of dunes',
        caption: 'Scale, again',
        shape: 'wide',
      },
      {
        seed: 'eliot-vance-dunes-6',
        alt: 'An overhead study of soft dune curves in warm late light',
        caption: "The last pass before the light went",
      },
    ],
  },
];

export const about = {
  headshot: {
    seed: 'eliot-vance-headshot',
    alt: 'A portrait of photographer Eliot Vance standing in a wool coat on a foggy coast',
  },
  // Paragraphs of bio, in his own voice.
  bio: [
    "I'm a landscape and travel photographer working between Reykjavík and Portland, Oregon. I came to photography sideways — I trained as a cartographer, and I've never really shaken the habit of trying to describe a place precisely. The camera turned out to be a better map.",
    'My work lives at the edges of the day and the edges of the map: the North Atlantic in winter, the Pacific Northwest in the rain, the desert in the half-hour before it gives up its colour. I shoot mostly on film — a 4x5 field camera for the slow days, a Mamiya 7 for the cold ones — because the wait is the point.',
    'Prints are made by hand in small editions on archival cotton rag. If you have seen my work in a magazine, it was probably while you were dreaming about going somewhere. That is the idea.',
  ],
  // Selected clients — believable for a working travel photographer.
  clients: [
    'National Geographic Traveler',
    'Patagonia',
    'Kinfolk',
    'Icelandair',
    'Field Mag',
    'Herschel Supply Co.',
    'Sunset Magazine',
    'Visit Iceland',
    'Filson',
    'Travel Oregon',
  ],
  // Press / recognition line items.
  press: [
    { year: '2024', item: 'Solo show — “The Cold Coast,” Newspace Center for Photography, Portland' },
    { year: '2023', item: 'Cover, National Geographic Traveler — “The North in Winter”' },
    { year: '2022', item: 'Finalist, LensCulture Earth Awards' },
  ],
};

export const prints = {
  blurb:
    'Every image here is available as an open-edition archival print, made to order on cotton rag and shipped flat in a week or two. No frame, no fuss — just the photograph, ready for yours.',
  options: [
    { size: '8 × 10″', price: '$45', note: 'Desk and shelf size.' },
    { size: '16 × 20″', price: '$120', note: 'The one people stop in front of.' },
    { size: '24 × 36″', price: '$280', note: 'Signed, numbered, the big quiet wall.' },
  ],
};
