import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { company } from "@/lib/company";
import { siteRoutes } from "@/lib/navigation";

type BrandLogoProps = {
  /** Transparent header over photography */
  light?: boolean;
  /** Compact height for mobile header */
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
          "h-auto w-auto max-w-full object-contain object-left",
          compact ? "max-h-10 sm:max-h-12" : "max-h-12 sm:max-h-14 lg:max-h-16",
        )}
        sizes="(max-width: 640px) 160px, 220px"
      />
    </span>
  );

  if (!linked) return mark;

  return (
    <Link
      href={siteRoutes.home}
      className="group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      aria-label={`${company.shortName} — home`}
    >
      {mark}
    </Link>
  );
}
