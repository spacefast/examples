const entries = [
  ["001", "The useful edge", "Where a product stops is part of what it is."],
  ["002", "Notes on legibility", "Interfaces become calmer when hierarchy does the explaining."],
  ["003", "Fewer, better tools", "A short argument for software with a strong point of view."],
] as const;

export default function Home() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">A static journal · August 2026</p>
        <h1>Observations on tools, taste, and attention.</h1>
        <p className="lede">Three essays rendered ahead of time. No origin request, no runtime wait, no mystery.</p>
      </section>
      <section className="entries" aria-labelledby="entries-title">
        <div className="section-head"><h2 id="entries-title">In this edition</h2><span>12 / 2026</span></div>
        {entries.map(([number, title, summary]) => (
          <article key={number}>
            <span>{number}</span>
            <div><h3>{title}</h3><p>{summary}</p></div>
            <span aria-hidden="true">↗</span>
          </article>
        ))}
      </section>
    </>
  );
}
