import Link from "next/link";

function CompassMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M15.6 8.4 10.9 10.9 8.4 15.6l4.7-2.5 2.5-4.7Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Masthead() {
  return (
    <header className="masthead">
      <div className="shell masthead-inner">
        <Link className="wordmark" href="/">
          <CompassMark />
          Trailhead
        </Link>
        <nav aria-label="Primary">
          <Link href="/#trails">Trails</Link>
          <Link className="optional" href="/#how-its-built">
            How it&rsquo;s built
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <p>
          Six real trails, honest numbers, and no server. Conditions change and permit systems
          change faster &mdash; check with the land manager before you drive to a trailhead on our
          say-so.
        </p>
        <p className="colophon">
          Photography from{" "}
          <a href="https://unsplash.com" rel="noreferrer">
            Unsplash
          </a>
          , resized by the{" "}
          <a href="https://spacefast.com/docs/frameworks" rel="noreferrer">
            Spacefast Site Accelerator
          </a>
          . Built with Next.js, exported to static HTML, hosted on{" "}
          <a href="https://spacefast.com" rel="noreferrer">
            Spacefast
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
