import { getCollection, type CollectionEntry } from 'astro:content';
import { slugify } from './slugify.mjs';

export type Note = CollectionEntry<'notes'>;
export type Status = 'planted' | 'growing' | 'evergreen';

export const STATUS_META: Record<Status, { label: string; glyph: string; blurb: string }> = {
  planted: { label: 'Planted', glyph: '🌱', blurb: 'A seedling — rough and unfinished, on purpose.' },
  growing: { label: 'Growing', glyph: '🌿', blurb: 'Actively tended — reworked, still moving.' },
  evergreen: { label: 'Evergreen', glyph: '🌲', blurb: 'Settled — densely linked, something I’d defend.' },
};

const STATUS_ORDER: Record<Status, number> = { evergreen: 0, growing: 1, planted: 2 };
const WIKILINK = /\[\[([^\]]+?)\]\]/g;

/** All notes, newest-tended first. */
export async function allNotes(): Promise<Note[]> {
  const notes = await getCollection('notes');
  return notes.sort((a, b) => b.data.updated.getTime() - a.data.updated.getTime());
}

/** Pull the target slugs a note links to (resolved against notes that exist). */
function outgoingSlugs(note: Note, valid: Set<string>): string[] {
  const found = new Set<string>();
  let m: RegExpExecArray | null;
  WIKILINK.lastIndex = 0;
  while ((m = WIKILINK.exec(note.body ?? '')) !== null) {
    const target = m[1].split('|')[0].trim();
    const slug = slugify(target);
    if (valid.has(slug) && slug !== note.id) found.add(slug);
  }
  return [...found];
}

export interface GardenGraph {
  /** node slug -> the notes that link TO it */
  backlinks: Map<string, Note[]>;
  /** node slug -> the notes it links OUT to */
  outgoing: Map<string, Note[]>;
  edges: { source: string; target: string }[];
}

/** Build the full link graph in one pass so pages can read both directions. */
export async function buildGraph(notes?: Note[]): Promise<GardenGraph> {
  const list = notes ?? (await allNotes());
  const valid = new Set(list.map((n) => n.id));
  const bySlug = new Map(list.map((n) => [n.id, n]));

  const backlinks = new Map<string, Note[]>();
  const outgoing = new Map<string, Note[]>();
  const edges: { source: string; target: string }[] = [];
  list.forEach((n) => {
    backlinks.set(n.id, []);
    outgoing.set(n.id, []);
  });

  for (const note of list) {
    const targets = outgoingSlugs(note, valid);
    outgoing.set(
      note.id,
      targets.map((t) => bySlug.get(t)!).filter(Boolean),
    );
    for (const t of targets) {
      backlinks.get(t)!.push(note);
      edges.push({ source: note.id, target: t });
    }
  }

  // De-dupe edges that exist in both directions for the undirected graph view.
  return { backlinks, outgoing, edges };
}

/** Lightweight client search payload — title, summary, status, plain body. */
export interface SearchDoc {
  slug: string;
  title: string;
  status: Status;
  summary: string;
  text: string;
}
export function searchIndex(notes: Note[]): SearchDoc[] {
  return notes.map((n) => ({
    slug: n.id,
    title: n.data.title,
    status: n.data.status,
    summary: n.data.summary,
    text: stripMarkdown(n.body ?? '').slice(0, 600),
  }));
}

function stripMarkdown(src: string): string {
  return src
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[\[([^\]]+?)\]\]/g, (_, t) => t.split('|').pop()!.trim())
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function sortForIndex(notes: Note[]): Note[] {
  return [...notes].sort((a, b) => {
    const s = STATUS_ORDER[a.data.status] - STATUS_ORDER[b.data.status];
    return s !== 0 ? s : a.data.title.localeCompare(b.data.title);
  });
}

// ---------------------------------------------------------------------------
// Graph layout — a tiny deterministic force simulation, run once at build time
// so the homepage ships a real, settled knowledge-graph as static SVG. No
// client-side physics; the browser only handles hover highlighting.
// ---------------------------------------------------------------------------
export interface GraphNode {
  slug: string;
  title: string;
  status: Status;
  x: number;
  y: number;
  degree: number;
}
export interface GraphEdge {
  source: string;
  target: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
export interface GraphLayout {
  width: number;
  height: number;
  nodes: GraphNode[];
  links: GraphEdge[];
}

// Small seeded PRNG so the layout is identical on every build.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export async function graphLayout(notes: Note[], graph: GardenGraph): Promise<GraphLayout> {
  const width = 760;
  const height = 520;
  const rand = mulberry32(20240601);

  // Unique undirected edges.
  const seen = new Set<string>();
  const undirected: { source: string; target: string }[] = [];
  for (const e of graph.edges) {
    const key = [e.source, e.target].sort().join('::');
    if (seen.has(key)) continue;
    seen.add(key);
    undirected.push(e);
  }

  const degree = new Map<string, number>();
  notes.forEach((n) => degree.set(n.id, 0));
  undirected.forEach((e) => {
    degree.set(e.source, (degree.get(e.source) ?? 0) + 1);
    degree.set(e.target, (degree.get(e.target) ?? 0) + 1);
  });

  const N = notes.length;
  const idx = new Map(notes.map((n, i) => [n.id, i]));
  const pos = notes.map((_, i) => {
    const a = (i / N) * Math.PI * 2;
    return {
      x: width / 2 + Math.cos(a) * 150 + (rand() - 0.5) * 40,
      y: height / 2 + Math.sin(a) * 150 + (rand() - 0.5) * 40,
    };
  });

  const edgesIdx = undirected.map((e) => [idx.get(e.source)!, idx.get(e.target)!] as const);
  const k = 150; // ideal spring length
  const repulsion = 16000;

  for (let iter = 0; iter < 420; iter++) {
    const disp = pos.map(() => ({ x: 0, y: 0 }));
    // Repulsion between every pair.
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        let dx = pos[i].x - pos[j].x;
        let dy = pos[i].y - pos[j].y;
        let dist = Math.hypot(dx, dy) || 0.01;
        const force = repulsion / (dist * dist);
        dx /= dist;
        dy /= dist;
        disp[i].x += dx * force;
        disp[i].y += dy * force;
        disp[j].x -= dx * force;
        disp[j].y -= dy * force;
      }
    }
    // Attraction along edges.
    for (const [a, b] of edgesIdx) {
      let dx = pos[a].x - pos[b].x;
      let dy = pos[a].y - pos[b].y;
      const dist = Math.hypot(dx, dy) || 0.01;
      const force = (dist * dist) / k / 18;
      dx /= dist;
      dy /= dist;
      disp[a].x -= dx * force;
      disp[a].y -= dy * force;
      disp[b].x += dx * force;
      disp[b].y += dy * force;
    }
    // Gentle pull to center + apply with cooling.
    const cool = 1 - iter / 520;
    for (let i = 0; i < N; i++) {
      disp[i].x += (width / 2 - pos[i].x) * 0.012;
      disp[i].y += (height / 2 - pos[i].y) * 0.012;
      const len = Math.hypot(disp[i].x, disp[i].y) || 0.01;
      const step = Math.min(len, 14 * cool);
      pos[i].x += (disp[i].x / len) * step;
      pos[i].y += (disp[i].y / len) * step;
    }
  }

  // Clamp inside the viewBox with a margin.
  const margin = 56;
  pos.forEach((p) => {
    p.x = Math.max(margin, Math.min(width - margin, p.x));
    p.y = Math.max(margin, Math.min(height - margin, p.y));
  });

  const nodes: GraphNode[] = notes.map((n, i) => ({
    slug: n.id,
    title: n.data.title,
    status: n.data.status,
    x: Math.round(pos[i].x * 10) / 10,
    y: Math.round(pos[i].y * 10) / 10,
    degree: degree.get(n.id) ?? 0,
  }));

  const links: GraphEdge[] = undirected.map((e) => {
    const a = pos[idx.get(e.source)!];
    const b = pos[idx.get(e.target)!];
    return {
      source: e.source,
      target: e.target,
      x1: Math.round(a.x * 10) / 10,
      y1: Math.round(a.y * 10) / 10,
      x2: Math.round(b.x * 10) / 10,
      y2: Math.round(b.y * 10) / 10,
    };
  });

  return { width, height, nodes, links };
}
