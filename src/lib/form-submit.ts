import { company } from "@/lib/company";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string; status?: number };

async function readError(response: Response): Promise<string> {
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

  return message;
}

export async function postJson(
  endpoint: string,
  data: unknown,
  signal?: AbortSignal,
): Promise<SubmitResult> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      signal,
    });

    if (!response.ok) {
      return {
        ok: false,
        error: await readError(response),
        status: response.status,
      };
    }

    return guardMockSuccess(response);
  } catch {
    return {
      ok: false,
      error:
        "A network error occurred. Please check your connection and try again.",
    };
  }
}

export async function postFormData(
  endpoint: string,
  data: FormData,
  signal?: AbortSignal,
): Promise<SubmitResult> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
      signal,
    });

    if (!response.ok) {
      return {
        ok: false,
        error: await readError(response),
        status: response.status,
      };
    }

    return guardMockSuccess(response);
  } catch {
    return {
      ok: false,
      error:
        "A network error occurred. Please check your connection and try again.",
    };
  }
}

/**
 * If a production build somehow returns mocked:true, never show success.
 * Local/dev mock transport remains valid for contract testing.
 */
async function guardMockSuccess(response: Response): Promise<SubmitResult> {
  try {
    const body = (await response.clone().json()) as { mocked?: boolean };
    if (
      body.mocked === true &&
      process.env.NODE_ENV === "production"
    ) {
      return {
        ok: false,
        error:
          `Email delivery is not configured for production. Please email ${company.email} directly.`,
        status: 503,
      };
    }
  } catch {
    /* empty body is fine */
  }
  return { ok: true };
}
