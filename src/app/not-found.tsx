import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { siteRoutes } from "@/lib/navigation";
import { siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: `The page you requested could not be found. Return to ${siteName} or contact us for yacht management inquiries.`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section-padding bg-ivory">
      <Container size="narrow" className="text-center">
        <LuxuryDivider variant="rule" className="justify-center" />
        <p className="mt-8 type-label">404</p>
        <h1 className="mt-4 type-display-lg text-balance text-navy-900">
          This page could not be found
        </h1>
        <p className="mx-auto mt-6 max-w-md type-body text-navy-700/85">
          The address may have changed or the page may have been removed. Use the
          links below to continue browsing or reach us directly.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={siteRoutes.home} variant="primary" size="lg">
            Return Home
          </Button>
          <Button href={siteRoutes.contact} variant="secondary" size="lg">
            Contact the Operator
          </Button>
        </div>
        <p className="mt-10 type-body-sm text-gray-500">
          Looking for a service?{" "}
          <Link
            href={`${siteRoutes.home}#services`}
            className="font-medium text-navy-900 transition-luxury hover:text-gold-muted"
          >
            View core services
          </Link>
        </p>
      </Container>
    </section>
  );
}
