import { NextResponse } from "next/server";
import {
  buildCareerEmailPayload,
  hasCareerErrors,
  validateCareerApplication,
  type CareerApplicationData,
} from "@/lib/careers-form";
import { escapeHtml, htmlRows, sendOwnerEmail, singleLine } from "@/lib/mail";
import {
  checkRateLimit,
  clientKeyFromRequest,
} from "@/lib/rate-limit";
import {
  collectAttachments,
  resumeUploadRules,
} from "@/lib/uploads";

function field(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const limited = checkRateLimit(clientKeyFromRequest(request, "careers"));
  if (!limited.ok) {
    return NextResponse.json(
      {
        error:
          "Too many applications from this network. Please try again later or email us directly.",
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

  const body: CareerApplicationData = {
    name: field(form, "name"),
    email: field(form, "email"),
    phone: field(form, "phone"),
    interest: field(form, "interest"),
    location: field(form, "location"),
    experience: field(form, "experience"),
    message: field(form, "message"),
    consent: field(form, "consent") === "true" || field(form, "consent") === "on",
    companyWebsite: field(form, "companyWebsite"),
  };

  if (body.companyWebsite.trim()) {
    return NextResponse.json(
      { error: "We could not process your request." },
      { status: 400 },
    );
  }

  const errors = validateCareerApplication(body);
  if (hasCareerErrors(errors)) {
    return NextResponse.json(
      { error: "Validation failed.", errors },
      { status: 400 },
    );
  }

  const resumeEntry = form.get("resume");
  const resumeFiles =
    resumeEntry instanceof File && resumeEntry.size > 0 ? [resumeEntry] : [];
  const resumeResult = await collectAttachments(resumeFiles, resumeUploadRules);
  if (!resumeResult.ok) {
    return NextResponse.json({ error: resumeResult.error }, { status: 400 });
  }

  const resume = resumeResult.attachments[0];
  const payload = buildCareerEmailPayload(body, resume);

  const result = await sendOwnerEmail({
    subject: singleLine(payload.subject),
    text: payload.text,
    html: `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#0a1628">
      <h1 style="font-size:20px;font-weight:600;margin:0 0 16px">Career application</h1>
      <table style="border-collapse:collapse;width:100%">${htmlRows(payload.htmlRows)}</table>
      <p style="margin:20px 0 8px;font-size:13px;color:#5c5850">Cover message</p>
      <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(payload.message)}</p>
    </div>
  `.trim(),
    replyTo: payload.replyTo,
    attachments: resume ? [resume] : [],
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true, mocked: Boolean(result.mocked) });
}
