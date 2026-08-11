export type MarkdownBlock =
  | { kind: "heading"; level: 1 | 2 | 3; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "code"; language: string; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "rule" };

export type InlineToken =
  | { kind: "text"; text: string }
  | { kind: "strong"; text: string }
  | { kind: "em"; text: string }
  | { kind: "code"; text: string }
  | { kind: "link"; text: string; href: string };

export function parseMarkdown(source: string): MarkdownBlock[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index] ?? "";
    if (!line.trim()) {
      index += 1;
      continue;
    }
    const fence = /^```([A-Za-z0-9_-]*)\s*$/.exec(line);
    if (fence) {
      const content: string[] = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/.test(lines[index] ?? "")) {
        content.push(lines[index] ?? "");
        index += 1;
      }
      blocks.push({ kind: "code", language: fence[1] ?? "", text: content.join("\n") });
      index += 1;
      continue;
    }
    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) {
      blocks.push({
        kind: "heading",
        level: heading[1]?.length as 1 | 2 | 3,
        text: heading[2] ?? "",
      });
      index += 1;
      continue;
    }
    if (/^\s*(---|\*\*\*)\s*$/.test(line)) {
      blocks.push({ kind: "rule" });
      index += 1;
      continue;
    }
    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index] ?? "")) {
        quote.push((lines[index] ?? "").replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ kind: "quote", text: quote.join(" ") });
      continue;
    }
    const unordered = /^\s*[-*]\s+/.test(line);
    const ordered = /^\s*\d+\.\s+/.test(line);
    if (unordered || ordered) {
      const items: string[] = [];
      const pattern = ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/;
      while (index < lines.length && pattern.test(lines[index] ?? "")) {
        items.push((lines[index] ?? "").replace(pattern, ""));
        index += 1;
      }
      blocks.push({ kind: "list", ordered, items });
      continue;
    }
    const paragraph = [line.trim()];
    index += 1;
    while (
      index < lines.length &&
      (lines[index] ?? "").trim() &&
      !startsBlock(lines[index] ?? "")
    ) {
      paragraph.push((lines[index] ?? "").trim());
      index += 1;
    }
    blocks.push({ kind: "paragraph", text: paragraph.join(" ") });
  }
  return blocks;
}

export function parseInline(source: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let cursor = 0;
  for (const match of source.matchAll(pattern)) {
    const offset = match.index ?? 0;
    if (offset > cursor) tokens.push({ kind: "text", text: source.slice(cursor, offset) });
    const value = match[0];
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(value);
    if (link) tokens.push({ kind: "link", text: link[1] ?? "", href: safeHref(link[2] ?? "") });
    else if (value.startsWith("**")) tokens.push({ kind: "strong", text: value.slice(2, -2) });
    else if (value.startsWith("`")) tokens.push({ kind: "code", text: value.slice(1, -1) });
    else tokens.push({ kind: "em", text: value.slice(1, -1) });
    cursor = offset + value.length;
  }
  if (cursor < source.length) tokens.push({ kind: "text", text: source.slice(cursor) });
  return tokens;
}

function startsBlock(line: string): boolean {
  return /^(#{1,3})\s+|^```|^>\s?|^\s*[-*]\s+|^\s*\d+\.\s+|^\s*(---|\*\*\*)\s*$/.test(line);
}

function safeHref(value: string): string {
  const trimmed = value.trim();
  return /^(https?:\/\/|mailto:|\/|#)/i.test(trimmed) ? trimmed : "#";
}
