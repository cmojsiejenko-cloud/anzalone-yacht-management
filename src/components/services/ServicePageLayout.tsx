import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ResponsiveImage } from "@/components/ui/images/ResponsiveImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactHrefForService } from "@/lib/contact-links";
import { imageSizes, serviceHeroImages, siteImages } from "@/lib/images";
import { siteRoutes } from "@/lib/navigation";
import type { ServicePageContent } from "@/lib/services";
import Link from "next/link";

type ServicePageLayoutProps = {
  content: ServicePageContent;
};

export function ServicePageLayout({ content }: ServicePageLayoutProps) {
  const {
    slug,
    inquiryService,
    hero,
    problem,
    explanation,
    bullets,
    benefits,
    whyItMatters,
    process,
    programs,
    faqs,
    supportingImage,
    supportingCaption,
    cta,
    secondaryCta,
  } = content;
  const heroImage = serviceHeroImages[slug];
  const inquiryHref = contactHrefForService(inquiryService);
  const supportImage = supportingImage
    ? siteImages[supportingImage]
    : undefined;

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
        <Button href={inquiryHref} variant="gold" size="lg">
          Discuss This Service
        </Button>
        <Button href={siteRoutes.services} variant="ghost" size="lg">
          All Services
        </Button>
      </PageHero>

      <div className="border-b border-ivory-muted bg-ivory">
        <Container className="py-3">
          <Breadcrumbs
            items={[
              { name: "Services", path: siteRoutes.services },
              { name: hero.eyebrow, path: content.path },
            ]}
          />
        </Container>
      </div>

      <section className="section-padding bg-ivory">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="The need"
                title={problem.title}
                showDivider
              />
            </div>
            <div className="max-w-2xl space-y-6 lg:col-span-7">
              {problem.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="type-body-lg text-pretty text-charcoal"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-surface">
        <Container>
          <SectionHeading title={explanation.title} showDivider />
          <div className="mt-10 max-w-3xl space-y-6">
            {explanation.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="type-body-lg text-pretty text-charcoal"
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
            eyebrow="Scope"
            title={bullets.title}
            description="Clear work. Plain reporting. No invented extras."
          />
          <ul className="mt-12 border-t border-ivory-dark/70">
            {bullets.items.map((item) => (
              <li
                key={item}
                className="flex gap-4 border-b border-ivory-dark/70 py-5"
              >
                <span
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-gold"
                  aria-hidden
                />
                <span className="type-body text-navy-900">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-padding bg-navy-950">
        <Container>
          <SectionHeading
            eyebrow="For the owner"
            title={benefits.title}
            theme="dark"
          />
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {benefits.items.map((item) => (
              <li key={item} className="border-t border-ivory/15 pt-6">
                <p className="font-display text-2xl leading-snug text-ivory lg:text-3xl">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {supportImage ? (
        <section className="bg-navy-900">
          <figure className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[21/9]">
            <ResponsiveImage
              definition={supportImage}
              sizes={imageSizes.full}
              className="object-cover"
              showPlaceholderCaption={false}
            />
            {supportingCaption ? (
              <figcaption className="sr-only">{supportingCaption}</figcaption>
            ) : null}
          </figure>
        </section>
      ) : null}

      <section className="section-padding bg-surface">
        <Container>
          <SectionHeading
            eyebrow="Perspective"
            title={whyItMatters.title}
          />
          <div className="mt-10 max-w-3xl space-y-6">
            {whyItMatters.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="type-body-lg text-pretty text-charcoal"
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
            eyebrow="Coordination"
            title={process.title}
            description="A deliberate sequence so engagement begins with clarity."
          />
          <ol
            className="mt-14 grid gap-10 lg:grid-cols-2"
            aria-label={`${process.title} steps`}
          >
            {process.steps.map((step, index) => (
              <li key={step.title} className="border-t border-ivory-dark/70 pt-8">
                <span className="type-label text-gold-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 type-display-sm text-navy-900">
                  {step.title}
                </h3>
                <p className="mt-4 type-body text-charcoal-soft">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-padding bg-surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Programs"
                title={programs.title}
                description={programs.description}
              />
            </div>
            <ul className="space-y-4 lg:col-span-5">
              {programs.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-baseline justify-between gap-4 border-b border-ivory-dark/70 py-3 transition-luxury"
                  >
                    <span className="font-display text-2xl text-navy-900 group-hover:text-yacht-800">
                      {link.label}
                    </span>
                    <span className="type-label shrink-0">View</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {faqs && faqs.length > 0 ? (
        <section className="section-padding bg-ivory">
          <Container size="narrow">
            <SectionHeading
              eyebrow="Questions"
              title="Straight answers"
              description="Only the questions that usually clarify scope."
            />
            <dl className="mt-12 space-y-10">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-t border-ivory-dark/70 pt-8">
                  <dt className="font-display text-2xl text-navy-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-4 type-body text-charcoal-soft">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      ) : null}

      <section className="section-padding-lg bg-navy-950">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Next step"
            title={cta.title}
            description={cta.description}
            align="center"
            theme="dark"
          />
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={inquiryHref} variant="gold" size="lg">
              Discuss This Service
            </Button>
            {secondaryCta ? (
              <Button href={secondaryCta.href} variant="ghost" size="lg">
                {secondaryCta.label}
              </Button>
            ) : (
              <Button href={siteRoutes.programs} variant="ghost" size="lg">
                View Programs
              </Button>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
