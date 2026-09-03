"use client";

import { useId, useState } from "react";
import { ui } from "@/content/ui";
import { track } from "@/lib/analytics";
import { Button, ButtonLink } from "@/components/ui/Button";

/**
 * The 1b contact form: name + company, phone/email, the "¿Qué necesita?" chip
 * selector and a message. Posts to /api/lead — never to VenderCRM directly,
 * which is what keeps the API key server-side.
 *
 * On success it shows the WhatsApp fallback, so the visitor always has a
 * second path even when the CRM is degraded.
 */
type Status = "idle" | "sending" | "sent" | "error";

export function LeadForm({
  whatsappHref,
  defaultNeed,
  /** Pre-filled message — tools (phase B3) pass their result in here. */
  defaultMessage = "",
  source,
}: {
  whatsappHref: string | null;
  defaultNeed?: string;
  defaultMessage?: string;
  source?: string;
}) {
  const id = useId();
  const [need, setNeed] = useState<string | undefined>(defaultNeed);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();

    if (name.length < 2) {
      setError(ui.form.errorRequiredName);
      return;
    }
    if (phone.length < 6) {
      setError(ui.form.errorRequiredPhone);
      return;
    }

    setError(null);
    setStatus("sending");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: String(data.get("email") ?? "").trim(),
          company: String(data.get("company") ?? "").trim(),
          need,
          message: String(data.get("message") ?? "").trim(),
          website: String(data.get("website") ?? ""),
          pageUrl: typeof window === "undefined" ? undefined : window.location.href,
        }),
      });

      if (!response.ok) throw new Error(`lead endpoint returned ${response.status}`);

      track("lead_submit", { need, source });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError(ui.form.errorGeneric);
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-4 rounded-[20px] bg-surface p-9">
        <h3 className="m-0 font-display text-card font-semibold">
          {ui.form.successTitle}
        </h3>
        <p className="m-0 text-[15px] leading-[1.6] text-muted">{ui.form.successBody}</p>
        {whatsappHref ? (
          <ButtonLink
            href={whatsappHref}
            variant="whatsapp"
            target="_blank"
            rel="noopener"
            className="self-start"
            data-analytics="whatsapp_click"
            onClick={() => track("whatsapp_click", { location: "lead-form-success" })}
          >
            {ui.cta.whatsapp}
          </ButtonLink>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-3.5 rounded-[20px] bg-surface p-6 sm:p-9"
    >
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <Field id={`${id}-name`} label={ui.form.name}>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={ui.form.namePlaceholder}
            className={inputClass}
          />
        </Field>
        <Field id={`${id}-company`} label={ui.form.company}>
          <input
            id={`${id}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={ui.form.companyPlaceholder}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <Field id={`${id}-phone`} label={ui.form.phone}>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder={ui.form.phonePlaceholder}
            className={inputClass}
          />
        </Field>
        <Field
          id={`${id}-email`}
          label={ui.form.email}
          hint={ui.form.emailOptional}
        >
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={ui.form.emailPlaceholder}
            className={inputClass}
          />
        </Field>
      </div>

      <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
        <legend className="mb-1 p-0 text-[13px] font-semibold text-muted">
          {ui.form.needLabel}
        </legend>
        <div className="flex flex-wrap gap-2">
          {ui.needs.map((option) => {
            const selected = need === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setNeed(selected ? undefined : option.id)}
                className={`rounded-pill px-3.5 py-2 text-[13px] font-medium transition-colors ${
                  selected
                    ? "bg-ink text-white"
                    : "border border-line bg-white text-ink hover:border-line-strong"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field id={`${id}-message`} label={ui.form.message}>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={3}
          defaultValue={defaultMessage}
          placeholder={ui.form.messagePlaceholder}
          className={`${inputClass} resize-y`}
        />
      </Field>

      {/* Honeypot — off-screen, never announced, never focusable. */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px]"
      />

      {error ? (
        <p role="alert" className="m-0 text-sm font-medium text-ok-text">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? ui.form.submitting : ui.form.submit}
      </Button>

      <p className="m-0 text-[13px] text-muted">{ui.form.privacyNote}</p>
    </form>
  );
}

const inputClass =
  "w-full rounded-input border border-line bg-white px-4 py-3.5 text-[15px] text-ink placeholder:text-muted/70";

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-semibold text-muted">
        {label}
        {hint ? <span className="font-normal"> ({hint})</span> : null}
      </label>
      {children}
    </div>
  );
}
