import { getBreadcrumbSchema, type BreadcrumbItem } from "@/lib/schema";
import { siteRoutes } from "@/lib/navigation";
import Link from "next/link";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

/** Visual trail + matching BreadcrumbList JSON-LD. Home is prepended when missing. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const trail: BreadcrumbItem[] =
    items[0]?.path === siteRoutes.home
      ? items
      : [{ name: "Home", path: siteRoutes.home }, ...items];

  const schema = getBreadcrumbSchema(trail);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-[0.16em] text-navy-700/75">
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={`${item.path}-${item.name}`} className="flex items-center gap-2">
                {index > 0 ? (
                  <span aria-hidden className="text-gold-muted">
                    /
                  </span>
                ) : null}
                {isLast ? (
                  <span aria-current="page" className="text-navy-900">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="min-h-11 inline-flex items-center hover:text-navy-900"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
