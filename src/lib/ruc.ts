/**
 * RUC validation (paraguay-business-apps §2).
 *
 * A Paraguayan RUC is a base number plus a hyphen plus a dígito verificador,
 * e.g. `80012345-6`. The DV is a modulo-11 check over the base digits with
 * weights cycling 2–9 from the rightmost digit.
 */

/** RUC used for "consumidor final" invoices, by convention. */
export const CONSUMIDOR_FINAL_RUC = "44444401-7";

export interface ParsedRuc {
  base: string;
  dv: number;
}

/** Strips dots and spaces, keeps digits and the hyphen. */
export function normalizeRuc(input: string): string {
  return input.replace(/[^0-9-]/g, "");
}

/** Computes the dígito verificador for a base number. */
export function rucCheckDigit(base: string): number {
  const digits = base.replace(/\D/g, "");
  if (digits.length === 0) return 0;

  let total = 0;
  let weight = 2;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    total += Number(digits[i]) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }

  const remainder = total % 11;
  return remainder > 1 ? 11 - remainder : 0;
}

export function parseRuc(input: string): ParsedRuc | null {
  const normalized = normalizeRuc(input);
  const match = /^(\d{1,9})-(\d)$/.exec(normalized);
  if (!match) return null;
  return { base: match[1], dv: Number(match[2]) };
}

/** True when the RUC is well formed and its check digit matches. */
export function validateRuc(input: string): boolean {
  const parsed = parseRuc(input);
  if (!parsed) return false;
  return rucCheckDigit(parsed.base) === parsed.dv;
}

/** Last digit of the base number — the DNIT groups due dates by it. */
export function rucTermination(input: string): number | null {
  const parsed = parseRuc(input);
  if (!parsed) return null;
  return Number(parsed.base[parsed.base.length - 1]);
}
