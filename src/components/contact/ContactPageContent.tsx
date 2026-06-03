import { VesselReviewForm } from "@/components/contact/VesselReviewForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { PageHero } from "@/components/ui/PageHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceNavLinks } from "@/lib/navigation";
import Link from "next/link";

const trustPoints = [
  {
    title: "Direct to the operator",
    description:
      "No call center routing. Your inquiry reaches the person who would run your program.",
  },
  {
    title: "Confidential by default",
    description:
      "Vessel details and ownership context stay between you and our team.",
  },
  {
    title: "Personal response",
    description:
      "Qualified inquiries receive a reply within one business day.",
  },
];

const inquiryTopics = [
  "Full or partial yacht management",
  "Maintenance and detailing programs",
  "Captain and crew alignment",
  "Refit or custom project oversight",
  "Brokerage preparation and sale support",
];

export function ContactPageContent() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a vessel review"
        description="Share your vessel, location, and scope. We respond personally — typically within one business day — with a confidential, operator-led assessment."
        minHeight="compact"
        align="center"
      />

      <section className="section-padding bg-ivory">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
            <ScrollReveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Why owners trust us"
                title="A premium standard from first contact"
                description="This is not a generic lead form. Every field helps us understand your vessel and deliver a useful first response."
              />

              <ul className="mt-10 space-y-8">
                {trustPoints.map((point) => (
                  <li key={point.title} className="flex gap-4">
                    <span
                      className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center border border-gold/50 bg-surface text-gold"
                      aria-hidden
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3.5 w-3.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.5a1 1 0 0 1-1.418-.006L3.29 9.714a1 1 0 1 1 1.414-1.414l3.18 3.18 6.543-6.772a1 1 0 0 1 1.418.006Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-navy-900">
                        {point.title}
                      </h3>
                      <p className="mt-2 type-body-sm text-navy-700/85">
                        {point.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <LuxuryDivider variant="rule" className="mt-10" />

              <div className="mt-10 space-y-6">
                <div>
                  <p className="type-label">Email</p>
                  <a
                    href="mailto:info@anzaloneyacht.com"
                    className="mt-2 inline-block font-display text-2xl text-navy-900 transition-luxury hover:text-gold-muted"
                  >
                    info@anzaloneyacht.com
                  </a>
                </div>
                <div>
                  <p className="type-label">Service area</p>
                  <p className="mt-2 type-body text-navy-700">
                    South Florida, Annapolis, the Chesapeake Bay, and select
                    destinations by arrangement.
                  </p>
                </div>
              </div>

              <Button
                href="mailto:info@anzaloneyacht.com"
                variant="secondary"
                size="md"
                className="mt-8 w-full sm:w-auto"
              >
                Email directly
              </Button>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="mb-6 lg:mb-8">
                <p className="type-label">Vessel review request</p>
                <h2 className="mt-3 type-display-sm text-navy-900">
                  Tell us about your program
                </h2>
                <p className="mt-3 type-body-sm text-navy-700/85">
                  Complete the form below. Required fields are marked. The more
                  context you provide, the more useful our first response will
                  be.
                </p>
              </div>
              <VesselReviewForm />
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="section-padding-sm border-t border-ivory-muted bg-surface-muted">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Before you submit"
            title="What to include"
            description="These details help us move from inquiry to a meaningful conversation — not a templated reply."
            align="center"
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {inquiryTopics.map((topic) => (
              <li
                key={topic}
                className="flex items-start gap-3 border border-ivory-muted bg-surface px-5 py-4 type-body-sm text-navy-700/85"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-gold"
                  aria-hidden
                />
                {topic}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-padding bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Explore our programs"
            description="Review the service that fits your needs — or select options in the form and we will recommend the right scope."
            align="center"
          />
          <ul className="mt-12 flex flex-wrap justify-center gap-3">
            {serviceNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block border border-ivory-muted bg-surface px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-navy-800 transition-luxury hover:border-navy-900 hover:text-navy-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
