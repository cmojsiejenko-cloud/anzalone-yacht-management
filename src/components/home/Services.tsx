import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { IndexList } from "@/components/ui/IndexList";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { ResponsiveImage } from "@/components/ui/images/ResponsiveImage";
import { siteImages, imageSizes } from "@/lib/images";
import { serviceNavLinks, siteRoutes } from "@/lib/navigation";

const otherServices = serviceNavLinks.slice(1);

export function Services() {
  return (
    <section
      id="services"
      className="home-section home-section--surface section-padding"
    >
      <Container>
        <header className="reveal max-w-2xl">
          <LuxuryDivider variant="rule" className="mb-6" />
          <p className="type-label">Services</p>
          <h2 className="mt-5 type-display-lg text-balance text-navy-900">
            Care that happens beside the yacht.
          </h2>
        </header>

        <div className="mt-12 grid items-center gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-14">
          <figure className="editorial-frame relative aspect-[4/5] sm:aspect-[16/10] lg:col-span-7">
            <ResponsiveImage
              definition={siteImages.preparation}
              sizes={imageSizes.half}
            />
          </figure>
          <div className="lg:col-span-5">
            <p className="type-label">Field services</p>
            <h3 className="mt-4 type-display-md text-balance text-navy-900">
              Hands on the vessel, before you fly in.
            </h3>
            <p className="mt-5 type-body text-charcoal-soft">
              Washdowns, checks, and time on the dock. The practice starts here: decks, systems, and the short list that should be finished before a visit.
            </p>
            <Link
              href={siteRoutes.fieldServices}
              className="mt-7 inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.2em] text-navy-900 underline-offset-4 transition-luxury hover:text-gold-muted hover:underline"
            >
              View field services
            </Link>
          </div>
        </div>

        <div className="mt-16 lg:mt-20">
          <p className="max-w-xl type-body-sm text-charcoal-soft">
            The same standard covers management, maintenance, crew, refit, and the work that comes before a sale. Each one is a defined service. A program, below, is how they are held together.
          </p>
          <div className="mt-7">
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
            className="mt-7 inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.2em] text-navy-900 underline-offset-4 transition-luxury hover:text-gold-muted hover:underline"
          >
            Explore all services
          </Link>
        </div>
      </Container>
    </section>
  );
}
