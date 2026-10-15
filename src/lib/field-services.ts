import { siteRoutes } from "@/lib/navigation";
import type { ServicePageContent } from "@/lib/services";

export const fieldServicesContent: ServicePageContent = {
  slug: "field-services",
  path: siteRoutes.fieldServices,
  inquiryService: "field-services",
  metaTitle: "Field Services",
  metaDescription:
    "Hands-on yacht field services — exterior washdowns, interior preparation, routine inspections, maintenance coordination, vessel readiness, yard oversight, and operational support.",
  hero: {
    eyebrow: "Field Services",
    title: "The work happens beside the yacht",
    description:
      "Washdowns, checks, interior preparation, and yard presence — done in the field, so the yacht is ready before you arrive.",
  },
  problem: {
    title: "The problem field service solves",
    paragraphs: [
      "A yacht that looks ready and is not ready wastes the day you came for.",
      "Someone has to be on the dock for the tasks that cannot be done from an inbox: decks, interiors, rounds, lines, and the punch list a yard has to close.",
    ],
  },
  explanation: {
    title: "Hands on the vessel",
    paragraphs: [
      "Field service is the practical core of how Anzalone works. It covers the hands-on care that keeps the vessel presentable, checked, and prepared between your visits.",
      "You can use field service on its own, or inside a wider management program. Either way, the visit has a purpose, the work is checked, and you hear what was done.",
    ],
  },
  bullets: {
    title: "What this service covers",
    items: [
      "Weekly vessel washes and exterior washdowns",
      "Premium yacht detailing and presentation",
      "Interior preparation between uses",
      "Routine inspections with findings in plain language",
      "Dockside readiness before arrival or departure",
      "Maintenance coordination for work found on site",
      "Yard oversight when the vessel is hauled",
      "Operational support on the dock between uses",
    ],
  },
  benefits: {
    title: "What that means for you",
    items: [
      "Your yacht is prepared before you arrive.",
      "Routine care does not become your personal checklist.",
      "Findings are written down, not left unspoken.",
      "Field work can stand alone or sit inside a program.",
    ],
  },
  whyItMatters: {
    title: "Why the field work comes first",
    paragraphs: [
      "Management, crew, and yard projects still matter. They sit on top of this work. They do not replace it.",
      "Owners who travel need the short list finished before the flight, not after they step aboard.",
    ],
  },
  process: {
    title: "How a visit runs",
    steps: [
      {
        title: "Dates and location",
        description:
          "You tell us where the yacht is and when you need it. We confirm what can be done in that window.",
      },
      {
        title: "The work list",
        description:
          "Washdown, checks, interior, readiness, or yard items are agreed before anyone starts.",
      },
      {
        title: "On board",
        description:
          "The work is done at the dock or in the yard, and checked before it is called complete.",
      },
      {
        title: "The note",
        description:
          "You receive a plain account of what was finished and what should come next.",
      },
    ],
  },
  programs: {
    title: "How this relates to programs",
    description:
      "Field care is the ongoing rhythm built from this work. Full management adds vendors, crew alignment, and wider reporting on top of it.",
    links: [
      { label: "Routine Yacht Care", href: "/programs/field-care" },
      { label: "Managed Yacht Readiness", href: "/programs/management" },
      { label: "Maintenance & detailing", href: "/maintenance-detailing" },
    ],
  },
  faqs: [
    {
      question: "Is field service the same as yacht management?",
      answer:
        "No. Field service is the hands-on work on and beside the yacht. Management is the wider ongoing program that can include that work plus vendors, crew alignment, and reporting.",
    },
    {
      question: "Can I request a single visit?",
      answer:
        "Yes. Tell us the vessel, location, and dates. We will reply with whether a focused field visit is the right scope.",
    },
  ],
  supportingImage: "craft",
  supportingCaption: "Concept still. Not a documented Anzalone job.",
  cta: {
    title: "Tell us where the yacht is",
    description:
      "Share the vessel, the dock or yard, and the dates. We will reply personally with whether field service is the right scope.",
  },
};
