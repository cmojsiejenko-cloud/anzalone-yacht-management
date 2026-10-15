/**
 * Anzalone Image System
 * ─────────────────────
 * Drop final photography into `public/images/` using the filenames below.
 * Set `usePlaceholder: false` on each entry once the real file is in place.
 *
 * Homepage motion is the still sequence in `src/lib/media.ts`.
 * A real file at `public/video/hero.mp4` is optional and is not present.
 * Do not point `heroVideoSrc` at a file that is not in `public/video/`.
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
  /** Tighter crop for viewports below the `sm` breakpoint. */
  mobileSrc?: `/images/${string}`;
  mobileWidth?: number;
  mobileHeight?: number;
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
  cruise: {
    src: "/images/cinematic-01-cruise.jpg",
    mobileSrc: "/images/cinematic-01-cruise-mobile.jpg",
    alt: "Concept still of a white motor yacht underway on deep blue water",
    width: 1280,
    height: 720,
    mobileWidth: 576,
    mobileHeight: 720,
    usePlaceholder: false,
    subject: "Lifestyle still. Not a documented Anzalone vessel.",
  },
  aftDeck: {
    src: "/images/cinematic-02-aft-deck.jpg",
    mobileSrc: "/images/cinematic-02-aft-deck-mobile.jpg",
    alt: "Concept still of sunlight across an empty yacht aft deck and a distant coast",
    width: 1280,
    height: 720,
    mobileWidth: 576,
    mobileHeight: 720,
    usePlaceholder: false,
    subject: "Lifestyle still. Not a documented Anzalone vessel.",
  },
  preparation: {
    src: "/images/cinematic-03-preparation.jpg",
    mobileSrc: "/images/cinematic-03-preparation-mobile.jpg",
    alt: "Concept still of two people in plain light shirts and navy shorts preparing a yacht deck",
    width: 1280,
    height: 720,
    mobileWidth: 576,
    mobileHeight: 720,
    usePlaceholder: false,
    subject: "Concept crew only. Not Anzalone staff and not a company uniform.",
  },
  craft: {
    src: "/images/cinematic-05-craft.jpg",
    mobileSrc: "/images/cinematic-05-craft-mobile.jpg",
    alt: "Concept still of hands polishing a yacht hull beside a stainless cleat and teak deck",
    width: 1280,
    height: 720,
    mobileWidth: 576,
    mobileHeight: 720,
    usePlaceholder: false,
    subject: "Lifestyle detail. Not a documented Anzalone job.",
  },
  departure: {
    src: "/images/cinematic-06-departure.jpg",
    mobileSrc: "/images/cinematic-06-departure-mobile.jpg",
    alt: "Concept still of a white motor yacht leaving a marina for open water",
    width: 1280,
    height: 720,
    mobileWidth: 576,
    mobileHeight: 720,
    usePlaceholder: false,
    subject: "Lifestyle still. Not a documented Anzalone vessel.",
  },
  flybridge: {
    src: "/images/cinematic-flybridge.jpg",
    mobileSrc: "/images/cinematic-flybridge-mobile.jpg",
    alt: "Concept still of a person seen from behind at the flybridge helm of a motor yacht",
    width: 1280,
    height: 720,
    mobileWidth: 576,
    mobileHeight: 720,
    usePlaceholder: false,
    subject: "Concept figure only. Not an Anzalone captain or employee.",
  },
  refitJoinery: {
    src: "/images/cinematic-refit-joinery.jpg",
    mobileSrc: "/images/cinematic-refit-joinery-mobile.jpg",
    alt: "Concept still of hands fitting a hinge on finished yacht cabinetry",
    width: 1280,
    height: 720,
    mobileWidth: 576,
    mobileHeight: 720,
    usePlaceholder: false,
    subject: "Lifestyle craftsmanship. Not a documented Anzalone refit.",
  },
  yachtManagementHero: {
    src: "/images/yacht-management-hero.jpg",
    mobileSrc: "/images/yacht-management-hero-mobile.jpg",
    alt: "White motor yacht alongside a palm-lined dock at sunset",
    width: 1536,
    height: 1024,
    mobileWidth: 819,
    mobileHeight: 1024,
    usePlaceholder: false,
    subject:
      "Wide hero — yacht on the dock, calm water, premium feel, space for headline overlay. Not proof of a managed vessel.",
    placeholderLabel: "Yacht Management Hero",
  },
  anzaloneFounder: {
    src: "/images/anzalone-founder.jpg",
    alt: "Reserved portrait area for an owner-approved Anzalone photograph",
    width: 1536,
    height: 1024,
    // File exists but is unapproved synthetic imagery. Do not publish it as a real person.
    usePlaceholder: true,
    subject:
      "Owner-approved portrait only. Do not use a generated stand-in for a named or implied founder.",
    placeholderLabel: "Operator",
  },
  /**
   * Company pickup. No authentic file in the repo.
   * Add public/images/anzalone-truck.jpg, then set usePlaceholder to false
   * only after the owner accepts the real photograph with real door lettering.
   */
  anzaloneTruck: {
    src: "/images/anzalone-truck.jpg",
    alt: "Reserved frame for an owner-approved photograph of the Anzalone company vehicle",
    width: 1536,
    height: 1024,
    usePlaceholder: true,
    subject:
      "Authentic branded truck only. Do not generate door lettering or invent a vehicle.",
    placeholderLabel: "Company vehicle",
  },
  brokeragePrep: {
    src: "/images/brokerage-prep.jpg",
    mobileSrc: "/images/brokerage-prep-mobile.jpg",
    alt: "White motor yacht moored in a marina under a clear sky",
    width: 1536,
    height: 1024,
    mobileWidth: 819,
    mobileHeight: 1024,
    usePlaceholder: false,
    subject: "Show-ready exterior. Not a listing Anzalone prepared.",
    placeholderLabel: "Brokerage Prep",
  },
} as const satisfies Record<string, SiteImageDefinition>;

export type SiteImageKey = keyof typeof siteImages;

/** Service page hero backgrounds keyed by route slug */
export const serviceHeroImages: Record<string, SiteImageDefinition> = {
  "field-services": siteImages.preparation,
  "yacht-management": siteImages.yachtManagementHero,
  "maintenance-detailing": siteImages.craft,
  "captain-crew-services": siteImages.flybridge,
  "refit-custom-work": siteImages.refitJoinery,
  "brokerage-support": siteImages.brokeragePrep,
};

/** Responsive `sizes` hints for common layouts */
export const imageSizes = {
  /** Cap desktop request near source max (1280) — do not ask for 1920 from a 1280 master. */
  hero: "(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px",
  full: "100vw",
  half: "(max-width: 768px) 100vw, 50vw",
  third: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  founder: "(max-width: 1024px) 100vw, 50vw",
  beforeAfter: "100vw",
} as const;
