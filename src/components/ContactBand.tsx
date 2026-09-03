import { LeadForm } from "@/components/LeadForm";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { mailtoHref, telHref, whatsappHref } from "@/lib/whatsapp";

/**
 * The 1b "Contacto" split: copy + WhatsApp + NAP on the left, the lead form on
 * the right. Contact rows appear only for values the owner has confirmed.
 */
export function ContactBand({
  eyebrow = ui.form.eyebrow,
  title = ui.form.title,
  lead = ui.form.lead,
  source,
  defaultNeed,
  defaultMessage,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  source?: string;
  defaultNeed?: string;
  defaultMessage?: string;
}) {
  const wa = whatsappHref();
  const tel = telHref();
  const mailto = mailtoHref();

  return (
    <Section id="contacto" tone="white">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            align="stacked"
            className="[&_h2]:lg:text-display-lg"
          />
          <p className="m-0 max-w-[520px] text-base leading-[1.6] text-muted">{lead}</p>

          <div className="flex flex-wrap gap-3">
            {wa ? (
              <ButtonLink
                href={wa}
                variant="whatsapp"
                target="_blank"
                rel="noopener"
                data-analytics="whatsapp_click"
                data-analytics-location="contact-band"
              >
                {ui.cta.whatsapp}
              </ButtonLink>
            ) : null}
            {tel && site.phone ? (
              <ButtonLink href={tel} variant="secondary" data-analytics="phone_click">
                {site.phone}
              </ButtonLink>
            ) : null}
            {!wa && mailto && site.email ? (
              <ButtonLink href={mailto} variant="secondary">
                {site.email}
              </ButtonLink>
            ) : null}
          </div>

          {site.address || site.hours ? (
            <p className="m-0 text-sm text-muted">
              {site.address
                ? `${site.address.street}, ${site.address.city}`
                : null}
              {site.address && site.hours ? " · " : null}
              {site.hours}
            </p>
          ) : null}
        </div>

        <LeadForm
          whatsappHref={wa}
          source={source}
          defaultNeed={defaultNeed}
          defaultMessage={defaultMessage}
        />
      </div>
    </Section>
  );
}
