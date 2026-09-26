export function GET(): Response {
  return Response.json({
    ok: true,
    job: "weekly-digest",
    ranAt: new Date().toISOString(),
  });
}
