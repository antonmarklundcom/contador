import Link from "next/link";
import {
  footerFirmLinks,
  footerLegalLinks,
  footerServiceLinks,
  socialLinks,
} from "@/content/nav";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { mailtoHref, telHref } from "@/lib/whatsapp";
import { Logo } from "./Logo";

/**
 * Four-column ink footer (design canvas 1b "Footer"): firm blurb, all 14
 * services, the firm links and the NAP block. Contact rows only render for
 * values the owner has confirmed (plan.md §1.4).
 */
export function Footer() {
  const socials = socialLinks();
  const tel = telHref();
  const mailto = mailtoHref();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/65">
      <div className="container-site grid grid-cols-1 gap-10 py-12 text-sm sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-3.5">
          <Logo tone="ink" size="sm" />
          <p className="m-0 max-w-[320px] leading-[1.55]">{ui.brand.tagline}</p>
          {socials.length > 0 ? (
            <ul className="m-0 flex list-none flex-wrap gap-4 p-0">
              {socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    rel="noopener me"
                    target="_blank"
                    className="text-white/65 no-underline hover:text-white"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <FooterColumn title={ui.footer.servicesColumn}>
          {footerServiceLinks.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title={ui.footer.firmColumn}>
          {footerFirmLinks.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
          {footerLegalLinks.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title={ui.footer.contactColumn}>
          {tel && site.phone ? (
            <a
              href={tel}
              className="text-white/65 no-underline hover:text-white"
              data-analytics="phone_click"
            >
              {site.phone}
            </a>
          ) : null}
          {mailto && site.email ? (
            <a href={mailto} className="text-white/65 no-underline hover:text-white">
              {site.email}
            </a>
          ) : null}
          {site.address ? (
            <address className="not-italic leading-[1.5]">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.country}
            </address>
          ) : null}
          {site.hours ? <span>{site.hours}</span> : null}
          {site.matricula ? <span>{site.matricula}</span> : null}
          <Link href="/contacto/" className="text-white/65 no-underline hover:text-white">
            {ui.cta.quote}
          </Link>
        </FooterColumn>
      </div>

      <div className="container-site border-t border-white/10 py-6 text-[13px]">
        © {year} {site.name}. {ui.footer.rights}
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-semibold text-white">{title}</span>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-white/65 no-underline hover:text-white">
      {children}
    </Link>
  );
}
