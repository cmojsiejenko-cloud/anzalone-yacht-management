import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { company, mailtoHref } from "@/lib/company";
import { siteRoutes } from "@/lib/navigation";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: "Privacy Notice",
  description:
    "How Anzalone's Full Service Yacht Management Group handles inquiry, career, and crew expense submissions. Formal legal review of this notice is still pending.",
  path: siteRoutes.privacy,
});

const sections = [
  {
    title: "What this notice covers",
    body: [
      "This page describes how contact, career, and crew expense forms on this website are handled today. It is an operational notice, not a substitute for counsel-approved privacy policy language.",
      "A formal, attorney-reviewed privacy policy and cookie notice have not been approved for publication. Until then, we keep collection narrow and avoid marketing trackers.",
    ],
  },
  {
    title: "Information we collect",
    body: [
      "Vessel review inquiries may include your name, email, phone (when provided), vessel details, location, services of interest, message, and preferred contact method.",
      "Career applications may include contact details, location, experience notes, a cover message, and an optional PDF resume.",
      "Crew expense reports may include assignment details, expense amounts, notes, and optional receipt files.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "Submissions are emailed to the company so the operator can review and reply. We do not use these forms to process payments, approve expenses automatically, or create public profiles.",
      "We do not sell personal information. Inquiry details are shared with our email delivery provider only as needed to send the message to us.",
    ],
  },
  {
    title: "Email delivery",
    body: [
      "Form emails are sent with Resend when production credentials are configured. Resend acts as a processor for delivery. Secrets such as API keys stay on the server and are never exposed in the browser.",
      "Uploaded resumes and receipts are attached to the owner email when allowed by size and type rules. They are not published to a public URL on this site.",
    ],
  },
  {
    title: "Analytics and cookies",
    body: [
      "This site does not currently load third-party analytics, advertising pixels, or marketing popups. Essential hosting cookies may still be set by the platform that serves the site.",
      "If privacy-conscious analytics are approved later, they will be documented here before activation.",
    ],
  },
  {
    title: "Your choices",
    body: [
      `You may email ${company.email} to ask about a submission you sent, to request correction of contact details, or to ask us not to continue a conversation.`,
      "Do not submit sensitive medical, government ID, or payment-card data through these forms.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="How we handle submissions"
        description="Clear notice for owners, applicants, and crew — without inventing legal assurances that have not been approved."
        minHeight="compact"
        align="center"
      />

      <section className="section-padding bg-ivory">
        <Container size="narrow">
          <p className="rounded border border-gold/40 bg-surface px-5 py-4 type-body-sm text-navy-800">
            <strong className="font-semibold">Pending legal approval.</strong>{" "}
            This notice reflects current technical behavior. It is not a claim
            of GDPR, CCPA, or other statutory compliance until counsel reviews
            and the owner publishes a final policy.
          </p>

          <div className="mt-12 space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-2xl text-navy-900 lg:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-3">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="type-body text-navy-700/90"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-14 type-body-sm text-navy-700/85">
            Questions:{" "}
            <a
              href={mailtoHref}
              className="font-medium text-navy-900 underline-offset-2 hover:underline"
            >
              {company.email}
            </a>
            . Return to{" "}
            <Link
              href={siteRoutes.contact}
              className="font-medium text-navy-900 underline-offset-2 hover:underline"
            >
              Contact
            </Link>{" "}
            or the{" "}
            <Link
              href={siteRoutes.home}
              className="font-medium text-navy-900 underline-offset-2 hover:underline"
            >
              homepage
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
