import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { siteRoutes } from "@/lib/navigation";
import { siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: `The page you requested could not be found. Return to ${siteName} or contact us.`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="This page could not be found"
      description="The address may have changed. Use the menu, browse services, or tell us what you were looking for."
      minHeight="default"
      align="center"
    >
      <Button href={siteRoutes.home} variant="gold" size="lg">
        Return Home
      </Button>
      <Button href={siteRoutes.services} variant="ghost" size="lg">
        View Services
      </Button>
      <Button href={siteRoutes.contact} variant="ghost" size="lg">
        Contact
      </Button>
    </PageHero>
  );
}
