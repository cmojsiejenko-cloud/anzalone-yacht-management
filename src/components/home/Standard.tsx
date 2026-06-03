import { Container } from "@/components/ui/Container";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const principles = [
  {
    title: "Readiness is the baseline",
    description:
      "Your yacht is prepared to the condition you expect on arrival — not to minimum compliance. That standard governs every checklist, visit, and vendor instruction.",
  },
  {
    title: "Condition you can verify",
    description:
      "We document what was done, what was found, and what needs attention. Reporting is clear and factual — so you always know the state of your asset.",
  },
  {
    title: "Protection without neglect",
    description:
      "Systems run, surfaces are cared for, and the vessel is secured whether you are aboard for the season or away for months. Idle time is managed, not overlooked.",
  },
  {
    title: "Communication that respects your time",
    description:
      "Updates are concise, timely, and actionable. We escalate what matters and handle what does not — so your involvement stays at the level you choose.",
  },
];

export function Standard() {
  return (
    <section id="standard" className="section-padding bg-ivory">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="The Anzalone Standard"
            title="One standard for how your yacht is kept"
            description="We define readiness — clean, maintained, protected, and prepared — and hold every vendor, crew member, and process to it."
          />
        </ScrollReveal>

        <ScrollReveal className="reveal-fade content-gap-sm" delay={120}>
          <LuxuryDivider variant="full" />
        </ScrollReveal>

        <div className="content-gap grid gap-8 lg:grid-cols-2 lg:gap-10">
          {principles.map((principle, index) => (
            <ScrollReveal key={principle.title} delay={index * 80}>
              <article className="card-luxury h-full p-8 lg:p-10">
                <span
                  className="mb-5 block h-px w-10 bg-gold transition-luxury"
                  aria-hidden
                />
                <h3 className="type-display-sm text-navy-900">{principle.title}</h3>
                <p className="mt-4 type-body-sm text-navy-700/85 sm:text-base">
                  {principle.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
