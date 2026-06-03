import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LuxuryImage } from "@/components/ui/images";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { imageSizes, siteImages } from "@/lib/images";
import { siteRoutes } from "@/lib/navigation";

const credentials = [
  "Owner-operated — no handoff to junior staff",
  "Yard, crew, and owner-side experience",
  "Selective roster by design",
  "Clear reporting and direct communication",
];

export function FounderStory() {
  return (
    <section className="section-padding bg-ivory">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal className="reveal-fade">
            <LuxuryImage
              definition={siteImages.anzaloneFounder}
              sizes={imageSizes.founder}
              aspectRatio="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]"
              overlay="bottom"
              showPlaceholderCaption={false}
            >
              <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-end p-8 pb-10 text-center">
                <p className="type-label-light">Founder & Operator</p>
                <p className="mt-3 font-display text-2xl text-ivory sm:text-3xl">
                  Anzalone Yacht Management
                </p>
              </div>
            </LuxuryImage>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <SectionHeading
                eyebrow="Founder & Operator"
                title="Built by an operator who still answers the call"
                description="Anzalone was founded for owners who have managed a yacht before — and know the difference between a firm that processes tasks and one that delivers readiness."
              />
            </ScrollReveal>
            <ScrollReveal className="mt-6 space-y-5 type-body text-navy-700/90" delay={100}>
              <p>
                This is owner-operated yacht management: one accountable operator,
                a standard that holds when schedules tighten, and communication that
                respects your time.
              </p>
              <p>
                We built the practice around what owners ask for and rarely get —
                peace of mind that the yacht is ready before they arrive.
              </p>
            </ScrollReveal>
            <ScrollReveal className="reveal-fade" delay={180}>
              <LuxuryDivider variant="rule" className="mt-8" />
            </ScrollReveal>
            <ScrollReveal as="ul" className="mt-8 space-y-3" delay={220}>
              {credentials.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 type-body-sm text-navy-700/85 transition-luxury hover:text-navy-900"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-gold transition-luxury"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ScrollReveal>
            <ScrollReveal className="mt-10" delay={260}>
              <Button href={siteRoutes.about} variant="secondary" size="md">
                About Anzalone
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
