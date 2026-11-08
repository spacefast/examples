import type { UnfurlResult } from "@/lib/unfurl";

import { CardMedia, Favicon } from "./CardMedia";

/**
 * The card itself, rendered on the server from the metadata we just fetched.
 * View-source on `/u?url=…` shows the real title and description — that's the
 * proof that this is per-request SSR and not a client-side fetch.
 */
export function PreviewCard({ result }: { result: UnfurlResult }) {
  const title = result.title ?? result.domain;
  // Deliberately not the theme color: a hex string reads as noise on a card.
  // It stays in the JSON for anyone who wants it.
  const chips = [result.siteName, result.type].filter(
    (value): value is string => typeof value === "string" && value !== "",
  );

  return (
    <article className="card">
      <CardMedia
        src={result.image}
        alt={result.imageAlt ?? (result.title ? `Preview image for ${result.title}` : "")}
        initial={result.domain.slice(0, 1)}
      />

      <div className="card-body">
        <p className="card-source">
          <Favicon src={result.favicon} />
          <span>{result.domain}</span>
        </p>

        <h2>{title}</h2>
        {result.description ? <p className="card-summary">{result.description}</p> : null}

        {chips.length > 0 ? (
          <p className="chips">
            {chips.map((chip) => (
              <span className="chip" key={chip}>
                {chip}
              </span>
            ))}
          </p>
        ) : null}
      </div>

      <p className="card-foot">
        <a href={result.finalUrl} rel="noreferrer nofollow ugc" target="_blank">
          {result.finalUrl}
        </a>
      </p>
    </article>
  );
}
