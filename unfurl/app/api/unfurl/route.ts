import { unfurl, UnfurlError } from "@/lib/unfurl";

/**
 * `GET /api/unfurl?url=…`
 *
 * The whole reason this app needs a server. A browser cannot fetch a
 * cross-origin page and read its `<head>` — CORS stops it — so the unfurl has
 * to happen here, in a Route Handler, on the Spacefast Functions runtime.
 *
 * No `export const runtime = "edge"`: the OpenNext adapter Spacefast builds
 * with uses the Node.js runtime, and declaring edge breaks the build.
 */
export const dynamic = "force-dynamic";

type ErrorBody = { error: { code: string; message: string; detail?: string } };

function problem(error: UnfurlError): Response {
  const body: ErrorBody = {
    error: {
      code: error.code,
      message: error.message,
      ...(error.detail ? { detail: error.detail } : {}),
    },
  };
  return Response.json(body, {
    status: error.status,
    headers: { "cache-control": "no-store" },
  });
}

export async function GET(request: Request): Promise<Response> {
  const target = new URL(request.url).searchParams.get("url");
  if (!target) {
    return problem(new UnfurlError("missing_url", "Pass a URL: /api/unfurl?url=https://example.com"));
  }

  try {
    const result = await unfurl(target);
    return Response.json(result, {
      headers: {
        // Same answer for the same URL for a few minutes, but never stale
        // enough to hide a page someone just fixed.
        "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    if (error instanceof UnfurlError) return problem(error);
    return problem(
      new UnfurlError("fetch_failed", "Something went wrong unfurling that URL.", 500),
    );
  }
}
