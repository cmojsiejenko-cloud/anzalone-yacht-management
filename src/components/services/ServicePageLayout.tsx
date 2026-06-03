import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceHeroImages } from "@/lib/images";
import { siteRoutes } from "@/lib/navigation";
import type { ServicePageContent } from "@/lib/services";

type ServicePageLayoutProps = {
  content: ServicePageContent;
};

export function ServicePageLayout({ content }: ServicePageLayoutProps) {
  const { slug, hero, explanation, bullets, whyItMatters, process, cta } = content;
  const heroImage = serviceHeroImages[slug];

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        minHeight="tall"
        backgroundImage={heroImage}
        backgroundOverlay="hero"
      >
        <Button href={siteRoutes.contact} variant="gold" size="lg">
          Request a Consultation
        </Button>
        <Button href={`${siteRoutes.home}#services`} variant="ghost" size="lg">
          View All Services
        </Button>
      </PageHero>

      <section className="section-padding bg-ivory">
        <Container>
          <SectionHeading title={explanation.title} showDivider />
          <div className="mt-10 max-w-3xl space-y-6">
            {explanation.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="type-body-lg text-pretty text-navy-700/90"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-surface-muted">
        <Container>
          <SectionHeading
            eyebrow="Scope"
            title={bullets.title}
            description="Documented standards, supervised execution, and reporting you can act on."
          />
          <LuxuryDivider variant="full" className="mt-12 lg:mt-16" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
            {bullets.items.map((item) => (
              <li
                key={item}
                className="card-luxury flex items-start gap-4 p-6 lg:p-8"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold"
                  aria-hidden
                />
                <span className="type-body text-navy-800">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-padding bg-navy-900">
        <Container>
          <SectionHeading
            eyebrow="Perspective"
            title={whyItMatters.title}
            theme="dark"
          />
          <div className="mt-10 max-w-3xl space-y-6">
            {whyItMatters.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="type-body-lg text-pretty text-ivory-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Method"
            title={process.title}
            description="A deliberate sequence so engagement begins with clarity, not confusion."
          />
          <ol
            className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10"
            aria-label={`${process.title} steps`}
          >
            {process.steps.map((step, index) => (
              <li
                key={step.title}
                className="relative border border-ivory-muted bg-surface p-8 lg:p-10"
              >
                <span className="font-display text-4xl text-gold/40 lg:text-5xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 type-display-sm text-navy-900">
                  {step.title}
                </h3>
                <p className="mt-4 type-body text-navy-700/85">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-padding-lg bg-navy-950">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Next Step"
            title={cta.title}
            description={cta.description}
            align="center"
            theme="dark"
          />
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={siteRoutes.contact} variant="gold" size="lg">
              Contact the Operator
            </Button>
            <Button href={siteRoutes.about} variant="ghost" size="lg">
              About Anzalone
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
