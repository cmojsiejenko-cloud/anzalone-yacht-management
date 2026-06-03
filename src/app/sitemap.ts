import type { MetadataRoute } from "next";
import { siteRoutes } from "@/lib/navigation";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const staticRoutes: { path: string; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number }[] = [
  { path: siteRoutes.home, changeFrequency: "weekly", priority: 1 },
  { path: siteRoutes.yachtManagement, changeFrequency: "monthly", priority: 0.9 },
  { path: siteRoutes.maintenanceDetailing, changeFrequency: "monthly", priority: 0.85 },
  { path: siteRoutes.captainCrew, changeFrequency: "monthly", priority: 0.85 },
  { path: siteRoutes.refitCustom, changeFrequency: "monthly", priority: 0.8 },
  { path: siteRoutes.brokerageSupport, changeFrequency: "monthly", priority: 0.85 },
  { path: siteRoutes.about, changeFrequency: "monthly", priority: 0.7 },
  { path: siteRoutes.contact, changeFrequency: "monthly", priority: 0.9 },
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
