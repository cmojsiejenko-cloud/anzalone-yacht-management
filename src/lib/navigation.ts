import { programs } from "@/lib/programs";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const siteRoutes = {
  home: "/",
  services: "/services",
  fieldServices: "/field-services",
  yachtManagement: "/yacht-management",
  maintenanceDetailing: "/maintenance-detailing",
  captainCrew: "/captain-crew-services",
  refitCustom: "/refit-custom-work",
  brokerageSupport: "/brokerage-support",
  programs: "/programs",
  about: "/about",
  careers: "/careers",
  crew: "/crew",
  contact: "/contact",
  privacy: "/privacy",
} as const;

export const serviceNavLinks: NavLink[] = [
  {
    label: "Field Services",
    href: siteRoutes.fieldServices,
    description: "Washdowns, checks, readiness, and yard presence",
  },
  {
    label: "Yacht Management",
    href: siteRoutes.yachtManagement,
    description: "One accountable operator for the whole program",
  },
  {
    label: "Maintenance & Detailing",
    href: siteRoutes.maintenanceDetailing,
    description: "Planned care, corrective work, and presentation",
  },
  {
    label: "Captain & Crew Services",
    href: siteRoutes.captainCrew,
    description: "Leadership, standards, and on-board alignment",
  },
  {
    label: "Refit & Custom Work",
    href: siteRoutes.refitCustom,
    description: "Owner-side oversight from scope through delivery",
  },
  {
    label: "Brokerage Support",
    href: siteRoutes.brokerageSupport,
    description: "Show-ready preparation beside your broker",
  },
];

export const programNavLinks: NavLink[] = programs.map((program) => ({
  label: program.title,
  href: `${siteRoutes.programs}/${program.slug}`,
  description: program.summary,
}));

export type PrimaryNavItem = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const primaryNav: PrimaryNavItem[] = [
  { label: "Home", href: siteRoutes.home },
  {
    label: "Services",
    href: siteRoutes.services,
    children: serviceNavLinks,
  },
  {
    label: "Programs",
    href: siteRoutes.programs,
    children: programNavLinks,
  },
  { label: "About", href: siteRoutes.about },
  { label: "Careers", href: siteRoutes.careers },
  { label: "Crew", href: siteRoutes.crew },
];

export const footerServiceLinks = serviceNavLinks;

export const footerCompanyLinks: NavLink[] = [
  { label: "About", href: siteRoutes.about },
  { label: "Programs", href: siteRoutes.programs },
  { label: "Careers", href: siteRoutes.careers },
  { label: "Crew", href: siteRoutes.crew },
  { label: "Contact", href: siteRoutes.contact },
];

/** Short descriptions for nav tooltips / future use. Crew is expense reports, not booking. */
export const crewNavDescription =
  "Expense reports for review — not payment processing";

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
