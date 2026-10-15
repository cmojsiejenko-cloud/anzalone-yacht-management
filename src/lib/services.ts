import type { SiteImageKey } from "@/lib/images";
import { siteRoutes } from "@/lib/navigation";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServicePageContent = {
  slug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  /** Exact vessel-review checklist label, or a route slug for `?service=`. */
  inquiryService: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  /** Concise statement of the problem being solved. */
  problem: {
    title: string;
    paragraphs: string[];
  };
  explanation: {
    title: string;
    paragraphs: string[];
  };
  bullets: {
    title: string;
    items: string[];
  };
  benefits: {
    title: string;
    items: string[];
  };
  whyItMatters: {
    title: string;
    paragraphs: string[];
  };
  process: {
    title: string;
    steps: { title: string; description: string }[];
  };
  programs: {
    title: string;
    description: string;
    links: { label: string; href: string }[];
  };
  faqs?: ServiceFaq[];
  /** Optional mid-page still from the approved image registry. */
  supportingImage?: SiteImageKey;
  supportingCaption?: string;
  cta: {
    title: string;
    description: string;
  };
  /** Optional secondary action besides the contact form. */
  secondaryCta?: {
    label: string;
    href: string;
  };
};

export const servicesContent: Record<string, ServicePageContent> = {
  "yacht-management": {
    slug: "yacht-management",
    path: siteRoutes.yachtManagement,
    inquiryService: "yacht-management",
    metaTitle: "Yacht Management",
    metaDescription:
      "Owner-operated yacht management with one accountable point of contact — readiness, maintenance oversight, vendor coordination, and clear reporting.",
    hero: {
      eyebrow: "Yacht Management",
      title: "One person accountable for the yacht",
      description:
        "Scheduling, vendors, crew alignment, and owner communication stay with a single operator — so the vessel is prepared between visits.",
    },
    problem: {
      title: "The problem management solves",
      paragraphs: [
        "Without a clear operator, the owner becomes the project manager: chasing vendors, reconciling calendars, and discovering issues on arrival.",
        "Management exists so that work has an owner, a rhythm, and a plain report of what was done.",
      ],
    },
    explanation: {
      title: "A program, not a pile of tasks",
      paragraphs: [
        "Yacht management at Anzalone is the framework for how the vessel is maintained, presented, and prepared — whether you are aboard often or only a few times a season.",
        "Field work still happens on the dock. Management is how that work, and everything around it, is planned and reported without unnecessary demands on your time.",
      ],
    },
    bullets: {
      title: "What this service covers",
      items: [
        "Operating rhythm, scheduling, and vendor coordination",
        "Maintenance oversight and yard selection",
        "Crew alignment to a written standard",
        "Pre-arrival readiness — systems, presentation, and security checks",
        "Documentation kept in order for the work performed",
        "Owner reporting with findings and next steps stated plainly",
      ],
    },
    benefits: {
      title: "What that means for you",
      items: [
        "Your yacht is prepared before you arrive.",
        "Maintenance is coordinated without unnecessary demands on your time.",
        "One accountable point of contact.",
        "You keep visibility — summary or detail — without running the dock yourself.",
      ],
    },
    whyItMatters: {
      title: "Why it matters",
      paragraphs: [
        "A yacht at the dock is still aging. Management protects the asset and the days you came for by keeping readiness predictable.",
        "When oversight is fragmented, problems surface as surprises. When one person is accountable, they surface as notes you can act on.",
      ],
    },
    process: {
      title: "How work is coordinated",
      steps: [
        {
          title: "Readiness review",
          description:
            "Condition, documentation, and how you use the vessel establish a baseline.",
        },
        {
          title: "Program design",
          description:
            "Scope, standards, and reporting follow your calendar — not a generic template.",
        },
        {
          title: "Onboarding",
          description:
            "Access, contacts, and the first work list are organized so work can begin.",
        },
        {
          title: "Ongoing stewardship",
          description:
            "Scheduled oversight and pre-arrival preparation keep the vessel ready year-round.",
        },
      ],
    },
    programs: {
      title: "How this relates to programs",
      description:
        "Yacht management is the wider ongoing program. Field care can sit inside it, or stand alone when you only need dockside rhythm.",
      links: [
        { label: "Managed Yacht Readiness", href: "/programs/management" },
        { label: "Routine Yacht Care", href: "/programs/field-care" },
        { label: "All programs", href: "/programs" },
      ],
    },
    faqs: [
      {
        question: "Is management the same as calling for a washdown?",
        answer:
          "No. A washdown or check can be field service on its own. Management is the ongoing arrangement that plans that work, vendors, and reporting together.",
      },
      {
        question: "Will I still know what is happening on the yacht?",
        answer:
          "Yes. Reporting is part of the program. You choose how much detail you want, and you speak with the person responsible for outcomes.",
      },
    ],
    supportingImage: "aftDeck",
    supportingCaption:
      "Concept still. Not a documented Anzalone vessel.",
    cta: {
      title: "Discuss your management program",
      description:
        "Share your vessel, home port, and what ready means to you. We reply personally with a clear path forward.",
    },
  },

  "maintenance-detailing": {
    slug: "maintenance-detailing",
    path: siteRoutes.maintenanceDetailing,
    inquiryService: "maintenance-detailing",
    metaTitle: "Maintenance & Detailing",
    metaDescription:
      "Yacht maintenance and detailing — planned care, corrective work, washdowns, interior preparation, and yard oversight held to a clear presentation standard.",
    hero: {
      eyebrow: "Maintenance & Detailing",
      title: "Care and finish that stay on schedule",
      description:
        "Planned service, corrective work, and presentation standards — scoped and supervised so the yacht stays reliable and ready to show.",
    },
    problem: {
      title: "The problem this solves",
      paragraphs: [
        "Deferred maintenance becomes emergency yard time. Inconsistent detailing becomes a yacht that never quite looks ready.",
        "Owners need both technical care and presentation held to one standard, with someone checking the work before it is called complete.",
      ],
    },
    explanation: {
      title: "Technical care with an eye for finish",
      paragraphs: [
        "We coordinate planned intervals, corrective repairs, exterior care, and interior preparation under one approach.",
        "Whether the work sits inside a management program or stands as a focused engagement, the objective is the same: fewer surprises and a vessel that looks as capable as it is.",
      ],
    },
    bullets: {
      title: "What this service covers",
      items: [
        "Premium yacht detailing — exterior and interior",
        "Weekly washes, waxing, teak care, and metal work",
        "Major and minor fiberglass and cosmetic repairs (scoped with qualified trades when required)",
        "Marine air-conditioning repair or replacement coordination",
        "Planned maintenance calendars and service interval tracking",
        "Pre-arrival and post-departure preparation",
        "Yard oversight, punch lists, and close-out notes",
      ],
    },
    benefits: {
      title: "What that means for you",
      items: [
        "Maintenance is coordinated without unnecessary demands on your time.",
        "Presentation is held to a standard you can expect on arrival.",
        "Work is checked before it is reported as finished.",
        "Open items are written down, not left as surprises.",
      ],
    },
    whyItMatters: {
      title: "Why it matters",
      paragraphs: [
        "Planned care costs less than emergency work and protects the days you intend to use the yacht.",
        "Presentation is not decoration alone. It is how guests, surveyors, and buyers read the condition of the asset.",
      ],
    },
    process: {
      title: "How work is coordinated",
      steps: [
        {
          title: "Condition audit",
          description:
            "Systems, cosmetics, and open items are documented and prioritized.",
        },
        {
          title: "Schedule and scope",
          description:
            "Work is sequenced around your use calendar and paired with the right vendors.",
        },
        {
          title: "Supervised execution",
          description:
            "Critical phases are checked, and findings are recorded in plain language.",
        },
        {
          title: "Turnover note",
          description:
            "Each cycle ends with what was done and what should come next — not an invoice alone.",
        },
      ],
    },
    programs: {
      title: "How this relates to programs",
      description:
        "Maintenance and detailing often sit inside field care or a wider management program. They can also be engaged for a defined service cycle.",
      links: [
        { label: "Routine Yacht Care", href: "/programs/field-care" },
        { label: "Managed Yacht Readiness", href: "/programs/management" },
        { label: "Field services", href: "/field-services" },
      ],
    },
    faqs: [
      {
        question: "Can I request detailing without full management?",
        answer:
          "Yes. Field services and maintenance work can stand alone. Management is available when you want that work held inside an ongoing rhythm.",
      },
      {
        question: "Do you claim manufacturer paint certifications?",
        answer:
          "Specialized coatings and manufacturer certifications are confirmed case by case before they are published as current credentials. Licensed or partner trades are used when the work requires them.",
      },
    ],
    supportingImage: "preparation",
    supportingCaption:
      "Concept still. Not Anzalone staff and not a company uniform.",
    cta: {
      title: "Plan your next service cycle",
      description:
        "Tell us about the vessel and your upcoming dates. We will outline maintenance and detailing priorities with realistic timing.",
    },
  },

  "captain-crew-services": {
    slug: "captain-crew-services",
    path: siteRoutes.captainCrew,
    inquiryService: "captain-crew-services",
    metaTitle: "Captain & Crew Services",
    metaDescription:
      "Captain and crew alignment for yacht owners — standards, leadership support, and operational coordination. Crew support requests are submitted separately.",
    hero: {
      eyebrow: "Captain & Crew",
      title: "Crew aligned to how you run the yacht",
      description:
        "Leadership support, written standards, and operational coordination so the people on board work to one playbook.",
    },
    problem: {
      title: "The problem this solves",
      paragraphs: [
        "Without clear authority and written standards, readiness depends on whoever is aboard that week.",
        "Owners should not have to become HR, conflict resolution, and operations on every visit.",
      ],
    },
    explanation: {
      title: "Standards first, then the people",
      paragraphs: [
        "This page explains how Anzalone supports captain leadership and crew alignment as part of yacht care.",
        "If you need to request captain, deck, or interior support for a date range, use the crew request form. That request is emailed to the company. It does not confirm availability or a rate.",
      ],
    },
    bullets: {
      title: "What this service covers",
      items: [
        "Captain advisory and leadership assessment support",
        "Crew structure recommendations by vessel use",
        "Standard operating procedures and checklist development",
        "Training plans for deck, engineering, and interior work",
        "Performance guidance and clear reporting lines",
        "Coordination with yards, vendors, and owner representatives",
      ],
    },
    benefits: {
      title: "What that means for you",
      items: [
        "One accountable point of contact for crew standards.",
        "Expectations are written, not left to memory.",
        "Readiness stops being renegotiated between departments.",
        "You can request support through a separate, honest form when needed.",
      ],
    },
    whyItMatters: {
      title: "Why it matters",
      paragraphs: [
        "Crew turnover and unclear authority erode owner confidence quickly.",
        "Strong leadership protects the asset and the guests. We help you build and keep that standard with the same rigor applied to maintenance and management.",
      ],
    },
    process: {
      title: "How work is coordinated",
      steps: [
        {
          title: "Operational assessment",
          description:
            "Roster, reporting lines, and current procedures are reviewed against how you use the yacht.",
        },
        {
          title: "Standards alignment",
          description:
            "Gaps are documented. Priorities are set for training, structure, or leadership support.",
        },
        {
          title: "Implementation",
          description:
            "Checklists and meeting rhythms are established so the team operates consistently.",
        },
        {
          title: "Ongoing oversight",
          description:
            "Regular check-ins keep performance visible to you and accountable on board.",
        },
      ],
    },
    programs: {
      title: "How this relates to programs",
      description:
        "Crew alignment often sits inside a management program. Standalone crew support requests go through the crew page.",
      links: [
        { label: "Managed Yacht Readiness", href: "/programs/management" },
        { label: "Request crew support", href: "/contact?service=Crew%20support" },
      ],
    },
    faqs: [
      {
        question: "Does this page book a captain for a weekend?",
        answer:
          "No. Use the contact form with Crew support selected, or email the company. That request is not a booking confirmation. The /crew page is for expense reports only.",
      },
      {
        question: "Do you publish day rates?",
        answer:
          "No. Rates are not listed on this site. Scope and cost are discussed directly when a request is appropriate.",
      },
    ],
    supportingImage: "departure",
    supportingCaption:
      "Concept still. Not a documented Anzalone vessel or captain.",
    cta: {
      title: "Strengthen the on-board team",
      description:
        "Describe your crew structure and what is not working. We will recommend a practical scope — advisory or integrated with management.",
    },
    secondaryCta: {
      label: "Request Crew Support",
      href: "/contact?service=Crew%20support",
    },
  },

  "refit-custom-work": {
    slug: "refit-custom-work",
    path: siteRoutes.refitCustom,
    inquiryService: "refit-custom-work",
    metaTitle: "Refit & Custom Work",
    metaDescription:
      "Refit and custom yacht project oversight — scope control, yard selection, on-site supervision, and close-out documentation from specification through delivery.",
    hero: {
      eyebrow: "Refit & Custom Work",
      title: "Yard work with an owner-side representative",
      description:
        "Structural, cosmetic, and systems projects need more than intent. We represent your interests from specification through delivery.",
    },
    problem: {
      title: "The problem this solves",
      paragraphs: [
        "Refit projects fail quietly through unclear scope, weak change control, and absent owner-side oversight.",
        "Owners need someone present for the phases that matter, with milestones and notes they can follow without living in the yard.",
      ],
    },
    explanation: {
      title: "Your representative in the yard",
      paragraphs: [
        "We help define what success looks like, compare yards and trades for the work, and stay present when decisions affect schedule, cost, or quality.",
        "Custom work should strengthen the yacht. Our role is to keep the project documented and controlled through close-out.",
      ],
    },
    bullets: {
      title: "What this service covers",
      items: [
        "Electronics, LED lighting, and custom stereo / television installations (with qualified trades when required)",
        "Interior design support, custom yacht furniture, window treatments, and cushion replacement",
        "Fiberglass and cosmetic project coordination",
        "Feasibility review and yard selection support",
        "Scope development, specifications, and bid comparison",
        "On-site supervision during critical phases",
        "Systems commissioning and sea-trial coordination",
        "Close-out notes, warranties, and as-built records",
      ],
    },
    benefits: {
      title: "What that means for you",
      items: [
        "Scope is written before work expands quietly.",
        "Someone represents your interests when the yard is busy.",
        "You receive plain updates at the milestones that matter.",
        "The vessel returns to service with the work documented.",
      ],
    },
    whyItMatters: {
      title: "Why it matters",
      paragraphs: [
        "A refit is among the largest capital events in yacht ownership. Without independent oversight, delays and rework become routine costs.",
        "Disciplined project management protects schedule, budget, and technical integrity so the vessel returns genuinely improved.",
      ],
    },
    process: {
      title: "How work is coordinated",
      steps: [
        {
          title: "Define and budget",
          description:
            "Objectives, constraints, and realistic cost bands are set before yard conversations begin.",
        },
        {
          title: "Select and contract",
          description:
            "Bids are compared on substance. Contracts reflect milestones and standards.",
        },
        {
          title: "Build and verify",
          description:
            "Progress is monitored, deviations are challenged early, and work is documented.",
        },
        {
          title: "Deliver and transition",
          description:
            "Commissioning and handover integrate the upgrade into ongoing care.",
        },
      ],
    },
    programs: {
      title: "How this relates to programs",
      description:
        "Refit and custom work usually sit under the projects program — a defined engagement, not a standing management contract.",
      links: [
        { label: "Project Oversight", href: "/programs/projects" },
        { label: "Yacht management", href: "/yacht-management" },
      ],
    },
    faqs: [
      {
        question: "Do you perform the yard trades yourselves?",
        answer:
          "We oversee and coordinate. Qualified yards and trades perform specialized work when licensing or manufacturer authorization is required. Our role is owner-side representation and quality control.",
      },
    ],
    supportingImage: "craft",
    supportingCaption:
      "Concept still. Not a documented Anzalone refit.",
    cta: {
      title: "Discuss your refit or custom project",
      description:
        "Share your vision and timeline. We will advise on scope, yard fit, and how to protect the investment through delivery.",
    },
  },

  "brokerage-support": {
    slug: "brokerage-support",
    path: siteRoutes.brokerageSupport,
    inquiryService: "brokerage-support",
    metaTitle: "Brokerage Support",
    metaDescription:
      "Brokerage yacht preparation — conditioning, documentation, and show-ready presentation coordinated alongside your listing broker.",
    hero: {
      eyebrow: "Brokerage Support",
      title: "Show the yacht as it is cared for",
      description:
        "Conditioning, records, and presentation standards so buyers see care and capability — not deferred work.",
    },
    problem: {
      title: "The problem this solves",
      paragraphs: [
        "Days on market and final price are shaped before a buyer steps aboard.",
        "Cosmetic neglect and missing records invite low offers and difficult surveys. Preparation protects the sale.",
      ],
    },
    explanation: {
      title: "Preparation beside your broker",
      paragraphs: [
        "Anzalone does not list yachts for sale. We prepare the vessel and its documentation so your listing broker can present a credible, show-ready asset.",
        "Work can include cosmetic refresh, systems checks, records organization, and coordination for photography, showings, and sea trials.",
      ],
    },
    bullets: {
      title: "What this service covers",
      items: [
        "Condition assessment and a prioritized market punch list",
        "Exterior and interior detailing to a show standard",
        "Systems checks with findings documented",
        "Maintenance history and manual organization",
        "Staging support for photography and showings",
        "Coordination with your listing broker on timing",
      ],
    },
    benefits: {
      title: "What that means for you",
      items: [
        "The yacht shows care because the care was done.",
        "Records are ready for due diligence.",
        "Preventable survey issues are addressed before listing.",
        "Your broker remains the listing authority.",
      ],
    },
    whyItMatters: {
      title: "Why it matters",
      paragraphs: [
        "Buyers and surveyors read condition quickly. Preparation strengthens position at the table.",
        "Owners who have kept documentation current often move to market faster, with fewer last-minute surprises.",
      ],
    },
    process: {
      title: "How work is coordinated",
      steps: [
        {
          title: "Market readiness review",
          description:
            "What affects first impression, survey risk, and value is ranked by impact.",
        },
        {
          title: "Execute preparation",
          description:
            "Cosmetic, mechanical, and documentation work follows a defined schedule toward listing.",
        },
        {
          title: "Verify and package",
          description:
            "Records and condition notes are organized for broker and buyer review.",
        },
        {
          title: "Support through sale",
          description:
            "Showings, sea trials, and post-survey items are coordinated until handover is clean.",
        },
      ],
    },
    programs: {
      title: "How this relates to programs",
      description:
        "Brokerage preparation sits under the projects program. Ongoing management often makes the move to market smoother because records already exist.",
      links: [
        { label: "Project Oversight", href: "/programs/projects" },
        { label: "Yacht management", href: "/yacht-management" },
      ],
    },
    faqs: [
      {
        question: "Are you a yacht broker?",
        answer:
          "No. We prepare the vessel and documentation. Your listing broker remains responsible for listing, marketing, and the sale.",
      },
    ],
    supportingImage: "cruise",
    supportingCaption:
      "Concept still. Not a listing Anzalone prepared.",
    cta: {
      title: "Prepare your yacht for market",
      description:
        "Tell us your target listing window. We will outline preparation scope and timing to strengthen presentation and buyer confidence.",
    },
  },
};

export function getServiceBySlug(slug: string): ServicePageContent | undefined {
  return servicesContent[slug];
}

export const allServiceSlugs = Object.keys(servicesContent);

/** The five approved service groups, in display order, excluding field services. */
export const primaryServiceSlugs = [
  "yacht-management",
  "maintenance-detailing",
  "captain-crew-services",
  "refit-custom-work",
  "brokerage-support",
] as const;
