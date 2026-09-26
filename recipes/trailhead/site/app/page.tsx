import Image from "next/image";
import { TrailCard } from "@/components/trail-card";
import { SITE } from "@/data/site";
import { trails } from "@/data/trails";
import { kilometres, metres } from "@/lib/units";

const totalDistance = trails.reduce((sum, trail) => sum + trail.distanceKm, 0);
const totalGain = trails.reduce((sum, trail) => sum + trail.gainM, 0);
const nations = new Set(trails.map((trail) => trail.nation)).size;

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero">
        <div className="hero-media">
          <Image
            src={SITE.heroPhoto.src}
            alt={SITE.heroPhoto.alt}
            fill
            sizes="100vw"
            quality={80}
            priority
          />
        </div>
        <div className="shell">
          <p className="eyebrow">A field guide</p>
          <h1>Six walks worth the drive.</h1>
          <p className="hero-lede">
            Real distances, real elevation, real permit systems &mdash; and the parts nobody puts on
            the sign at the trailhead. Pick one, read the whole page, then go.
          </p>
          <dl className="hero-figures">
            <div>
              <dt>Trails</dt>
              <dd>{trails.length}</dd>
            </div>
            <div>
              <dt>On foot</dt>
              <dd>{kilometres(totalDistance)}</dd>
            </div>
            <div>
              <dt>Climbing</dt>
              <dd>{metres(totalGain)}</dd>
            </div>
            <div>
              <dt>Countries</dt>
              <dd>{nations}</dd>
            </div>
          </dl>
        </div>
        <p className="hero-credit">Photo: {SITE.heroPhoto.credit}</p>
      </section>

      <section className="section shell" id="trails">
        <div className="section-head">
          <h2>The trails</h2>
          <p>
            Half a day to half a week, from a sandstone fin in the desert to four days across the
            Icelandic highlands. Every number here comes from the land manager, not a fitness app.
          </p>
        </div>
        <ul className="trail-grid">
          {trails.map((trail, index) => (
            <TrailCard key={trail.slug} trail={trail} priority={index < 2} />
          ))}
        </ul>
      </section>

      <section className="build" id="how-its-built">
        <div className="section shell">
          <div className="section-head">
            <h2>How this site is built</h2>
            <p>
              It is a Next.js app that stops being an app at build time. What ships is HTML, CSS and
              a handful of routing rules.
            </p>
          </div>
          <div className="build-grid">
            <div>
              <span aria-hidden="true">01</span>
              <h3>Static export</h3>
              <p>
                <code>output: &quot;export&quot;</code> turns <code>next build</code> into a folder
                of flat HTML. Every trail page is generated from one data file by{" "}
                <code>generateStaticParams</code>. There is no server in the request path, so there
                is nothing to scale, wake up, or patch.
              </p>
            </div>
            <div>
              <span aria-hidden="true">02</span>
              <h3>Images through the accelerator</h3>
              <p>
                The photos are full-resolution originals on someone else&rsquo;s server. The{" "}
                <code>@spacefast/image</code> loader rewrites every <code>next/image</code> URL to an{" "}
                <code>i0.wp.com</code> transform, so each device downloads a resized, re-encoded copy
                and the build stays instant.
              </p>
            </div>
            <div>
              <span aria-hidden="true">03</span>
              <h3>Routing rules as files</h3>
              <p>
                <code>_redirects</code> and <code>_headers</code> sit in <code>public/</code>, land
                at the root of the export, and get compiled at publish time. That&rsquo;s where the
                301s and the security headers live &mdash; versioned with the site, not clicked into
                a dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell">
        <figure className="figure">
          <Image
            src={SITE.fieldPhoto.src}
            alt={SITE.fieldPhoto.alt}
            width={1440}
            height={960}
            sizes="(min-width: 56rem) 52rem, 100vw"
            quality={75}
          />
          <figcaption>
            None of these are secrets. They are all busy, they are all worth it anyway, and every one
            of them is better at seven in the morning.
            <span className="credit">Photo: {SITE.fieldPhoto.credit}</span>
          </figcaption>
        </figure>
      </section>
    </main>
  );
}
