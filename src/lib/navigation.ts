export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const siteRoutes = {
  home: "/",
  yachtManagement: "/yacht-management",
  maintenanceDetailing: "/maintenance-detailing",
  captainCrew: "/captain-crew-services",
  refitCustom: "/refit-custom-work",
  brokerageSupport: "/brokerage-support",
  about: "/about",
  contact: "/contact",
} as const;

export const serviceNavLinks: NavLink[] = [
  {
    label: "Yacht Management",
    href: siteRoutes.yachtManagement,
    description: "Full-program oversight and operational coordination",
  },
  {
    label: "Maintenance & Detailing",
    href: siteRoutes.maintenanceDetailing,
    description: "Planned care, corrective work, and presentation",
  },
  {
    label: "Captain & Crew Services",
    href: siteRoutes.captainCrew,
    description: "Leadership, training, and crew alignment",
  },
  {
    label: "Refit & Custom Work",
    href: siteRoutes.refitCustom,
    description: "Yard oversight from scope through delivery",
  },
  {
    label: "Brokerage Support",
    href: siteRoutes.brokerageSupport,
    description: "Show-ready conditioning and documentation",
  },
];

export const primaryNavLinks: NavLink[] = [
  { label: "Home", href: siteRoutes.home },
  { label: "About", href: siteRoutes.about },
  { label: "Contact", href: siteRoutes.contact },
];

export const footerServiceLinks = serviceNavLinks;

export const footerCompanyLinks: NavLink[] = [
  { label: "Home", href: siteRoutes.home },
  { label: "About", href: siteRoutes.about },
  { label: "Contact", href: siteRoutes.contact },
];
