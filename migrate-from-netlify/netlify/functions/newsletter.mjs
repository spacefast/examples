export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "method_not_allowed" }) };
  }
  const { email } = JSON.parse(event.body || "{}");
  if (typeof email !== "string" || !email.includes("@")) {
    return { statusCode: 422, body: JSON.stringify({ error: "valid_email_required" }) };
  }
  return { statusCode: 202, body: JSON.stringify({ ok: true, email }) };
}
