import { serviceNavLinks } from "@/lib/navigation";

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
};

export const serviceOptions = [
  ...serviceNavLinks.map((link) => link.label),
  "General inquiry",
  "Not sure yet — recommend a scope",
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

export function validateVesselReviewForm(
  data: VesselReviewFormData,
): VesselReviewFormErrors {
  const errors: VesselReviewFormErrors = {};

  const name = data.name.trim();
  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least two characters.";
  }

  const email = data.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const phone = data.phone.trim();
  if (!phone) {
    errors.phone = "Please enter a phone number.";
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  const vesselName = data.vesselName.trim();
  if (!vesselName) {
    errors.vesselName = "Please enter your vessel name.";
  }

  const vesselSize = data.vesselSize.trim();
  if (!vesselSize) {
    errors.vesselSize = "Please enter vessel size (length or tonnage).";
  }

  const currentLocation = data.currentLocation.trim();
  if (!currentLocation) {
    errors.currentLocation = "Please enter the vessel's current location.";
  }

  if (data.servicesNeeded.length === 0) {
    errors.servicesNeeded = "Select at least one service or inquiry type.";
  }

  const message = data.message.trim();
  if (!message) {
    errors.message = "Please share a brief message about your needs.";
  } else if (message.length < 20) {
    errors.message = "Message should be at least 20 characters.";
  }

  if (!data.preferredContactMethod) {
    errors.preferredContactMethod =
      "Please choose how you'd like us to reach you.";
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
  submittedAt: string;
};

export function toVesselReviewPayload(
  data: VesselReviewFormData,
): VesselReviewPayload {
  return {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    vesselName: data.vesselName.trim(),
    vesselSize: data.vesselSize.trim(),
    currentLocation: data.currentLocation.trim(),
    servicesNeeded: data.servicesNeeded,
    message: data.message.trim(),
    preferredContactMethod:
      data.preferredContactMethod as PreferredContactMethod,
    submittedAt: new Date().toISOString(),
  };
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string; status?: number };

/**
 * Submit vessel review data to a backend.
 *
 * Wire-up options:
 * 1. Set NEXT_PUBLIC_CONTACT_FORM_ENDPOINT to your API or Formspree URL.
 * 2. Replace this function with a server action or route handler call.
 * 3. Pass `endpoint` in options for per-environment overrides.
 */
const defaultFormEndpoint = "/api/vessel-review";

export async function submitVesselReview(
  data: VesselReviewFormData,
  options?: { endpoint?: string; signal?: AbortSignal },
): Promise<SubmitResult> {
  const endpoint =
    options?.endpoint ??
    process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ??
    defaultFormEndpoint;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      signal: options?.signal,
    });

    if (!response.ok) {
      let message =
        response.status >= 500
          ? "Our server is temporarily unavailable. Please try again or email us directly."
          : "We could not process your request. Please check your details and try again.";

      try {
        const body = (await response.json()) as { error?: string };
        if (body.error) message = body.error;
      } catch {
        /* use default message */
      }

      return { ok: false, error: message, status: response.status };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        "A network error occurred. Please check your connection and try again.",
    };
  }
}
