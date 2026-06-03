import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteRoutes } from "@/lib/navigation";

export function ContactCTA() {
  return (
    <section
      id="contact"
      className="section-edge-light section-padding bg-surface-muted"
    >
      <Container size="narrow">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Contact"
            title="Begin with a direct conversation"
            description="Tell us about your vessel, how you use it, and what ready means to you. We respond personally — typically within one business day."
            align="center"
          />
        </ScrollReveal>
        <ScrollReveal
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          delay={120}
        >
          <Button href={siteRoutes.contact} variant="gold">
            Contact the Operator
          </Button>
          <Button href="mailto:info@anzaloneyacht.com" variant="secondary">
            Email Directly
          </Button>
        </ScrollReveal>
        <ScrollReveal className="reveal-fade" delay={200}>
          <LuxuryDivider variant="ornate" className="mx-auto mt-12 max-w-xs" />
          <p className="mt-8 text-center type-body-sm text-gray-500">
            <a
              href="mailto:info@anzaloneyacht.com"
              className="font-medium text-navy-900 transition-luxury hover:text-gold-muted"
            >
              info@anzaloneyacht.com
            </a>
          </p>
          <p className="mt-4 text-center type-body-sm text-gray-500">
            Confidential consultations by appointment.
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
