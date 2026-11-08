export type Difficulty = "Moderate" | "Hard" | "Serious" | "Multi-day";

export type Photo = {
  /**
   * Absolute URLs only. The @spacefast/image loader rewrites these to
   * i0.wp.com transform URLs; a relative /public path would pass through
   * unchanged and ship the original bytes.
   */
  src: string;
  alt: string;
  /** Unsplash doesn't require attribution and we can't verify photographers, so
   *  every photo is credited to the source rather than to a guessed name. */
  credit: string;
};

export type RouteLeg = {
  name: string;
  marker: string;
  detail: string;
};

export type Trail = {
  slug: string;
  name: string;
  park: string;
  /** Region line shown under the trail name. */
  country: string;
  /** Used only to count how many countries the guide covers. */
  nation: string;
  tagline: string;
  difficulty: Difficulty;
  shape: string;
  /** Canonical figures. Both unit systems are derived from these — see lib/units.ts. */
  distanceKm: number;
  gainM: number;
  highPointM: number;
  highPointNote?: string;
  time: string;
  season: string;
  trailhead: string;
  intro: string[];
  photo: Photo;
  secondaryPhoto: Photo;
  secondaryCaption: string;
  route: RouteLeg[];
  access: string[];
  knowBefore: string[];
};

export const trails: Trail[] = [
  {
    slug: "angels-landing",
    name: "Angels Landing",
    park: "Zion National Park",
    country: "Utah, USA",
    nation: "United States",
    tagline: "Two miles of switchbacks, then half a mile of chains along a sandstone fin.",
    difficulty: "Serious",
    shape: "Out and back",
    distanceKm: 8.69,
    gainM: 453.6,
    highPointM: 1764.8,
    time: "4–5 hours",
    season: "March to November",
    trailhead: "The Grotto — shuttle stop 6, Zion Canyon Scenic Drive",
    intro: [
      "Angels Landing is the most famous half mile in American hiking, and the other five miles are the reason it works: a graded riverside approach, a shaded canyon traverse, and 21 engineered switchbacks that carry you 1,000 feet up a cliff without a single scramble.",
      "The switchbacks — Walter's Wiggles — were blasted in 1926 by Walter Ruesch, Zion's first custodian, who wanted a way onto the rim that ordinary visitors could walk. They still do the heavy lifting. Everything above Scout Lookout is a different sport.",
      "The final ridge is a fin of Navajo sandstone with chains bolted along it and a drop on both sides. It is not technical. It is exposed, narrow, often crowded, and completely unforgiving of a slip — which is why it is now the only day hike in Zion that requires a permit.",
    ],
    photo: {
      src: "https://images.unsplash.com/photo-1515601915049-08c8836c2204",
      alt: "Zion Canyon at dusk seen from the summit of Angels Landing, with the Virgin River threading the canyon floor a thousand feet below.",
      credit: "Unsplash",
    },
    secondaryPhoto: {
      src: "https://images.unsplash.com/photo-1564114615572-2cb0adc5c88a",
      alt: "White and red sandstone walls of Zion Canyon with the green cottonwood corridor of the Virgin River winding between them.",
      credit: "Unsplash",
    },
    secondaryCaption:
      "The cottonwood corridor along the Virgin River, seen from the West Rim Trail. The first two miles keep you beside it.",
    route: [
      {
        name: "The Grotto to Refrigerator Canyon",
        marker: "0.0 – 1.3 mi",
        detail:
          "Cross the footbridge, turn right, and climb the paved West Rim Trail as it ramps up the canyon wall. It ends in Refrigerator Canyon, a shaded slot that stays 15°F cooler than the river — the only genuinely pleasant stretch on a July afternoon.",
      },
      {
        name: "Walter's Wiggles",
        marker: "1.3 – 1.9 mi",
        detail:
          "Twenty-one paved switchbacks stacked into a gap in the cliff. Short, steep, relentless, and over faster than they look from below.",
      },
      {
        name: "Scout Lookout",
        marker: "2.0 mi",
        detail:
          "A wide sandy saddle with a vault toilet, chipmunks with no fear left, and a view most people would drive a day for. No permit needed to get here, and turning around is a completely respectable hike.",
      },
      {
        name: "The chains",
        marker: "2.0 – 2.7 mi",
        detail:
          "Half a mile of fin: bolted chains, worn steps in the sandstone, a few sections narrow enough that traffic runs one way at a time. Roughly 500 feet of climbing, and 1,000 feet of air on either side.",
      },
    ],
    access: [
      "A permit is required for everything past Scout Lookout. Recreation.gov runs a seasonal lottery (apply the season before) and a day-before lottery for what's left — $6 to apply, $3 per person if you win.",
      "Zion Canyon Scenic Drive is closed to private cars for most of the year. Park at the visitor center and ride the shuttle to stop 6; the first buses leave around 6 am in summer and the queue is long by 8.",
      "No permit is needed for the West Rim Trail up to Scout Lookout, which is the two miles and 1,000 feet that make the view.",
    ],
    knowBefore: [
      "Wet sandstone is slick sandstone. If it has rained, or if there is ice on the fin — common from December to February — the chains are not worth it.",
      "People have died on this ridge. The exposure is real, the rock is polished by millions of hands, and nobody is going to stop you doing something stupid.",
      "There is no water and no shade above Refrigerator Canyon. Carry three litres in summer; Zion routinely runs above 100°F in July.",
      "Go at opening or in the last two hours of light. Midday is a queue on a cliff edge.",
    ],
  },
  {
    slug: "chain-lakes-loop",
    name: "Chain Lakes Loop",
    park: "Mount Baker–Snoqualmie National Forest",
    country: "Washington, USA",
    nation: "United States",
    tagline: "Four alpine lakes, one saddle, and two volcanoes watching the whole time.",
    difficulty: "Moderate",
    shape: "Loop",
    distanceKm: 10.46,
    gainM: 554.7,
    highPointM: 1645.9,
    highPointNote: "Herman Saddle",
    time: "4–5 hours",
    season: "Late July to early October",
    trailhead: "Artist Point, end of the Mt Baker Highway (SR 542)",
    intro: [
      "The road does most of the work. Artist Point sits at 5,100 feet at the very end of the Mt Baker Highway, which means this loop starts where most Cascades hikes finish — in open heather with Mount Shuksan filling the sky to the east and Mount Baker to the west.",
      "From there it's a traverse under the cliffs of Table Mountain, a string of four lakes in a basin below Mazama Dome, a climb to Herman Saddle, and a drop into Bagley Lakes. The elevation profile is a shallow V; the scenery is not shallow anywhere.",
      "The catch is the season. This is one of the snowiest places on earth — the ski area a few miles down the road recorded 1,140 inches in the winter of 1998–99, still the world record — and the highway to Artist Point is usually plowed open in July and buried again by October.",
    ],
    photo: {
      src: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1",
      alt: "The glaciated rock pyramid of Mount Shuksan rising above a fringe of subalpine firs under a clear sky.",
      credit: "Unsplash",
    },
    secondaryPhoto: {
      src: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5",
      alt: "Cloud drifting through a dense stand of conifers on a steep mountainside.",
      credit: "Unsplash",
    },
    secondaryCaption:
      "Marine air pushing up the valley. When Artist Point is in the cloud, the lakes basin below Herman Saddle is often clear.",
    route: [
      {
        name: "Artist Point to Mazama Lake",
        marker: "0.0 – 1.9 mi",
        detail:
          "Head west from the upper lot on the Chain Lakes Trail, traversing under the andesite cliffs of Table Mountain with Baker directly ahead. The path loses a little height into the lakes basin — the only descent that costs you on the way out.",
      },
      {
        name: "The four lakes",
        marker: "1.9 – 3.1 mi",
        detail:
          "Mazama, Iceberg, Hayes and Arbuthnot, strung through heather and slabs. Iceberg is the swim, if you're the kind of person who swims in snowmelt. Camping is at designated sites only.",
      },
      {
        name: "Herman Saddle",
        marker: "3.1 – 4.2 mi",
        detail:
          "The one real climb: about 700 feet of switchbacks to the saddle between Mazama Dome and Table Mountain. Snow often lingers on the north side into August, and the last of it is the steepest part.",
      },
      {
        name: "Bagley Lakes and back up",
        marker: "4.2 – 6.5 mi",
        detail:
          "A long, easy descent to the Bagley Lakes basin and the stone bridge, then the sting in the tail — roughly 700 feet back up past the Heather Meadows visitor centre to the car.",
      },
    ],
    access: [
      "No permit for day hiking. The Artist Point lot needs a Northwest Forest Pass or an America the Beautiful pass on the dashboard.",
      "Part of the loop enters the Mt Baker Wilderness: no bikes, no drones, groups of twelve or fewer.",
      "Check the Forest Service road status before driving up. SR 542 above Heather Meadows opens when the plows finish, which has been anywhere from early July to early August.",
    ],
    knowBefore: [
      "The lot fills by 9 am on clear weekends. There is no overflow parking that isn't a two-mile walk.",
      "Run it clockwise if you want the climb out of the way early and Shuksan in front of you on the descent.",
      "Late August into September is blueberry season across the whole basin, which is also why the bears are there.",
      "Weather here is marine and fast. A clear morning at Artist Point routinely becomes fog by noon — carry a shell even on the good forecast.",
    ],
  },
  {
    slug: "plain-of-six-glaciers",
    name: "Plain of Six Glaciers",
    park: "Banff National Park",
    country: "Alberta, Canada",
    nation: "Canada",
    tagline:
      "Walk the length of the most photographed lake in Canada, then keep going into the ice.",
    difficulty: "Moderate",
    shape: "Out and back",
    distanceKm: 13.8,
    gainM: 365,
    highPointM: 2100,
    highPointNote: "the teahouse",
    time: "4–5 hours",
    season: "Late June to early October",
    trailhead: "Lake Louise lakeshore, in front of the Chateau",
    intro: [
      "Almost everyone who visits Lake Louise walks the first kilometre of this trail, takes the photograph, and turns around. The trail keeps going for another six, and the crowd thins with every one of them.",
      "Past the end of the lake the valley narrows into moraine and avalanche path, the turquoise disappears behind you, and the walls close in: Mount Victoria on the left, Mount Lefroy ahead, the Death Trap couloir between them. The colour of the lake, incidentally, is rock flour — glacial silt suspended in meltwater, scattering blue.",
      "At 5.3 kilometres there is a two-storey log teahouse with no road to it. The Canadian Pacific Railway built it in 1927 for its Swiss guides; supplies still come up on horseback, the stove still runs on propane flown in at the start of the season, and the tea is still worth the walk.",
    ],
    photo: {
      src: "https://images.unsplash.com/photo-1531509519770-55e7459de67c",
      alt: "The turquoise water of Lake Louise below the hanging glaciers of Mount Victoria, framed by dark conifers.",
      credit: "Unsplash",
    },
    secondaryPhoto: {
      src: "https://images.unsplash.com/photo-1663401632309-5eeb06854bf9",
      alt: "First light on the snowfields of Mount Victoria mirrored in a perfectly still Lake Louise.",
      credit: "Unsplash",
    },
    secondaryCaption:
      "The lake is dead flat at sunrise and busy by nine. The shuttle that gets you there before six is the whole trick.",
    route: [
      {
        name: "The lakeshore",
        marker: "0 – 2 km",
        detail:
          "Flat, wide, gravelled, and shared with everyone who owns a camera. Keep the water on your left; it takes about twenty-five minutes to walk out of the noise.",
      },
      {
        name: "Into the valley",
        marker: "2 – 4 km",
        detail:
          "The trail leaves the lake, crosses the outwash flats, and starts climbing through avalanche paths in switchbacks. Horses from the Chateau's stables use the lower section — step downhill to let them pass.",
      },
      {
        name: "The teahouse",
        marker: "5.3 km",
        detail:
          "Log walls, a wood porch, soup and scones and loose-leaf tea. Cash only, no card machine, no power line. Open roughly June to early October depending on snow.",
      },
      {
        name: "The lateral moraine",
        marker: "5.3 – 6.9 km",
        detail:
          "Carry on another kilometre along the crest of the moraine to the viewpoint below Abbot Pass. From here the six glaciers are all in one frame, and the ice cracks and drops while you eat lunch.",
      },
    ],
    access: [
      "A Parks Canada pass is required to be in the park at all.",
      "Lake Louise parking is reservation-only in peak season and the lot fills before dawn regardless. Book the Parks Canada shuttle from the Lake Louise Ski Resort park-and-ride, or take Roam transit from Banff.",
      "No permit for the day hike. If you want to link it with Lake Agnes over the Big Beehive, add about 4 km and 200 m of climbing.",
    ],
    knowBefore: [
      "This is grizzly country. Carry spray you know how to use, make noise on the wooded switchbacks, and check Parks Canada for seasonal group-access restrictions.",
      "Bring cash for the teahouse. People walk two hours uphill for tea and then discover they can't buy any.",
      "The valley holds cold air and shade. It can be 25°C on the lakeshore and near freezing with wind at the moraine viewpoint.",
      "Do not walk out onto the glacier or into the Death Trap below Abbot Pass. It is an active icefall, and it is not a hiking route.",
    ],
  },
  {
    slug: "tongariro-alpine-crossing",
    name: "Tongariro Alpine Crossing",
    park: "Tongariro National Park",
    country: "Manawatū-Whanganui, New Zealand",
    nation: "New Zealand",
    tagline: "Nineteen kilometres across the top of an active volcano, one way, no shortcuts.",
    difficulty: "Hard",
    shape: "Point to point",
    distanceKm: 19.4,
    gainM: 765,
    highPointM: 1886,
    highPointNote: "Red Crater",
    time: "6–8 hours",
    season: "November to April without winter gear",
    trailhead: "Mangatepopo road end — finish at Ketetahi",
    intro: [
      "New Zealand's best-known day walk crosses the saddle between two active volcanoes, and it earns every superlative: lava flows, a steaming crater rim, three lakes coloured by dissolved minerals, and a long descent through tussock into beech forest.",
      "It is also a one-way, 19.4-kilometre alpine crossing with no bail-out in the middle, no water on the route, and weather that changes faster than you can put a jacket on. People finish this walk in shorts and sunburn; people also get helicoptered off it.",
      "The mountains are sacred. Te Heuheu Tūkino IV of Ngāti Tūwharetoa gifted the peaks to the nation in 1887 to protect them, which is how Tongariro became the world's fourth national park. The summits are tapu — the side trip up Ngāuruhoe is no longer walked, and the markers were removed at the iwi's request.",
    ],
    photo: {
      src: "https://images.unsplash.com/photo-1633231610793-a5be285cb418",
      alt: "A line of hikers strung out across a bright snowfield high on a volcano in Tongariro National Park.",
      credit: "Unsplash",
    },
    secondaryPhoto: {
      src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d",
      alt: "A steel-railed boardwalk running into dense green New Zealand native bush.",
      credit: "Unsplash",
    },
    secondaryCaption:
      "The last hour drops out of the tussock and into podocarp forest — the only shade on the entire crossing.",
    route: [
      {
        name: "Mangatepopo valley",
        marker: "0 – 4.5 km",
        detail:
          "A gentle boardwalk up an old lava flow to the Soda Springs junction. Deceptively easy; use it to warm up rather than to bank time.",
      },
      {
        name: "The Devil's Staircase",
        marker: "4.5 – 6.5 km",
        detail:
          "Two hundred metres of stepped climbing onto the South Crater rim. This is where the day is decided — if this section feels hard, turn around, because the exposed part comes next.",
      },
      {
        name: "South Crater to Red Crater",
        marker: "6.5 – 9 km",
        detail:
          "Across the flat crater floor, then a narrow ridge to the high point at 1,886 m. Red Crater is a torn-open cone of oxidised scoria, still venting sulphur, with the whole central plateau behind you.",
      },
      {
        name: "Emerald Lakes and Blue Lake",
        marker: "9 – 11 km",
        detail:
          "A steep, loose scree descent — the section that eats shoes and knees — to three lakes coloured by minerals leaching out of the crater. Blue Lake beyond them is tapu: do not touch or drink the water, and don't eat beside it.",
      },
      {
        name: "Ketetahi descent",
        marker: "11 – 19.4 km",
        detail:
          "Eight kilometres and 1,100 metres of downhill: open tussock and switchbacks, then the Ketetahi shelter, then native forest to the car park. Longer than anyone expects.",
      },
    ],
    access: [
      "There is a four-hour parking limit at the Mangatepopo road end, which effectively makes a shuttle compulsory. Operators in Whakapapa, National Park and Tūrangi run a morning drop-off and afternoon pick-up.",
      "DOC has been phasing in a booking requirement for the summer season — check the Tongariro Alpine Crossing page before you travel.",
      "May to October it is a winter alpine route. Ice axe, crampons and the skills to use them, or a guide.",
    ],
    knowBefore: [
      "There is no drinking water anywhere on the crossing and no reliable shelter. Carry at least two litres and a full wind and rain layer.",
      "This is an active volcano. Te Māri erupted in 2012 and closed the track; hazard zones and closures are posted by GeoNet and DOC and are not advisory.",
      "Start with the shuttle, not after it. The last pick-up is a hard deadline and the descent takes longer than the climb.",
      "The scree below Red Crater is fast and unstable. Short steps, heels first, and stay out of the fall line of the people above you.",
    ],
  },
  {
    slug: "tre-cime-di-lavaredo",
    name: "Tre Cime di Lavaredo Loop",
    park: "Parco Naturale Tre Cime",
    country: "Dolomites, Italy",
    nation: "Italy",
    tagline: "The easiest walk here, around the most famous rock faces in the Alps.",
    difficulty: "Moderate",
    shape: "Loop",
    distanceKm: 10,
    gainM: 350,
    highPointM: 2454,
    highPointNote: "Forcella Lavaredo",
    time: "3–4 hours",
    season: "Late May to mid October",
    trailhead: "Rifugio Auronzo, top of the Misurina toll road",
    intro: [
      "Three towers of pale dolomite standing alone on a plateau: Cima Grande at 2,999 m in the middle, Cima Ovest and Cima Piccola on either side. The north faces are among the most climbed and most written-about walls in mountaineering. The walk around them is a wide, gently graded track that a reasonably fit family can do in an afternoon.",
      "That combination is unusual and worth using. The toll road delivers you to 2,320 m at Rifugio Auronzo, so the loop begins in high alpine terrain with no approach march. Counter-clockwise is the right direction: you spend the first hour under the undramatic south faces, then cross Forcella Lavaredo and the north walls appear all at once.",
      "The plateau was the front line between Italy and Austria-Hungary from 1915 to 1917. There are trenches at Locatelli, tunnels bored through Monte Paterno, and rusted wire in the scree — the reason so many paths here are engineered at all.",
    ],
    photo: {
      src: "https://images.unsplash.com/photo-1651578852608-0200168d48f6",
      alt: "The three towers of Tre Cime di Lavaredo silhouetted against a burning orange and grey sunset sky.",
      credit: "Unsplash",
    },
    secondaryPhoto: {
      src: "https://images.unsplash.com/photo-1503751255376-7ab426c8cb60",
      alt: "A pale gravel path curving across a green and grey alpine plateau below the sheer walls of the Dolomites.",
      credit: "Unsplash",
    },
    secondaryCaption:
      "The track below the south faces. Wide, graded and dusty — the hardest thing about it is the altitude.",
    route: [
      {
        name: "Rifugio Auronzo to Rifugio Lavaredo",
        marker: "0 – 2 km",
        detail:
          "A near-level service track under the south faces, past the small Cappella degli Alpini. Busy, easy, and not yet the point.",
      },
      {
        name: "Forcella Lavaredo",
        marker: "2 – 3 km",
        detail:
          "A short climb to the col at 2,454 m. The three north faces come into view in about ten paces, which is the moment everyone came for.",
      },
      {
        name: "Rifugio Locatelli",
        marker: "3 – 5 km",
        detail:
          "Traverse to the Dreizinnenhütte, the classic viewpoint, with wartime trenches on the knoll behind it and the option to scramble the tunnelled path up Monte Paterno if you have a head torch and a helmet.",
      },
      {
        name: "Malga Langalm and the return",
        marker: "5 – 10 km",
        detail:
          "Drop north-west into the Val Rinbianco, contour past the dairy hut at Langalm, then climb steadily back around the west side to Auronzo. Quiet, green, and where the crowd finally disappears.",
      },
    ],
    access: [
      "The toll road from Misurina costs about €30 per car and is the only drive-up access. It is gated when the upper lot is full — on August weekends that happens early.",
      "Bus 444 runs from Cortina, Dobbiaco and Misurina in summer and is a better idea than the road.",
      "No permit or fee for the walk itself. The road usually opens between late May and mid June and closes with the first serious snow.",
    ],
    knowBefore: [
      "You start at 2,320 m ten seconds after leaving the car. Altitude does not care that the gradient is friendly.",
      "Afternoon thunderstorms are the local rhythm in July and August. Be back below the col by early afternoon.",
      "The rifugi serve real food and most now take cards, but carry cash anyway — and book ahead if you want a bed at Locatelli for sunrise.",
      "Sunrise and sunset are when the north faces glow. Midday is flat light and a queue at every viewpoint.",
    ],
  },
  {
    slug: "laugavegur",
    name: "Laugavegur",
    park: "Fjallabak Nature Reserve",
    country: "Southern Highlands, Iceland",
    nation: "Iceland",
    tagline:
      "Fifty-five kilometres from a hot spring to a birch wood, across everything in between.",
    difficulty: "Multi-day",
    shape: "Point to point, 4 days",
    distanceKm: 55,
    gainM: 1100,
    highPointM: 1027,
    highPointNote: "Hrafntinnusker",
    time: "4 days, 3 nights",
    season: "Late June to early September",
    trailhead: "Landmannalaugar — finish at Þórsmörk",
    intro: [
      "Iceland's classic trek walks you out of one landscape and into another roughly every four hours: steaming rhyolite hills in every colour a mountain can be, an obsidian plateau under permanent snow, a green lake basin, a black sand desert, a glacial canyon, and finally birch forest in the shadow of three ice caps.",
      "The distances are modest — 12 to 15 kilometres a day — and the huts are spaced so you never have to be a hero. What makes it serious is the exposure and the water. There is no shelter between huts, the rivers are unbridged and cold enough to hurt, and July can hand you horizontal sleet at 1,000 metres.",
      "Most people walk it south, from Landmannalaugar down to Þórsmörk, which puts the big climb on day one and the wind at your back. Add Fimmvörðuháls over the pass between Eyjafjallajökull and Mýrdalsjökull to Skógar and you have a six-day traverse that ends at a waterfall.",
    ],
    photo: {
      src: "https://images.unsplash.com/photo-1726533870778-8be51bf99bb1",
      alt: "Aerial view of banded rhyolite ridges at Landmannalaugar with a zigzag footpath cut into the coloured slope.",
      credit: "Unsplash",
    },
    secondaryPhoto: {
      src: "https://images.unsplash.com/photo-1695456166343-918eba48421d",
      alt: "A deep blue-green crater lake surrounded by brown volcanic hills in the Icelandic highlands under scattered cloud.",
      credit: "Unsplash",
    },
    secondaryCaption:
      "Highland water is everywhere and almost all of it is drinkable straight from the stream. Almost.",
    route: [
      {
        name: "Landmannalaugar to Hrafntinnusker",
        marker: "Day 1 — 12 km, +470 m",
        detail:
          "Up through the Laugahraun lava field and into the rhyolite: yellow, ochre, rust and green, with steam vents hissing out of snowbanks. The hut sits at 1,027 m and is the coldest night of the trip by a distance.",
      },
      {
        name: "Hrafntinnusker to Álftavatn",
        marker: "Day 2 — 12 km, −490 m",
        detail:
          "An obsidian plateau crossed on snow, then the Jökultungur descent — steep, loose, and the first time you see green. Two small fords before the hut, which sits on a lake with Stórasúla behind it.",
      },
      {
        name: "Álftavatn to Emstrur (Botnar)",
        marker: "Day 3 — 15 km, −40 m",
        detail:
          "The Bláfjallakvísl and Innri-Emstruá crossings, then hours of black sand desert under Mýrdalsjökull. Featureless, windy, and strangely the day people remember.",
      },
      {
        name: "Emstrur to Þórsmörk",
        marker: "Day 4 — 15 km, −300 m",
        detail:
          "A detour to the lip of the Markarfljót canyon, then down through Almenningar to the Þröngá — the last ford, and the deepest — and into the birch woods of Þórsmörk.",
      },
    ],
    access: [
      "The huts belong to Ferðafélag Íslands and are booked online months ahead; the popular nights go in the first weeks of January. Camping is allowed at the hut sites only, and you still pay.",
      "Buses run from Reykjavík to Landmannalaugar and back from Þórsmörk daily in season — roughly four hours each way, on F-roads, in a vehicle built for rivers.",
      "No permit is required, but the season is short: the huts are staffed and the buses run from about 25 June to early September.",
    ],
    knowBefore: [
      "The rivers are unbridged and knee to thigh deep. Carry crossing shoes, face upstream, unclip your hip belt, and cross before the afternoon melt raises the level.",
      "Weather can be near freezing with driving rain in July. A memorial near Hrafntinnusker marks a hiker who died of exposure there in June — this is not a summer stroll.",
      "There is no resupply. Four days of food comes with you, and the huts sell nothing but a bunk and a gas ring.",
      "Book the huts before you book the flight. If they're gone, walking it in the other direction won't help — everything is full both ways.",
    ],
  },
];

export const trailBySlug = (slug: string): Trail | undefined =>
  trails.find((trail) => trail.slug === slug);
