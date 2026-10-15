import { publicPhone, serviceAreas, verifiedSocialLinks } from "@/lib/company";
import { siteRoutes } from "@/lib/navigation";
import { siteConfig, siteName, siteUrl } from "@/lib/seo";

const serviceCatalog = [
  {
    name: "Field Services",
    url: `${siteUrl}${siteRoutes.fieldServices}`,
    description:
      "Dockside field service — washdowns, systems checks, detailing, and yard presence.",
  },
  {
    name: "Yacht Management",
    url: `${siteUrl}${siteRoutes.yachtManagement}`,
    description:
      "Full-program yacht management — readiness, maintenance oversight, vendor coordination, and owner reporting.",
  },
  {
    name: "Maintenance & Detailing",
    url: `${siteUrl}${siteRoutes.maintenanceDetailing}`,
    description:
      "Coordinated yacht maintenance and premium yacht detailing supervised to owner standards.",
  },
  {
    name: "Captain & Crew Services",
    url: `${siteUrl}${siteRoutes.captainCrew}`,
    description:
      "Captain services — placement, crew leadership, training, and operational alignment.",
  },
  {
    name: "Refit & Custom Work",
    url: `${siteUrl}${siteRoutes.refitCustom}`,
    description:
      "Refit and custom project oversight from specification through sea trial.",
  },
  {
    name: "Brokerage Support",
    url: `${siteUrl}${siteRoutes.brokerageSupport}`,
    description:
      "Brokerage yacht preparation — conditioning, documentation, and show-ready presentation.",
  },
];

export type BreadcrumbItem = {
  name: string;
  path: string;
};

/** BreadcrumbList JSON-LD from confirmed site paths only. */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

/**
 * Organization / ProfessionalService JSON-LD.
 * No ratings, reviews, street address, or priced Offers — only confirmed facts.
 */
export function getLocalBusinessSchema() {
  const phone = publicPhone();
  const sameAs = verifiedSocialLinks().map((link) => link.href);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        description: siteConfig.description,
        email: siteConfig.email,
        ...(phone ? { telephone: phone } : {}),
        ...(sameAs.length > 0 ? { sameAs } : {}),
        image: `${siteUrl}/opengraph-image`,
        areaServed: serviceAreas.map((area) => ({
          "@type": "AdministrativeArea",
          name: area.name,
        })),
        serviceType: serviceCatalog.map((service) => service.name),
        knowsAbout: [
          "yacht management",
          "yacht maintenance",
          "yacht detailing",
          "fiberglass repair",
          "marine electronics",
          "captain services",
          "yacht refit oversight",
          "brokerage yacht preparation",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Yacht management services",
          itemListElement: serviceCatalog.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Service",
              name: service.name,
              url: service.url,
              description: service.description,
              provider: { "@id": `${siteUrl}/#organization` },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteConfig.description,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };
}
