import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/seo";
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
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#5c5850;font-size:13px;vertical-align:top">${label}</td><td style="padding:6px 0;color:#0a1628;font-size:14px">${value}</td></tr>`;

  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#0a1628">
      <h1 style="font-size:20px;font-weight:600;margin:0 0 16px">Vessel review request</h1>
      <table style="border-collapse:collapse;width:100%">${row("Name", payload.name)}${row("Email", payload.email)}${row("Phone", payload.phone)}${row("Preferred contact", payload.preferredContactMethod)}${row("Vessel", payload.vesselName)}${row("Size", payload.vesselSize)}${row("Location", payload.currentLocation)}${row("Services", payload.servicesNeeded.join(", "))}</table>
      <p style="margin:20px 0 8px;font-size:13px;color:#5c5850">Message</p>
      <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${payload.message}</p>
    </div>
  `.trim();
}

export async function POST(request: Request) {
  let body: VesselReviewFormData;

  try {
    body = (await request.json()) as VesselReviewFormData;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
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
  const resendKey = process.env.RESEND_API_KEY;
  const contactTo = process.env.CONTACT_FORM_TO ?? siteConfig.email;
  const contactFrom =
    process.env.CONTACT_FORM_FROM ??
    "Anzalone Yacht Management <onboarding@resend.dev>";

  if (!resendKey) {
    return NextResponse.json(
      {
        error:
          "Contact form is not configured yet. Please email info@anzaloneyacht.com directly.",
      },
      { status: 503 },
    );
  }

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
        reply_to: payload.email,
        subject: `Vessel Review — ${payload.vesselName} (${payload.name})`,
        text: formatEmailText(payload),
        html: formatEmailHtml(payload),
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "We could not send your request. Please try again or email us directly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "A network error occurred. Please check your connection and try again.",
      },
      { status: 502 },
    );
  }
}
