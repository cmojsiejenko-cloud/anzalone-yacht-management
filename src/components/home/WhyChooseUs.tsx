import { Container } from "@/components/ui/Container";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    title: "Owner-operated, not delegated away",
    description:
      "Your program is led by the operator who carries accountability — not passed through coordinators who have never walked your deck.",
  },
  {
    title: "Readiness over volume",
    description:
      "We keep a selective roster so each vessel receives attention proportionate to its complexity. Your yacht is a priority, not a line item.",
  },
  {
    title: "Hands-on oversight",
    description:
      "We are on the dock, in the yard, and aboard when it matters. Management is verified in the field — not managed from a desk.",
  },
  {
    title: "Built around how you use the boat",
    description:
      "Seasonal owner, charter program, or sale — the operating plan follows your calendar, your standards, and how much you want to be involved.",
  },
  {
    title: "Vendor relationships earned, not outsourced",
    description:
      "Trusted yards, trades, and specialists are engaged with clear scope and supervision. You benefit from relationships we have tested — without markup games.",
  },
  {
    title: "Discretion as default",
    description:
      "Your vessel, crew, and financial detail are handled with the confidentiality serious ownership requires.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="section-padding bg-ivory">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Why Owners Choose Us"
              title="For owners who expect more than maintenance tickets"
              description="Yacht ownership at this level demands operational discipline — the kind that protects your time, your asset, and every arrival."
              showDivider
            />
          </ScrollReveal>

          <div className="lg:col-span-7">
            <ScrollReveal className="reveal-fade mb-10 lg:hidden" delay={100}>
              <LuxuryDivider variant="subtle" />
            </ScrollReveal>
            <ul className="divide-y divide-ivory-muted">
              {reasons.map((reason, index) => (
                <ScrollReveal
                  key={reason.title}
                  as="li"
                  className="py-8 first:pt-0 last:pb-0"
                  delay={index * 60}
                >
                  <h3 className="type-display-sm text-navy-900 transition-luxury">
                    {reason.title}
                  </h3>
                  <p className="mt-3 type-body-sm text-navy-700/85 sm:text-base">
                    {reason.description}
                  </p>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
