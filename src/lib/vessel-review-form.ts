import { postJson, type SubmitResult } from "@/lib/form-submit";
import { serviceNavLinks } from "@/lib/navigation";
import { programInquiryLabels } from "@/lib/programs";

export type { SubmitResult };

export const inquiryExtras = [
  "Programs",
  "Crew support",
  "General inquiry",
  "Not sure yet — recommend a scope",
] as const;

export type PreferredContactMethod = "email" | "phone" | "either";

export type VesselReviewFormData = {
  name: string;
  email: string;
  phone: string;
  vesselName: string;
  vesselSize: string;
  currentLocation: string;
  servicesNeeded: string[];
  message: string;
  preferredContactMethod: PreferredContactMethod | "";
  consent: boolean;
  companyWebsite?: string;
};

export type VesselReviewFormErrors = Partial<
  Record<keyof VesselReviewFormData, string>
>;

export const vesselReviewInitialValues: VesselReviewFormData = {
  name: "",
  email: "",
  phone: "",
  vesselName: "",
  vesselSize: "",
  currentLocation: "",
  servicesNeeded: [],
  message: "",
  preferredContactMethod: "",
  consent: false,
  companyWebsite: "",
};

export const serviceOptions = [
  ...serviceNavLinks.map((link) => link.label),
  ...programInquiryLabels,
  ...inquiryExtras,
] as const;

export const preferredContactOptions: {
  value: PreferredContactMethod;
  label: string;
  description: string;
}[] = [
  {
    value: "email",
    label: "Email",
    description: "Best for detailed context and attachments",
  },
  {
    value: "phone",
    label: "Phone",
    description: "We'll call at a time that works for you",
  },
  {
    value: "either",
    label: "No preference",
    description: "Reach out by whichever channel is fastest",
  },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s().+\-]{10,}$/;
const ALLOWED_CONTACT = new Set<PreferredContactMethod>([
  "email",
  "phone",
  "either",
]);
const ALLOWED_SERVICES = new Set<string>(serviceOptions);

const LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  vesselName: 120,
  vesselSize: 80,
  currentLocation: 160,
  message: 5000,
} as const;

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateVesselReviewForm(
  data: VesselReviewFormData,
): VesselReviewFormErrors {
  const errors: VesselReviewFormErrors = {};

  const name = asText(data?.name);
  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least two characters.";
  } else if (name.length > LIMITS.name) {
    errors.name = `Name must be ${LIMITS.name} characters or fewer.`;
  }

  const email = asText(data?.email);
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (email.length > LIMITS.email) {
    errors.email = "Email address is too long.";
  }

  const phone = asText(data?.phone);
  const preferred = asText(data?.preferredContactMethod);
  const wantsPhone = preferred === "phone" || preferred === "either";
  if (wantsPhone && !phone) {
    errors.phone =
      "Please add a phone number so we can reach you by your preferred method.";
  } else if (phone && !PHONE_PATTERN.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  } else if (phone.length > LIMITS.phone) {
    errors.phone = "Phone number is too long.";
  }

  const vesselName = asText(data?.vesselName);
  if (!vesselName) {
    errors.vesselName = "Please enter your vessel name.";
  } else if (vesselName.length > LIMITS.vesselName) {
    errors.vesselName = `Vessel name must be ${LIMITS.vesselName} characters or fewer.`;
  }

  const vesselSize = asText(data?.vesselSize);
  if (!vesselSize) {
    errors.vesselSize = "Please enter vessel size (length or tonnage).";
  } else if (vesselSize.length > LIMITS.vesselSize) {
    errors.vesselSize = "Vessel size is too long.";
  }

  const currentLocation = asText(data?.currentLocation);
  if (!currentLocation) {
    errors.currentLocation = "Please enter the vessel's current location.";
  } else if (currentLocation.length > LIMITS.currentLocation) {
    errors.currentLocation = "Location is too long.";
  }

  const servicesNeeded = Array.isArray(data?.servicesNeeded)
    ? data.servicesNeeded.filter((item) => typeof item === "string")
    : [];
  if (servicesNeeded.length === 0) {
    errors.servicesNeeded = "Select at least one service or inquiry type.";
  } else if (servicesNeeded.some((item) => !ALLOWED_SERVICES.has(item))) {
    errors.servicesNeeded = "One or more selected services are not valid.";
  }

  const message = asText(data?.message);
  if (!message) {
    errors.message = "Please share a brief message about your needs.";
  } else if (message.length < 12) {
    errors.message = "A short note of at least a sentence helps us reply well.";
  } else if (message.length > LIMITS.message) {
    errors.message = `Message must be ${LIMITS.message} characters or fewer.`;
  }

  if (!preferred) {
    errors.preferredContactMethod =
      "Please choose how you'd like us to reach you.";
  } else if (!ALLOWED_CONTACT.has(preferred as PreferredContactMethod)) {
    errors.preferredContactMethod =
      "Please choose a valid contact method.";
  }

  if (data?.consent !== true) {
    errors.consent =
      "Please confirm we may email this inquiry to Anzalone for review.";
  }

  return errors;
}

export function hasFormErrors(errors: VesselReviewFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Payload shape for Formspree, Resend, or a custom API route. */
export type VesselReviewPayload = {
  name: string;
  email: string;
  phone: string;
  vesselName: string;
  vesselSize: string;
  currentLocation: string;
  servicesNeeded: string[];
  message: string;
  preferredContactMethod: PreferredContactMethod;
  consent: boolean;
  submittedAt: string;
};

export function toVesselReviewPayload(
  data: VesselReviewFormData,
): VesselReviewPayload {
  return {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim() || "(not provided)",
    vesselName: data.vesselName.trim(),
    vesselSize: data.vesselSize.trim(),
    currentLocation: data.currentLocation.trim(),
    servicesNeeded: data.servicesNeeded,
    message: data.message.trim(),
    preferredContactMethod:
      data.preferredContactMethod as PreferredContactMethod,
    consent: data.consent,
    submittedAt: new Date().toISOString(),
  };
}

const defaultFormEndpoint = "/api/vessel-review";

/** Submit vessel review via shared JSON transport (includes mock-success guard). */
export async function submitVesselReview(
  data: VesselReviewFormData,
  options?: { endpoint?: string; signal?: AbortSignal },
): Promise<SubmitResult> {
  const endpoint =
    options?.endpoint ??
    process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ??
    defaultFormEndpoint;

  return postJson(endpoint, data, options?.signal);
}
