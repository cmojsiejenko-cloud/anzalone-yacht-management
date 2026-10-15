import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { company } from "@/lib/company";
import { siteRoutes } from "@/lib/navigation";

type BrandLogoProps = {
  /** Transparent header over photography */
  light?: boolean;
  /**
   * Header bar treatment — wordmark lockup sized for a premium nav bar
   * without crowding phone / Inquire controls.
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
        unoptimized
        className={cn(
          "w-auto object-contain object-left",
          compact
            ? // Header: gold lockup clear, but narrow enough to leave the nav and menu controls alone
              "h-[3.25rem] max-w-[min(100%,9.4rem)] sm:h-[3.5rem] sm:max-w-[10.5rem] lg:h-[3.65rem] lg:max-w-[11.25rem] xl:h-16 xl:max-w-[12.75rem]"
            : // Footer on navy: same transparent lockup, with a little more presence
              "h-[3.65rem] max-w-[min(100%,11rem)] sm:h-16 sm:max-w-[13rem] lg:h-[4.5rem] lg:max-w-[15rem]",
        )}
        sizes={
          compact
            ? "(max-width: 640px) 150px, (max-width: 1280px) 180px, 204px"
            : "(max-width: 640px) 176px, 240px"
        }
      />
    </span>
  );

  if (!linked) return mark;

  return (
    <Link
      href={siteRoutes.home}
      className="group inline-flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      aria-label={`${company.shortName} — home`}
    >
      {mark}
    </Link>
  );
}
