export function GET(request: Request): Response {
  return Response.json({
    ok: true,
    runtime: "typescript",
    method: request.method,
    checkedAt: new Date().toISOString(),
  });
}
