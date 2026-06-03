import { cn } from "@/lib/cn";
import type { SiteImageDefinition } from "@/lib/images";
import { imageSizes } from "@/lib/images";
import { ImageOverlay } from "./ImageOverlay";
import { ResponsiveImage } from "./ResponsiveImage";

type BeforeAfterProps = {
  /** Suggested composite: public/images/detailing-before-after.jpg */
  image: SiteImageDefinition;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
};

export function BeforeAfter({
  image,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: BeforeAfterProps) {
  const useSplitPlaceholder = image.usePlaceholder;

  if (!useSplitPlaceholder) {
    return (
      <figure
        className={cn(
          "image-frame-luxury relative aspect-[2/1] w-full overflow-hidden",
          className,
        )}
      >
        <div className="image-frame-luxury__inner">
          <ResponsiveImage
            definition={image}
            sizes={imageSizes.beforeAfter}
            showPlaceholderCaption={false}
          />
        </div>
        <ImageOverlay variant="subtle" />
        <figcaption className="sr-only">{image.alt}</figcaption>
      </figure>
    );
  }

  return (
    <figure
      className={cn(
        "image-frame-luxury relative grid w-full overflow-hidden sm:grid-cols-2",
        className,
      )}
    >
      {/* Split placeholders until detailing-before-after.jpg is added */}
      <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[18rem] lg:min-h-[22rem]">
        <div className="image-frame-luxury__inner">
          <ResponsiveImage
            definition={image}
            sizes={imageSizes.half}
            placeholderTone="before"
            showPlaceholderCaption={false}
          />
        </div>
        <ImageOverlay variant="medium" />
        <span className="absolute bottom-4 left-4 z-20 type-label-light">
          {beforeLabel}
        </span>
      </div>

      <div className="relative aspect-[4/3] border-t border-gold/20 sm:aspect-auto sm:min-h-[18rem] sm:border-t-0 sm:border-l lg:min-h-[22rem]">
        <div className="image-frame-luxury__inner">
          <ResponsiveImage
            definition={image}
            sizes={imageSizes.half}
            placeholderTone="after"
            showPlaceholderCaption={false}
          />
        </div>
        <ImageOverlay variant="medium" />
        <span className="absolute bottom-4 left-4 z-20 type-label-light">
          {afterLabel}
        </span>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-30 hidden w-px -translate-x-1/2 bg-gold/40 sm:block"
        aria-hidden
      />
      <figcaption className="sr-only">{image.alt}</figcaption>
    </figure>
  );
}
