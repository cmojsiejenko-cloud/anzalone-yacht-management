import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ImageOverlayVariant, SiteImageDefinition } from "@/lib/images";
import { ImageOverlay } from "./ImageOverlay";
import { ResponsiveImage } from "./ResponsiveImage";

type LuxuryImageProps = {
  definition: SiteImageDefinition;
  sizes: string;
  aspectRatio?: string;
  overlay?: ImageOverlayVariant;
  priority?: boolean;
  frame?: boolean;
  className?: string;
  children?: ReactNode;
  showPlaceholderCaption?: boolean;
  placeholderTone?: "default" | "before" | "after";
};

export function LuxuryImage({
  definition,
  sizes,
  aspectRatio = "aspect-[4/3]",
  overlay = "bottom",
  priority = false,
  frame = true,
  className,
  children,
  showPlaceholderCaption = true,
  placeholderTone = "default",
}: LuxuryImageProps) {
  return (
    <figure
      className={cn(
        frame && "image-frame-luxury",
        aspectRatio,
        "relative w-full overflow-hidden",
        className,
      )}
    >
      <div className="image-frame-luxury__inner">
        <ResponsiveImage
          definition={definition}
          sizes={sizes}
          priority={priority}
          placeholderTone={placeholderTone}
          showPlaceholderCaption={showPlaceholderCaption}
        />
      </div>
      <ImageOverlay variant={overlay} />
      {children}
      <figcaption className="sr-only">{definition.alt}</figcaption>
    </figure>
  );
}
