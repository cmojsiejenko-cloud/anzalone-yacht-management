import { ProgramCard } from "@/components/programs/ProgramCard";
import { ProgramComparison } from "@/components/programs/ProgramComparison";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactHrefForProgram } from "@/lib/contact-links";
import { siteImages } from "@/lib/images";
import { siteRoutes } from "@/lib/navigation";
import {
  getStartedSteps,
  howProgramsWork,
  programDisclaimer,
  programs,
} from "@/lib/programs";
import Link from "next/link";

const customizationLinks = Array.from(
  new Map(
    programs.flatMap((program) =>
      program.addOns.map((link) => [link.href, link] as const),
    ),
  ).values(),
);

export function ProgramsPageContent() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="How the work is held together"
        description="Services are individual kinds of work. Programs are tailored arrangements that combine them around your yacht. The examples below are illustrative — not fixed packages."
        minHeight="tall"
        backgroundImage={siteImages.aftDeck}
        backgroundOverlay="hero"
      >
        <Button
          href={contactHrefForProgram("management")}
          variant="gold"
          size="lg"
        >
          Request Program Consultation
        </Button>
        <Button href="#program-examples" variant="ghost" size="lg">
          Compare programs
        </Button>
      </PageHero>

      <section className="section-padding bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="In plain language"
            title="How management programs work"
            description={programDisclaimer}
            showDivider
          />
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {howProgramsWork.map((item, index) => (
              <li key={item.title} className="border-t border-ivory-dark/70 pt-8">
                <span className="type-label text-gold-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl text-navy-900 lg:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 type-body text-charcoal-soft">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        id="program-examples"
        className="section-padding bg-surface scroll-mt-28"
      >
        <Container>
          <SectionHeading
            eyebrow="Three examples"
            title="Illustrative levels of support"
            description="Use these as a starting conversation. Names and scope can be refined. Nothing here is a price, a visit schedule, or a contractual inclusion list."
          />
          <div className="mt-4">
            {programs.map((program, index) => (
              <ProgramCard
                key={program.slug}
                program={program}
                index={index}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Differences"
            title="Where the emphasis shifts"
            description="A mobile-friendly view of how the three examples typically differ. Final scope is written after consultation."
          />
          <ProgramComparison />
        </Container>
      </section>

      <section className="section-padding bg-navy-950">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Customization"
                title="Add the services you need"
                description="Programs combine approved services. If a task is all you need, start on the services page instead."
                theme="dark"
              />
              <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
                <Button href={siteRoutes.services} variant="ghost">
                  Explore services
                </Button>
                <Button href={siteRoutes.fieldServices} variant="ghost">
                  Field services
                </Button>
              </div>
            </div>
            <ul className="space-y-0 lg:col-span-7">
              {customizationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-baseline justify-between gap-4 border-b border-ivory/15 py-4 transition-luxury"
                  >
                    <span className="font-display text-2xl text-ivory group-hover:text-gold-light">
                      {link.label}
                    </span>
                    <span className="type-label shrink-0 text-ivory/50">
                      View
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-surface">
        <Container>
          <SectionHeading
            eyebrow="Getting started"
            title="A simple path to a written scope"
            description="No online checkout. No deposits on this site. A conversation first."
          />
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {getStartedSteps.map((step, index) => (
              <li key={step.title} className="border-t border-ivory-dark/70 pt-8">
                <span className="type-label text-gold-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl text-navy-900">
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

      <section className="section-padding-lg bg-navy-950">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Next step"
            title="Request a program consultation"
            description="Tell us about the yacht and which example feels closest. We will reply personally and help narrow the scope — without treating these labels as a contract."
            align="center"
            theme="dark"
          />
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={contactHrefForProgram("management")}
              variant="gold"
              size="lg"
            >
              Request Program Consultation
            </Button>
            <Button href={siteRoutes.contact} variant="ghost" size="lg">
              General inquiry
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
