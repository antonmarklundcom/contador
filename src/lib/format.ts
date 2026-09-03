/**
 * Paraguayan formatting helpers (paraguay-business-apps §1).
 *
 * Guaraní amounts are whole integers — never floats, never decimals.
 */

const guaraniFormatter = new Intl.NumberFormat("es-PY", {
  style: "currency",
  currency: "PYG",
  maximumFractionDigits: 0,
});

/** `1500000` → `"₲ 1.500.000"`. */
export function formatGuaranies(amount: number): string {
  return guaraniFormatter.format(Math.round(amount)).replace(/ /g, " ");
}

const numberFormatter = new Intl.NumberFormat("es-PY", {
  maximumFractionDigits: 0,
});

/** `1500000` → `"1.500.000"` (no currency symbol). */
export function formatNumber(amount: number): string {
  return numberFormatter.format(Math.round(amount));
}

const dateFormatter = new Intl.DateTimeFormat("es-PY", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** `"2026-09-15"` → `"15 de septiembre de 2026"`. */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

/** `"2026-09-15"` → `"15/09/2026"`. */
export function formatShortDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}
