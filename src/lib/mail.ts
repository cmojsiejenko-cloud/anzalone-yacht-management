import { company } from "./company";
import type { UploadedAttachment } from "./uploads";

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function singleLine(value: string, max = 180): string {
  return value.replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

export type OwnerEmail = {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
  attachments?: UploadedAttachment[];
};

export type MailResult =
  | { ok: true; mocked?: boolean }
  | { ok: false; status: number; error: string };

const unconfigured = `Contact form is not configured yet. Please email ${company.email} directly.`;

const sendFailed =
  "We could not send your request. Please try again or email us directly.";

/**
 * MAIL_TRANSPORT=mock validates payloads without calling Resend.
 * Allowed only outside production (local / contract tests).
 * Never treat mock success as production delivery.
 */
export function isMockTransport(): boolean {
  return process.env.MAIL_TRANSPORT?.trim().toLowerCase() === "mock";
}

function allowMockTransport(): boolean {
  if (!isMockTransport()) return false;
  // Vercel production / NODE_ENV=production must never silently "succeed".
  if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
    return false;
  }
  return true;
}

export async function sendOwnerEmail(email: OwnerEmail): Promise<MailResult> {
  const resendKey = process.env.RESEND_API_KEY;
  const contactTo = process.env.CONTACT_FORM_TO ?? company.email;
  const contactFrom =
    process.env.CONTACT_FORM_FROM ??
    `${company.shortName} <onboarding@resend.dev>`;

  if (isMockTransport() && !allowMockTransport()) {
    return {
      ok: false,
      status: 503,
      error: `Email delivery is misconfigured (mock transport is not allowed in production). Please email ${company.email} directly.`,
    };
  }

  if (allowMockTransport()) {
    if (!email.subject.trim() || !email.text.trim() || !email.replyTo.trim()) {
      return { ok: false, status: 500, error: sendFailed };
    }
    return { ok: true, mocked: true };
  }

  if (!resendKey) {
    return { ok: false, status: 503, error: unconfigured };
  }

  const attachments = email.attachments?.map((file) => ({
    filename: file.filename,
    content: file.contentBase64,
    content_type: file.contentType,
  }));

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactFrom,
        to: [contactTo],
        reply_to: email.replyTo,
        subject: singleLine(email.subject),
        text: email.text,
        html: email.html,
        ...(attachments && attachments.length > 0 ? { attachments } : {}),
      }),
    });

    if (!response.ok) {
      return { ok: false, status: 502, error: sendFailed };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      status: 502,
      error:
        "A network error occurred. Please check your connection and try again.",
    };
  }
}

export function htmlRows(rows: { label: string; value: string }[]): string {
  return rows
    .map(
      (row) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5c5850;font-size:13px;vertical-align:top">${escapeHtml(row.label)}</td><td style="padding:6px 0;color:#0a1628;font-size:14px">${escapeHtml(row.value)}</td></tr>`,
    )
    .join("");
}
