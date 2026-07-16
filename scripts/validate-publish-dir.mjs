#!/usr/bin/env bun

import { readdir } from "node:fs/promises";
import path from "node:path";

const [slug, inputDir] = process.argv.slice(2);
if (!slug || !inputDir) {
  throw new Error("Usage: bun scripts/validate-publish-dir.mjs <slug> <publish-directory>");
}

const root = path.resolve(inputDir);
const files = [];
const walk = async (directory) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(target);
    else files.push(target);
  }
};
await walk(root);

if (!files.some((file) => path.relative(root, file) === "index.html")) {
  throw new Error(`${slug}: publish directory has no root index.html`);
}
if (files.some((file) => path.basename(file) === "sf-badge.js")) {
  throw new Error(`${slug}: local sf-badge.js is forbidden; use the shared badge`);
}

const htmlFiles = files.filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  const html = await Bun.file(file).text();
  if (
    !html.includes("https://spacefast.com/badge.js") ||
    !html.includes(`data-example="${slug}"`)
  ) {
    throw new Error(`${slug}: ${path.relative(root, file)} does not load the shared badge`);
  }
}

console.log(`Validated ${slug}: ${files.length} files, ${htmlFiles.length} HTML pages.`);
