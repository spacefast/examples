"use client";

import { useState } from "react";

/**
 * The only client components in the app, and only because of a problem the
 * server genuinely can't solve: an `og:image` or favicon URL can be present in
 * the markup and still 404, hotlink-block, or time out in the visitor's
 * browser. Nothing the server rendered can know that, so the fallback has to
 * react to a real `error` event.
 *
 * Everything else — the fetch, the parse, the card — is server-rendered.
 */
export function CardMedia({
  src,
  alt,
  initial,
}: {
  src: string | null;
  alt: string;
  initial: string;
}) {
  const [broken, setBroken] = useState(false);
  const showImage = src !== null && !broken;

  return (
    <div className="card-media">
      {showImage ? (
        // Plain <img>: the source is an arbitrary third-party host, which is
        // exactly what next/image's optimizer is not for.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setBroken(true)}
        />
      ) : (
        <span className="card-media-fallback" aria-hidden="true">
          {initial}
        </span>
      )}
    </div>
  );
}

/** Same story, 16 pixels wide: a declared favicon that doesn't actually load. */
export function Favicon({ src }: { src: string | null }) {
  const [broken, setBroken] = useState(false);

  if (src === null || broken) {
    return <span className="dot" aria-hidden="true" />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={16}
      height={16}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setBroken(true)}
    />
  );
}
