import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { LuxuryImage } from "@/components/ui/images";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { imageSizes, siteImages } from "@/lib/images";
import { siteRoutes } from "@/lib/navigation";

const principles = [
  {
    stat: "01",
    label: "Accountability",
    detail: "One operator owns outcomes — not a handoff chain.",
  },
  {
    stat: "02",
    label: "Readiness",
    detail: "Your yacht prepared before you arrive, every time.",
  },
  {
    stat: "03",
    label: "Selectivity",
    detail: "A focused roster so attention stays on your vessel.",
  },
  {
    stat: "04",
    label: "Clarity",
    detail: "Reporting and communication without noise or delay.",
  },
];

const credentials = [
  "Owner-operated — no delegation to junior staff for owner decisions",
  "Hands-on yard, crew, and owner-side operational experience",
  "Documented standards across management, maintenance, and crew",
  "Direct communication — you speak with the person responsible",
];

export function AboutPageContent() {
  return (
    <>
      <PageHero
        eyebrow="About Anzalone"
        title="Owner-operated management for owners who expect more than updates"
        description="Founded on one commitment: vessel readiness, reliable maintenance, and peace of mind — with one accountable operator behind every decision."
        minHeight="default"
      >
        <Button href={siteRoutes.contact} variant="gold" size="lg">
          Schedule a Consultation
        </Button>
      </PageHero>

      <section className="section-padding bg-ivory">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/*
              Final portrait — public/images/anzalone-founder.jpg
              Set siteImages.anzaloneFounder.usePlaceholder to false in src/lib/images.ts
            */}
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

            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="Built by an operator who still answers the call"
              />
              <div className="mt-6 space-y-5 type-body text-navy-700/90">
                <p>
                  Anzalone was founded for owners who have managed a yacht before
                  — and understand the difference between a firm that processes
                  tasks and one that delivers readiness.
                </p>
                <p>
                  This is not a franchise scaled for investor returns. It is
                  owner-operated yacht management: clear accountability, a
                  standard that holds when schedules tighten, and communication
                  that respects your time.
                </p>
                <p>
                  We built the practice around what owners ask for and rarely get
                  — peace of mind that the yacht is ready before they land.
                  Systems exercised, cosmetics addressed, crew aligned, and vendors
                  supervised in advance — not explained away on arrival.
                </p>
              </div>
              <LuxuryDivider variant="rule" className="mt-8" />
              <ul className="mt-8 space-y-3">
                {credentials.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 type-body-sm text-navy-700/85"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-gold"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-surface-muted">
        <Container>
          <SectionHeading
            eyebrow="The Anzalone Standard"
            title="Principles that govern every engagement"
            description="Whether you engage full management or a focused service scope, these principles do not change."
            align="center"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {principles.map((item) => (
              <FeatureCard
                key={item.label}
                stat={item.stat}
                label={item.label}
                detail={item.detail}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding-lg bg-navy-950">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Engage"
            title="We accept a limited number of new programs each season"
            description="Tell us about your vessel and how you use it. If there is a fit, you will hear from us directly."
            align="center"
            theme="dark"
          />
          <div className="mt-10 flex justify-center">
            <Button href={siteRoutes.contact} variant="gold" size="lg">
              Contact the Operator
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
