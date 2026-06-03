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
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={cn("object-cover", imgClassName)}
    />
  );
}
