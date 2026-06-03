import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { siteRoutes } from "@/lib/navigation";

const services = [
  {
    title: "Yacht Management",
    description:
      "Full-program oversight — scheduling, vendors, budgets, and the operational rhythm that keeps your vessel ready year-round.",
    href: siteRoutes.yachtManagement,
  },
  {
    title: "Maintenance & Detailing",
    description:
      "Planned and corrective work scoped, scheduled, and supervised — plus interior and exterior care held to presentation standards.",
    href: siteRoutes.maintenanceDetailing,
  },
  {
    title: "Captain & Crew Services",
    description:
      "Leadership, training, and day-to-day coordination so your crew operates to your expectations and documented standards.",
    href: siteRoutes.captainCrew,
  },
  {
    title: "Refit & Custom Work",
    description:
      "Yard selection, scope control, and quality oversight for structural, cosmetic, and systems upgrades — start to finish.",
    href: siteRoutes.refitCustom,
  },
  {
    title: "Brokerage Support",
    description:
      "Conditioning, documentation, and show-ready presentation so your vessel enters the market at its true value.",
    href: siteRoutes.brokerageSupport,
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="section-edge-light section-padding bg-surface-muted"
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Core Services"
            title="Everything your yacht needs to stay ready"
            description="Each service supports one outcome: vessel readiness, reliable maintenance, and peace of mind between visits. Engage the full program or the scope your operation requires."
          />
        </ScrollReveal>

        <ScrollReveal className="reveal-fade content-gap-sm" delay={120}>
          <LuxuryDivider variant="full" />
        </ScrollReveal>

        <div className="content-gap grid gap-6 sm:grid-cols-2 lg:gap-8">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 70}>
              <ServiceCard
                title={service.title}
                description={service.description}
                href={service.href}
                index={String(i + 1).padStart(2, "0")}
              />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="content-gap-sm flex justify-center" delay={200}>
          <Button href={siteRoutes.contact} variant="secondary">
            Discuss Your Vessel
          </Button>
        </ScrollReveal>
      </Container>
    </section>
  );
}
