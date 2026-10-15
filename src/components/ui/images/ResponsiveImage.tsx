import Image from "next/image";
import { cn } from "@/lib/cn";
import type { SiteImageDefinition } from "@/lib/images";
import { ImagePlaceholder } from "./ImagePlaceholder";

type ResponsiveImageProps = {
  definition: SiteImageDefinition;
  /** Responsive sizes attribute for next/image */
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  imgClassName?: string;
  /** Override registry placeholder flag */
  forcePlaceholder?: boolean;
  placeholderTone?: "default" | "before" | "after";
  showPlaceholderCaption?: boolean;
  /** Hero/background photos — alt conveyed in page h1; image marked decorative */
  decorative?: boolean;
  /** Breakpoint where the wide file replaces the mobile crop. */
  artDirection?: "sm" | "lg";
  /** Fires per crop so a hero can wait for the visible file before dissolving. */
  onVariantLoad?: (variant: "mobile" | "desktop") => void;
};

export function ResponsiveImage({
  definition,
  sizes,
  priority = false,
  fill = true,
  className,
  imgClassName,
  forcePlaceholder,
  placeholderTone = "default",
  showPlaceholderCaption = true,
  decorative = false,
  artDirection = "sm",
  onVariantLoad,
}: ResponsiveImageProps) {
  const usePlaceholder = forcePlaceholder ?? definition.usePlaceholder;
  const alt = decorative ? "" : definition.alt;

  if (usePlaceholder) {
    return (
      <ImagePlaceholder
        definition={definition}
        tone={placeholderTone}
        className={className}
        showCaption={showPlaceholderCaption && !decorative}
        ariaHidden={decorative}
      />
    );
  }

  const loading = priority ? ("eager" as const) : ("lazy" as const);
  const fetchPriority = priority ? ("high" as const) : ("auto" as const);
  const narrowClass = artDirection === "lg" ? "lg:hidden" : "sm:hidden";
  const wideClass = artDirection === "lg" ? "hidden lg:block" : "hidden sm:block";

  if (
    fill &&
    definition.mobileSrc &&
    definition.mobileWidth &&
    definition.mobileHeight
  ) {
    return (
      <>
        {/*
          Art-direction split. Only the mobile crop may be priority/eager so
          mobile LCP is not blocked by a hidden desktop master download.
          Desktop uses lazy — still usually in-viewport and discovers quickly.
        */}
        <Image
          src={definition.mobileSrc}
          alt={alt}
          aria-hidden={decorative ? true : undefined}
          fill
          sizes="100vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className={cn("object-cover", narrowClass, imgClassName, className)}
          onLoad={onVariantLoad ? () => onVariantLoad("mobile") : undefined}
        />
        <Image
          src={definition.src}
          alt={alt}
          aria-hidden={decorative ? true : undefined}
          fill
          sizes={sizes}
          priority={false}
          loading="lazy"
          fetchPriority="auto"
          decoding="async"
          className={cn("hidden object-cover", wideClass, imgClassName, className)}
          onLoad={onVariantLoad ? () => onVariantLoad("desktop") : undefined}
        />
      </>
    );
  }

  return (
    <Image
      src={definition.src}
      alt={alt}
      aria-hidden={decorative ? true : undefined}
      width={fill ? undefined : definition.width}
      height={fill ? undefined : definition.height}
      fill={fill}
      sizes={sizes}
      priority={priority}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      className={cn("object-cover", imgClassName, className)}
      onLoad={onVariantLoad ? () => onVariantLoad("desktop") : undefined}
    />
  );
}
