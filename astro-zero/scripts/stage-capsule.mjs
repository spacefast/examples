#!/usr/bin/env node
/**
 * Stage the capsule beside Astro's output.
 *
 * A Zero space publishes a *project root*, not a folder of files: the CLI walks
 * that root, compiles `server/` into the version's runtime artifact, and ships
 * everything else as content. Astro, meanwhile, insists on building into a
 * directory that is not its own project root.
 *
 * So the published root is `dist/`, and this copies the three things the capsule
 * needs into it after `astro build` has emptied it. `server/` and `shared/` are
 * compiled and then excluded from the published files, and `sf.jsonc` is
 * republished as the space's config — none of them are served as content.
 */
import { cp, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(fileURLToPath(import.meta.url), "../..");
const outDir = path.join(siteRoot, "dist");
const staged = ["sf.jsonc", "server", "shared"];

if (!(await stat(outDir).catch(() => null))?.isDirectory()) {
  console.error("stage-capsule: dist/ is missing. Run `astro build` first.");
  process.exit(1);
}

for (const entry of staged) {
  const from = path.join(siteRoot, entry);
  const to = path.join(outDir, entry);
  await rm(to, { recursive: true, force: true });
  await cp(from, to, { recursive: true });
}

console.log(`Staged ${staged.join(", ")} into dist/.`);
