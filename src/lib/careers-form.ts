import { careerInterestLabel, isAllowedCareerInterest } from "./careers";
import type { UploadedAttachment } from "./uploads";

export type CareerApplicationData = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  location: string;
  experience: string;
  message: string;
  consent: boolean;
  companyWebsite: string;
};

export type CareerApplicationErrors = Partial<
  Record<keyof CareerApplicationData | "resume", string>
>;

export const careerApplicationInitial: CareerApplicationData = {
  name: "",
  email: "",
  phone: "",
  interest: "field-service",
  location: "",
  experience: "",
  message: "",
  consent: false,
  companyWebsite: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s().+\-]{10,}$/;

function text(value: string | undefined): string {
  return typeof value === "string" ? value : "";
}

export function validateCareerApplication(
  data: CareerApplicationData,
): CareerApplicationErrors {
  const errors: CareerApplicationErrors = {};
  if (text(data.name).trim().length < 2) errors.name = "Please enter your name.";

  const email = text(data.email).trim();
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const phone = text(data.phone).trim();
  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.phone = "Enter a valid phone number, or leave this blank.";
  }

  if (!data.interest || !isAllowedCareerInterest(data.interest)) {
    errors.interest = "Please choose an area of interest.";
  }

  if (!text(data.location).trim()) {
    errors.location = "Please enter your location.";
  }

  const experience = text(data.experience).trim();
  if (experience.length < 20) {
    errors.experience =
      "Please share a short summary of at least 20 characters.";
  } else if (experience.length > 5000) {
    errors.experience = "Experience must be 5000 characters or fewer.";
  }

  const message = text(data.message).trim();
  if (message.length < 20) {
    errors.message = "Please add a cover note of at least 20 characters.";
  } else if (message.length > 5000) {
    errors.message = "Cover message must be 5000 characters or fewer.";
  }

  if (text(data.name).trim().length > 120) {
    errors.name = "Name must be 120 characters or fewer.";
  }
  if (text(data.location).trim().length > 160) {
    errors.location = "Location must be 160 characters or fewer.";
  }

  if (!data.consent) {
    errors.consent =
      "Please confirm you understand this is an application, not a job offer.";
  }

  return errors;
}

export function hasCareerErrors(errors: CareerApplicationErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function buildCareerEmailPayload(
  data: CareerApplicationData,
  resume?: UploadedAttachment,
): {
  subject: string;
  text: string;
  htmlRows: { label: string; value: string }[];
  message: string;
  replyTo: string;
  attachmentNote: string;
} {
  const name = data.name.trim();
  const email = data.email.trim();
  const interest = careerInterestLabel(data.interest.trim());
  const message = data.message.trim();
  const attachmentNote = resume
    ? `Resume attached: ${resume.filename}`
    : "No resume attached";

  const rows = [
    { label: "Name", value: name },
    { label: "Email", value: email },
    { label: "Phone", value: data.phone.trim() || "—" },
    { label: "Interest", value: interest },
    { label: "Location", value: data.location.trim() },
    { label: "Experience", value: data.experience.trim() },
    { label: "Consent", value: "Acknowledged" },
    { label: "Resume", value: attachmentNote },
  ];

  const text = [
    "New career application",
    "",
    ...rows.map((row) => `${row.label}: ${row.value}`),
    "",
    "Cover message:",
    message,
  ].join("\n");

  return {
    subject: `Career application — ${interest} (${name})`,
    text,
    htmlRows: rows,
    message,
    replyTo: email,
    attachmentNote,
  };
}
