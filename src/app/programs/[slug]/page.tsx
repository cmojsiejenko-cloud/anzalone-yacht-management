import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClosingInquiry } from "@/components/layout/ClosingInquiry";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ResponsiveImage } from "@/components/ui/images/ResponsiveImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactHrefForProgram } from "@/lib/contact-links";
import { imageSizes, siteImages } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo";
import {
  getProgram,
  programDisclaimer,
  programs,
} from "@/lib/programs";
import { siteRoutes } from "@/lib/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return {};
  return buildPageMetadata({
    title: program.metaTitle,
    description: program.metaDescription,
    path: `${siteRoutes.programs}/${program.slug}`,
    keywords: ["yacht management programs", program.title.toLowerCase()],
  });
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const image = siteImages[program.image];
  const inquiryHref = contactHrefForProgram(program.slug);
  const otherPrograms = programs.filter((item) => item.slug !== program.slug);

  return (
    <>
      <PageHero
        eyebrow="Programs"
        title={program.title}
        description={program.summary}
        minHeight="tall"
        backgroundImage={image}
        backgroundOverlay="hero"
      >
        <Button href={inquiryHref} variant="gold" size="lg">
          Request Program Consultation
        </Button>
        <Button href={siteRoutes.programs} variant="ghost" size="lg">
          All programs
        </Button>
      </PageHero>

      <div className="border-b border-ivory-muted bg-ivory">
        <Container className="py-3">
          <Breadcrumbs
            items={[
              { name: "Programs", path: siteRoutes.programs },
              {
                name: program.title,
                path: `${siteRoutes.programs}/${program.slug}`,
              },
            ]}
          />
        </Container>
      </div>

      <section className="section-padding bg-ivory">
        <Container size="narrow">
          <p className="type-label">Illustrative example</p>
          <p className="mt-4 type-body text-charcoal-soft">{programDisclaimer}</p>
        </Container>
      </section>

      <section className="section-padding bg-surface">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="max-w-xl space-y-5 lg:col-span-7">
              <SectionHeading
                eyebrow="Overview"
                title="What this arrangement is for"
              />
              <p className="type-body-lg text-charcoal">
                <span className="text-navy-900">Best for: </span>
                {program.bestFor}
              </p>
              {program.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="type-body-lg text-charcoal"
                >
                  {paragraph}
                </p>
              ))}
              <p className="type-body text-charcoal-soft">
                {program.differentiator}
              </p>
            </div>
            <div className="lg:col-span-5">
              <p className="type-label">Typical inclusions</p>
              <ul className="mt-6 space-y-4 border-t border-ivory-dark/70 pt-6">
                {program.includes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base leading-relaxed text-navy-900"
                  >
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-gold"
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

      <section className="bg-navy-900">
        <figure className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[21/9]">
          <ResponsiveImage
            definition={image}
            sizes={imageSizes.full}
            className="object-cover"
            showPlaceholderCaption={false}
          />
          <figcaption className="sr-only">
            Supporting imagery for {program.title}. Concept still only.
          </figcaption>
        </figure>
      </section>

      <section className="section-padding bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Detail"
            title="Expandable scope notes"
            description="Open only what you need. These notes restate approved service work — they are not a contractual schedule."
          />
          <div className="mt-12 max-w-3xl space-y-4">
            {program.inclusionGroups.map((group) => (
              <details
                key={group.title}
                className="group border border-ivory-dark/70 bg-surface px-6 py-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-2xl text-navy-900 [&::-webkit-details-marker]:hidden">
                  {group.title}
                  <span
                    aria-hidden
                    className="type-label text-gold-muted transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <ul className="mt-5 space-y-3 border-t border-ivory-dark/70 pt-5">
                  {group.items.map((item) => (
                    <li key={item} className="type-body text-charcoal">
                      {item}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Related services"
                title="Work this program often draws on"
              />
              <ul className="mt-8 space-y-3">
                {program.related.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center font-display text-2xl text-navy-900 transition-luxury hover:text-yacht-800"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Add-ons"
                title="Other services you may combine"
              />
              <ul className="mt-8 space-y-3">
                {program.addOns.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center font-display text-2xl text-navy-900 transition-luxury hover:text-yacht-800"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Other examples"
            title="Compare the remaining programs"
          />
          <ul className="mt-10 border-t border-ivory-dark/70">
            {otherPrograms.map((item) => (
              <li key={item.slug} className="border-b border-ivory-dark/70">
                <Link
                  href={`${siteRoutes.programs}/${item.slug}`}
                  className="group grid gap-2 py-8 sm:grid-cols-12 sm:items-baseline"
                >
                  <span className="font-display text-3xl text-navy-900 transition-luxury group-hover:text-yacht-800 sm:col-span-4">
                    {item.title}
                  </span>
                  <span className="type-body text-charcoal-soft sm:col-span-7">
                    {item.summary}
                  </span>
                  <span className="type-label sm:col-span-1 sm:text-right">
                    View
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ClosingInquiry
        title={program.cta.title}
        description={program.cta.description}
        href={inquiryHref}
        buttonLabel="Request Program Consultation"
      />
    </>
  );
}
