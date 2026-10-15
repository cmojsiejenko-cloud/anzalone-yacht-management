import { VesselReviewForm } from "@/components/contact/VesselReviewForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { PageHero } from "@/components/ui/PageHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  company,
  mailtoHref,
  personalReplySentence,
  publicPhone,
  serviceAreas,
  telHref,
  verifiedSocialLinks,
} from "@/lib/company";
import { programNavLinks, serviceNavLinks, siteRoutes } from "@/lib/navigation";
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
      "Vessel details stay between you and our team. Submissions are emailed for review — not published.",
  },
  {
    title: "Personal response",
    description: personalReplySentence(),
  },
];

const inquiryTopics = [
  "Full or partial yacht management",
  "Maintenance and detailing programs",
  "Captain and crew alignment",
  "Refit or custom project oversight",
  "Brokerage preparation and sale support",
];

type ContactPageContentProps = {
  initialServices?: string[];
};

export function ContactPageContent({
  initialServices = [],
}: ContactPageContentProps) {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a vessel review"
        description={`Share the vessel, the home port, and the scope. ${personalReplySentence()}`}
        minHeight="compact"
        align="center"
      />

      <section className="section-padding bg-ivory">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
            <ScrollReveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="For yacht owners"
                title="A clear first conversation"
                description="A short form is enough. Required fields help us answer usefully; optional phone stays optional when email is your preference."
              />

              <ol className="mt-10 space-y-8">
                {trustPoints.map((point, index) => (
                  <li key={point.title} className="border-t border-ivory-dark/70 pt-6">
                    <span className="type-label text-gold-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-2xl text-navy-900">
                      {point.title}
                    </h3>
                    <p className="mt-2 max-w-sm type-body-sm text-charcoal-soft">
                      {point.description}
                    </p>
                  </li>
                ))}
              </ol>

              <LuxuryDivider variant="rule" className="mt-10" />

              <div className="mt-10 space-y-6">
                {publicPhone() ? (
                  <div>
                    <p className="type-label">Phone</p>
                    <a
                      href={telHref}
                      className="mt-2 inline-block font-display text-2xl text-navy-900 transition-luxury hover:text-gold-muted"
                    >
                      {publicPhone()}
                    </a>
                    <p className="mt-2 type-body-sm text-navy-700/80">
                      Tap to call from your phone.
                    </p>
                  </div>
                ) : null}
                <div>
                  <p className="type-label">Email</p>
                  <a
                    href={mailtoHref}
                    className="mt-2 inline-block font-display text-2xl text-navy-900 transition-luxury hover:text-gold-muted"
                  >
                    {company.email}
                  </a>
                  <p className="mt-2 type-body-sm text-navy-700/80">
                    Working fallback if the form cannot send.
                  </p>
                </div>
                {verifiedSocialLinks().map((link) => (
                  <div key={link.href}>
                    <p className="type-label">{link.label}</p>
                    <a
                      href={link.href}
                      className="mt-2 inline-flex min-h-11 items-center text-navy-900 underline-offset-2 hover:underline"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Follow {company.shortName} on Facebook
                    </a>
                  </div>
                ))}
                <div>
                  <p className="type-label">Service area</p>
                  <ul className="mt-2 space-y-1">
                    {serviceAreas.map((area) => (
                      <li key={area.name} className="type-body text-navy-800">
                        {area.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {publicPhone() ? (
                  <Button
                    href={telHref}
                    variant="primary"
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    Call {publicPhone()}
                  </Button>
                ) : null}
                <Button
                  href={mailtoHref}
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  Email directly
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="mb-6 lg:mb-8">
                <p className="type-label">Vessel review request</p>
                <h2 className="mt-3 type-display-sm text-navy-900">
                  Tell us about your yacht
                </h2>
                <p className="mt-3 type-body-sm text-navy-700/85">
                  {initialServices.length > 0
                    ? "Your selected interest is pre-checked below. Add anything else that applies."
                    : "Complete the form below. Required fields are marked."}{" "}
                  Every submitted detail is included in the email to us.
                </p>
              </div>
              <VesselReviewForm initialServices={initialServices} />
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
            eyebrow="Services & programs"
            title="Explore before you inquire"
            description="Review the work streams and illustrative programs — then return here with the right interest selected."
            align="center"
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="type-label">Services</h3>
              <ul className="mt-5 flex flex-wrap gap-3">
                {serviceNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center border border-ivory-muted bg-surface px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-navy-800 transition-luxury hover:border-navy-900 hover:text-navy-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="type-label">Programs</h3>
              <ul className="mt-5 flex flex-wrap gap-3">
                {programNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center border border-ivory-muted bg-surface px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-navy-800 transition-luxury hover:border-navy-900 hover:text-navy-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                <Link
                  href={siteRoutes.programs}
                  className="type-body-sm font-medium text-navy-900 underline-offset-2 hover:underline"
                >
                  All programs
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
