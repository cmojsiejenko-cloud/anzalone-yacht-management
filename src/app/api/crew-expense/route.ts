import { NextResponse } from "next/server";
import {
  buildCrewExpenseEmailPayload,
  hasCrewExpenseErrors,
  validateCrewExpense,
  type CrewExpenseData,
} from "@/lib/crew-expense-form";
import { escapeHtml, htmlRows, sendOwnerEmail, singleLine } from "@/lib/mail";
import {
  checkRateLimit,
  clientKeyFromRequest,
} from "@/lib/rate-limit";
import {
  collectAttachments,
  receiptUploadRules,
} from "@/lib/uploads";

function field(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const limited = checkRateLimit(clientKeyFromRequest(request, "crew-expense"));
  if (!limited.ok) {
    return NextResponse.json(
      {
        error:
          "Too many expense submissions from this network. Please try again later or email us directly.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const body: CrewExpenseData = {
    name: field(form, "name"),
    email: field(form, "email"),
    vesselOrAssignment: field(form, "vesselOrAssignment"),
    location: field(form, "location"),
    workDescription: field(form, "workDescription"),
    workDate: field(form, "workDate"),
    provisions: field(form, "provisions"),
    travel: field(form, "travel"),
    tips: field(form, "tips"),
    otherExpenses: field(form, "otherExpenses"),
    otherLabel: field(form, "otherLabel"),
    notes: field(form, "notes"),
    consent:
      field(form, "consent") === "true" || field(form, "consent") === "on",
    companyWebsite: field(form, "companyWebsite"),
  };

  if (body.companyWebsite.trim()) {
    return NextResponse.json(
      { error: "We could not process your request." },
      { status: 400 },
    );
  }

  const errors = validateCrewExpense(body);
  if (hasCrewExpenseErrors(errors)) {
    return NextResponse.json(
      { error: "Validation failed.", errors },
      { status: 400 },
    );
  }

  const receiptFiles = form
    .getAll("receipts")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  const receiptResult = await collectAttachments(
    receiptFiles,
    receiptUploadRules,
  );
  if (!receiptResult.ok) {
    return NextResponse.json({ error: receiptResult.error }, { status: 400 });
  }

  const payload = buildCrewExpenseEmailPayload(
    body,
    receiptResult.attachments,
  );

  const result = await sendOwnerEmail({
    subject: singleLine(payload.subject),
    text: payload.text,
    html: `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#0a1628">
      <h1 style="font-size:20px;font-weight:600;margin:0 0 8px">Crew expense report</h1>
      <p style="margin:0 0 16px;font-size:13px;color:#5c5850">For review only — not a payment, transfer, or ledger entry.</p>
      <table style="border-collapse:collapse;width:100%">${htmlRows(payload.htmlRows)}</table>
      <p style="margin:20px 0 8px;font-size:13px;color:#5c5850">Notes</p>
      <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(payload.notes)}</p>
    </div>
  `.trim(),
    replyTo: payload.replyTo,
    attachments: receiptResult.attachments,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true, mocked: Boolean(result.mocked) });
}
