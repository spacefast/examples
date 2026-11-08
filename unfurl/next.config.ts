import type { NextConfig } from "next";

/**
 * Deliberately minimal.
 *
 * No `output: "export"` — that is the static-export path, and this app needs a
 * server for the Route Handler, the SSR result page, and middleware. Spacefast
 * builds this with a pinned OpenNext Cloudflare adapter at publish time, so
 * there is no adapter dependency and no `open-next.config.ts` here either.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Next 16 writes its own AGENTS.md and CLAUDE.md into the project on first
  // run. This is an example in a public repo, not a workspace, so opt out.
  agentRules: false,
};

export default nextConfig;
