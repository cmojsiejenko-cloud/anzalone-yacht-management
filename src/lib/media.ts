import { siteImages, type SiteImageDefinition } from "@/lib/images";

/**
 * Homepage still sequence, about 28 seconds when motion is allowed.
 * A real file at `public/video/hero.mp4` replaces the crossfade.
 * Leave `heroVideoSrc` null until that file is in the repository.
 */
export const heroSequence: readonly SiteImageDefinition[] = [
  siteImages.cruise,
  siteImages.aftDeck,
  siteImages.preparation,
  siteImages.craft,
  siteImages.departure,
];

export const heroVideoSrc = null as "/video/hero.mp4" | null;
