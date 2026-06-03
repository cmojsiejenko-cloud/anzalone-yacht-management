import type { Metadata } from "next";

/** Public site URL — set NEXT_PUBLIC_SITE_URL in production (e.g. https://anzaloneyacht.com) */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.anzaloneyacht.com";

export const siteName = "Anzalone Yacht Management";

export const defaultDescription =
  "Owner-operated yacht management in South Florida, Annapolis, and the Chesapeake — vessel readiness, yacht maintenance, detailing, captain services, and brokerage yacht preparation.";

/** Primary SEO keywords woven into titles, copy, and metadata */
export const targetKeywords = [
  "yacht management",
  "yacht management Annapolis",
  "Chesapeake yacht management",
  "yacht maintenance",
  "yacht detailing",
  "captain services",
  "brokerage yacht preparation",
  "South Florida yacht management",
] as const;

export const siteConfig = {
  name: siteName,
  url: siteUrl,
  description: defaultDescription,
  keywords: [...targetKeywords],
  locale: "en_US",
  email: "info@anzaloneyacht.com",
  telephone: undefined as string | undefined,
  ogImagePath: "/opengraph-image",
  twitterHandle: undefined as string | undefined,
} as const;

export type PageMetadataInput = {
  /** Short page title (layout template appends site name unless absoluteTitle is set) */
  title: string;
  description: string;
  /** Path including leading slash, e.g. `/yacht-management` */
  path: string;
  /** Extra keywords for this page only */
  keywords?: string[];
  /** Use for homepage to avoid double branding in `<title>` */
  absoluteTitle?: string;
  noIndex?: boolean;
};

function pageUrl(path: string): string {
  const normalized = path === "/" ? "" : path;
  return `${siteConfig.url}${normalized}`;
}

function ogImageUrl(): string {
  return `${siteConfig.url}${siteConfig.ogImagePath}`;
}

/**
 * Consistent Next.js Metadata with Open Graph, Twitter, and canonical URL.
 */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const {
    title,
    description,
    path,
    keywords = [],
    absoluteTitle,
    noIndex = false,
  } = input;

  const canonical = pageUrl(path);
  const ogTitle = absoluteTitle ?? `${title} | ${siteName}`;
  const documentTitle = absoluteTitle ? { absolute: absoluteTitle } : title;

  const image = {
    url: ogImageUrl(),
    width: 1200,
    height: 630,
    alt: `${siteName} — owner-operated yacht management`,
  };

  return {
    title: documentTitle,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteName,
      title: ogTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image.url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export const homeMetadata = buildPageMetadata({
  absoluteTitle:
    "Anzalone Yacht Management | South Florida, Annapolis & Chesapeake Yacht Management",
  title: siteName,
  description:
    "Owner-operated yacht management, yacht maintenance, detailing, and captain services in South Florida, Annapolis, and the Chesapeake. Brokerage yacht preparation and vessel readiness — one accountable operator.",
  path: "/",
  keywords: [
    "owner-operated yacht management",
    "vessel readiness",
    "yacht management Florida",
  ],
});

export const aboutMetadata = buildPageMetadata({
  title: "About",
  description:
    "Meet the owner-operator behind Anzalone Yacht Management — accountable yacht management, maintenance oversight, and the readiness standard for South Florida, Annapolis, and Chesapeake programs.",
  path: "/about",
});

export const contactMetadata = buildPageMetadata({
  title: "Contact — Request Vessel Review",
  description:
    "Request a confidential vessel review for yacht management, maintenance, detailing, captain services, or brokerage yacht preparation. Personal response within one business day.",
  path: "/contact",
});
