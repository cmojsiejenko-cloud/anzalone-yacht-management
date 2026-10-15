import { siteImages, type SiteImageDefinition } from "@/lib/images";

/**
 * Homepage still sequence. There is no approved motion footage in this repo.
 * `CinematicBackground` dissolves these plates when `heroVideoSrc` is null.
 * A real file at `public/video/hero.mp4` replaces that dissolve.
 * Leave `heroVideoSrc` null until that file is in the repository.
 * Do not point it at a slideshow exported from these stills.
 */
export const heroSequence: readonly SiteImageDefinition[] = [
  siteImages.cruise,
  siteImages.aftDeck,
  siteImages.preparation,
  siteImages.craft,
  siteImages.departure,
];

export const heroVideoSrc = null as "/video/hero.mp4" | null;
