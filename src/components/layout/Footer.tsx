import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import {
  company,
  mailtoHref,
  publicPhone,
  serviceAreas,
  telHref,
  verifiedSocialLinks,
} from "@/lib/company";
import {
  footerCompanyLinks,
  footerServiceLinks,
  siteRoutes,
} from "@/lib/navigation";

export function Footer() {
  const year = new Date().getFullYear();
  const phone = publicPhone();
  const socialLinks = verifiedSocialLinks();

  return (
    <footer className="bg-navy-950 text-ivory-muted">
      <div className="section-padding container-wide">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <BrandLogo light compact={false} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory-muted">
              {company.tagline} Field service, management, and yard oversight for
              owners who want the yacht prepared before they arrive.
            </p>
          </div>

          <nav className="lg:col-span-3" aria-labelledby="footer-services-heading">
            <p id="footer-services-heading" className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Services
            </p>
            <ul className="mt-5 flex flex-col gap-1">
              {footerServiceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-11 items-center text-sm text-ivory-muted transition-luxury hover:text-ivory">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-labelledby="footer-company-heading">
            <p id="footer-company-heading" className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Company
            </p>
            <ul className="mt-5 flex flex-col gap-1">
              {footerCompanyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-11 items-center text-sm text-ivory-muted transition-luxury hover:text-ivory">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Contact
            </p>
            <p className="mt-5">
              <a href={mailtoHref} className="inline-flex min-h-11 items-center text-sm text-ivory hover:text-gold-light">
                {company.email}
              </a>
            </p>
            {phone ? (
              <p className="mt-1">
                <a href={telHref} className="inline-flex min-h-11 items-center text-sm text-ivory hover:text-gold-light">
                  {phone}
                </a>
              </p>
            ) : null}
            {socialLinks.map((link) => (
              <p key={link.href} className="mt-1">
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm text-ivory hover:text-gold-light"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              </p>
            ))}
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Service area
            </p>
            <ul className="mt-3 space-y-2">
              {serviceAreas.map((area) => (
                <li key={area.name} className="text-sm text-ivory-muted">
                  {area.name}
                </li>
              ))}
            </ul>
            <Button
              href={siteRoutes.contact}
              variant="ghost"
              size="sm"
              className="mt-6 min-h-11 border-ivory/30 hover:border-ivory hover:bg-ivory/5"
            >
              Inquire
            </Button>
          </div>
        </div>

        <LuxuryDivider variant="subtle" className="mt-14 opacity-40" />

        <div className="mt-8 flex flex-col gap-3 text-xs text-ivory-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {company.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-2">
            <Link
              href={siteRoutes.privacy}
              className="inline-flex min-h-11 items-center hover:text-ivory"
            >
              Privacy notice
            </Link>
            <Link
              href={siteRoutes.contact}
              className="inline-flex min-h-11 items-center hover:text-ivory"
            >
              Contact
            </Link>
            <a
              href={mailtoHref}
              className="inline-flex min-h-11 items-center hover:text-ivory"
            >
              {company.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
