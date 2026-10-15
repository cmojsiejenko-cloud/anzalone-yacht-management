import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IndexList } from "@/components/ui/IndexList";
import { PageHero } from "@/components/ui/PageHero";
import { ResponsiveImage } from "@/components/ui/images/ResponsiveImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactHrefForService } from "@/lib/contact-links";
import { imageSizes, siteImages } from "@/lib/images";
import { serviceNavLinks, siteRoutes } from "@/lib/navigation";
import { buildPageMetadata } from "@/lib/seo";
import {
  getServiceBySlug,
  primaryServiceSlugs,
} from "@/lib/services";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: "Services",
  description:
    "Field services and yacht care from Anzalone — management, maintenance and detailing, captain and crew alignment, refit oversight, and brokerage preparation.",
  path: siteRoutes.services,
  keywords: [
    "yacht services",
    "yacht field services",
    "yacht management",
    "yacht maintenance",
  ],
});

const fieldLink = serviceNavLinks[0];
const primaryServices = primaryServiceSlugs.map((slug) => {
  const content = getServiceBySlug(slug)!;
  const nav = serviceNavLinks.find((link) => link.href === content.path)!;
  return {
    href: content.path,
    title: nav.label,
    description:
      nav.description ?? content.hero.description.slice(0, 120),
  };
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Care that happens beside the yacht"
        description="Start with the work on the dock. Add management, crew, or a yard period only when that is the scope you need."
        minHeight="tall"
        backgroundImage={siteImages.cruise}
        backgroundOverlay="hero"
      >
        <Button
          href={contactHrefForService("field-services")}
          variant="gold"
          size="lg"
        >
          Discuss Your Yacht
        </Button>
        <Button href={siteRoutes.fieldServices} variant="ghost" size="lg">
          Field Services
        </Button>
      </PageHero>

      <section className="section-padding bg-surface">
        <Container>
          <div className="mb-14 max-w-2xl">
            <SectionHeading
              eyebrow="In plain language"
              title="Work defined by the vessel"
              description="Anzalone manages and cares for premium yachts. Maintenance, coordination, and preparation come off your list — so ownership stays about the time aboard."
              showDivider
            />
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <figure className="editorial-frame relative aspect-[4/5] lg:col-span-6 lg:aspect-[4/5]">
              <ResponsiveImage
                definition={siteImages.preparation}
                sizes={imageSizes.half}
                className="object-cover"
                showPlaceholderCaption={false}
              />
            </figure>
            <div className="lg:col-span-6">
              <p className="type-label">Field services</p>
              <h2 className="mt-4 type-display-lg text-balance text-navy-900">
                Hands on the vessel, before you fly in
              </h2>
              <p className="mt-6 type-body-lg text-charcoal-soft">
                Exterior washdowns and detailing. Interior presentation.
                Routine inspections. Maintenance coordination. Vessel
                readiness. Yard oversight. Operational support on the dock.
              </p>
              <p className="mt-4 type-body text-charcoal-soft">
                This is the practical core of the business. Management and
                programs sit on top of it. They do not replace it.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href={fieldLink.href} variant="primary">
                  View field services
                </Button>
                <Button
                  href={contactHrefForService("field-services")}
                  variant="secondary"
                >
                  Inquire about field work
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Service categories"
            title="Five clear distinctions"
            description="Each category is a defined scope of work. A program, on the programs page, is how ongoing care is held together as a rhythm."
          />
          <div className="mt-14">
            <IndexList items={primaryServices} />
          </div>
        </Container>
      </section>

      <section className="section-padding bg-navy-950">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Programs"
                title="A service is a task. A program is the rhythm."
                description="Engage one service when that is all you need. Choose a program when you want ongoing responsibility, reporting, and preparation held together."
                theme="dark"
              />
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <Button href={siteRoutes.programs} variant="ghost" size="lg">
                View programs
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding-lg bg-ivory">
        <Container size="narrow" className="text-center">
          <SectionHeading
            eyebrow="Next step"
            title="Tell us about the yacht"
            description="Share the vessel, location, and what ready means to you. The inquiry form can start with the service you already have in mind."
            align="center"
          />
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={siteRoutes.contact} variant="gold" size="lg">
              Discuss Your Yacht
            </Button>
            <Link
              href={siteRoutes.about}
              className="type-label text-navy-900 transition-luxury hover:text-yacht-800"
            >
              About Anzalone
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
