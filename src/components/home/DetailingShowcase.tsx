import { Container } from "@/components/ui/Container";
import { BeforeAfter } from "@/components/ui/images";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteImages } from "@/lib/images";

export function DetailingShowcase() {
  return (
    <section className="section-padding bg-ivory">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Maintenance & Detailing"
            title="Presentation that reflects how you use the yacht"
            description="Exterior and interior care held to the same readiness standard as systems and operations — so every arrival feels intentional."
          />
        </ScrollReveal>

        <ScrollReveal className="reveal-fade content-gap-sm" delay={120}>
          <LuxuryDivider variant="full" />
        </ScrollReveal>

        {/*
          Final photo — add composite or wide crop to:
            public/images/detailing-before-after.jpg
          Set siteImages.detailingBeforeAfter.usePlaceholder to false in src/lib/images.ts
        */}
        <ScrollReveal className="content-gap" delay={160}>
          <BeforeAfter image={siteImages.detailingBeforeAfter} />
        </ScrollReveal>

        <ScrollReveal
          className="mt-8 max-w-2xl type-body-sm text-navy-700/80"
          delay={220}
        >
          <p>
            Surfaces, teak, and brightwork are maintained on a documented
            schedule — not addressed only when an owner is days out. The result
            is consistent presentation season after season.
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
