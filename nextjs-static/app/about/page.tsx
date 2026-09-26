import type { Metadata } from "next";

export const metadata: Metadata = { title: "Colophon" };

export default function About() {
  return (
    <article className="prose">
      <p className="eyebrow">Colophon</p>
      <h1>Built once. Read many times.</h1>
      <p>This site uses the Next.js App Router, but every page is exported to ordinary HTML, CSS, and JavaScript during the build.</p>
      <p>That makes <code>out/</code> the whole deployment. Spacefast serves those files directly at the edge.</p>
      <a href="/">← Back to the index</a>
    </article>
  );
}
