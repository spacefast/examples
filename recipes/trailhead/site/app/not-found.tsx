import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Off the trail",
};

export default function NotFound() {
  return (
    <main id="main" className="shell notfound">
      <p className="eyebrow">404</p>
      <h1>You&rsquo;ve wandered off the trail.</h1>
      <p>
        This page doesn&rsquo;t exist &mdash; or it moved, and the redirect that should have caught
        you didn&rsquo;t. Either way, the trail index is one click back.
      </p>
      <Link className="button" href="/#trails">
        Back to the trails
      </Link>
    </main>
  );
}
