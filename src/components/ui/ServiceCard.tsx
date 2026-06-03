import Link from "next/link";
import { cn } from "@/lib/cn";

type ServiceCardProps = {
  title: string;
  description: string;
  index?: string;
  href?: string;
  className?: string;
};

export function ServiceCard({
  title,
  description,
  index,
  href,
  className,
}: ServiceCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span className="service-block__rule" aria-hidden />
        {index && (
          <span className="font-display text-sm text-gray-400 transition-luxury group-hover:text-gold-muted">
            {index}
          </span>
        )}
      </div>
      <h3 className="type-display-sm text-navy-900">{title}</h3>
      <p className="mt-4 type-body-sm text-navy-700/85 sm:text-base">
        {description}
      </p>
      {href && (
        <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-widest text-gold-muted transition-luxury group-hover:text-gold group-hover:translate-x-0.5">
          Learn more
        </span>
      )}
    </>
  );

  const classes = cn("group service-block transition-luxury", className);

  if (href) {
    return (
      <Link
        href={href}
        className={cn(classes, "block no-underline")}
        aria-label={`Learn more about ${title}`}
      >
        {content}
      </Link>
    );
  }

  return <article className={classes}>{content}</article>;
}
