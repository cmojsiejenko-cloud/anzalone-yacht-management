import { Button } from "@/components/ui/Button";
import { ResponsiveImage } from "@/components/ui/images/ResponsiveImage";
import { contactHrefForProgram } from "@/lib/contact-links";
import { imageSizes, siteImages } from "@/lib/images";
import { siteRoutes } from "@/lib/navigation";
import type { ProgramRecord } from "@/lib/programs";
import Link from "next/link";

type ProgramCardProps = {
  program: ProgramRecord;
  index: number;
};

export function ProgramCard({ program, index }: ProgramCardProps) {
  const image = siteImages[program.image];

  return (
    <article className="grid gap-8 border-t border-ivory-dark/70 py-14 lg:grid-cols-12 lg:gap-12 lg:py-16">
      <div className="lg:col-span-5">
        <figure className="editorial-frame relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5]">
          <ResponsiveImage
            definition={image}
            sizes={imageSizes.half}
            className="object-cover"
            showPlaceholderCaption={false}
          />
        </figure>
      </div>
      <div className="lg:col-span-7">
        <p className="type-label">
          {String(index + 1).padStart(2, "0")} · Illustrative program
        </p>
        <h3 className="mt-4 type-display-lg text-balance text-navy-900">
          <Link
            href={`${siteRoutes.programs}/${program.slug}`}
            className="transition-luxury hover:text-yacht-800"
          >
            {program.title}
          </Link>
        </h3>
        <p className="mt-5 type-body-lg text-charcoal">{program.summary}</p>
        <p className="mt-4 type-body text-charcoal-soft">
          <span className="text-navy-900">Best for: </span>
          {program.bestFor}
        </p>
        <p className="mt-3 type-body text-charcoal-soft">
          {program.differentiator}
        </p>

        <details className="group mt-8 border-t border-ivory-dark/70 pt-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 type-label text-navy-900 transition-luxury hover:text-yacht-800 [&::-webkit-details-marker]:hidden">
            Typical inclusions
            <span
              aria-hidden
              className="text-gold-muted transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <ul className="mt-5 space-y-3">
            {program.includes.map((item) => (
              <li key={item} className="flex gap-3 type-body text-charcoal">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-gold" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </details>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button
            href={contactHrefForProgram(program.slug)}
            variant="primary"
          >
            Request consultation
          </Button>
          <Button
            href={`${siteRoutes.programs}/${program.slug}`}
            variant="secondary"
          >
            View program
          </Button>
        </div>
      </div>
    </article>
  );
}
