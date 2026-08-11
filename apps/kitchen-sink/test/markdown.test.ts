import { describe, expect, test } from "bun:test";

import { parseInline, parseMarkdown } from "../shared/markdown";

describe("Markdown rendering model", () => {
  test("turns a mixed document into structural blocks", () => {
    expect(
      parseMarkdown(`# Release brief

Ship the **real thing**.

- SQL
- Realtime

\`\`\`sh
sf publish
\`\`\``),
    ).toEqual([
      { kind: "heading", level: 1, text: "Release brief" },
      { kind: "paragraph", text: "Ship the **real thing**." },
      { kind: "list", ordered: false, items: ["SQL", "Realtime"] },
      { kind: "code", language: "sh", text: "sf publish" },
    ]);
  });

  test("keeps unsafe link protocols inert", () => {
    expect(parseInline("[safe](/notes) [unsafe](javascript:alert(1))")).toEqual([
      { kind: "link", text: "safe", href: "/notes" },
      { kind: "text", text: " " },
      { kind: "link", text: "unsafe", href: "#" },
      { kind: "text", text: ")" },
    ]);
  });
});
