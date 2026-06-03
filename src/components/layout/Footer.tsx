import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import {
  footerCompanyLinks,
  footerServiceLinks,
  siteRoutes,
} from "@/lib/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-ivory-muted">
      <div className="section-padding container-wide">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href={siteRoutes.home} className="inline-block group">
              <p className="font-display text-2xl font-semibold text-ivory transition-luxury group-hover:text-ivory-muted">
                Anzalone
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">
                Yacht Management
              </p>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory-muted">
              Owner-operated yacht management — vessel readiness, yacht maintenance,
              detailing, and captain services in South Florida, Annapolis, and the Chesapeake.
            </p>
            <p className="mt-6 text-xs uppercase tracking-widest text-ivory-muted">
              Ready before you arrive.
            </p>
          </div>

          <nav className="lg:col-span-3" aria-labelledby="footer-services-heading">
            <p
              id="footer-services-heading"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-gold"
            >
              Services
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {footerServiceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory-muted transition-luxury hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-labelledby="footer-company-heading">
            <p
              id="footer-company-heading"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-gold"
            >
              Company
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {footerCompanyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory-muted transition-luxury hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p
              id="footer-contact-heading"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-gold"
            >
              Contact
            </p>
            <p className="mt-5 text-sm leading-relaxed">
              <a
                href="mailto:info@anzaloneyacht.com"
                className="text-ivory-muted transition-luxury hover:text-ivory"
              >
                info@anzaloneyacht.com
              </a>
            </p>
            <p className="mt-4 text-sm text-ivory-muted">
              Confidential consultations by appointment.
            </p>
            <Button
              href={siteRoutes.contact}
              variant="ghost"
              size="sm"
              className="mt-6 border-ivory/30 hover:border-ivory hover:bg-ivory/5"
            >
              Inquire
            </Button>
          </div>
        </div>

        <LuxuryDivider variant="subtle" className="mt-14 opacity-30" />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ivory-muted">
            &copy; {year} Anzalone Yacht Management. All rights reserved.
          </p>
          <p className="text-xs text-ivory-muted">
            South Florida &middot; Annapolis &middot; Chesapeake &middot; Selective roster by design
          </p>
        </div>
      </div>
    </footer>
  );
}
