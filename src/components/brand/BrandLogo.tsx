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
        className={cn(
          "w-auto object-contain object-left",
          compact
            ? // Header: tall enough for a clear ANZALONE'S wordmark; capped so nav stays balanced
              "h-[3.15rem] max-w-[min(100%,10.75rem)] sm:h-[3.45rem] sm:max-w-[12.25rem] lg:h-14 lg:max-w-[13.5rem]"
            : // Footer / roomy: slightly larger, still the simplified lockup
              "h-[3.5rem] max-w-[min(100%,12rem)] sm:h-16 sm:max-w-[14rem] lg:h-[4.25rem] lg:max-w-[15.5rem]",
        )}
        sizes={
          compact
            ? "(max-width: 640px) 172px, (max-width: 1024px) 196px, 216px"
            : "(max-width: 640px) 192px, 248px"
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
