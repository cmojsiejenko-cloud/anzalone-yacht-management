/**
 * Official Anzalone company facts from the owner and the original first-party site
 * https://anzaloneyachtmanagment.com/ (note the spelling “managment”).
 * Env vars may override phone/Facebook/founder display when needed.
 */

function envText(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
}

/** Official full display name */
export const OFFICIAL_NAME = "Anzalone's Full Service Yacht Management Group";
/** Short brand used in compact UI */
export const SHORT_BRAND = "Anzalone's";
/** Descriptor under the wordmark */
export const BRAND_DESCRIPTOR = "Full Service Yacht Management Group";
/** Logo script tagline */
export const LOGO_TAGLINE = "Premium Yacht Care & Maintenance";
/** Homepage hero headline — preserve */
export const SITE_HEADLINE = "Ready before you arrive.";

export const ORIGINAL_WEBSITE_URL = "https://anzaloneyachtmanagment.com/";
/** Current Vercel project hostname until a custom domain is confirmed */
export const VERCEL_PRODUCTION_URL =
  "https://anzalone-yacht-management.vercel.app";

export const company = {
  name: OFFICIAL_NAME,
  shortName: SHORT_BRAND,
  descriptor: BRAND_DESCRIPTOR,
  logoTagline: LOGO_TAGLINE,
  tagline: SITE_HEADLINE,
  /** Primary public email — supersedes earlier placeholder info@ address */
  email: envText("NEXT_PUBLIC_COMPANY_EMAIL") ?? "anzaloneyachts@gmail.com",
  phone: envText("NEXT_PUBLIC_COMPANY_PHONE") ?? "(561) 850-4092",
  phoneTel: "+15618504092",
  facebookUrl:
    envText("NEXT_PUBLIC_FACEBOOK_URL") ??
    "https://www.facebook.com/share/1FHAxJNNao/?mibextid=wwXIfr",
  originalWebsiteUrl: ORIGINAL_WEBSITE_URL,
  responseCommitment: envText("NEXT_PUBLIC_RESPONSE_COMMITMENT"),
  founder: {
    role: "Founder & Operator",
    name: envText("NEXT_PUBLIC_FOUNDER_NAME") ?? "Pauly Anzalone",
    /**
     * Narrative fields sourced from the original first-party website.
     * Experience years describe hands-on professional experience — not company founding year.
     */
    experienceYears: 22,
    heritage:
      "An immigrant family from Naples, Italy, and a father who served as a merchant marine captain.",
    bio:
      envText("NEXT_PUBLIC_FOUNDER_BIO") ??
      "Pauly Anzalone leads an owner-operated yacht management practice built on 22 years of hands-on experience. With family roots in Naples, Italy, and a father who served as a merchant marine captain, his approach is grounded in seamanship, craftsmanship, and personal accountability.",
  },
  /**
   * Website navigation lockup — the original gold A, waves, and ANZALONE'S
   * wordmark on a transparent field. Extracted from the official master.
   */
  brandMark: {
    src: "/brand/anzalone-logo-transparent.png" as const,
    width: 414,
    height: 171,
    alt: "Anzalone's",
  },
  /** Symbol-only (A + waves) for favicon / small icons */
  brandSymbol: {
    src: "/brand/anzalone-logo-mark.png" as const,
    width: 318,
    height: 318,
    alt: "Anzalone's mark",
  },
  /** Unmodified official artwork — master brand reference (not used in the header) */
  brandMarkMaster: {
    src: "/brand/anzalone-official-logo.png" as const,
    width: 750,
    height: 300,
    alt: "Anzalone's Full Service Yacht Management Group — Premium Yacht Care & Maintenance",
  },
};

export type SocialLink = {
  label: string;
  href: string;
};

export const mailtoHref = `mailto:${company.email}`;
export const telHref = `tel:${company.phoneTel}`;

/**
 * Service geography from the original first-party site.
 * Do not invent permanent offices or guaranteed coverage everywhere.
 */
export const serviceAreas = [
  {
    name: "South Florida",
    detail:
      "Mobile operations for home-port programs, yard periods, and readiness along the South Florida coast.",
  },
  {
    name: "Chesapeake, Annapolis & Virginia",
    detail:
      "Hands-on experience managing and maintaining yachts from the Chesapeake and Annapolis through Virginia.",
  },
  {
    name: "Project work beyond these waters",
    detail:
      "Client and project relationships extend beyond the core regions. Scope and presence are confirmed for each engagement.",
  },
] as const;

export function personalReplySentence(): string {
  const commitment = company.responseCommitment?.trim();
  if (commitment) return commitment;
  return "Pauly or the team replies personally to qualified inquiries.";
}

export function publicPhone(): string | undefined {
  const value = company.phone?.trim();
  if (!value) return undefined;
  const digits = value.replace(/\D/g, "");
  if (digits.length < 10) return undefined;
  return value;
}

export function verifiedFacebookUrl(): string | undefined {
  const value = company.facebookUrl?.trim();
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

export function verifiedSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [];
  const facebook = verifiedFacebookUrl();
  if (facebook) {
    links.push({ label: "Facebook", href: facebook });
  }
  return links;
}

export function founderRoleLabel(): string {
  return company.founder.role;
}

export function founderDisplayName(): string {
  const name = company.founder.name?.trim();
  return name || company.shortName;
}

export function founderHasPersonalName(): boolean {
  return Boolean(company.founder.name?.trim());
}

export function founderBio(): string | undefined {
  const bio = company.founder.bio?.trim();
  return bio || undefined;
}
