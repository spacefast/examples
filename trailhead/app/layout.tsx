import type { Metadata } from "next";
import { siteAcceleratorUrl } from "@spacefast/image";
import { Footer, Masthead } from "@/components/site-chrome";
import { SITE } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    // The same Site Accelerator that resizes the page images crops the social
    // card, so there is no OG image to generate, store or invalidate.
    images: [
      {
        url: siteAcceleratorUrl(SITE.heroPhoto.src, { resize: [1200, 630], quality: 82 }),
        width: 1200,
        height: 630,
        alt: SITE.heroPhoto.alt,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Masthead />
        {children}
        <Footer />
        {/* Shared Spacefast badge. Rendered into the HTML, not injected at runtime. */}
        <script src="https://spacefast.com/badge.js" data-example="trailhead" />
      </body>
    </html>
  );
}
