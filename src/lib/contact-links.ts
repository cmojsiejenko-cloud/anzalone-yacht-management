import { siteRoutes, serviceNavLinks } from "@/lib/navigation";
import { getProgram, programInquiryLabels } from "@/lib/programs";
import { serviceOptions } from "@/lib/vessel-review-form";

const allowedServices = new Set<string>(serviceOptions);

function labelForServiceSlug(slug: string): string | undefined {
  const normalized = slug.replace(/^\//, "");
  return serviceNavLinks.find((link) => link.href === `/${normalized}`)?.label;
}

/** Build `/contact?service=` so the vessel-review form can preselect a checklist item. */
export function contactHrefForService(slugOrLabel: string): string {
  const label = labelForServiceSlug(slugOrLabel) ?? slugOrLabel;
  if (!allowedServices.has(label)) {
    return siteRoutes.contact;
  }
  const serviceSlug = serviceNavLinks.find(
    (link) => link.label === label,
  )?.href.slice(1);
  return `${siteRoutes.contact}?service=${encodeURIComponent(
    serviceSlug ?? label,
  )}`;
}

/** Build `/contact?program=<slug>` (also accepted as `?service=`) to preselect interest. */
export function contactHrefForProgram(slug: string): string {
  const program = getProgram(slug);
  if (!program) {
    return `${siteRoutes.contact}?service=${encodeURIComponent("Programs")}`;
  }
  return `${siteRoutes.contact}?program=${encodeURIComponent(program.slug)}`;
}

/** Resolve `?service=`, `?services=`, or `?program=` into checklist labels. */
export function resolveInquiryServices(
  raw: string | string[] | undefined,
): string[] {
  const parts = (Array.isArray(raw) ? raw : raw ? [raw] : [])
    .flatMap((value) => value.split(","))
    .map((value) => value.trim())
    .filter(Boolean);

  const selected: string[] = [];
  for (const part of parts) {
    const fromServiceSlug = labelForServiceSlug(part);
    const fromProgram = getProgram(part);
    const label =
      fromServiceSlug ??
      fromProgram?.title ??
      (programInquiryLabels.includes(part) ? part : part);

    if (allowedServices.has(label) && !selected.includes(label)) {
      selected.push(label);
    }
  }
  return selected;
}

/** Merge service and program query params without dropping either. */
export function resolveContactInquiryParams(params: {
  service?: string | string[];
  services?: string | string[];
  program?: string | string[];
}): string[] {
  const fromService = resolveInquiryServices(
    params.service ?? params.services,
  );
  const fromProgram = resolveInquiryServices(params.program);
  const merged = [...fromService];
  for (const label of fromProgram) {
    if (!merged.includes(label)) merged.push(label);
  }
  return merged;
}
