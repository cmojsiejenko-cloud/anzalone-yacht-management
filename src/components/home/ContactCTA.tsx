import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { company, mailtoHref, personalReplySentence } from "@/lib/company";
import { siteRoutes } from "@/lib/navigation";

export function ContactCTA() {
  return (
    <section id="contact" className="section-padding bg-navy-950">
      <Container size="narrow" className="text-center">
        <p className="type-label-light">Begin</p>
        <h2 className="mt-6 font-display text-4xl leading-tight text-ivory sm:text-5xl">
          Tell us about the yacht.
        </h2>
        <p className="mx-auto mt-6 max-w-md type-body text-ivory-muted">
          A short note on the vessel, the home port, and how you use it is enough to start. {personalReplySentence()}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={siteRoutes.contact} variant="gold" size="lg">
            Discuss Your Yacht
          </Button>
          <Button href={mailtoHref} variant="ghost" size="lg">
            Email Directly
          </Button>
        </div>
        <p className="mt-8">
          <a
            href={mailtoHref}
            className="inline-flex min-h-11 items-center text-sm text-ivory hover:text-gold-light"
          >
            {company.email}
          </a>
        </p>
      </Container>
    </section>
  );
}
