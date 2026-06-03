import { siteRoutes } from "./navigation";



export type ServicePageContent = {

  slug: string;

  path: string;

  metaTitle: string;

  metaDescription: string;

  hero: {

    eyebrow: string;

    title: string;

    description: string;

  };

  explanation: {

    title: string;

    paragraphs: string[];

  };

  bullets: {

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

  cta: {

    title: string;

    description: string;

  };

};



export const servicesContent: Record<string, ServicePageContent> = {

  "yacht-management": {

    slug: "yacht-management",

    path: siteRoutes.yachtManagement,

    metaTitle: "Yacht Management",

    metaDescription:

      "Owner-operated yacht management in South Florida, Annapolis, and the Chesapeake — readiness, maintenance oversight, vendor coordination, and clear reporting for owners who expect their vessel prepared.",

    hero: {

      eyebrow: "Yacht Management",

      title: "Management built on readiness, not paperwork",

      description:

        "One accountable operator runs your program — scheduling, vendors, crew alignment, and owner communication — so your yacht stays prepared between visits.",

    },

    explanation: {

      title: "One standard. One point of contact.",

      paragraphs: [

        "Yacht management at Anzalone is not a list of disconnected tasks. It is the framework that governs how your vessel is maintained, presented, secured, and prepared — whether you are aboard weekly or a few times a season.",

        "We coordinate yards, specialists, and crew to documented standards, with budgets and schedules you can review and decisions you can trust. Reporting is clear. You speak with the person responsible for outcomes — not a rotating account team.",

        "Owners engage us when they want professional discipline without losing visibility or control. Your yacht stays ready because the system behind it was built that way.",

      ],

    },

    bullets: {

      title: "What we oversee",

      items: [

        "Annual operating plans, budgets, and vendor relationships",

        "Maintenance scheduling, yard selection, and quality oversight",

        "Crew coordination, standards documentation, and performance alignment",

        "Pre-arrival readiness — systems, cosmetics, provisions, and security",

        "Insurance, compliance, and documentation coordination",

        "Owner reporting with findings, priorities, and next steps stated plainly",

      ],

    },

    whyItMatters: {

      title: "Why it matters",

      paragraphs: [

        "A yacht at the dock is still aging. Management exists to protect your capital, preserve resale credibility, and align every visit with what you expect when you step aboard.",

        "When oversight is fragmented, owners become the project manager — chasing vendors, reconciling invoices, and finding problems on arrival. We remove that burden and keep you informed at the level you prefer: summary or detail, always direct.",

      ],

    },

    process: {

      title: "How we begin",

      steps: [

        {

          title: "Readiness review",

          description:

            "We assess current condition, documentation, crew structure, and how you use the vessel to establish a baseline.",

        },

        {

          title: "Program design",

          description:

            "Scope, standards, reporting cadence, and vendor roster are defined around your calendar — not a generic template.",

        },

        {

          title: "Onboarding",

          description:

            "Access, contacts, and workflows are organized so work begins immediately, without a lengthy ramp-up.",

        },

        {

          title: "Ongoing stewardship",

          description:

            "Scheduled oversight, pre-arrival preparation, and steady improvement keep readiness predictable year-round.",

        },

      ],

    },

    cta: {

      title: "Discuss your management program",

      description:

        "Share your vessel, home port, and what ready means to you. You will hear from us personally with a clear path forward.",

    },

  },

  "maintenance-detailing": {

    slug: "maintenance-detailing",

    path: siteRoutes.maintenanceDetailing,

    metaTitle: "Maintenance & Detailing",

    metaDescription:

      "Yacht maintenance and yacht detailing in South Florida and the Chesapeake — planned care, corrective work, and presentation standards supervised to owner expectations.",

    hero: {

      eyebrow: "Maintenance & Detailing",

      title: "Care and presentation that protect value",

      description:

        "From planned service intervals to show-deck finish, we scope, schedule, and supervise work so your vessel stays reliable, current, and impeccably presented.",

    },

    explanation: {

      title: "Technical care with an owner's eye for finish",

      paragraphs: [

        "Maintenance without oversight becomes expensive guesswork. Detailing without standards becomes inconsistent. We coordinate both under one approach — qualified vendors, clear scope, and results verified before you are told the job is complete.",

        "Planned maintenance keeps systems within manufacturer and class expectations. Interior and exterior care ensures every arrival, guest weekend, or market showing reflects the asset beneath the surface.",

        "Whether work sits inside your management program or as a focused engagement, the objective is the same: fewer surprises, shorter downtime, and a vessel that looks as capable as it is.",

      ],

    },

    bullets: {

      title: "Scope includes",

      items: [

        "Planned maintenance calendars and service interval tracking",

        "Corrective repairs — mechanical, electrical, plumbing, and cosmetic",

        "Exterior washdowns, waxing, teak care, and metal polishing programs",

        "Interior deep cleaning, leather and fabric care, and galley standards",

        "Pre-arrival and post-departure turnover detailing",

        "Yard supervision, punch lists, and close-out documentation",

      ],

    },

    whyItMatters: {

      title: "Why it matters",

      paragraphs: [

        "Deferred maintenance compounds quietly — failed systems, voided warranties, and emergency yard visits that cost far more than planned work. Presentation lapses signal that the yacht is available, not cared for.",

        "Owners who travel often need a partner who treats readiness as a deadline. We schedule ahead, report honestly, and correct issues before they reach you.",

      ],

    },

    process: {

      title: "Our approach",

      steps: [

        {

          title: "Condition audit",

          description:

            "Systems, cosmetics, and open items are documented to prioritize what protects operation and appearance.",

        },

        {

          title: "Schedule & scope",

          description:

            "Work is sequenced around your use calendar and paired with qualified vendors.",

        },

        {

          title: "Supervised execution",

          description:

            "We are present for critical phases, verify completion, and record findings in clear owner language.",

        },

        {

          title: "Turnover standard",

          description:

            "Every cycle ends with a readiness check — not an invoice alone — so you know what was done and what comes next.",

        },

      ],

    },

    cta: {

      title: "Plan your next service cycle",

      description:

        "Tell us about your vessel and upcoming dates. We will outline maintenance and detailing priorities with realistic timing.",

    },

  },

  "captain-crew-services": {

    slug: "captain-crew-services",

    path: siteRoutes.captainCrew,

    metaTitle: "Captain & Crew Services",

    metaDescription:

      "Captain services — placement, crew leadership, training, and operational coordination aligned to owner standards and vessel readiness in South Florida and Annapolis.",

    hero: {

      eyebrow: "Captain & Crew",

      title: "Crew leadership aligned to how you run your yacht",

      description:

        "From captain advisory to daily operational standards, we help your team perform with clarity, accountability, and appropriate discretion.",

    },

    explanation: {

      title: "The right people, trained to your standard",

      paragraphs: [

        "A capable crew is recruited, trained, and led against expectations that are written, communicated, and enforced. We support owners who want professional operations without becoming HR, payroll, and conflict resolution on every visit.",

        "Our involvement ranges from captain advisory and crew audits to full alignment with your management program. We document standards for housekeeping, engineering rounds, guest service, and security so performance is measurable — not subjective.",

        "When crew and management share one playbook, readiness stops being negotiated between departments and becomes the normal state of the vessel.",

      ],

    },

    bullets: {

      title: "Support includes",

      items: [

        "Captain selection support and leadership assessment",

        "Crew structure recommendations by vessel size and use profile",

        "Standard operating procedures and checklist development",

        "Training plans for engineering, deck, and interior teams",

        "Conflict resolution and performance management guidance",

        "Coordination with yards, vendors, and owner representatives",

      ],

    },

    whyItMatters: {

      title: "Why it matters",

      paragraphs: [

        "Crew turnover and unclear authority erode value and owner confidence quickly. A yacht run without documented standards depends on whoever is aboard that week — a risk busy owners cannot carry.",

        "Strong leadership protects your asset, your guests, and your reputation. We help you build and maintain it with the same rigor we apply to maintenance and management.",

      ],

    },

    process: {

      title: "Engagement path",

      steps: [

        {

          title: "Operational assessment",

          description:

            "We review crew roster, reporting lines, and current SOPs against your use pattern and expectations.",

        },

        {

          title: "Standards alignment",

          description:

            "Gaps are documented; priorities are set for training, hiring, or leadership changes as needed.",

        },

        {

          title: "Implementation",

          description:

            "Checklists, meeting rhythms, and vendor interfaces are established so the team operates consistently.",

        },

        {

          title: "Ongoing oversight",

          description:

            "Regular check-ins and readiness reviews keep performance visible to you and accountable on board.",

        },

      ],

    },

    cta: {

      title: "Strengthen your on-board team",

      description:

        "Describe your crew structure and challenges. We will recommend a practical scope — advisory or fully integrated.",

    },

  },

  "refit-custom-work": {

    slug: "refit-custom-work",

    path: siteRoutes.refitCustom,

    metaTitle: "Refit & Custom Work",

    metaDescription:

      "Refit and custom project oversight — yard selection, scope control, and quality management from specification through sea trial.",

    hero: {

      eyebrow: "Refit & Custom Work",

      title: "Refit and custom work with scope discipline",

      description:

        "Structural, cosmetic, and systems upgrades require more than intent. We represent your interests from specification through sea trial.",

    },

    explanation: {

      title: "Your representative in the yard",

      paragraphs: [

        "Refit projects fail quietly — through scope creep, ambiguous contracts, and absent owner-side oversight. We define what success looks like, select yards and trades qualified for the work, and stay present when it matters.",

        "Whether you are refreshing interiors, repowering, extending range, or correcting legacy issues, we translate your objectives into manageable phases with budgets, milestones, and quality gates you can follow without living in the shipyard.",

        "Custom work should elevate the asset, not become a story you explain at resale. Our role is to keep it the former.",

      ],

    },

    bullets: {

      title: "Project oversight",

      items: [

        "Feasibility review and yard or shipyard selection",

        "Scope development, specifications, and bid comparison",

        "Contract review support and change-order discipline",

        "On-site supervision and quality inspections",

        "Systems commissioning and sea-trial coordination",

        "Close-out documentation, warranties, and as-built records",

      ],

    },

    whyItMatters: {

      title: "Why it matters",

      paragraphs: [

        "A refit is among the largest capital events in yacht ownership. Without independent oversight, owners pay for delays and rework that yards treat as routine. The finished product may look complete while systems beneath remain compromised.",

        "Disciplined project management protects schedule, budget, and technical integrity — so the vessel returns to service genuinely improved, not merely different.",

      ],

    },

    process: {

      title: "Project phases",

      steps: [

        {

          title: "Define & budget",

          description:

            "Objectives, constraints, and realistic cost bands are established before yard conversations begin.",

        },

        {

          title: "Select & contract",

          description:

            "Bids are compared on substance; contracts reflect milestones, standards, and remedies.",

        },

        {

          title: "Build & verify",

          description:

            "We monitor progress, challenge deviations early, and document work for your records.",

        },

        {

          title: "Deliver & transition",

          description:

            "Commissioning, trials, and handover integrate the upgrade into your ongoing program.",

        },

      ],

    },

    cta: {

      title: "Discuss your refit or custom project",

      description:

        "Share your vision and timeline. We will advise on scope, yard fit, and how to protect your investment through delivery.",

    },

  },

  "brokerage-support": {

    slug: "brokerage-support",

    path: siteRoutes.brokerageSupport,

    metaTitle: "Brokerage Support",

    metaDescription:

      "Brokerage yacht preparation — conditioning, documentation, and show-ready presentation that reflects true vessel value before listing.",

    hero: {

      eyebrow: "Brokerage Support",

      title: "Brokerage support that shows what the yacht is worth",

      description:

        "Conditioning, documentation, and show-ready standards so buyers see care and capability — not deferred work and excuses.",

    },

    explanation: {

      title: "Presentation backed by substance",

      paragraphs: [

        "The market rewards yachts that look maintained because they are maintained. Brokerage support at Anzalone bridges cosmetics and credibility — addressing what buyers notice and what surveyors will examine.",

        "We work alongside your broker or lead preparation independently: cosmetic refresh, mechanical diligence, records organization, and sea-trial readiness. The goal is not to hide flaws but to eliminate preventable ones that weaken offers.",

        "Owners who have managed through us often move to sale with documentation already in order — shortening time to listing and strengthening position at the table.",

      ],

    },

    bullets: {

      title: "Preparation includes",

      items: [

        "Condition assessment and prioritized punch list for market",

        "Exterior and interior detailing to brokerage presentation standard",

        "Mechanical and systems checks with findings documented",

        "Maintenance history, manuals, and compliance file organization",

        "Staging for photography, showings, and sea trials",

        "Coordination with listing broker on timing and showings",

      ],

    },

    whyItMatters: {

      title: "Why it matters",

      paragraphs: [

        "Days on market and final price are shaped long before a buyer steps aboard. Vessels that show neglect — cosmetically or technically — invite low offers and difficult surveys. Preparation is leverage.",

        "We help you enter the market once, positioned correctly, with a story supported by evidence rather than optimism.",

      ],

    },

    process: {

      title: "Path to listing",

      steps: [

        {

          title: "Market readiness review",

          description:

            "We identify what affects value, survey risk, and first impression — ranked by impact and cost.",

        },

        {

          title: "Execute preparation",

          description:

            "Cosmetic, mechanical, and documentation work is completed on a defined schedule toward listing.",

        },

        {

          title: "Verify & package",

          description:

            "Records and condition summaries are organized for broker and buyer due diligence.",

        },

        {

          title: "Support through sale",

          description:

            "Sea trials, showings, and post-survey items are coordinated until handover is clean.",

        },

      ],

    },

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

