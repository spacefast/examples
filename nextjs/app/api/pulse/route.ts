export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const url = new URL(request.url);
  return Response.json({
    ok: true,
    runtime: "nextjs",
    host: url.host,
    checkedAt: new Date().toISOString(),
  });
}
