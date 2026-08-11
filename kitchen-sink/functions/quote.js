const notes = [
  "Make the boundary boring.",
  "The receipt is the proof.",
  "Let static files do the obvious work.",
];

export function GET(request) {
  const url = new URL(request.url);
  const requested = Number.parseInt(url.searchParams.get("n") || "0", 10);
  const index = Number.isFinite(requested) ? Math.abs(requested) % notes.length : 0;
  return Response.json({ runtime: "javascript", quote: notes[index] });
}
