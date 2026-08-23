import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cookieStore = await cookies();
  const returning = cookieStore.has("signal-reader");
  const renderedAt = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "long", timeZone: "UTC" }).format(new Date());

  return (
    <>
      <section className="hero">
        <div><p className="status"><span aria-hidden="true" /> Live dispatch</p><p className="stamp">Rendered at the edge<br />{renderedAt}</p></div>
        <div><p className="eyebrow">Runtime report · 08/23/26</p><h1>The web is quiet. The signals are not.</h1><p className="lede">{returning ? "Welcome back. The current request included your reader marker." : "This page was rendered for this request. Add a signal-reader cookie and refresh to see the greeting change."}</p></div>
      </section>
      <section className="grid" aria-label="Current signals">
        <article><p className="eyebrow">01 · Runtime</p><h2>Server rendering</h2><p>The timestamp and cookie-aware message are produced when the request arrives.</p></article>
        <article><p className="eyebrow">02 · Route handler</p><h2>JSON at `/api/pulse`</h2><p>A native Next route handler returns a fresh health receipt.</p><a href="/api/pulse">Open endpoint ↗</a></article>
        <article><p className="eyebrow">03 · Dynamic route</p><h2>Field notes by slug</h2><p>Parameterized routes stay in the same application and runtime bundle.</p><a href="/notes/runtime-boundaries">Read the note ↗</a></article>
      </section>
    </>
  );
}
