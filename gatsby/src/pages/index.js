import * as React from "react";

import { Layout } from "../components/layout";

const places = [
  { number: "01", name: "Juniper Bakehouse", kind: "Morning", note: "Cardamom knots, good light, no laptop glare." },
  { number: "02", name: "West Canal Steps", kind: "Afternoon", note: "A quiet edge of the city for reading by the water." },
  { number: "03", name: "Marlow Listening Room", kind: "Evening", note: "Tiny tables, warm speakers, and records played whole." },
];

export default function IndexPage() {
  return (
    <Layout>
      <section className="hero">
        <p className="eyebrow">Field guide · Portland, Maine</p>
        <h1>A day made from local favorites.</h1>
        <p className="lede">Three places, one walkable route, and enough room to change your mind.</p>
        <a className="button" href="#places">Start the route <span aria-hidden="true">↓</span></a>
      </section>
      <section className="places" id="places" aria-labelledby="places-title">
        <div className="section-head">
          <h2 id="places-title">The shortlist</h2>
          <p>Selected for atmosphere, craft, and a strong sense of place.</p>
        </div>
        {places.map((place) => (
          <article key={place.number}>
            <span className="number">{place.number}</span>
            <div>
              <p className="kind">{place.kind}</p>
              <h3>{place.name}</h3>
              <p>{place.note}</p>
            </div>
            <span className="arrow" aria-hidden="true">↗</span>
          </article>
        ))}
      </section>
    </Layout>
  );
}

export const Head = () => <><title>Common Ground</title><meta name="description" content="A neighborhood field guide built with Gatsby." /></>;
