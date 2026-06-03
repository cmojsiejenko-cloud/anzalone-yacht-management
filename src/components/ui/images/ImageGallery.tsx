import { cn } from "@/lib/cn";
import type { SiteImageDefinition } from "@/lib/images";
import { imageSizes } from "@/lib/images";
import { LuxuryImage } from "./LuxuryImage";

type ImageGalleryProps = {
  images: SiteImageDefinition[];
  className?: string;
  /** First image spans two columns on large screens */
  featured?: boolean;
};

export function ImageGallery({
  images,
  className,
  featured = true,
}: ImageGalleryProps) {
  return (
    <div
      className={cn(
        "grid gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-6",
        className,
      )}
    >
      {images.map((image, index) => {
        const isFeatured = featured && index === 0;

        return (
          <div
            key={image.src}
            className={cn(
              isFeatured
                ? "lg:col-span-7 lg:row-span-2"
                : "lg:col-span-5",
            )}
          >
            {/* Final photos: public/images/[filename from image.src] */}
            <LuxuryImage
              definition={image}
              sizes={imageSizes.gallery}
              aspectRatio={
                isFeatured
                  ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[28rem]"
                  : "aspect-[4/3]"
              }
              overlay={isFeatured ? "bottom" : "medium"}
              showPlaceholderCaption={isFeatured}
            />
          </div>
        );
      })}
    </div>
  );
}
