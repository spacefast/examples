export function GET(_request: Request, context: { params: { slug: string } }): Response {
  return Response.json({
    runtime: "typescript",
    slug: context.params.slug,
    canonicalUrl: `/function-posts/${encodeURIComponent(context.params.slug)}`,
  });
}
