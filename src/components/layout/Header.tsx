"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { publicPhone, telHref } from "@/lib/company";
import {
  isNavActive,
  primaryNav,
  siteRoutes,
  type NavLink,
  type PrimaryNavItem,
} from "@/lib/navigation";

function linkClass(active: boolean, light: boolean) {
  return cn(
    "nav-link-luxury whitespace-nowrap text-[0.62rem] font-medium uppercase tracking-[0.14em] xl:text-xs xl:tracking-[0.16em]",
    light
      ? active
        ? "text-gold-light"
        : "text-ivory hover:text-gold-light"
      : active
        ? "text-gold-muted"
        : "text-navy-800 hover:text-gold-muted",
  );
}

function DesktopMenu({
  item,
  open,
  light,
  pathname,
  onOpen,
  onClose,
}: {
  item: PrimaryNavItem;
  open: boolean;
  light: boolean;
  pathname: string;
  onOpen: () => void;
  onClose: () => void;
}) {
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const childActive = item.children?.some((child) => isNavActive(pathname, child.href));
  const active = isNavActive(pathname, item.href) || Boolean(childActive);
  const links: NavLink[] = [
    { label: `All ${item.label}`, href: item.href, description: "Overview" },
    ...(item.children ?? []),
  ];

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const focusItem = useCallback((index: number) => {
    const items = itemRefs.current.filter(Boolean);
    if (items.length === 0) return;
    const next = ((index % items.length) + items.length) % items.length;
    items[next]?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => focusItem(0));

    function onPointer(event: MouseEvent) {
      const target = event.target as Node;
      if (
        panelRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }
      onCloseRef.current();
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCloseRef.current();
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, focusItem]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        className={cn(
          linkClass(active || open, light),
          "inline-flex min-h-11 items-center gap-1.5",
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => (open ? onClose() : onOpen())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" && !open) {
            event.preventDefault();
            onOpen();
          }
        }}
      >
        {item.label}
        <svg
          className={cn("h-3 w-3 transition-transform duration-300", open && "rotate-180")}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
        >
          <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <div
        ref={panelRef}
        id={menuId}
        role="menu"
        aria-hidden={!open}
        className={cn(
          "absolute left-0 top-full z-50 mt-3 w-80 border border-ivory-muted bg-surface p-2 shadow-elevated",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none invisible opacity-0",
        )}
        onKeyDown={(event) => {
          const index = itemRefs.current.findIndex((el) => el === document.activeElement);
          if (event.key === "ArrowDown") {
            event.preventDefault();
            focusItem(index + 1);
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            focusItem(index <= 0 ? links.length - 1 : index - 1);
          }
          if (event.key === "Home") {
            event.preventDefault();
            focusItem(0);
          }
          if (event.key === "End") {
            event.preventDefault();
            focusItem(links.length - 1);
          }
        }}
      >
        <ul>
          {links.map((link, index) => (
            <li key={link.href} role="none">
              <Link
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                href={link.href}
                role="menuitem"
                tabIndex={open ? 0 : -1}
                className={cn(
                  "block min-h-11 px-4 py-3 transition-luxury hover:bg-ivory focus-visible:bg-ivory",
                  pathname === link.href && "bg-ivory",
                )}
                onClick={onClose}
              >
                <span className="block text-sm font-medium text-navy-900">{link.label}</span>
                {link.description && (
                  <span className="mt-1 block text-xs leading-relaxed text-charcoal-soft">
                    {link.description}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileMenuId = useId();

  const light = !scrolled && !menuOpen;

  useEffect(() => {
    setMenuOpen(false);
    setOpenMenu(null);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const root = headerRef.current;
    const frame = requestAnimationFrame(() => {
      mobileRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    });

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !root) return;
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((element) => element.tabIndex !== -1 && element.getClientRects().length > 0);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMobile = () => {
    setMenuOpen(false);
    setMobileSection(null);
  };

  return (
    <header
      ref={headerRef}
      className={cn("site-header", light ? "is-transparent" : "is-solid")}
    >
      <div className="container-wide flex items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-8 xl:px-12">
        <BrandLogo light={light} compact />

        <nav className="hidden items-center gap-3 lg:flex xl:gap-5" aria-label="Main navigation">
          {primaryNav.map((item) =>
            item.children ? (
              <DesktopMenu
                key={item.href}
                item={item}
                open={openMenu === item.label}
                light={light}
                pathname={pathname}
                onOpen={() => setOpenMenu(item.label)}
                onClose={() => setOpenMenu(null)}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(linkClass(isNavActive(pathname, item.href), light), "inline-flex min-h-11 items-center")}
                aria-current={isNavActive(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
          {publicPhone() ? (
            <a
              href={telHref}
              className={cn(
                linkClass(false, light),
                "inline-flex min-h-11 items-center whitespace-nowrap",
              )}
            >
              {publicPhone()}
            </a>
          ) : null}
          <Button
            href={siteRoutes.contact}
            variant={light ? "ghost" : "secondary"}
            size="sm"
            className="ml-1 min-h-11"
          >
            Inquire
          </Button>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="flex h-11 w-11 items-center justify-center lg:hidden"
          aria-expanded={menuOpen}
          aria-controls={mobileMenuId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="flex w-6 flex-col gap-1.5" aria-hidden>
            <span className={cn("h-px w-6 bg-current transition-transform", menuOpen && "translate-y-[7px] rotate-45")} />
            <span className={cn("h-px w-6 bg-current", menuOpen && "opacity-0")} />
            <span className={cn("h-px w-6 bg-current transition-transform", menuOpen && "-translate-y-[7px] -rotate-45")} />
          </span>
        </button>
      </div>

      <div
        ref={mobileRef}
        id={mobileMenuId}
        className={cn(
          "fixed inset-x-0 bottom-0 top-[4.75rem] z-40 bg-ivory lg:hidden",
          menuOpen ? "visible" : "invisible pointer-events-none",
        )}
        hidden={!menuOpen}
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Mobile navigation"
      >
        <nav className="h-full overflow-y-auto px-5 py-4 sm:px-8" aria-label="Mobile">
          <ul className="flex flex-col">
            {primaryNav.map((item) => (
              <li key={item.href} className="border-b border-ivory-muted">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className="flex min-h-12 w-full items-center justify-between text-left text-sm font-medium uppercase tracking-[0.16em] text-navy-900"
                      aria-expanded={mobileSection === item.label}
                      onClick={() =>
                        setMobileSection((current) => (current === item.label ? null : item.label))
                      }
                    >
                      {item.label}
                      <span aria-hidden>{mobileSection === item.label ? "–" : "+"}</span>
                    </button>
                    {mobileSection === item.label && (
                      <ul className="mb-4 border-l border-gold/50 pl-4">
                        <li>
                          <Link href={item.href} className="block min-h-11 py-2 text-sm text-navy-800" onClick={closeMobile}>
                            All {item.label}
                          </Link>
                        </li>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} className="block min-h-11 py-2 text-sm text-navy-800" onClick={closeMobile}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex min-h-12 items-center text-sm font-medium uppercase tracking-[0.16em] text-navy-900"
                    aria-current={isNavActive(pathname, item.href) ? "page" : undefined}
                    onClick={closeMobile}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            {publicPhone() ? (
              <li className="pt-5">
                <a
                  href={telHref}
                  className="flex min-h-12 items-center justify-center text-sm font-medium uppercase tracking-[0.16em] text-navy-900"
                >
                  Call {publicPhone()}
                </a>
              </li>
            ) : null}
            <li className="pt-3">
              <Button href={siteRoutes.contact} variant="primary" className="min-h-12 w-full" onClick={closeMobile}>
                Inquire
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
