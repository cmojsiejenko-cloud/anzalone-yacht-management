import { cn } from "@/lib/cn";
import type { ImageOverlayVariant } from "@/lib/images";

type ImageOverlayProps = {
  variant?: ImageOverlayVariant;
  className?: string;
};

const overlayStyles: Record<Exclude<ImageOverlayVariant, "none">, string> = {
  subtle:
    "bg-gradient-to-b from-navy-950/20 via-transparent to-navy-950/30",
  medium:
    "bg-gradient-to-b from-navy-950/35 via-navy-950/10 to-navy-950/55",
  heavy:
    "bg-gradient-to-b from-navy-950/60 via-navy-950/35 to-navy-950/85",
  bottom:
    "bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent",
  hero: "bg-gradient-to-b from-navy-950/65 via-navy-950/35 to-navy-950/90",
};

export function ImageOverlay({
  variant = "medium",
  className,
}: ImageOverlayProps) {
  if (variant === "none") return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-10",
        overlayStyles[variant],
        className,
      )}
      aria-hidden
    />
  );
}
