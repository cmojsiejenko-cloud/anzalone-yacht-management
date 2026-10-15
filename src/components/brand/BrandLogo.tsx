import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { company } from "@/lib/company";
import { siteRoutes } from "@/lib/navigation";

type BrandLogoProps = {
  /** Transparent header over photography */
  light?: boolean;
  /**
   * Header bar treatment — slightly taller than the old compact mark so the
   * official lockup reads clearly without making the bar feel heavy.
   * Omit for footer and other roomy placements.
   */
  compact?: boolean;
  className?: string;
  /** When false, render mark without link (e.g. footer already linked) */
  linked?: boolean;
};

export function BrandLogo({
  light = false,
  compact = false,
  className,
  linked = true,
}: BrandLogoProps) {
  const mark = (
    <span
      className={cn(
        "brand-logo inline-flex items-center",
        compact && "brand-logo--header",
        light && "brand-logo--on-dark",
        className,
      )}
    >
      <Image
        src={company.brandMark.src}
        alt={company.brandMark.alt}
        width={company.brandMark.width}
        height={company.brandMark.height}
        priority
        className={cn(
          "w-auto max-w-[min(100%,11.5rem)] object-contain object-left sm:max-w-[min(100%,13.5rem)]",
          compact
            ? "h-11 sm:h-[3.25rem] lg:h-14 lg:max-w-[15rem]"
            : "h-12 sm:h-14 lg:h-16 lg:max-w-[16.5rem]",
        )}
        sizes={
          compact
            ? "(max-width: 640px) 176px, (max-width: 1024px) 208px, 240px"
            : "(max-width: 640px) 180px, 260px"
        }
      />
    </span>
  );

  if (!linked) return mark;

  return (
    <Link
      href={siteRoutes.home}
      className="group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      aria-label={`${company.shortName} — home`}
    >
      {mark}
    </Link>
  );
}
