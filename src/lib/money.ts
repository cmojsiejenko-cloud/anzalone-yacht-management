/** Integer cents only — never store money as binary floating point. */

export function parseMoneyToCents(input: string): number | null {
  const cleaned = input.trim().replace(/[$,\s]/g, "");
  if (!cleaned) return 0;
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  const [dollars, fraction = ""] = cleaned.split(".");
  const cents =
    Number.parseInt(dollars, 10) * 100 +
    Number.parseInt(fraction.padEnd(2, "0").slice(0, 2) || "0", 10);
  if (!Number.isFinite(cents) || cents < 0) return null;
  return cents;
}

export function formatCents(cents: number): string {
  const safe = Math.max(0, Math.round(cents));
  return (safe / 100).toFixed(2);
}

export function formatUsd(cents: number): string {
  return `$${formatCents(cents)}`;
}

export function sumCents(values: number[]): number {
  return values.reduce((total, value) => total + Math.max(0, Math.round(value)), 0);
}
