import { ProgramsPageContent } from "@/components/programs/ProgramsPageContent";
import { buildPageMetadata } from "@/lib/seo";
import { siteRoutes } from "@/lib/navigation";

export const metadata = buildPageMetadata({
  title: "Yacht Management Programs",
  description:
    "Illustrative yacht management programs from Anzalone — Routine Yacht Care, Managed Yacht Readiness, and Project Oversight. Final scope is set by consultation, not a rate card.",
  path: siteRoutes.programs,
  keywords: [
    "yacht management programs",
    "yacht care program",
    "yacht readiness",
    "yacht project oversight",
  ],
});

export default function ProgramsPage() {
  return <ProgramsPageContent />;
}
