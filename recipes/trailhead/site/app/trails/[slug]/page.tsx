import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteAcceleratorUrl } from "@spacefast/image";
import { trails } from "@/data/trails";
import { distanceLabel, elevationLabel } from "@/lib/units";

type PageProps = { params: Promise<{ slug: string }> };

/** Every route this page owns, resolved at build time. Nothing is rendered on demand. */
export function generateStaticParams() {
  return trails.map((trail) => ({ slug: trail.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const trail = trails.find((entry) => entry.slug === slug);
  if (!trail) return {};

  const description = `${trail.tagline} ${distanceLabel(trail.distanceKm)}, ${elevationLabel(
    trail.gainM,
  )} of climbing, ${trail.season}.`;

  return {
    title: trail.name,
    description,
    alternates: { canonical: `/trails/${trail.slug}/` },
    openGraph: {
      type: "article",
      title: `${trail.name} — ${trail.park}`,
      description,
      images: [
        {
          url: siteAcceleratorUrl(trail.photo.src, { resize: [1200, 630], quality: 82 }),
          width: 1200,
          height: 630,
          alt: trail.photo.alt,
        },
      ],
    },
  };
}

export default async function TrailPage({ params }: PageProps) {
  const { slug } = await params;
  const index = trails.findIndex((entry) => entry.slug === slug);
  const trail = trails[index];
  if (!trail) notFound();

  const previous = trails[index - 1];
  const next = trails[index + 1];
  const highPoint = trail.highPointNote
    ? `${elevationLabel(trail.highPointM)} at ${trail.highPointNote}`
    : elevationLabel(trail.highPointM);

  return (
    <main id="main">
      <article>
        <header className="trail-hero">
          <div className="hero-media">
            <Image
              src={trail.photo.src}
              alt={trail.photo.alt}
              fill
              sizes="100vw"
              quality={80}
              priority
            />
          </div>
          <div className="shell">
            <Link className="crumb" href="/#trails">
              All trails
            </Link>
            <h1>{trail.name}</h1>
            <p>{trail.tagline}</p>
          </div>
          <p className="hero-credit">Photo: {trail.photo.credit}</p>
        </header>

        <dl className="stats">
          <div>
            <dt>Distance</dt>
            <dd>{distanceLabel(trail.distanceKm)}</dd>
          </div>
          <div>
            <dt>Elevation gain</dt>
            <dd>{elevationLabel(trail.gainM)}</dd>
          </div>
          <div>
            <dt>High point</dt>
            <dd>{highPoint}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{trail.time}</dd>
          </div>
          <div>
            <dt>Shape</dt>
            <dd>{trail.shape}</dd>
          </div>
          <div>
            <dt>Difficulty</dt>
            <dd>{trail.difficulty}</dd>
          </div>
        </dl>

        <div className="shell article">
          <div>
            <div className="prose">
              {trail.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <figure className="figure">
              <Image
                src={trail.secondaryPhoto.src}
                alt={trail.secondaryPhoto.alt}
                width={1440}
                height={960}
                sizes="(min-width: 62rem) 44rem, 100vw"
                quality={75}
              />
              <figcaption>
                {trail.secondaryCaption}
                <span className="credit">Photo: {trail.secondaryPhoto.credit}</span>
              </figcaption>
            </figure>

            <section className="block">
              <h2>The route</h2>
              <ol className="legs">
                {trail.route.map((leg) => (
                  <li key={leg.name}>
                    <p className="marker">{leg.marker}</p>
                    <h3>{leg.name}</h3>
                    <p>{leg.detail}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="block">
              <h2>Know before you go</h2>
              <ul className="checks warn">
                {trail.knowBefore.map((item) => (
                  <li key={item.slice(0, 40)}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="aside">
            <div>
              <h2>Permits &amp; access</h2>
              <ul>
                {trail.access.map((item) => (
                  <li key={item.slice(0, 40)}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Season</h2>
              <p>{trail.season}</p>
            </div>
            <div>
              <h2>Trailhead</h2>
              <p>{trail.trailhead}</p>
            </div>
          </aside>
        </div>

        <nav className="shell pager" aria-label="More trails">
          {previous ? (
            <Link href={`/trails/${previous.slug}/`}>
              <span>Previous</span>
              <strong>{previous.name}</strong>
            </Link>
          ) : null}
          {next ? (
            <Link className="next" href={`/trails/${next.slug}/`}>
              <span>Next</span>
              <strong>{next.name}</strong>
            </Link>
          ) : null}
        </nav>
      </article>
    </main>
  );
}
