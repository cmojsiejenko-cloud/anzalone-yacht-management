import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LuxuryImage } from "@/components/ui/images";
import { PageHero } from "@/components/ui/PageHero";
import { ResponsiveImage } from "@/components/ui/images/ResponsiveImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  company,
  founderDisplayName,
  founderRoleLabel,
  mailtoHref,
  personalReplySentence,
  publicPhone,
  serviceAreas,
  telHref,
} from "@/lib/company";
import { imageSizes, siteImages } from "@/lib/images";
import { siteRoutes } from "@/lib/navigation";

const philosophy = [
  {
    title: "A yacht is not a work order",
    detail:
      "Owners should arrive knowing preparation, scheduling, condition oversight, and the practical details have already been addressed.",
  },
  {
    title: "One accountable operator",
    detail:
      "Direct communication. Attention to detail. Documented standards. Practical execution. Yacht readiness — without a handoff chain.",
  },
  {
    title: "Keep the days intact",
    detail:
      "Care exists so the yacht stays sound and the time aboard stays free of the list that usually comes with ownership.",
  },
];

const approach = [
  "Owner-operated decisions on the care of the yacht",
  "Direct communication with the person accountable for outcomes",
  "Hands-on field work beside the vessel, not only desk updates",
  "Documented condition and plain reporting",
  "Selective attention so standards stay high",
];

export function AboutPageContent() {
  const role = founderRoleLabel();
  const displayName = founderDisplayName();
  const phone = publicPhone();
  const showFounderPortrait = !siteImages.anzaloneFounder.usePlaceholder;
  const showTruck = !siteImages.anzaloneTruck.usePlaceholder;

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A Naples maritime tradition. One operator for the yacht."
        description={`${company.shortName} is an owner-operated practice led by ${displayName}. The standard is readiness — and the person accountable for it is the one you reach.`}
        minHeight="tall"
        backgroundImage={siteImages.cruise}
        backgroundOverlay="hero"
      >
        <Button href={siteRoutes.contact} variant="gold" size="lg">
          Discuss Your Yacht
        </Button>
        <Button href={siteRoutes.services} variant="ghost" size="lg">
          Explore Services
        </Button>
      </PageHero>

      <section className="section-padding bg-ivory">
        <Container size="narrow">
          <SectionHeading
            eyebrow="The origin"
            title="Rooted in a family maritime tradition"
            description="With roots in Naples, Italy, and a father who served as a merchant marine captain, Pauly Anzalone’s connection to the water is grounded in seamanship, craftsmanship, and personal responsibility."
            showDivider
          />
          <div className="mt-8 space-y-5 type-body-lg text-charcoal-soft">
            <p>
              That background shapes how vessels are treated: respect for the
              craft, pride in proper work, and accountability for the condition
              of the yacht under care.
            </p>
            <p>
              Anzalone’s Full Service Yacht Management Group carries the same
              discipline into modern ownership — so the practical work stays
              handled, and the days on the water remain the point.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-surface">
        <Container>
          <div
            className={
              showFounderPortrait
                ? "grid items-center gap-12 lg:grid-cols-12 lg:gap-16"
                : "mx-auto max-w-3xl"
            }
          >
            {showFounderPortrait ? (
              <div className="lg:col-span-5">
                <LuxuryImage
                  definition={siteImages.anzaloneFounder}
                  sizes={imageSizes.founder}
                  aspectRatio="aspect-[4/5] w-full"
                  overlay="bottom"
                  showPlaceholderCaption={false}
                >
                  <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-end p-8 pb-10 text-center">
                    <p className="type-label-light">{role}</p>
                    <p className="mt-3 font-display text-2xl text-ivory sm:text-3xl">
                      {displayName}
                    </p>
                  </div>
                </LuxuryImage>
              </div>
            ) : null}

            <div className={showFounderPortrait ? "lg:col-span-7" : undefined}>
              <SectionHeading
                eyebrow="The experience"
                title={`${company.founder.experienceYears} years of hands-on yacht care`}
                description={`${role}: ${displayName}`}
              />
              <div className="mt-6 space-y-5 type-body-lg text-charcoal-soft">
                <p>
                  Across {company.founder.experienceYears} years of hands-on
                  yacht management, maintenance, and care — from the Chesapeake,
                  Annapolis, and Virginia waters to mobile operations in South
                  Florida — the work has stayed close to the vessel: preparation,
                  craftsmanship, and direct accountability.
                </p>
                <p>
                  Those years measure experience with yachts, not a company
                  founding date.
                </p>
                <p>
                  Client and project relationships also extend beyond those
                  waters. Scope and presence are confirmed for each engagement.
                </p>
              </div>
              {!showFounderPortrait ? (
                <p className="mt-6 type-body-sm text-charcoal-soft">
                  A verified founder portrait will be published here when
                  approved.
                </p>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="The philosophy"
            title="How the practice is run"
            description={`${company.tagline} Care exists so ownership feels like arrival — not another job.`}
          />
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {philosophy.map((item, index) => (
              <li
                key={item.title}
                className="border-t border-ivory-dark/70 pt-8"
              >
                <span className="type-label text-gold-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-4 type-body text-charcoal-soft">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-padding bg-navy-950">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="The approach"
                title="Personal oversight. Practical execution."
                theme="dark"
              />
            </div>
            <ul className="space-y-4 lg:col-span-7">
              {approach.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-t border-ivory/15 pt-6 type-body text-ivory"
                >
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-gold-light"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {showTruck ? (
        <section className="section-padding bg-ivory">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <SectionHeading
                  eyebrow="In the field"
                  title="The truck that carries the work"
                  description="Branded field equipment photographed as it is used — on the way to the marina, not staged as a catalog prop."
                />
              </div>
              <figure className="editorial-frame relative aspect-[16/10] lg:col-span-7">
                <ResponsiveImage
                  definition={siteImages.anzaloneTruck}
                  sizes={imageSizes.half}
                  className="object-cover"
                  showPlaceholderCaption={false}
                />
              </figure>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="section-padding bg-surface">
        <Container>
          <SectionHeading
            eyebrow="Presence"
            title="Where the work has been done"
            description="South Florida and the Chesapeake–Virginia waters are the published regions of experience. Coverage elsewhere is confirmed by engagement, not assumed."
          />
          <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((area) => (
              <li
                key={area.name}
                className="border-t border-ivory-dark/70 pt-8"
              >
                <h3 className="font-display text-2xl text-navy-900 lg:text-3xl">
                  {area.name}
                </h3>
                <p className="mt-4 type-body text-charcoal-soft">
                  {area.detail}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-padding bg-ivory">
        <Container>
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="The lifestyle"
                title="The day on the water is the point"
                description="The yacht is for the morning you leave the dock. Anzalone handles the work that should already be finished when you arrive."
              />
            </div>
            <figure className="editorial-frame relative aspect-[4/5] sm:aspect-[16/10] lg:col-span-7">
              <ResponsiveImage
                definition={siteImages.aftDeck}
                sizes={imageSizes.half}
                className="object-cover"
                showPlaceholderCaption={false}
              />
              <figcaption className="sr-only">
                Concept still of a yacht aft deck. Not a documented Anzalone
                vessel.
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section className="section-padding-lg bg-navy-950">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Next step"
            title="Tell us about the yacht"
            description={`${personalReplySentence()} Share the vessel, location, and what ready means to you.`}
            align="center"
            theme="dark"
          />
          <div className="mt-8 flex flex-col items-center gap-3 text-center text-sm text-ivory-muted">
            {phone ? (
              <a
                href={telHref}
                className="inline-flex min-h-11 items-center text-gold-light hover:text-ivory"
              >
                {phone}
              </a>
            ) : null}
            <a
              href={mailtoHref}
              className="inline-flex min-h-11 items-center text-ivory-muted hover:text-ivory"
            >
              {company.email}
            </a>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={siteRoutes.contact} variant="gold" size="lg">
              Discuss Your Yacht
            </Button>
            <Button href={siteRoutes.programs} variant="ghost" size="lg">
              View Programs
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
