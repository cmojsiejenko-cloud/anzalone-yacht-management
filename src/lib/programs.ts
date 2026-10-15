import type { SiteImageKey } from "@/lib/images";

/**
 * Illustrative engagement guides only.
 * Marketing labels may be renamed by the owner.
 * Do not add prices, vessel-length bands, hour minimums, frequencies,
 * response-time guarantees, or a fourth tier without owner approval.
 */

export type ProgramLink = {
  label: string;
  href: string;
};

export type ComparisonValue = "yes" | "primary" | "as-needed" | "project" | "no";

export type ProgramComparisonRow = {
  id: string;
  label: string;
  hint?: string;
};

export type ProgramRecord = {
  slug: string;
  /** Working marketing label — not a contract name. */
  title: string;
  /** Short column label for comparison. */
  shortTitle: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  /** Plain-language “who this is for”. */
  bestFor: string;
  /** One-line difference from the other programs. */
  differentiator: string;
  paragraphs: string[];
  /** Typical illustrative inclusions — not a contractual schedule. */
  includes: string[];
  /** Extra detail groups for expandable UI. */
  inclusionGroups: {
    title: string;
    items: string[];
  }[];
  comparison: Record<string, ComparisonValue>;
  related: ProgramLink[];
  addOns: ProgramLink[];
  image: SiteImageKey;
  cta: {
    title: string;
    description: string;
  };
};

export const programDisclaimer =
  "These three programs are illustrative examples of how care can be structured. They are not fixed commercial packages. Final scope is established by consultation and written agreement.";

export const comparisonRows: ProgramComparisonRow[] = [
  {
    id: "field-work",
    label: "Dockside field work",
    hint: "Washdowns, checks, and preparation on the vessel",
  },
  {
    id: "ongoing-rhythm",
    label: "Ongoing care rhythm",
    hint: "Repeated attention between your visits",
  },
  {
    id: "vendor-coordination",
    label: "Vendor and yard coordination",
  },
  {
    id: "crew-alignment",
    label: "Crew standards and alignment",
  },
  {
    id: "owner-reporting",
    label: "Owner reporting",
  },
  {
    id: "defined-project",
    label: "Defined project or sale prep",
    hint: "A start and end, not a standing program",
  },
];

export const comparisonLabels: Record<ComparisonValue, string> = {
  yes: "Included",
  primary: "Primary focus",
  "as-needed": "As needed",
  project: "For the project",
  no: "Not the focus",
};

export const howProgramsWork = [
  {
    title: "A service is a task",
    description:
      "Washdowns, detailing, management oversight, crew alignment, refit support, and brokerage preparation are individual kinds of work.",
  },
  {
    title: "A program is the arrangement",
    description:
      "A program decides who is responsible, what is checked, and what you hear before you arrive — combining the services that fit how you use the yacht.",
  },
  {
    title: "Scope is tailored",
    description:
      "The three examples below show common structures. Your program is written only after we understand the vessel, the calendar, and what ready means to you.",
  },
];

export const getStartedSteps = [
  {
    title: "Share the yacht",
    description:
      "Tell us the vessel, where it sits, and how you use it.",
  },
  {
    title: "Discuss the arrangement",
    description:
      "We compare field care, management, or a defined project against what you need.",
  },
  {
    title: "Agree the scope",
    description:
      "You receive a clear written scope before ongoing work begins. Nothing here is a rate card.",
  },
  {
    title: "Begin with a work list",
    description:
      "The first visits or milestones are concrete, checked, and reported in plain language.",
  },
];

export const programs: ProgramRecord[] = [
  {
    slug: "field-care",
    title: "Routine Yacht Care",
    shortTitle: "Routine Care",
    summary:
      "Dockside care between visits — washdowns, checks, detailing, and preparation before you arrive.",
    metaTitle: "Routine Yacht Care Program",
    metaDescription:
      "Illustrative field-care program for yacht owners who want dockside washdowns, checks, and pre-arrival preparation without handing over the whole operation.",
    bestFor:
      "Owners who want the yacht looked after on a rhythm, without a full management program.",
    differentiator:
      "Hands-on dockside care is the point. Wider vendor and crew oversight stay light unless you add them.",
    paragraphs: [
      "Routine Yacht Care is an illustrative field-care arrangement. The work is physical and specific: decks, interiors, systems checks, and the short list that should be finished before a visit.",
      "Findings are reported in plain language. You keep control of the wider operation. When you need management or a yard period later, those can be discussed as a separate or expanded scope.",
    ],
    includes: [
      "Exterior washdowns and brightwork",
      "Interior reset between uses",
      "Systems checks with a written note of what was found",
      "Pre-arrival preparation against your dates",
    ],
    inclusionGroups: [
      {
        title: "Typical dockside work",
        items: [
          "Exterior washdowns and detailing",
          "Interior presentation between uses",
          "Routine inspections with plain-language notes",
          "Vessel readiness before arrival or departure",
        ],
      },
      {
        title: "Usually outside this example",
        items: [
          "Full vendor and budget oversight",
          "Standing crew leadership programs",
          "Multi-month refit representation",
        ],
      },
    ],
    comparison: {
      "field-work": "primary",
      "ongoing-rhythm": "yes",
      "vendor-coordination": "as-needed",
      "crew-alignment": "no",
      "owner-reporting": "yes",
      "defined-project": "no",
    },
    related: [
      { label: "Field services", href: "/field-services" },
      { label: "Maintenance & detailing", href: "/maintenance-detailing" },
    ],
    addOns: [
      { label: "Yacht management", href: "/yacht-management" },
      { label: "Captain & crew services", href: "/captain-crew-services" },
    ],
    image: "preparation",
    cta: {
      title: "Discuss Routine Yacht Care",
      description:
        "Share the vessel, dock or yard, and your dates. We will say whether field care is the right starting point.",
    },
  },
  {
    slug: "management",
    title: "Managed Yacht Readiness",
    shortTitle: "Managed Readiness",
    summary:
      "One accountable point of contact for scheduling, vendors, crew alignment, and owner reporting — with field work inside the plan.",
    metaTitle: "Managed Yacht Readiness Program",
    metaDescription:
      "Illustrative yacht management program with one accountable operator for readiness, maintenance oversight, vendor coordination, and clear owner reporting.",
    bestFor:
      "Owners who want one person responsible for keeping the yacht prepared between visits.",
    differentiator:
      "Field work still happens, and it sits inside a wider plan for maintenance, vendors, crew standards, and reporting.",
    paragraphs: [
      "Managed Yacht Readiness is an illustrative management arrangement. One operator is accountable for the program — scheduling, vendors, crew alignment, and what you hear before you arrive.",
      "Scope and reporting follow your calendar. This is not a published rate card and not a promise of fixed visit frequencies. Those details are set only when we write your scope.",
    ],
    includes: [
      "Operating rhythm, vendor coordination, and scheduling",
      "Maintenance oversight and yard selection",
      "Crew alignment to a written standard",
      "Owner reporting that states findings and next steps",
    ],
    inclusionGroups: [
      {
        title: "Typical program focus",
        items: [
          "Pre-arrival readiness planning",
          "Maintenance coordination and quality oversight",
          "Vendor relationships held to a clear standard",
          "Plain reporting with priorities and next steps",
        ],
      },
      {
        title: "Often combined with",
        items: [
          "Field services on the dock",
          "Maintenance and detailing cycles",
          "Captain and crew standards support",
        ],
      },
    ],
    comparison: {
      "field-work": "as-needed",
      "ongoing-rhythm": "yes",
      "vendor-coordination": "yes",
      "crew-alignment": "yes",
      "owner-reporting": "yes",
      "defined-project": "as-needed",
    },
    related: [
      { label: "Yacht management", href: "/yacht-management" },
      { label: "Field services", href: "/field-services" },
    ],
    addOns: [
      { label: "Maintenance & detailing", href: "/maintenance-detailing" },
      { label: "Captain & crew services", href: "/captain-crew-services" },
      { label: "Refit & custom work", href: "/refit-custom-work" },
    ],
    image: "yachtManagementHero",
    cta: {
      title: "Discuss Managed Yacht Readiness",
      description:
        "Share your vessel, home port, and what ready means to you. We will outline whether management is the right arrangement.",
    },
  },
  {
    slug: "projects",
    title: "Project Oversight",
    shortTitle: "Projects",
    summary:
      "Owner-side oversight for refit, custom work, and the preparation that comes before a sale — a defined engagement, not a standing program.",
    metaTitle: "Project Oversight Program",
    metaDescription:
      "Illustrative project oversight for yacht refit, custom work, and brokerage preparation — scope control, yard presence, and documented close-out.",
    bestFor:
      "Owners facing a yard period, a custom project, or show preparation before listing.",
    differentiator:
      "There is a defined start and end. It represents your interests through the work, then closes out.",
    paragraphs: [
      "Project Oversight is an illustrative arrangement for a yard period or sale-prep effort. It is not a standing management contract.",
      "We help define success, stay present for the phases that matter, and leave you with notes of what was done. Listing authority stays with your broker when you are selling.",
    ],
    includes: [
      "Scope, yard fit, and change-order discipline",
      "On-site oversight during the phases that matter",
      "Close-out notes for the work performed",
      "Show preparation coordinated with your broker when you are selling",
    ],
    inclusionGroups: [
      {
        title: "Typical project work",
        items: [
          "Refit or custom scope development",
          "Yard and trade coordination",
          "Milestone checks and owner updates",
          "Brokerage conditioning beside your listing broker",
        ],
      },
      {
        title: "Usually outside this example",
        items: [
          "Standing weekly dockside care (see Routine Yacht Care)",
          "Ongoing full-program management (see Managed Yacht Readiness)",
          "Acting as the listing broker",
        ],
      },
    ],
    comparison: {
      "field-work": "project",
      "ongoing-rhythm": "no",
      "vendor-coordination": "project",
      "crew-alignment": "as-needed",
      "owner-reporting": "yes",
      "defined-project": "primary",
    },
    related: [
      { label: "Refit & custom work", href: "/refit-custom-work" },
      { label: "Brokerage support", href: "/brokerage-support" },
    ],
    addOns: [
      { label: "Yacht management", href: "/yacht-management" },
      { label: "Maintenance & detailing", href: "/maintenance-detailing" },
    ],
    image: "refitJoinery",
    cta: {
      title: "Discuss Project Oversight",
      description:
        "Share the project or listing window. We will advise whether a defined engagement is the right scope.",
    },
  },
];

export function getProgram(slug: string): ProgramRecord | undefined {
  return programs.find((program) => program.slug === slug);
}

export function getProgramByTitle(title: string): ProgramRecord | undefined {
  return programs.find(
    (program) => program.title.toLowerCase() === title.toLowerCase(),
  );
}

/** Checklist labels used on the vessel-review form for program interest. */
export const programInquiryLabels = programs.map((program) => program.title);
