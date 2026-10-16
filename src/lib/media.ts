import { siteImages, type SiteImageDefinition } from "@/lib/images";

/**
 * Homepage still sequence. These plates stay the immediate hero and the
 * fallback when video cannot play, motion is reduced, or data saving is on.
 * The cinematic reel is pre-assembled. The browser never requests the source clips.
 */
export const heroSequence: readonly SiteImageDefinition[] = [
  siteImages.cruise,
  siteImages.aftDeck,
  siteImages.preparation,
  siteImages.craft,
  siteImages.departure,
];

export const heroVideo = {
  desktop: "/video/anzalone-hero-desktop.mp4",
  mobile: "/video/anzalone-hero-mobile.mp4",
  poster: "/video/anzalone-hero-poster.webp",
} as const;
