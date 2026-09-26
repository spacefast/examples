export function GET(): Response {
  return Response.json({
    ok: true,
    job: "weekly-digest",
    generatedAt: new Date().toISOString(),
  });
}
