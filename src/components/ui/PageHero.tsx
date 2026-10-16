import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ImageOverlayVariant, SiteImageDefinition } from "@/lib/images";
import { imageSizes } from "@/lib/images";
import { CinematicBackground } from "@/components/media/CinematicBackground";
import { ResponsiveImage } from "./images/ResponsiveImage";
import { ImageOverlay } from "./images/ImageOverlay";
import { Container } from "./Container";
import { LuxuryDivider } from "./LuxuryDivider";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  align?: "left" | "center";
  minHeight?: "default" | "tall" | "compact";
  className?: string;
  contentClassName?: string;
  /** Optional full-bleed background — final file at public/images/[filename] */
  backgroundImage?: SiteImageDefinition;
  /** Still sequence, replaced by the assembled reel when playback is allowed. */
  film?: {
    frames: readonly SiteImageDefinition[];
    video?: {
      desktop: string;
      mobile: string;
      poster: string;
    } | null;
  };
  backgroundOverlay?: ImageOverlayVariant;
};

const minHeightClasses = {
  compact: "min-h-[60vh]",
  default: "min-h-[85vh]",
  tall: "min-h-[92vh]",
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  align = "left",
  minHeight = "default",
  className,
  contentClassName,
  backgroundImage,
  film,
  backgroundOverlay = "hero",
}: PageHeroProps) {
  const isCenter = align === "center";
  const hasFilm = Boolean(film && film.frames.length > 0);
  const hasPhoto = hasFilm || Boolean(backgroundImage);

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        hasFilm ? "hero-film bg-navy-950" : "bg-navy-900",
        minHeightClasses[minHeight],
        className,
      )}
    >
      {hasPhoto ? (
        <>
          {hasFilm && film ? (
            <CinematicBackground
              frames={film.frames}
              video={film.video}
              priority
            />
          ) : (
            <div className="absolute inset-0" aria-hidden>
              <ResponsiveImage
                definition={backgroundImage!}
                sizes={imageSizes.hero}
                priority
                showPlaceholderCaption={false}
                decorative
              />
            </div>
          )}
          {hasFilm ? (
            <div className="hero-film-scrim" aria-hidden />
          ) : (
            <>
              <ImageOverlay variant={backgroundOverlay} />
              <div className="hero-photo-scrim" aria-hidden />
            </>
          )}
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800"
            aria-hidden
          />
          <div
            className="absolute inset-0 opacity-35"
            style={{
              backgroundImage: `
            radial-gradient(ellipse 80% 50% at 70% 40%, rgba(201, 169, 98, 0.14), transparent),
            linear-gradient(180deg, transparent 55%, rgba(6, 13, 24, 0.92) 100%)
          `,
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(201, 169, 98, 0.5) 80px, rgba(201, 169, 98, 0.5) 81px)",
            }}
            aria-hidden
          />
        </>
      )}

      <Container
        className={cn(
          "relative z-20 flex flex-col justify-end section-padding pb-20 sm:pb-28",
          minHeightClasses[minHeight],
          isCenter && "items-center text-center",
          contentClassName,
        )}
      >
        <div
          className={cn(
            "hero-content-panel",
            isCenter && "mx-auto items-center text-center",
          )}
        >
          <LuxuryDivider
            variant="rule"
            className={cn(
              hasFilm ? "mb-6" : "mb-8",
              isCenter && "justify-center",
            )}
          />
          {eyebrow && (
            <p className="type-label-light hero-eyebrow">{eyebrow}</p>
          )}
          <h1
            className={cn(
              "hero-headline max-w-3xl type-display-xl text-ivory text-balance",
              hasFilm ? "mt-5" : "mt-6",
              isCenter && "mx-auto",
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "hero-description mt-5 max-w-xl type-body-lg leading-relaxed",
                !hasFilm && "text-ivory-muted",
                isCenter && "mx-auto",
              )}
            >
              {description}
            </p>
          )}
          {children && (
            <div
              className={cn(
                "hero-cta-row flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4",
                isCenter && "justify-center",
              )}
            >
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
