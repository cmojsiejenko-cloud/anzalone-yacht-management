import Link from "next/link";
import { CrewExpenseForm } from "@/components/crew/CrewExpenseForm";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { company, mailtoHref, personalReplySentence } from "@/lib/company";
import { contactHrefForService } from "@/lib/contact-links";
import { siteImages } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo";
import { siteRoutes } from "@/lib/navigation";

export const metadata = buildPageMetadata({
  title: "Crew Expense Report",
  description:
    "Submit a crew or contractor expense report to Anzalone's for review. Receipts are emailed for review. This form does not process payments.",
  path: siteRoutes.crew,
  keywords: [
    "yacht crew expense report",
    "marine contractor expenses",
    "yacht provisions reimbursement request",
  ],
});

export default function CrewPage() {
  return (
    <>
      <PageHero
        eyebrow="Crew"
        title="Expense reports for review"
        description="Submit provisions, travel, tips, and related assignment expenses after the work. Reports are emailed to the company. Nothing here processes a payment or creates an accounting ledger."
        minHeight="tall"
        backgroundImage={siteImages.craft}
        backgroundOverlay="hero"
      />

      <section className="section-padding bg-ivory">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl text-navy-900">
                What this form is for
              </h2>
              <ul className="mt-6 space-y-4 text-base leading-relaxed text-charcoal">
                <li>Name and email so we can reply.</li>
                <li>Vessel or assignment reference and location.</li>
                <li>A short description of the outing or work and the date.</li>
                <li>
                  Expense amounts for provisions, travel, tips, and other
                  approved categories.
                </li>
                <li>
                  Optional receipt files — emailed as attachments, never posted
                  publicly on this site.
                </li>
              </ul>
              <p className="mt-8 type-body-sm text-charcoal-soft">
                {personalReplySentence()} Totals are calculated from your
                amounts for display and review only.
              </p>
              <p className="mt-6 type-body-sm text-charcoal-soft">
                Need captain, deck, or interior support for a visit? That is a
                separate request — use{" "}
                <Link
                  href={contactHrefForService("Crew support")}
                  className="text-navy-900 underline-offset-4 hover:underline"
                >
                  the contact form
                </Link>{" "}
                or read{" "}
                <Link
                  href={siteRoutes.captainCrew}
                  className="text-navy-900 underline-offset-4 hover:underline"
                >
                  Captain &amp; Crew Services
                </Link>
                . You can also email{" "}
                <a
                  href={mailtoHref}
                  className="text-navy-900 underline-offset-4 hover:underline"
                >
                  {company.email}
                </a>
                .
              </p>
            </div>
            <div className="lg:col-span-7">
              <CrewExpenseForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
