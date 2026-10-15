import {
  formatCents,
  formatUsd,
  parseMoneyToCents,
  sumCents,
} from "./money";
import type { UploadedAttachment } from "./uploads";

export type CrewExpenseData = {
  name: string;
  email: string;
  vesselOrAssignment: string;
  location: string;
  workDescription: string;
  workDate: string;
  provisions: string;
  travel: string;
  tips: string;
  otherExpenses: string;
  otherLabel: string;
  notes: string;
  consent: boolean;
  companyWebsite: string;
};

export type CrewExpenseErrors = Partial<
  Record<keyof CrewExpenseData | "receipts" | "total", string>
>;

export const crewExpenseInitial: CrewExpenseData = {
  name: "",
  email: "",
  vesselOrAssignment: "",
  location: "",
  workDescription: "",
  workDate: "",
  provisions: "",
  travel: "",
  tips: "",
  otherExpenses: "",
  otherLabel: "",
  notes: "",
  consent: false,
  companyWebsite: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: string | undefined): string {
  return typeof value === "string" ? value : "";
}

function moneyField(
  value: string,
  label: string,
): { cents: number; error?: string } {
  const cents = parseMoneyToCents(value);
  if (cents === null) {
    return {
      cents: 0,
      error: `${label} must be a nonnegative amount like 0 or 12.50.`,
    };
  }
  return { cents };
}

export function expenseTotals(data: CrewExpenseData): {
  provisions: number;
  travel: number;
  tips: number;
  other: number;
  total: number;
  errors: CrewExpenseErrors;
} {
  const errors: CrewExpenseErrors = {};
  const provisions = moneyField(data.provisions, "Provisions");
  const travel = moneyField(data.travel, "Travel");
  const tips = moneyField(data.tips, "Tips");
  const other = moneyField(data.otherExpenses, "Other expenses");

  if (provisions.error) errors.provisions = provisions.error;
  if (travel.error) errors.travel = travel.error;
  if (tips.error) errors.tips = tips.error;
  if (other.error) errors.otherExpenses = other.error;

  const total = sumCents([
    provisions.cents,
    travel.cents,
    tips.cents,
    other.cents,
  ]);

  return {
    provisions: provisions.cents,
    travel: travel.cents,
    tips: tips.cents,
    other: other.cents,
    total,
    errors,
  };
}

export function validateCrewExpense(data: CrewExpenseData): CrewExpenseErrors {
  const errors: CrewExpenseErrors = {};

  if (text(data.name).trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  const email = text(data.email).trim();
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!text(data.vesselOrAssignment).trim()) {
    errors.vesselOrAssignment =
      "Please enter the vessel name or assignment reference.";
  }

  if (!text(data.location).trim()) {
    errors.location = "Please enter the location.";
  }

  if (text(data.workDescription).trim().length < 20) {
    errors.workDescription =
      "Please describe the outing or work in at least 20 characters.";
  }

  const workDate = text(data.workDate).trim();
  if (!workDate) {
    errors.workDate = "Please enter the relevant date.";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(workDate)) {
    errors.workDate = "Please use a valid date (YYYY-MM-DD).";
  } else {
    const parsed = new Date(`${workDate}T12:00:00Z`);
    if (Number.isNaN(parsed.getTime())) {
      errors.workDate = "Please use a valid date.";
    }
  }

  if (text(data.workDescription).trim().length > 5000) {
    errors.workDescription = "Description must be 5000 characters or fewer.";
  }
  if (text(data.notes).trim().length > 5000) {
    errors.notes = "Notes must be 5000 characters or fewer.";
  }

  const totals = expenseTotals(data);
  Object.assign(errors, totals.errors);

  if (totals.other > 0 && !text(data.otherLabel).trim()) {
    errors.otherLabel = "Label the other expense category.";
  }

  if (totals.total <= 0 && !hasMoneyErrors(totals.errors)) {
    errors.total = "Enter at least one expense amount greater than zero.";
  }

  if (!data.consent) {
    errors.consent =
      "Please confirm this is an expense report for review, not a payment request that will be auto-paid.";
  }

  return errors;
}

function hasMoneyErrors(errors: CrewExpenseErrors): boolean {
  return Boolean(
    errors.provisions || errors.travel || errors.tips || errors.otherExpenses,
  );
}

export function hasCrewExpenseErrors(errors: CrewExpenseErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function buildCrewExpenseEmailPayload(
  data: CrewExpenseData,
  receipts: UploadedAttachment[],
): {
  subject: string;
  text: string;
  htmlRows: { label: string; value: string }[];
  notes: string;
  replyTo: string;
  totalLabel: string;
} {
  const totals = expenseTotals(data);
  const name = data.name.trim();
  const email = data.email.trim();
  const vessel = data.vesselOrAssignment.trim();
  const notes = data.notes.trim() || "—";
  const totalLabel = formatUsd(totals.total);
  const receiptNote =
    receipts.length === 0
      ? "No receipts attached"
      : `${receipts.length} receipt file(s) attached (not stored publicly)`;

  const rows = [
    { label: "Name", value: name },
    { label: "Email", value: email },
    { label: "Vessel / assignment", value: vessel },
    { label: "Location", value: data.location.trim() },
    { label: "Work date", value: data.workDate.trim() },
    { label: "Work description", value: data.workDescription.trim() },
    { label: "Provisions", value: formatUsd(totals.provisions) },
    { label: "Travel", value: formatUsd(totals.travel) },
    { label: "Tips", value: formatUsd(totals.tips) },
    {
      label: data.otherLabel.trim() || "Other expenses",
      value: formatUsd(totals.other),
    },
    { label: "Total", value: totalLabel },
    { label: "Receipts", value: receiptNote },
    { label: "Acknowledgment", value: "Expense report for review only" },
  ];

  const text = [
    "Crew / contractor expense report",
    "This is not a payment, transfer, or accounting ledger entry.",
    "",
    ...rows.map((row) => `${row.label}: ${row.value}`),
    "",
    "Notes:",
    notes,
    "",
    `Amount check (cents): provisions=${totals.provisions} travel=${totals.travel} tips=${totals.tips} other=${totals.other} total=${totals.total} (${formatCents(totals.total)})`,
  ].join("\n");

  return {
    subject: `Crew expense — ${vessel} — ${totalLabel} (${name})`,
    text,
    htmlRows: rows,
    notes,
    replyTo: email,
    totalLabel,
  };
}
