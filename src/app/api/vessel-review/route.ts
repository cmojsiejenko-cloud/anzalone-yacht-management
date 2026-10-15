import { NextResponse } from "next/server";
import { escapeHtml, htmlRows, sendOwnerEmail, singleLine } from "@/lib/mail";
import {
  checkRateLimit,
  clientKeyFromRequest,
} from "@/lib/rate-limit";
import {
  hasFormErrors,
  toVesselReviewPayload,
  validateVesselReviewForm,
  type VesselReviewFormData,
  type VesselReviewPayload,
} from "@/lib/vessel-review-form";

function formatEmailText(payload: VesselReviewPayload): string {
  return [
    "New vessel review request",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Preferred contact: ${payload.preferredContactMethod}`,
    `Consent: ${payload.consent ? "acknowledged" : "missing"}`,
    "",
    `Vessel: ${payload.vesselName}`,
    `Size: ${payload.vesselSize}`,
    `Location: ${payload.currentLocation}`,
    "",
    `Services: ${payload.servicesNeeded.join(", ")}`,
    "",
    "Message:",
    payload.message,
    "",
    `Submitted: ${payload.submittedAt}`,
  ].join("\n");
}

function formatEmailHtml(payload: VesselReviewPayload): string {
  const table = htmlRows([
    { label: "Name", value: payload.name },
    { label: "Email", value: payload.email },
    { label: "Phone", value: payload.phone },
    { label: "Preferred contact", value: payload.preferredContactMethod },
    {
      label: "Consent",
      value: payload.consent ? "Acknowledged" : "Missing",
    },
    { label: "Vessel", value: payload.vesselName },
    { label: "Size", value: payload.vesselSize },
    { label: "Location", value: payload.currentLocation },
    { label: "Services", value: payload.servicesNeeded.join(", ") },
  ]);

  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#0a1628">
      <h1 style="font-size:20px;font-weight:600;margin:0 0 16px">Vessel review request</h1>
      <table style="border-collapse:collapse;width:100%">${table}</table>
      <p style="margin:20px 0 8px;font-size:13px;color:#5c5850">Message</p>
      <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(payload.message)}</p>
    </div>
  `.trim();
}

export async function POST(request: Request) {
  const limited = checkRateLimit(
    clientKeyFromRequest(request, "vessel-review"),
  );
  if (!limited.ok) {
    return NextResponse.json(
      {
        error:
          "Too many requests from this network. Please try again later or email us directly.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let body: VesselReviewFormData;

  try {
    body = (await request.json()) as VesselReviewFormData;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (body.companyWebsite?.trim()) {
    return NextResponse.json(
      { error: "We could not process your request." },
      { status: 400 },
    );
  }

  const errors = validateVesselReviewForm(body);
  if (hasFormErrors(errors)) {
    return NextResponse.json(
      { error: "Validation failed.", errors },
      { status: 400 },
    );
  }

  const payload = toVesselReviewPayload(body);
  const result = await sendOwnerEmail({
    subject: `Vessel Review — ${singleLine(payload.vesselName)} (${singleLine(payload.name)})`,
    text: formatEmailText(payload),
    html: formatEmailHtml(payload),
    replyTo: payload.email,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true, mocked: result.mocked === true });
}
