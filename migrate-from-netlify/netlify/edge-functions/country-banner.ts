export default async function countryBanner(request: Request, context: { geo?: { country?: { code?: string } }; next(): Promise<Response> }) {
  const response = await context.next();
  response.headers.set("x-country", context.geo?.country?.code ?? "unknown");
  return response;
}
