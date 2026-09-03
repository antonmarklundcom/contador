import { site } from "@/content/site";
import { ui } from "@/content/ui";

/**
 * WhatsApp is the primary conversion path (plan.md §1.6). When no number is
 * configured yet, every helper returns `null` and the caller falls back to the
 * lead form — nothing renders a broken `wa.me` link.
 */
export function whatsappHref(text: string = ui.whatsapp.defaultText): string | null {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** `"595981123456"` → `"+595 981 123 456"`. */
export function formatWhatsappNumber(digits: string): string {
  const match = /^(\d{3})(\d{3})(\d{3})(\d+)$/.exec(digits);
  if (!match) return `+${digits}`;
  return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
}

export function telHref(): string | null {
  if (!site.phone) return null;
  return `tel:${site.phone.replace(/[^0-9+]/g, "")}`;
}

export function mailtoHref(subject?: string): string | null {
  if (!site.email) return null;
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${site.email}${query}`;
}
