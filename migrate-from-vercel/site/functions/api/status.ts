export function GET(request: Request): Response {
  return Response.json({
    ok: true,
    runtime: "spacefast-functions",
    host: new URL(request.url).host,
    checkedAt: new Date().toISOString(),
  });
}
