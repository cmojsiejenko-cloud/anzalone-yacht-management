/**
 * Anzalone Image System
 * ─────────────────────
 * Drop final photography into `public/images/` using the filenames below.
 * Set `usePlaceholder: false` on each entry once the real file is in place.
 *
 * Suggested folder layout:
 *   public/images/
 *     yacht-management-hero.jpg      ← Homepage & yacht management hero
 *     anzalone-founder.jpg           ← Founder story & about page portrait
 *     marina-vessel-check.jpg        ← Gallery, vessel readiness
 *     captain-services.jpg           ← Gallery, captain & crew page
 *     refit-custom-work.jpg          ← Gallery, refit page
 *     brokerage-prep.jpg             ← Gallery, brokerage page
 *     detailing-before-after.jpg     ← Before/after showcase (composite or wide crop)
 */

export type ImageOverlayVariant =
  | "none"
  | "subtle"
  | "medium"
  | "heavy"
  | "bottom"
  | "hero";

export type SiteImageDefinition = {
  /** Path relative to `public/` — final JPG/WEBP lives here */
  src: `/images/${string}`;
  alt: string;
  width: number;
  height: number;
  /**
   * When true, renders a premium CSS placeholder instead of next/image.
   * Flip to false after adding the file to public/images/.
   */
  usePlaceholder: boolean;
  /** Brief for whoever shoots or selects final photography */
  subject: string;
  /** Optional label shown on placeholder frames (omit for production polish) */
  placeholderLabel?: string;
};

export const siteImages = {
  yachtManagementHero: {
    src: "/images/yacht-management-hero.jpg",
    alt: "South Florida yacht management — motor yacht at marina golden hour, ready for owner arrival",
    width: 1920,
    height: 1080,
    usePlaceholder: false,
    subject:
      "Wide hero — yacht on the dock or underway, calm water, premium feel, space for headline overlay",
    placeholderLabel: "Yacht Management Hero",
  },
  anzaloneFounder: {
    src: "/images/anzalone-founder.jpg",
    alt: "Founder and operator of Anzalone Yacht Management aboard a managed vessel",
    width: 1200,
    height: 1500,
    usePlaceholder: false,
    subject:
      "Portrait — founder on deck or at the helm, professional but approachable, vertical crop",
    placeholderLabel: "Founder & Operator",
  },
  marinaVesselCheck: {
    src: "/images/marina-vessel-check.jpg",
    alt: "Yacht maintenance inspection — operator conducting documented vessel readiness check at the dock",
    width: 1600,
    height: 1200,
    usePlaceholder: false,
    subject: "Dockside walk-through — checklist, lines, spotless decks, morning light",
    placeholderLabel: "Vessel Readiness",
  },
  captainServices: {
    src: "/images/captain-services.jpg",
    alt: "Captain coordinating crew and departure preparations on the bridge",
    width: 1600,
    height: 1200,
    usePlaceholder: false,
    subject: "Bridge or deck — crew briefing, professional uniforms, command presence",
    placeholderLabel: "Captain & Crew",
  },
  refitCustomWork: {
    src: "/images/refit-custom-work.jpg",
    alt: "Yacht refit project under supervised yard oversight with quality finishes visible",
    width: 1600,
    height: 1200,
    usePlaceholder: false,
    subject: "Yard or interior — joinery, systems, or paint with craftsmanship detail",
    placeholderLabel: "Refit & Custom Work",
  },
  brokeragePrep: {
    src: "/images/brokerage-prep.jpg",
    alt: "Brokerage yacht preparation — yacht staged photo-ready for listing with immaculate presentation",
    width: 1600,
    height: 1200,
    usePlaceholder: false,
    subject: "Show-ready exterior — gleaming hull, styled deck, listing-quality light",
    placeholderLabel: "Brokerage Prep",
  },
  detailingBeforeAfter: {
    src: "/images/detailing-before-after.jpg",
    alt: "Yacht detailing before and after — side-by-side exterior comparison after professional service",
    width: 1920,
    height: 960,
    usePlaceholder: false,
    subject:
      "Composite or wide crop — same angle, dull vs. restored gelcoat/teak, clear transformation",
    placeholderLabel: "Detailing — Before & After",
  },
} as const satisfies Record<string, SiteImageDefinition>;

export type SiteImageKey = keyof typeof siteImages;

/** Gallery grid on the homepage */
export const galleryImages: SiteImageDefinition[] = [
  siteImages.marinaVesselCheck,
  siteImages.captainServices,
  siteImages.refitCustomWork,
  siteImages.brokeragePrep,
];

/** Service page hero backgrounds keyed by route slug */
export const serviceHeroImages: Record<string, SiteImageDefinition> = {
  "yacht-management": siteImages.yachtManagementHero,
  "maintenance-detailing": siteImages.detailingBeforeAfter,
  "captain-crew-services": siteImages.captainServices,
  "refit-custom-work": siteImages.refitCustomWork,
  "brokerage-support": siteImages.brokeragePrep,
};

/** Responsive `sizes` hints for common layouts */
export const imageSizes = {
  hero: "100vw",
  full: "100vw",
  half: "(max-width: 768px) 100vw, 50vw",
  third: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  gallery: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  founder: "(max-width: 1024px) 100vw, 50vw",
  beforeAfter: "100vw",
} as const;
