// All listing content lives here so the rest of the app stays presentational.
// Swap these values to re-skin the microsite for any property.

const U = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const property = {
  address: "1428 Vista Del Mar",
  cityState: "La Jolla, CA 92037",
  price: 4295000,
  status: "For Sale",
  beds: 5,
  baths: 4.5,
  sqft: 4820,
  lotSqft: 11200,
  yearBuilt: 2019,
  pricePerSqft: 891,
  mlsId: "LJ-2406-1428",
  propertyType: "Single Family Residence",
  tagline:
    "A reimagined coastal contemporary perched above the cove — walls of glass, an infinity pool, and whitewater views that run the length of the home.",
};

export const gallery = [
  {
    src: U("1600596542815-ffad4c1539a9"),
    thumb: U("1600596542815-ffad4c1539a9", 480),
    alt: "Modern luxury home exterior at dusk with warm interior lighting glowing through floor-to-ceiling windows",
    caption: "Front elevation at twilight",
  },
  {
    src: U("1600607687939-ce8a6c25118c"),
    thumb: U("1600607687939-ce8a6c25118c", 480),
    alt: "Open-concept living room with large windows, light oak floors, and a linear fireplace",
    caption: "Great room & ocean-facing glass",
  },
  {
    src: U("1600210492493-0946911123ea"),
    thumb: U("1600210492493-0946911123ea", 480),
    alt: "Chef's kitchen with a marble waterfall island, pendant lighting, and integrated appliances",
    caption: "Chef's kitchen with waterfall island",
  },
  {
    src: U("1600566753086-00f18fb6b3ea"),
    thumb: U("1600566753086-00f18fb6b3ea", 480),
    alt: "Primary bedroom suite with a king bed and sliding glass doors opening to an ocean-view terrace",
    caption: "Ocean-view primary suite",
  },
  {
    src: U("1600047509807-ba8f99d2cdde"),
    thumb: U("1600047509807-ba8f99d2cdde", 480),
    alt: "Backyard infinity pool and patio overlooking the coastline at sunset",
    caption: "Infinity pool & sunset patio",
  },
  {
    src: U("1600566753190-17f0baa2a6c3"),
    thumb: U("1600566753190-17f0baa2a6c3", 480),
    alt: "Spa-style primary bathroom with a freestanding soaking tub and a glass walk-in shower",
    caption: "Spa primary bath",
  },
  {
    src: U("1505691938895-1758d7feb511"),
    thumb: U("1505691938895-1758d7feb511", 480),
    alt: "Bright guest bedroom with a reading nook and views of mature landscaping",
    caption: "Guest suite",
  },
  {
    src: U("1600121848594-d8644e57abab"),
    thumb: U("1600121848594-d8644e57abab", 480),
    alt: "Wood-paneled home office with built-in shelving and a desk facing the garden",
    caption: "Home office / study",
  },
];

export const highlights = [
  {
    title: "Chef's kitchen",
    body: "Calacatta marble waterfall island, dual Sub-Zero refrigeration, a 48\" Wolf range, and a walk-in pantry that doubles as a butler's station.",
    icon: "kitchen",
  },
  {
    title: "Ocean-view primary suite",
    body: "A private floor with a sitting room, dual walk-in closets, and a wrap terrace that frames whitewater views from the cove to the horizon.",
    icon: "bed",
  },
  {
    title: "Infinity pool & spa",
    body: "A negative-edge pool and raised spa appear to spill toward the Pacific, with an outdoor kitchen and a sunken fire lounge alongside.",
    icon: "pool",
  },
  {
    title: "Walls of glass",
    body: "Fleetwood pocketing sliders dissolve the line between the great room and the terrace, opening the entire main level to the sea breeze.",
    icon: "glass",
  },
  {
    title: "Smart & efficient",
    body: "Owned 14.2 kW solar, a Tesla Powerwall, Lutron lighting, and full-home Control4 automation keep running costs low and comfort high.",
    icon: "bolt",
  },
  {
    title: "Wellness wing",
    body: "A glass-fronted gym, an infrared sauna, and a temperature-controlled 600-bottle wine room anchor the lower level.",
    icon: "spa",
  },
];

export const features = [
  ["Bedrooms", "5"],
  ["Bathrooms", "4 full, 1 half"],
  ["Interior", "4,820 sq ft"],
  ["Lot size", "0.26 acre (11,200 sq ft)"],
  ["Year built", "2019"],
  ["Garage", "3-car, EV-ready"],
  ["Heating / cooling", "Zoned forced air + A/C"],
  ["Flooring", "Wide-plank white oak"],
  ["Roof", "Standing-seam metal"],
  ["Parking", "Gated motor court, 6 total"],
  ["HOA", "None"],
  ["County", "San Diego"],
];

export const neighborhood = {
  name: "Lower Hermosa, La Jolla",
  blurb:
    "Tucked between the village and the shoreline, this pocket of La Jolla trades nothing on convenience. The cove and the tide pools are a five-minute walk; Girard Avenue's cafés, galleries, and the farmers market are minutes by foot. Mornings here are for sea-lion barks and a flat white at Bird Rock Coffee Roasters; evenings belong to the green flash over the water from your own terrace.",
  walkScore: 84,
  points: [
    ["La Jolla Cove", "0.4 mi"],
    ["The Village (Girard Ave)", "0.7 mi"],
    ["Bird Rock Coffee Roasters", "0.5 mi"],
    ["La Jolla Elementary", "0.6 mi"],
    ["Torrey Pines State Reserve", "3.2 mi"],
    ["San Diego Intl (SAN)", "12 mi"],
  ],
};

export const agent = {
  name: "Marisol Vega",
  title: "Founding Partner · DRE #01984472",
  brokerage: "Coastline & Co. Realty",
  phone: "(858) 555-0142",
  phoneHref: "tel:+18585550142",
  email: "marisol@coastlineco.com",
  blurb:
    "Marisol has represented La Jolla's coastal properties for sixteen years and lives three streets from this one. She'll meet you at the door — no call center, no handoff.",
  headshot: U("1573496359142-b8d87734a5a2", 320),
};

export const fmtUSD = (n) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
