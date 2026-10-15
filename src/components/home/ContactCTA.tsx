import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { company, mailtoHref, personalReplySentence } from "@/lib/company";
import { siteRoutes } from "@/lib/navigation";

export function ContactCTA() {
  return (
    <section
      id="contact"
      className="home-section home-section--ink home-section--close section-padding"
    >
      <Container size="narrow" className="reveal text-center">
        <LuxuryDivider variant="rule" className="mx-auto mb-6 justify-center" />
        <p className="type-label-light">Begin</p>
        <h2 className="mt-5 type-display-lg text-balance text-ivory">
          Tell us about the yacht.
        </h2>
        <p className="mx-auto mt-6 max-w-md type-body text-ivory-muted">
          A short note on the vessel, the home port, and how you use it is enough to start.{" "}
          {personalReplySentence()}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button href={siteRoutes.contact} variant="gold" size="lg">
            Discuss Your Yacht
          </Button>
          <Button href={mailtoHref} variant="ghost" size="lg">
            Email Directly
          </Button>
        </div>
        <p className="mt-7">
          <a
            href={mailtoHref}
            className="inline-flex min-h-11 items-center text-sm text-ivory transition-luxury hover:text-gold-light"
          >
            {company.email}
          </a>
        </p>
      </Container>
    </section>
  );
}
