import Link from "next/link";

export type IndexListItem = {
  href: string;
  title: string;
  description: string;
};

export function IndexList({ items }: { items: IndexListItem[] }) {
  return (
    <ol className="border-t border-ivory-dark/70">
      {items.map((item, index) => (
        <li key={item.href} className="border-b border-ivory-dark/70">
          <Link
            href={item.href}
            className="group grid gap-3 py-8 transition-luxury sm:grid-cols-12 sm:items-baseline sm:gap-8 sm:py-10"
          >
            <span className="type-label sm:col-span-2">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-3xl leading-tight text-navy-900 transition-luxury group-hover:text-yacht-800 sm:col-span-4 sm:text-4xl">
              {item.title}
            </span>
            <span className="type-body text-charcoal-soft sm:col-span-5">
              {item.description}
            </span>
            <span className="type-label sm:col-span-1 sm:text-right">
              View
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
