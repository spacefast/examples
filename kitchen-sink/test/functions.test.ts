import { expect, test } from "bun:test";

import { GET as post } from "../functions/function-posts/[slug]";
import { GET as health } from "../functions/health";
import { GET as quote } from "../functions/quote";

test("the TypeScript health route returns a runtime receipt", async () => {
  const response = health(new Request("https://functions.test/health"));
  expect(response.status).toBe(200);
  expect((await response.json()).runtime).toBe("typescript");
});

test("the JavaScript route selects deterministic copy", async () => {
  const response = quote(new Request("https://functions.test/quote?n=1"));
  expect(await response.json()).toEqual({
    runtime: "javascript",
    quote: "The receipt is the proof.",
  });
});

test("the parameter route receives decoded router params", async () => {
  const response = post(new Request("https://functions.test/function-posts/useful-edge"), {
    params: { slug: "useful edge" },
  });
  expect(await response.json()).toEqual({
    runtime: "typescript",
    slug: "useful edge",
    canonicalUrl: "/function-posts/useful%20edge",
  });
});
