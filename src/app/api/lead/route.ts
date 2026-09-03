import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { ui } from "@/content/ui";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { idempotencyKey, readAttribution, sendLead } from "@/lib/vendercrm";

/**
 * POST /api/lead — the site's only write endpoint (plan.md §5.1.8).
 *
 * The browser never talks to VenderCRM: it posts here, and this handler adds
 * the server-only API key. With no key configured the endpoint still answers
 * 200 with `degraded: true` so the form never blocks on a credential
 * (plan.md §4.5).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const needIds = ui.needs.map((need) => need.id);

const leadSchema = z.object({
  name: z.string().trim().min(2).max(200),
  /** Accepts the local format people actually type: "0981 123 456". */
  phone: z.string().trim().min(6).max(30),
  email: z.union([z.email().max(320), z.literal("")]).optional(),
  company: z.string().trim().max(200).optional(),
  need: z.enum(needIds as [string, ...string[]]).optional(),
  message: z.string().trim().max(5000).optional(),
  pageUrl: z.string().trim().max(2000).optional(),
  /** Honeypot — a real visitor never fills this in. */
  website: z.string().optional(),
});

export async function POST(request: Request) {
  const requestHeaders = await headers();
  const ip = clientIp(requestHeaders);

  const limit = rateLimit(`lead:${ip}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation_failed",
        fields: parsed.error.issues.map((issue) => issue.path.join(".")),
      },
      { status: 422 },
    );
  }

  const lead = parsed.data;

  // Honeypot: accept silently, forward nothing.
  if (lead.website) {
    return NextResponse.json({ ok: true, degraded: false });
  }

  const attribution = readAttribution((await cookies()).get("vc_attr")?.value);
  const needLabel = ui.needs.find((need) => need.id === lead.need)?.label;

  const result = await sendLead({
    phone: lead.phone,
    name: lead.name,
    email: lead.email || undefined,
    message: lead.message,
    source: "contador.com.py",
    page_url: lead.pageUrl ?? attribution.landing_page,
    referrer: attribution.referrer,
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_term: attribution.utm_term,
    utm_content: attribution.utm_content,
    gclid: attribution.gclid,
    fbclid: attribution.fbclid,
    idempotency_key: idempotencyKey(lead.phone),
    fields: Object.fromEntries(
      Object.entries({
        necesidad: needLabel,
        empresa: lead.company,
      }).filter((entry): entry is [string, string] => Boolean(entry[1])),
    ),
  });

  // Always 200: the visitor did their part. A CRM failure is ours to fix from
  // the log, and the UI keeps offering WhatsApp either way.
  return NextResponse.json({ ok: true, degraded: result.degraded });
}
