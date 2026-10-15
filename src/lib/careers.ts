export type CareerDepartment = {
  slug: string;
  title: string;
  description: string;
};

export type CareerEmploymentType =
  | "Full-time"
  | "Part-time"
  | "Seasonal"
  | "Contract"
  | "Other";

export type CareerRole = {
  slug: string;
  title: string;
  /** Matches a CareerDepartment.slug */
  department: string;
  location: string;
  employmentType: CareerEmploymentType;
  summary: string;
  description: string[];
  responsibilities: string[];
  qualifications: string[];
  /** Only `active` roles appear in the public listings. */
  status: "active" | "closed";
};

/**
 * Category presentation for Anzalone careers.
 * Do not add accounting, sales, app, or payment-processing tracks.
 */
export const careerDepartments: CareerDepartment[] = [
  {
    slug: "field-service",
    title: "Field Service & Marine Operations",
    description:
      "Hands-on dockside work: washdowns, detailing, systems checks, readiness, and time alongside the vessel.",
  },
  {
    slug: "captain-crew",
    title: "Captain & Crew",
    description:
      "On-board leadership and crew support aligned to owner standards and vessel readiness.",
  },
  {
    slug: "yacht-management",
    title: "Yacht Management & Coordination",
    description:
      "Scheduling, vendor coordination, owner reporting, and program oversight.",
  },
  {
    slug: "other",
    title: "Other opportunities",
    description:
      "Approved roles outside the primary field and management tracks, when published.",
  },
];

/**
 * Empty until the owner publishes a real opening.
 * Do not seed sample jobs or invent vacancies.
 */
export const careerRoles: CareerRole[] = [];

export const generalCareerInterests = [
  { value: "field-service", label: "Field Service & Marine Operations" },
  { value: "captain-crew", label: "Captain & Crew" },
  { value: "yacht-management", label: "Yacht Management & Coordination" },
  { value: "other", label: "Other" },
  { value: "general", label: "General interest" },
] as const;

export function getCareerRole(slug: string): CareerRole | undefined {
  return careerRoles.find((role) => role.slug === slug);
}

export function getActiveCareerRoles(): CareerRole[] {
  return careerRoles.filter((role) => role.status === "active");
}

export function getActiveRolesByDepartment(departmentSlug: string): CareerRole[] {
  return getActiveCareerRoles().filter(
    (role) => role.department === departmentSlug,
  );
}

export function isAllowedCareerInterest(value: string): boolean {
  if (generalCareerInterests.some((item) => item.value === value)) return true;
  return careerRoles.some(
    (role) => role.slug === value && role.status === "active",
  );
}

export function careerInterestLabel(value: string): string {
  const general = generalCareerInterests.find((item) => item.value === value);
  if (general) return general.label;
  return getCareerRole(value)?.title ?? value;
}
