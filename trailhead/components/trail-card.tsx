import Image from "next/image";
import Link from "next/link";
import type { Trail } from "@/data/trails";
import { distanceLabel, metres } from "@/lib/units";

export function TrailCard({ trail, priority = false }: { trail: Trail; priority?: boolean }) {
  return (
    <li className="card">
      <div className="card-media">
        <span className="badge" data-tone={trail.difficulty.toLowerCase()}>
          {trail.difficulty}
        </span>
        <Image
          src={trail.photo.src}
          alt={trail.photo.alt}
          fill
          sizes="(min-width: 68rem) 22rem, (min-width: 42rem) 45vw, 100vw"
          quality={75}
          priority={priority}
        />
      </div>
      <div className="card-body">
        <h3>
          <Link href={`/trails/${trail.slug}/`}>{trail.name}</Link>
        </h3>
        <p className="card-where">
          {trail.park} &middot; {trail.country}
        </p>
        <p className="card-tagline">{trail.tagline}</p>
        <p className="card-stats">
          <span>
            <strong>{distanceLabel(trail.distanceKm)}</strong>
          </span>
          <span>
            <strong>{metres(trail.gainM)}</strong> up
          </span>
          <span>{trail.season}</span>
        </p>
      </div>
    </li>
  );
}
