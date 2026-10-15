import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { IndexList } from "@/components/ui/IndexList";
import { ResponsiveImage } from "@/components/ui/images/ResponsiveImage";
import { siteImages, imageSizes } from "@/lib/images";
import { serviceNavLinks, siteRoutes } from "@/lib/navigation";

const otherServices = serviceNavLinks.slice(1);

export function Services() {
  return (
    <section id="services" className="section-padding bg-surface">
      <Container>
        <p className="type-label">Services</p>
        <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight text-navy-900 sm:text-5xl">
          Care that happens beside the yacht.
        </h2>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <figure className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:col-span-7">
            <ResponsiveImage
              definition={siteImages.preparation}
              sizes={imageSizes.half}
            />
          </figure>
          <div className="lg:col-span-5">
            <p className="type-label">Field services</p>
            <h3 className="mt-4 font-display text-3xl text-navy-900 sm:text-4xl">
              Hands on the vessel, before you fly in.
            </h3>
            <p className="mt-5 type-body text-charcoal-soft">
              Washdowns, checks, and time on the dock. The practice starts here: decks, systems, and the short list that should be finished before a visit.
            </p>
            <Link
              href={siteRoutes.fieldServices}
              className="mt-8 inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.2em] text-navy-900 underline-offset-4 transition-luxury hover:text-gold-muted hover:underline"
            >
              View field services
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <p className="max-w-xl type-body-sm text-charcoal-soft">
            The same standard covers management, maintenance, crew, refit, and the work that comes before a sale. Each one is a defined service. A program, below, is how they are held together.
          </p>
          <div className="mt-8">
            <IndexList
              items={otherServices.map((service) => ({
                href: service.href,
                title: service.label,
                description: service.description ?? "",
              }))}
            />
          </div>
          <Link
            href={siteRoutes.services}
            className="mt-8 inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.2em] text-navy-900 underline-offset-4 hover:text-gold-muted hover:underline"
          >
            Explore all services
          </Link>
        </div>
      </Container>
    </section>
  );
}
