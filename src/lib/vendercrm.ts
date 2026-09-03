import crypto from "node:crypto";

/**
 * VenderCRM lead forwarding (vendercrm-lead-capture skill).
 *
 * The API key is server-only — never `NEXT_PUBLIC_*`, never in a client
 * component. When it is missing the site runs in *degraded mode*: the lead is
 * logged and the visitor still gets a success state plus the WhatsApp
 * fallback, because a visitor who filled in a form and saw an error is a lost
 * customer (skill rule 5).
 */

export interface LeadPayload {
  /** Required by the CRM — the contact identity. Local format is fine. */
  phone: string;
  idempotency_key: string;
  name?: string;
  email?: string;
  message?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  page_url?: string;
  referrer?: string;
  /** Anything extra worth keeping on the contact's timeline. */
  fields?: Record<string, string>;
}

export interface LeadResult {
  ok: boolean;
  /** 0 when the CRM was unreachable, -1 when no key is configured. */
  status: number;
  /** True when no API key is configured and nothing was forwarded. */
  degraded: boolean;
}

const CRM_URL = (process.env.VENDERCRM_URL ?? "").replace(/\/$/, "");

/** Same phone within the same hour is the same submission. */
export function idempotencyKey(phone: string): string {
  return crypto
    .createHash("sha256")
    .update(`${phone}|${new Date().toISOString().slice(0, 13)}`)
    .digest("hex");
}

/** First-touch attribution cookie written by the CRM's vc-attribution.js. */
export function readAttribution(cookieValue: string | undefined): Record<string, string> {
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(cookieValue ?? "%7B%7D"));
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return Object.fromEntries(
        Object.entries(parsed as Record<string, unknown>)
          .filter(([, value]) => typeof value === "string")
          .map(([key, value]) => [key, value as string]),
      );
    }
  } catch {
    // A malformed cookie is not worth failing a lead over.
  }
  return {};
}

/**
 * Posts a lead. Never throws — the caller must always be able to thank the
 * visitor. Returns the outcome for logging.
 */
export async function sendLead(lead: LeadPayload): Promise<LeadResult> {
  const apiKey = process.env.VENDERCRM_API_KEY;

  if (!apiKey || !CRM_URL) {
    console.warn(
      "[lead] VenderCRM not configured (VENDERCRM_API_KEY / VENDERCRM_URL missing) — running in degraded mode.",
      { phone: lead.phone, source: lead.source },
    );
    return { ok: true, status: -1, degraded: true };
  }

  // Omit empty values rather than sending "" — the CRM rejects an empty email.
  const body = Object.fromEntries(
    Object.entries(lead).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(typeof value === "object" && Object.keys(value).length === 0),
    ),
  );

  try {
    const response = await fetch(`${CRM_URL}/api/v1/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Api-Key": apiKey },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(
        "[lead] VenderCRM rejected the lead",
        response.status,
        await response.text(),
      );
    }
    return { ok: response.ok, status: response.status, degraded: false };
  } catch (error) {
    console.error("[lead] VenderCRM unreachable", error);
    return { ok: false, status: 0, degraded: false };
  }
}
