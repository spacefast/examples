#!/usr/bin/env bun

import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const examplesRoot = path.join(root, "examples");
const outputRoot = path.join(root, "dist");
const repoUrl = "https://github.com/spacefast/examples";

const requiredString = (value, field, slug) => {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${slug}/meta.json: ${field} must be a non-empty string`);
  }
  return value;
};

const requiredStrings = (value, field, slug) => {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${slug}/meta.json: ${field} must be an array of strings`);
  }
  return value;
};

const slugs = (await readdir(examplesRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .toSorted();

const items = [];
for (const slug of slugs) {
  const exampleRoot = path.join(examplesRoot, slug);
  const meta = await Bun.file(path.join(exampleRoot, "meta.json")).json();
  const prompt = (await Bun.file(path.join(exampleRoot, "prompt.md")).text()).trim();

  if (meta.slug !== slug) {
    throw new Error(`${slug}/meta.json: slug must match its directory`);
  }
  if (!prompt) throw new Error(`${slug}/prompt.md: prompt must not be empty`);
  if (/^#\s/.test(prompt)) {
    throw new Error(`${slug}/prompt.md: prompt must start with the request, not an example title`);
  }

  const order = Number(meta.order);
  if (!Number.isFinite(order)) {
    throw new Error(`${slug}/meta.json: order must be a number`);
  }

  const liveUrl = requiredString(meta.live_url, "live_url", slug);
  const publishSlug =
    meta.publish_slug === undefined
      ? slug
      : requiredString(meta.publish_slug, "publish_slug", slug);
  items.push({
    slug,
    publishSlug,
    title: requiredString(meta.title, "title", slug),
    name: requiredString(meta.name, "name", slug),
    vertical: requiredString(meta.vertical, "vertical", slug),
    tech: requiredString(meta.tech, "tech", slug),
    summary: requiredString(meta.summary, "summary", slug),
    order,
    liveUrl,
    previewUrl: liveUrl,
    setupQuestions: requiredStrings(meta.setup_questions, "setup_questions", slug),
    photoTerms: requiredStrings(meta.photo_terms, "photo_terms", slug),
    prompt,
    repoUrl: `${repoUrl}/tree/master/examples/${slug}`,
  });
}

items.sort((left, right) => left.order - right.order || left.slug.localeCompare(right.slug));

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await Bun.write(path.join(outputRoot, "manifest.json"), `${JSON.stringify(items)}\n`);
await Bun.write(
  path.join(outputRoot, "index.html"),
  '<!doctype html><meta charset="utf-8"><title>Spacefast examples data</title><a href="./manifest.json">manifest.json</a>\n',
);

console.log(`Built ${items.length} canonical examples into dist/manifest.json.`);
