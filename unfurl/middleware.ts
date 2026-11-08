import { NextResponse, type NextRequest } from "next/server";

/**
 * Two small jobs, both real.
 *
 * 1. People paste bare domains. `?url=github.com` becomes `?url=https://github.com`
 *    with a 308 before the page ever renders, so the address bar and any shared
 *    link carry the canonical form instead of a shape the fetcher would have to
 *    guess at on every request.
 * 2. Security headers on every response this app serves.
 *
 * No Node built-ins and no `runtime = "edge"` declaration — the OpenNext
 * adapter Spacefast builds with bundles this into the same worker as the rest
 * of the app and runs it on the Node.js runtime.
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const target = searchParams.get("url");

  if (target !== null && (pathname === "/u" || pathname === "/api/unfurl")) {
    const trimmed = target.trim();
    const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(trimmed);
    const looksLikeHost = /^[^\s/?#]+\.[^\s/?#]+/.test(trimmed);

    if (!hasScheme && looksLikeHost) {
      const normalized = request.nextUrl.clone();
      normalized.searchParams.set("url", `https://${trimmed}`);
      return withSecurityHeaders(NextResponse.redirect(normalized, 308));
    }
    if (trimmed !== target) {
      const normalized = request.nextUrl.clone();
      normalized.searchParams.set("url", trimmed);
      return withSecurityHeaders(NextResponse.redirect(normalized, 308));
    }
  }

  return withSecurityHeaders(NextResponse.next());
}

function withSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("x-content-type-options", "nosniff");
  response.headers.set("referrer-policy", "strict-origin-when-cross-origin");
  response.headers.set("x-frame-options", "SAMEORIGIN");
  // Proof the middleware ran, visible in `curl -I`.
  response.headers.set("x-unfurl-middleware", "1");
  return response;
}

export const config = {
  // Skip Next's own asset routes: they are served from disk and never need
  // this to run.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
