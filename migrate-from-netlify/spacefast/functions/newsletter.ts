export async function POST(request: Request): Promise<Response> {
  const body = await request.json().catch(() => null);
  const email = body && typeof body === "object" && "email" in body ? body.email : null;
  if (typeof email !== "string" || !email.includes("@")) {
    return Response.json({ error: "valid_email_required" }, { status: 422 });
  }
  return Response.json({ ok: true, email }, { status: 202 });
}

export function GET(): Response {
  return Response.json({ ok: true, endpoint: "newsletter", accepts: ["POST"] });
}
