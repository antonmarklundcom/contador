import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { rescueLinks } from "@/content/nav";
import { services } from "@/content/services";
import { ui } from "@/content/ui";

/**
 * 404 with helpful links instead of a search box (plan.md §6.2.5) — the site
 * has no search, so offering one would be a dead end.
 */
export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="container-site flex flex-col gap-8 py-20 lg:py-28">
        <div className="flex max-w-[640px] flex-col gap-4">
          <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-muted">
            Error 404
          </span>
          <h1 className="m-0 text-[38px] font-extrabold leading-[1.02] tracking-[-0.035em] lg:text-display">
            {ui.notFound.title}
          </h1>
          <p className="m-0 text-base leading-[1.6] text-muted">{ui.notFound.lead}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {rescueLinks.map((link, index) => (
            <ButtonLink
              key={link.href}
              href={link.href}
              variant={index === 0 ? "primary" : "secondary"}
            >
              {link.label}
            </ButtonLink>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-8">
          <span className="text-[13px] font-semibold text-amber-text">
            {ui.nav.services}
          </span>
          <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-[15px]">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={service.path}
                  className="text-ink no-underline hover:text-amber-text"
                >
                  {service.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
