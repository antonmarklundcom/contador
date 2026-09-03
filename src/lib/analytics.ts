/**
 * Analytics façade. A no-op until a GA4 id is configured in phase B4 — the
 * call sites can be written now and never need to change.
 *
 * Events (plan.md §6.4.3): whatsapp_click, lead_submit, tool_used,
 * phone_click.
 */
type GtagWindow = Window & {
  gtag?: (command: "event", name: string, params?: Record<string, unknown>) => void;
};

export type AnalyticsEvent =
  | "whatsapp_click"
  | "lead_submit"
  | "tool_used"
  | "phone_click";

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as GtagWindow).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", event, params);
}
