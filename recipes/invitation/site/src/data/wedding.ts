// All the content for the site lives here so it's easy to change one detail
// without touching markup. Swap any of these and the whole site updates.

export const wedding = {
  partnerA: 'Maya',
  partnerB: 'Daniel',
  partnerAFull: 'Maya Okafor',
  partnerBFull: 'Daniel Reyes',
  hashtag: '#OkaforMeetsReyes',

  // The ceremony date/time, written as an ISO string in the venue's timezone
  // (Pacific, UTC-7 in September). The countdown ticks toward this exact moment.
  dateISO: '2026-09-19T16:30:00-07:00',
  dateLong: 'Saturday, September 19, 2026',
  dateShort: '09.19.26',

  venue: 'Bellecourt Vineyard Estate',
  city: 'Sonoma, California',
  address: '4120 Arnold Drive, Sonoma, CA 95476',
  mapUrl: 'https://maps.google.com/?q=Bellecourt+Vineyard+Estate+Sonoma+CA',

  ceremony: {
    time: '4:30 PM',
    detail: 'Vineyard terrace, beneath the old oak. Doors open at 4:00.',
  },
  reception: {
    time: '6:00 PM – 11:00 PM',
    detail: 'Dinner, dancing, and a late-night taco cart in the barrel room.',
  },
  dressCode: 'Garden formal',
  dressCodeNote:
    'Think summer cocktail — linen suits, midi and floor-length dresses, earth tones welcome. Block heels over stilettos; we promise your shoes will thank you on the lawn.',
} as const;

export const story = [
  {
    year: '2019',
    title: 'A spilled flat white',
    body:
      'Maya was reading at Sightglass in Oakland when Daniel, in a hurry, knocked her coffee clean off the counter. He bought her another and stayed for three hours. Neither of them remembers what they talked about — only that they closed the place down.',
  },
  {
    year: '2021',
    title: 'The first real trip',
    body:
      'A rained-out camping weekend in Point Reyes that turned into two days of board games and diner pie. Somewhere between the Scrabble and the second slice, they both knew.',
  },
  {
    year: '2022',
    title: 'Home, and a very good dog',
    body:
      'They signed a lease on a tiny place in Temescal and immediately adopted Biscuit, a 12-pound mutt with strong opinions and no manners. He will not be attending the wedding. He sends his regrets.',
  },
  {
    year: 'Dec 2025',
    title: 'The question',
    body:
      'Back in Point Reyes, on the same foggy bluff where it all started, Daniel got down on one knee with the ring hidden in a thermos of cocoa. Maya said yes before he finished asking, then made him do it again so she could actually hear it.',
  },
];

export const travel = [
  {
    name: 'Fly in',
    body:
      'San Francisco (SFO) and Oakland (OAK) are each about 75 minutes away. Charles M. Schulz–Sonoma County (STS) is the closest at 25 minutes if you can find a flight. We recommend renting a car — the wine country is best with one.',
  },
  {
    name: 'Where to stay',
    body:
      'We have a room block at The Lodge at Sonoma, a 15-minute drive from the estate. Use code MAYADANIEL when booking by August 19 for the group rate. The Sonoma Plaza is a lovely walkable base if you prefer a B&B.',
  },
  {
    name: 'Getting there',
    body:
      'The estate is at 4120 Arnold Drive. Parking is free and on-site. We will run a complimentary shuttle from The Lodge starting at 3:45 PM, looping back after the reception so no one has to think about the drive home.',
  },
];

export const gallery = [
  { seed: 'maya-and-daniel-vineyard', alt: 'Maya and Daniel at golden hour among the vineyard rows' },
  { seed: 'maya-and-daniel-arch', alt: 'An outdoor ceremony arch wrapped in greenery and string lights' },
  { seed: 'maya-and-daniel-table', alt: 'A long reception table set with florals and flickering candles' },
  { seed: 'maya-and-daniel-walk', alt: 'The couple holding hands on a path through the countryside' },
  { seed: 'maya-and-daniel-toast', alt: 'A champagne toast at sunset' },
  { seed: 'maya-and-daniel-dance', alt: 'First dance under warm bistro lighting' },
];

export const registries = [
  {
    name: 'Zola',
    note: 'The big list — kitchen things, the good knives, a tent for someday.',
    url: 'https://www.zola.com/registry/mayaanddaniel2026',
  },
  {
    name: 'Crate & Barrel',
    note: 'Dishes we will actually use and a stand mixer in a color we agreed on.',
    url: 'https://www.crateandbarrel.com/gift-registry/maya-and-daniel',
  },
  {
    name: 'Honeymoon fund',
    note: 'Two weeks in Portugal. A coffee in Lisbon counts. A night in the Douro counts more.',
    url: 'https://www.zola.com/registry/mayaanddaniel2026/honeymoon',
  },
];

export const meals = [
  { value: 'chicken', label: 'Herb-roasted chicken with charred lemon' },
  { value: 'salmon', label: 'Pan-seared salmon, summer corn succotash' },
  { value: 'risotto', label: 'Wild mushroom risotto (vegan)' },
  { value: 'kids', label: "Kids' plate — buttered pasta & fruit" },
];

export const faqs = [
  {
    q: 'Can I bring a plus-one?',
    a: 'Your invitation will name everyone we have a seat for. If it says "and guest," bring someone wonderful. If you are unsure, just ask us — we would rather you ask than wonder.',
  },
  {
    q: 'Are kids welcome?',
    a: 'We love your little ones, and we have a kids’ plate on the menu and a quiet room with a sitter from 7 PM. That said, we completely understand if you treat this as a date night.',
  },
  {
    q: 'What about parking?',
    a: 'Free on-site parking, and you can leave a car overnight and grab it the next morning. We also run a shuttle from The Lodge at Sonoma both ways.',
  },
  {
    q: 'What if it rains?',
    a: 'September in Sonoma is reliably gorgeous, but the estate has a covered barrel room on standby. The party happens rain or shine — dress for a warm evening that cools off after dark.',
  },
  {
    q: 'When should I RSVP by?',
    a: 'Please let us know by August 19, 2026 using the form on this page. Earlier is a gift to our caterer and our spreadsheet.',
  },
  {
    q: 'Is it really cashless / phone-free?',
    a: 'No cash needed anywhere. We are asking for phones away during the ceremony only — our photographer has it covered, and we will share every photo afterward.',
  },
];
