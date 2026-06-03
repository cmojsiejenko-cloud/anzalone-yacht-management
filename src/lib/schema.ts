import { siteConfig, siteName, siteUrl } from "@/lib/seo";
import { siteRoutes } from "@/lib/navigation";

const serviceCatalog = [
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

/** JSON-LD for LocalBusiness + ProfessionalService (yacht management) */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        description: siteConfig.description,
        email: siteConfig.email,
        image: `${siteUrl}/opengraph-image`,
        priceRange: "$$$",
        areaServed: [
          {
            "@type": "Place",
            name: "South Florida",
            description: "South Florida yacht management — Palm Beach through the Keys",
          },
          {
            "@type": "Place",
            name: "Annapolis, Maryland",
            description: "Yacht management Annapolis and Chesapeake Bay programs",
          },
          {
            "@type": "Place",
            name: "Chesapeake Bay",
            description: "Chesapeake yacht management and East Coast dockside programs",
          },
          {
            "@type": "Place",
            name: "Bahamas & Caribbean",
          },
          {
            "@type": "Place",
            name: "U.S. East Coast",
          },
        ],
        serviceType: [
          "Yacht Management",
          "Yacht Maintenance",
          "Yacht Detailing",
          "Captain Services",
          "Brokerage Yacht Preparation",
          "Refit Oversight",
        ],
        knowsAbout: [
          "yacht management",
          "yacht maintenance",
          "yacht detailing",
          "captain services",
          "brokerage yacht preparation",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Yacht Management Services",
          itemListElement: serviceCatalog.map((service, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
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
