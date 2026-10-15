import type { Metadata } from "next";
import {
  company,
  OFFICIAL_NAME,
  publicPhone,
  VERCEL_PRODUCTION_URL,
} from "@/lib/company";

/**
 * Canonical host: use NEXT_PUBLIC_SITE_URL when set.
 * Default is the existing Vercel production hostname until a custom domain is confirmed.
 * Do not assume www.anzaloneyacht.com or anzaloneyachtmanagment.com without verified control.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? VERCEL_PRODUCTION_URL;

export const siteName = OFFICIAL_NAME;

export const defaultDescription =
  "Owner-operated yacht management by Pauly Anzalone — 22 years of hands-on experience across the Chesapeake, Annapolis, Virginia, and mobile South Florida. Premium yacht care, maintenance, and readiness.";

export const targetKeywords = [
  "yacht management",
  "Anzalone yacht management",
  "yacht management Annapolis",
  "Chesapeake yacht management",
  "South Florida yacht management",
  "yacht maintenance",
  "yacht detailing",
  "captain services",
  "yacht brokerage preparation",
] as const;

export const siteConfig = {
  name: siteName,
  shortName: company.shortName,
  url: siteUrl,
  description: defaultDescription,
  keywords: [...targetKeywords],
  locale: "en_US",
  email: company.email,
  get telephone() {
    return publicPhone();
  },
  ogImagePath: "/opengraph-image",
  logoPath: company.brandMark.src,
  twitterHandle: undefined as string | undefined,
};

export type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
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
  const ogTitle = absoluteTitle ?? `${title} | ${company.shortName}`;
  const documentTitle = absoluteTitle ? { absolute: absoluteTitle } : title;

  const image = {
    url: ogImageUrl(),
    width: 1200,
    height: 630,
    alt: `${siteName} — ${company.logoTagline}`,
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
  absoluteTitle: `${company.shortName} | ${company.logoTagline}`,
  title: siteName,
  description: defaultDescription,
  path: "/",
  keywords: [
    "owner-operated yacht management",
    "Pauly Anzalone",
    "vessel readiness",
  ],
});

export const aboutMetadata = buildPageMetadata({
  title: "About Pauly Anzalone",
  description:
    "Meet Pauly Anzalone — owner-operator of Anzalone's Full Service Yacht Management Group. Naples, Italy heritage, a merchant-marine family tradition, and 22 years of hands-on yacht care.",
  path: "/about",
  keywords: [
    "Pauly Anzalone",
    "owner-operated yacht management",
    "yacht management company",
  ],
});

export const contactMetadata = buildPageMetadata({
  title: "Contact",
  description: `Request a vessel review with Anzalone's. Call ${company.phone} or email ${company.email}. Owner-operated yacht management in South Florida and the Chesapeake region.`,
  path: "/contact",
});
