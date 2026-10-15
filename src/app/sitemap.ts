import type { MetadataRoute } from "next";
import { careerRoles } from "@/lib/careers";
import { siteRoutes } from "@/lib/navigation";
import { programs } from "@/lib/programs";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const staticRoutes: { path: string; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number }[] = [
  { path: siteRoutes.home, changeFrequency: "weekly", priority: 1 },
  { path: siteRoutes.services, changeFrequency: "monthly", priority: 0.9 },
  { path: siteRoutes.fieldServices, changeFrequency: "monthly", priority: 0.9 },
  { path: siteRoutes.yachtManagement, changeFrequency: "monthly", priority: 0.85 },
  { path: siteRoutes.maintenanceDetailing, changeFrequency: "monthly", priority: 0.85 },
  { path: siteRoutes.captainCrew, changeFrequency: "monthly", priority: 0.8 },
  { path: siteRoutes.refitCustom, changeFrequency: "monthly", priority: 0.8 },
  { path: siteRoutes.brokerageSupport, changeFrequency: "monthly", priority: 0.8 },
  { path: siteRoutes.programs, changeFrequency: "monthly", priority: 0.85 },
  ...programs.map((program) => ({
    path: `${siteRoutes.programs}/${program.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  })),
  { path: siteRoutes.about, changeFrequency: "monthly", priority: 0.7 },
  { path: siteRoutes.careers, changeFrequency: "weekly", priority: 0.6 },
  ...careerRoles.map((role) => ({
    path: `${siteRoutes.careers}/${role.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  })),
  { path: siteRoutes.crew, changeFrequency: "monthly", priority: 0.8 },
  { path: siteRoutes.contact, changeFrequency: "monthly", priority: 0.9 },
  { path: siteRoutes.privacy, changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
