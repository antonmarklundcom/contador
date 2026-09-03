"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { headerLinks, servicesMenu } from "@/content/nav";
import { ui } from "@/content/ui";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";

/**
 * Sticky ink-blue header (design canvas 1b "Nav"): wordmark, services
 * mega-menu with the three legacy clusters, WhatsApp pill and the amber
 * "Pedir cotización" button. Below `lg` the nav collapses into a drawer.
 */
export function Header({ whatsappHref }: { whatsappHref: string | null }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Any navigation closes both surfaces.
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!servicesOpen) return;
    function onPointerDown(event: MouseEvent) {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setServicesOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-ink text-white">
      <div className="container-site flex items-center justify-between gap-6 py-4 lg:py-[18px]">
        <Logo tone="ink" />

        <nav
          aria-label={ui.nav.primary}
          className="hidden items-center gap-7 text-sm font-medium lg:flex"
        >
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="services-mega-menu"
              onClick={() => setServicesOpen((open) => !open)}
              className={`flex items-center gap-1.5 py-2 ${
                isActive("/servicios/") ? "text-white" : "text-white/80 hover:text-white"
              }`}
            >
              {ui.nav.services}
              <span aria-hidden="true" className="text-[10px]">
                ▼
              </span>
            </button>

            <div
              id="services-mega-menu"
              hidden={!servicesOpen}
              className="absolute left-1/2 top-full z-50 w-[860px] -translate-x-1/2 pt-3"
            >
              <div className="grid grid-cols-3 gap-6 rounded-card border border-line bg-white p-7 text-ink shadow-panel">
                {servicesMenu.map((group) => (
                  <div key={group.title} className="flex flex-col gap-3">
                    <span className="text-[13px] font-semibold text-amber-text">
                      {group.title}
                    </span>
                    <ul className="m-0 flex list-none flex-col gap-2 p-0">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-[15px] text-ink no-underline hover:text-amber-text"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="col-span-3 border-t border-line pt-4">
                  <Link
                    href="/servicios/"
                    className="text-[15px] font-semibold text-amber-text no-underline"
                  >
                    {ui.nav.allServices} →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {headerLinks
            .filter((link) => link.href !== "/servicios/")
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`no-underline ${
                  isActive(link.href) ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {whatsappHref ? (
            <ButtonLink
              href={whatsappHref}
              variant="secondary"
              size="sm"
              onDark
              rel="noopener"
              target="_blank"
              data-analytics="whatsapp_click"
              data-analytics-location="header"
            >
              {ui.cta.whatsappShort}
            </ButtonLink>
          ) : null}
          <ButtonLink href="/contacto/" variant="primary" size="sm">
            {ui.cta.quote}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="rounded-pill border border-white/25 px-4 py-2.5 text-sm font-semibold lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? ui.nav.closeMenu : ui.nav.openMenu}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-white/10 lg:hidden"
      >
        <div className="container-site flex flex-col gap-6 py-6">
          <nav aria-label={ui.nav.primary} className="flex flex-col gap-4">
            {headerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-semibold text-white no-underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {servicesMenu.map((group) => (
            <div key={group.title} className="flex flex-col gap-2">
              <span className="text-[13px] font-semibold text-amber">{group.title}</span>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-white/80 no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-wrap gap-3">
            {whatsappHref ? (
              <ButtonLink
                href={whatsappHref}
                variant="whatsapp"
                size="sm"
                rel="noopener"
                target="_blank"
                data-analytics="whatsapp_click"
                data-analytics-location="mobile-menu"
              >
                {ui.cta.whatsapp}
              </ButtonLink>
            ) : null}
            <ButtonLink href="/contacto/" variant="primary" size="sm">
              {ui.cta.quote}
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
