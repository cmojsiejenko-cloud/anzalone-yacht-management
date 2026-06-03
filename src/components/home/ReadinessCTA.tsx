import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteRoutes } from "@/lib/navigation";

export function ReadinessCTA() {
  return (
    <section
      id="readiness"
      className="section-edge-dark relative overflow-hidden bg-navy-950 text-ivory"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 80% at 20% 50%, rgba(201, 169, 98, 0.12), transparent),
            radial-gradient(ellipse 50% 60% at 80% 30%, rgba(27, 53, 84, 0.6), transparent)
          `,
        }}
        aria-hidden
      />
      <Container className="relative section-padding-lg">
        <ScrollReveal>
          <LuxuryDivider variant="rule" />
          <p className="mt-8 type-label-light">Vessel Readiness</p>
          <h2 className="mt-6 max-w-3xl type-display-lg text-balance text-ivory">
            Will your yacht be ready for your next arrival?
          </h2>
          <p className="mt-6 max-w-xl type-body-lg text-ivory-muted">
            Share your vessel, home port, and how you use the boat. We will outline
            what readiness looks like for your program — and whether we are the right
            fit to deliver it.
          </p>
        </ScrollReveal>
        <ScrollReveal
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          delay={150}
        >
          <Button href={siteRoutes.contact} variant="gold">
            Request a Readiness Review
          </Button>
          <Button
            href="#services"
            variant="secondary"
            className="border-ivory/30 text-ivory hover:bg-ivory hover:text-navy-900"
          >
            View Core Services
          </Button>
        </ScrollReveal>
      </Container>
    </section>
  );
}
