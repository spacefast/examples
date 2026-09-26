import type { Photo } from "./trails";

export const SITE = {
  name: "Trailhead",
  tagline: "six walks worth the drive",
  description:
    "A field guide to six trails worth planning a trip around — real distances, real elevation, real permit systems. Built with Next.js and exported to static HTML.",
  url: "https://trailhead.view.fast",
  heroPhoto: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    alt: "First light on a snow-covered summit standing above a sea of cloud, with pink sky behind the ridgeline.",
    credit: "Unsplash",
  } satisfies Photo,
  fieldPhoto: {
    src: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6",
    alt: "A lone hiker walking a narrow grassy ridge path high above a lake and a line of distant mountains.",
    credit: "Unsplash",
  } satisfies Photo,
};
