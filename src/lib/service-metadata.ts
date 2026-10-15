import { buildPageMetadata } from "@/lib/seo";
import type { ServicePageContent } from "@/lib/services";

const serviceKeywords: Record<string, string[]> = {
  "field-services": [
    "yacht field services",
    "yacht washdown",
    "yacht readiness",
  ],
  "yacht-management": [
    "yacht management Annapolis",
    "Chesapeake yacht management",
    "South Florida yacht management",
  ],
  "maintenance-detailing": ["yacht maintenance", "yacht detailing"],
  "captain-crew-services": ["captain services", "yacht crew support"],
  "brokerage-support": ["brokerage yacht preparation"],
  "refit-custom-work": ["yacht refit oversight"],
};

export function getServicePageMetadata(content: ServicePageContent) {
  return buildPageMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: content.path,
    keywords: serviceKeywords[content.slug] ?? [],
  });
}
