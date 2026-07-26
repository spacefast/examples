import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const bun = process.execPath;
let manifestBuild;

async function inspectHtml(html, selectors) {
  const results = new Map(selectors.map((selector) => [selector, []]));
  const rewriter = new HTMLRewriter();
  for (const selector of selectors) {
    let active;
    rewriter.on(selector, {
      element(element) {
        active = {
          attributes: Object.fromEntries(element.attributes),
          text: "",
        };
        results.get(selector).push(active);
      },
      text(chunk) {
        if (active) active.text += chunk.text;
        if (chunk.lastInTextNode) active = undefined;
      },
    });
  }
  await rewriter.transform(new Response(html)).text();
  return results;
}

beforeAll(async () => {
  manifestBuild = Bun.spawn({
    cmd: [bun, "scripts/build-manifest.mjs"],
    cwd: root,
    stdout: "pipe",
    stderr: "pipe",
  });
  await manifestBuild.exited;
});

afterAll(() => {
  manifestBuild?.kill();
});

describe("canonical recipe catalog", () => {
  test("builds a recipe feed containing Technical planning", async () => {
    expect(manifestBuild.exitCode).toBe(0);
    const manifest = await Bun.file(path.join(root, "dist/manifest.json")).json();
    expect(manifest).toContainEqual(
      expect.objectContaining({
        slug: "technical-plan",
        title: "Technical planning",
        liveUrl: "https://technical-plan.view.fast/",
      }),
    );
    for (const recipe of manifest) {
      expect(recipe.prompt, recipe.slug).toContain(`data-example="${recipe.slug}"`);
    }
  });

  test("labels the public feed as recipes while retaining its historical URL", async () => {
    const document = await inspectHtml(
      await Bun.file(path.join(root, "dist/index.html")).text(),
      ["title", 'a[href="./manifest.json"]'],
    );

    expect(document.get("title")?.[0]?.text).toBe("Spacefast recipes data");
    expect(document.get('a[href="./manifest.json"]')?.[0]?.text).toBe("manifest.json");
  });

  test("validates published outputs during the badge compatibility rollout", async () => {
    const legacy = Bun.spawn({
      cmd: [bun, "scripts/validate-publish-dir.mjs", "status", "examples/status/site"],
      cwd: root,
      stdout: "pipe",
      stderr: "pipe",
    });
    const canonical = Bun.spawn({
      cmd: [
        bun,
        "scripts/validate-publish-dir.mjs",
        "technical-plan",
        "examples/technical-plan/site",
      ],
      cwd: root,
      stdout: "pipe",
      stderr: "pipe",
    });

    expect(await legacy.exited).toBe(0);
    expect(await canonical.exited).toBe(0);
  });
});

describe("Technical planning recipe output", () => {
  test("renders a decision-ready, accessible plan with every required planning section", async () => {
    const html = await Bun.file(
      path.join(root, "examples/technical-plan/site/index.html"),
    ).text();
    const sectionIds = [
      "problem",
      "scope",
      "architecture",
      "milestones",
      "risks",
      "decisions",
      "open-questions",
      "review-checklist",
    ];
    const selectors = [
      "html",
      "title",
      "meta[name=viewport]",
      "main h1",
      ...sectionIds.flatMap((id) => [`main section#${id} h2`, `nav a[href="#${id}"]`]),
      "#milestones tbody tr",
      "#risks thead th",
      "#risks tbody tr",
      "#scope .constraints dt",
      "#decisions li",
      "#decisions dt",
      "#open-questions li",
      "#review-checklist li",
      'script[src="https://spacefast.com/badge.js"][data-example="technical-plan"]',
    ];
    const document = await inspectHtml(html, selectors);

    expect(document.get("html")?.[0]?.attributes.lang).toBe("en");
    expect(document.get("title")?.[0]?.text).toBe("Northstar Sync — Technical Plan");
    expect(document.get("meta[name=viewport]")?.length).toBe(1);
    expect(document.get("main h1")?.[0]?.text).toContain("Technical plan");
    for (const id of sectionIds) {
      expect(document.get(`main section#${id} h2`)?.length, id).toBe(1);
      expect(document.get(`nav a[href="#${id}"]`)?.length, id).toBe(1);
    }
    expect(document.get("#milestones tbody tr")?.length).toBeGreaterThanOrEqual(4);
    expect(document.get("#risks tbody tr")?.length).toBeGreaterThanOrEqual(4);
    expect(document.get("#risks thead th")?.map((entry) => entry.text)).toEqual([
      "Risk",
      "Likelihood",
      "Impact",
      "Mitigation and trigger",
      "Owner",
    ]);
    expect(document.get("#scope .constraints dt")?.map((entry) => entry.text)).toEqual(
      expect.arrayContaining(["Goals", "Target users", "Assumptions and boundaries"]),
    );
    expect(document.get("#decisions li")?.length).toBeGreaterThanOrEqual(3);
    expect(document.get("#decisions dt")?.map((entry) => entry.text)).toEqual(
      expect.arrayContaining(["Alternative", "Rationale", "Consequences", "Revisit when"]),
    );
    expect(document.get("#open-questions li")?.length).toBeGreaterThanOrEqual(3);
    expect(document.get("#review-checklist li")?.length).toBeGreaterThanOrEqual(4);
    expect(
      document.get(
        'script[src="https://spacefast.com/badge.js"][data-example="technical-plan"]',
      )?.length,
    ).toBe(1);
  });
});
