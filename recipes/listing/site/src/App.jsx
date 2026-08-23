import Gallery from "./components/Gallery.jsx";
import MortgageCalculator from "./components/MortgageCalculator.jsx";
import FloorPlan from "./components/FloorPlan.jsx";
import TourForm from "./components/TourForm.jsx";
import {
  property,
  highlights,
  features,
  gallery,
  agent,
  fmtUSD,
} from "./data.js";

function Stat({ value, label }) {
  return (
    <div className="stat">
      <span className="stat__value">{value}</span>
      <span className="stat__label">{label}</span>
    </div>
  );
}

export default function App() {
  return (
    <>
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__text">
            {property.address}
            <small>{property.cityState}</small>
          </span>
        </a>
        <nav className="topnav" aria-label="Sections">
          <a href="#gallery">Gallery</a>
          <a href="#highlights">Highlights</a>
          <a href="#estimate">Estimate</a>
          <a href="#floorplan">Floor plan</a>
          <a href="#tour" className="topnav__cta">
            Book a tour
          </a>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <img
            className="hero__bg"
            src={gallery[0].src}
            alt={gallery[0].alt}
            fetchpriority="high"
          />
          <div className="hero__scrim" />
          <div className="hero__inner">
            <p className="hero__status">
              <span className="dot" /> {property.status} · {property.propertyType}
            </p>
            <h1 className="hero__title">{property.address}</h1>
            <p className="hero__sub">{property.cityState}</p>
            <p className="hero__price">{fmtUSD(property.price)}</p>
            <div className="hero__stats">
              <Stat value={property.beds} label="Bedrooms" />
              <Stat value={property.baths} label="Bathrooms" />
              <Stat
                value={property.sqft.toLocaleString()}
                label="Sq ft"
              />
              <Stat value={`$${property.pricePerSqft}`} label="Per sq ft" />
            </div>
            <div className="hero__actions">
              <a href="#tour" className="btn btn--primary">
                Schedule a tour
              </a>
              <a href="#gallery" className="btn btn--ghost">
                View {gallery.length + 26} photos
              </a>
            </div>
          </div>
          <a className="hero__scroll" href="#intro" aria-label="Scroll to details">
            &#8595;
          </a>
        </section>

        {/* INTRO */}
        <section id="intro" className="section section--intro">
          <p className="eyebrow">The story</p>
          <p className="intro-lede">{property.tagline}</p>
          <p className="intro-body">
            Set on a quiet bluff in lower La Jolla, 1428 Vista Del Mar was taken
            to the studs in 2019 and rebuilt as a glass-and-oak contemporary that
            lives entirely toward the water. The main level is one continuous
            room — kitchen, dining, and living flowing through pocketing sliders
            onto a terrace and an infinity pool that read as a single plane of
            blue. Upstairs, a full-floor primary suite claims the best of the
            view; below, a wellness wing keeps the household's gym, sauna, and
            wine close at hand.
          </p>
        </section>

        {/* HIGHLIGHTS */}
        <section id="highlights" className="section" aria-labelledby="hl-h">
          <div className="section-head">
            <p className="eyebrow">Highlights</p>
            <h2 id="hl-h">What makes it special</h2>
          </div>
          <div className="hl-grid">
            {highlights.map((h) => (
              <article className="hl-card" key={h.title}>
                <span className={`hl-icon hl-icon--${h.icon}`} aria-hidden="true" />
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </article>
            ))}
          </div>
        </section>

        <Gallery />

        {/* FEATURES TABLE */}
        <section className="section section--tint" aria-labelledby="feat-h">
          <div className="section-head">
            <p className="eyebrow">The details</p>
            <h2 id="feat-h">Facts &amp; features</h2>
          </div>
          <dl className="feat-grid">
            {features.map(([k, v]) => (
              <div className="feat-row" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <MortgageCalculator />
        <FloorPlan />
        <TourForm />
      </main>

      <footer className="footer">
        <div className="footer__grid">
          <div>
            <p className="footer__addr">{property.address}</p>
            <p className="footer__city">{property.cityState}</p>
            <p className="footer__price">{fmtUSD(property.price)}</p>
          </div>
          <div className="footer__mls">
            <p>
              <strong>MLS#</strong> {property.mlsId}
            </p>
            <p>
              <strong>Type</strong> {property.propertyType}
            </p>
            <p>
              <strong>Built</strong> {property.yearBuilt} ·{" "}
              {property.sqft.toLocaleString()} sq ft
            </p>
            <p>
              <strong>Lot</strong> {property.lotSqft.toLocaleString()} sq ft
            </p>
          </div>
          <div className="footer__agent">
            <p>
              <strong>{agent.name}</strong>
            </p>
            <p>{agent.brokerage}</p>
            <p>
              <a href={agent.phoneHref}>{agent.phone}</a>
            </p>
            <p>
              <a href={`mailto:${agent.email}`}>{agent.email}</a>
            </p>
          </div>
        </div>
        <p className="footer__disclaimer">
          Information deemed reliable but not guaranteed. Square footage, lot
          size, and room counts are approximate and should be independently
          verified. This is not an offer of representation. Equal Housing
          Opportunity. © {new Date().getFullYear()} {agent.brokerage}. DRE
          #01984472.
        </p>
      </footer>
    </>
  );
}
