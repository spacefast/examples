import { cp, mkdir, rm } from "node:fs/promises";

const output = new URL("./dist", import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL("./site", import.meta.url), output, { recursive: true });
await cp(
  new URL("./spacefast/functions", import.meta.url),
  new URL("./dist/functions", import.meta.url),
  { recursive: true },
);

console.log("Built the translated Netlify project into dist/.");
