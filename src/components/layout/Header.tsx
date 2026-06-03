"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  primaryNavLinks,
  serviceNavLinks,
  siteRoutes,
} from "@/lib/navigation";

function NavLinkItem({
  href,
  label,
  onClick,
  active,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "nav-link-luxury text-sm font-medium uppercase tracking-widest transition-luxury",
        active
          ? "text-gold-muted"
          : "text-navy-800 hover:text-gold-muted",
      )}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const servicesMenuId = useId();
  const mobileMenuId = useId();
  const pathname = usePathname();

  const isServiceActive = serviceNavLinks.some((link) => link.href === pathname);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const focusServiceItem = useCallback((index: number) => {
    const items = menuItemRefs.current.filter(Boolean);
    if (items.length === 0) return;
    const next = ((index % items.length) + items.length) % items.length;
    items[next]?.focus();
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setServicesOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    requestAnimationFrame(() => focusServiceItem(0));

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [servicesOpen, focusServiceItem]);

  useEffect(() => {
    if (!menuOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setMobileServicesOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMobile = () => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-ivory-muted/60 bg-ivory/95 backdrop-blur-md transition-luxury",
        scrolled && "header-scrolled",
      )}
    >
      <div className="container-wide flex items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
        <Link href={siteRoutes.home} className="group flex shrink-0 flex-col gap-0.5">
          <span className="font-display text-xl font-semibold tracking-wide text-navy-900 transition-luxury group-hover:text-navy-800 sm:text-2xl">
            Anzalone
          </span>
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold-muted transition-luxury group-hover:text-gold">
            Yacht Management
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex xl:gap-10"
          aria-label="Main navigation"
        >
          <NavLinkItem
            href={siteRoutes.home}
            label="Home"
            active={pathname === siteRoutes.home}
          />

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className={cn(
                "nav-link-luxury flex items-center gap-1.5 text-sm font-medium uppercase tracking-widest transition-luxury",
                isServiceActive || servicesOpen
                  ? "text-gold-muted"
                  : "text-navy-800 hover:text-gold-muted",
              )}
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              aria-controls={servicesMenuId}
              onClick={() => setServicesOpen((open) => !open)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" && !servicesOpen) {
                  event.preventDefault();
                  setServicesOpen(true);
                }
              }}
            >
              Services
              <svg
                className={cn(
                  "h-3 w-3 transition-transform duration-300 ease-[var(--ease-luxury)]",
                  servicesOpen && "rotate-180",
                )}
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 4.5L6 8.5L10 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              id={servicesMenuId}
              className={cn(
                "absolute left-1/2 top-full z-50 mt-4 w-[22rem] -translate-x-1/2 border border-ivory-muted bg-surface p-2 shadow-elevated transition-luxury",
                servicesOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0",
              )}
              role="menu"
              aria-hidden={!servicesOpen}
              onKeyDown={(event) => {
                const index = menuItemRefs.current.findIndex(
                  (el) => el === document.activeElement,
                );
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  focusServiceItem(index + 1);
                }
                if (event.key === "ArrowUp") {
                  event.preventDefault();
                  focusServiceItem(index - 1);
                }
                if (event.key === "Home") {
                  event.preventDefault();
                  focusServiceItem(0);
                }
                if (event.key === "End") {
                  event.preventDefault();
                  focusServiceItem(menuItemRefs.current.length - 1);
                }
              }}
            >
              <p className="px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-muted">
                Core Services
              </p>
              <ul>
                {serviceNavLinks.map((link, index) => (
                  <li key={link.href} role="none">
                    <Link
                      ref={(el) => {
                        menuItemRefs.current[index] = el;
                      }}
                      href={link.href}
                      role="menuitem"
                      tabIndex={servicesOpen ? 0 : -1}
                      className={cn(
                        "block px-4 py-3 transition-luxury hover:bg-ivory focus-visible:bg-ivory",
                        pathname === link.href && "bg-ivory",
                      )}
                      onClick={() => setServicesOpen(false)}
                    >
                      <span className="block text-sm font-medium text-navy-900">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className="mt-1 block text-xs leading-relaxed text-navy-700/75">
                          {link.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {primaryNavLinks
            .filter((link) => link.href !== siteRoutes.home)
            .map((link) => (
              <NavLinkItem
                key={link.href}
                href={link.href}
                label={link.label}
                active={pathname === link.href}
              />
            ))}

          <Button href={siteRoutes.contact} variant="secondary" size="sm">
            Inquire
          </Button>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls={mobileMenuId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={cn(
              "h-0.5 w-6 bg-navy-900 transition-all duration-300 ease-[var(--ease-luxury)]",
              menuOpen && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 bg-navy-900 transition-all duration-300 ease-[var(--ease-luxury)]",
              menuOpen && "scale-x-0 opacity-0",
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 bg-navy-900 transition-all duration-300 ease-[var(--ease-luxury)]",
              menuOpen && "-translate-y-2 -rotate-45",
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 top-[4.25rem] z-40 lg:hidden",
          !menuOpen && "pointer-events-none",
        )}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Mobile navigation menu"
      >
        <button
          type="button"
          className={cn(
            "mobile-menu-backdrop absolute inset-0 bg-navy-950/20 backdrop-blur-[2px]",
            menuOpen && "is-open",
          )}
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMobile}
        />
        <nav
          id={mobileMenuId}
          className={cn(
            "mobile-menu-panel relative max-h-[calc(100vh-4.25rem)] overflow-y-auto border-t border-ivory-muted bg-ivory px-5 py-6 sm:px-8",
            menuOpen && "is-open",
          )}
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
        >
          <ul className="flex flex-col gap-1">
            <li className="mobile-menu-item">
              <Link
                href={siteRoutes.home}
                className={cn(
                  "block py-3 text-sm font-medium uppercase tracking-widest transition-luxury hover:text-gold-muted",
                  pathname === siteRoutes.home
                    ? "text-gold-muted"
                    : "text-navy-800",
                )}
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMobile}
              >
                Home
              </Link>
            </li>

            <li className="mobile-menu-item">
              <button
                type="button"
                className={cn(
                  "flex w-full items-center justify-between py-3 text-left text-sm font-medium uppercase tracking-widest transition-luxury hover:text-gold-muted",
                  isServiceActive || mobileServicesOpen
                    ? "text-gold-muted"
                    : "text-navy-800",
                )}
                aria-expanded={mobileServicesOpen}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMobileServicesOpen((open) => !open)}
              >
                Services
                <svg
                  className={cn(
                    "h-3 w-3 transition-transform duration-300 ease-[var(--ease-luxury)]",
                    mobileServicesOpen && "rotate-180",
                  )}
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 4.5L6 8.5L10 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                className={cn(
                  "mobile-submenu grid",
                  mobileServicesOpen && "is-open",
                )}
              >
                <div>
                  <ul className="mb-2 border-l border-gold/40 pl-4">
                    {serviceNavLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "block py-2.5 text-sm text-navy-700/90 transition-luxury hover:text-gold-muted",
                            pathname === link.href && "font-medium text-gold-muted",
                          )}
                          tabIndex={menuOpen && mobileServicesOpen ? 0 : -1}
                          onClick={closeMobile}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>

            {primaryNavLinks
              .filter((link) => link.href !== siteRoutes.home)
              .map((link) => (
                <li key={link.href} className="mobile-menu-item">
                  <Link
                    href={link.href}
                    className={cn(
                      "block py-3 text-sm font-medium uppercase tracking-widest transition-luxury hover:text-gold-muted",
                      pathname === link.href
                        ? "text-gold-muted"
                        : "text-navy-800",
                    )}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={closeMobile}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

            <li className="mobile-menu-item mt-4 border-t border-ivory-muted pt-4">
              <Button
                href={siteRoutes.contact}
                variant="secondary"
                size="md"
                className="w-full"
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMobile}
              >
                Inquire
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
