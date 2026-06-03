import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const pillars = [
  {
    stat: "Ready",
    label: "Before you arrive",
    detail:
      "Systems checked, surfaces prepared, and the vessel set to your schedule — not ours.",
  },
  {
    stat: "Direct",
    label: "Owner access",
    detail:
      "You work with the operator. Decisions are made quickly, clearly, and to your standard.",
  },
  {
    stat: "Full",
    label: "One program",
    detail:
      "Readiness, maintenance, detailing, crew, and yard work under one accountable hand.",
  },
];

export function Trust() {
  return (
    <section
      aria-label="Trust indicators"
      className="section-edge-light border-b border-ivory-muted bg-surface-muted"
    >
      <Container className="section-padding-sm">
        <ScrollReveal className="reveal-fade">
          <LuxuryDivider variant="ornate" className="mx-auto mb-12 max-w-sm" />
        </ScrollReveal>
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-16">
          {pillars.map((pillar, index) => (
            <ScrollReveal key={pillar.label} delay={index * 100}>
              <FeatureCard
                stat={pillar.stat}
                label={pillar.label}
                detail={pillar.detail}
              />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
