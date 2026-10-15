"use client";

import { Honeypot } from "@/components/forms/Honeypot";
import { Button } from "@/components/ui/Button";
import { company, mailtoHref, personalReplySentence } from "@/lib/company";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { FormField } from "@/components/contact/FormField";
import { cn } from "@/lib/cn";
import {
  hasFormErrors,
  preferredContactOptions,
  serviceOptions,
  submitVesselReview,
  validateVesselReviewForm,
  vesselReviewInitialValues,
  type PreferredContactMethod,
  type VesselReviewFormData,
  type VesselReviewFormErrors,
} from "@/lib/vessel-review-form";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

type VesselReviewFormProps = {
  /** Preselected checklist labels from `?service=` / `?program=` on /contact. */
  initialServices?: string[];
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function buildInitialValues(
  initialServices: string[] = [],
): VesselReviewFormData {
  const allowed = new Set<string>(serviceOptions);
  const servicesNeeded = initialServices.filter((service) =>
    allowed.has(service),
  );
  return {
    ...vesselReviewInitialValues,
    servicesNeeded,
  };
}

export function VesselReviewForm({
  initialServices = [],
}: VesselReviewFormProps) {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<VesselReviewFormData>(() =>
    buildInitialValues(initialServices),
  );
  const [errors, setErrors] = useState<VesselReviewFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({});

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    }
  }, [status]);

  const updateField = useCallback(
    <K extends keyof VesselReviewFormData>(
      key: K,
      value: VesselReviewFormData[K],
    ) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      if (touched[key]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
    },
    [touched],
  );

  const toggleService = useCallback((service: string) => {
    setValues((prev) => {
      const selected = prev.servicesNeeded.includes(service);
      const servicesNeeded = selected
        ? prev.servicesNeeded.filter((s) => s !== service)
        : [...prev.servicesNeeded, service];
      return { ...prev, servicesNeeded };
    });
    setTouched((prev) => ({ ...prev, servicesNeeded: true }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.servicesNeeded;
      return next;
    });
  }, []);

  const markTouched = (field: keyof VesselReviewFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: keyof VesselReviewFormData) => {
    markTouched(field);
    const fieldErrors = validateVesselReviewForm(values);
    if (fieldErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const resetForm = () => {
    setValues(buildInitialValues(initialServices));
    setErrors({});
    setTouched({});
    setSubmitError(null);
    setStatus("idle");
    formRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validateVesselReviewForm(values);
    setErrors(validationErrors);
    setTouched(
      Object.fromEntries(
        Object.keys(vesselReviewInitialValues).map((k) => [k, true]),
      ),
    );

    if (hasFormErrors(validationErrors)) {
      const firstInvalid = formRef.current?.querySelector<HTMLElement>(
        "[aria-invalid='true'], .form-field--invalid input, .form-field--invalid textarea, .form-field--invalid select",
      );
      firstInvalid?.focus();
      return;
    }

    setStatus("submitting");

    const result = await submitVesselReview(values);

    if (result.ok) {
      setStatus("success");
      formRef.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
      return;
    }

    setStatus("error");
    setSubmitError(result.error);
  };

  if (status === "success") {
    const firstName = values.name.trim().split(/\s+/)[0] || "there";
    return (
      <div
        ref={successRef}
        className="vessel-review-form vessel-review-form--success"
        role="status"
        aria-live="polite"
        tabIndex={-1}
      >
        <div className="vessel-review-form__success-icon" aria-hidden>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-10 w-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <h2 className="type-display-sm text-navy-900">
          Your vessel review request is received
        </h2>
        <p className="mt-4 type-body text-navy-700/90">
          Thank you, {firstName}. {personalReplySentence()} We will use your
          preferred contact method
          {values.preferredContactMethod
            ? ` (${values.preferredContactMethod})`
            : ""}
          .
        </p>
        <LuxuryDivider variant="rule" className="mt-8" />
        <p className="mt-6 type-body-sm text-gray-500">
          Prefer to follow up directly?{" "}
          <a
            href={mailtoHref}
            className="font-medium text-navy-900 transition-luxury hover:text-gold-muted"
          >
            {company.email}
          </a>
        </p>
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="mt-8 w-full sm:w-auto"
          onClick={resetForm}
        >
          Submit another request
        </Button>
      </div>
    );
  }

  const inputClass = (field: keyof VesselReviewFormData) =>
    cn("form-control", errors[field] && touched[field] && "form-control--error");

  const servicesErrorId = `${formId}-services-error`;
  const contactMethodErrorId = `${formId}-contact-method-error`;
  const servicesLegendId = `${formId}-services-legend`;
  const contactLegendId = `${formId}-contact-legend`;

  return (
    <div className="vessel-review-form">
      <form
        ref={formRef}
        id={formId}
        onSubmit={handleSubmit}
        noValidate
        className="relative space-y-8"
        aria-busy={status === "submitting"}
      >
        <Honeypot
          id={`${formId}-website`}
          value={values.companyWebsite ?? ""}
          onChange={(value) => updateField("companyWebsite", value)}
        />

        <p className="sr-only" aria-live="polite">
          {status === "submitting" ? "Sending your vessel review request." : ""}
        </p>

        {status === "error" && submitError ? (
          <div
            className="form-banner form-banner--error"
            role="alert"
            aria-live="assertive"
          >
            <p className="font-semibold text-navy-900">Unable to send request</p>
            <p className="mt-1 type-body-sm">{submitError}</p>
            <p className="mt-3 type-body-sm text-navy-700/85">
              You may also email{" "}
              <a
                href={mailtoHref}
                className="font-medium text-navy-900 underline-offset-2 hover:underline"
              >
                {company.email}
              </a>{" "}
              with your vessel details.
            </p>
          </div>
        ) : null}

        <fieldset className="space-y-6">
          <legend className="sr-only">Your contact information</legend>
          <p className="type-label">Your details</p>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              id={`${formId}-name`}
              label="Owner name"
              required
              error={touched.name ? errors.name : undefined}
            >
              <input
                name="name"
                type="text"
                autoComplete="name"
                enterKeyHint="next"
                className={inputClass("name")}
                value={values.name}
                onChange={(e) => updateField("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                disabled={status === "submitting"}
              />
            </FormField>

            <FormField
              id={`${formId}-email`}
              label="Email"
              required
              error={touched.email ? errors.email : undefined}
            >
              <input
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                enterKeyHint="next"
                className={inputClass("email")}
                value={values.email}
                onChange={(e) => updateField("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                disabled={status === "submitting"}
              />
            </FormField>
          </div>

          <FormField
            id={`${formId}-phone`}
            label="Phone"
            hint="Optional unless you prefer a call. Include country code if outside the U.S."
            error={touched.phone ? errors.phone : undefined}
          >
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              enterKeyHint="next"
              className={inputClass("phone")}
              value={values.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              disabled={status === "submitting"}
            />
          </FormField>
        </fieldset>

        <LuxuryDivider variant="rule" />

        <fieldset className="space-y-6">
          <legend className="sr-only">Vessel information</legend>
          <p className="type-label">Vessel</p>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              id={`${formId}-vessel-name`}
              label="Vessel name"
              required
              error={touched.vesselName ? errors.vesselName : undefined}
            >
              <input
                name="vesselName"
                type="text"
                className={inputClass("vesselName")}
                value={values.vesselName}
                onChange={(e) => updateField("vesselName", e.target.value)}
                onBlur={() => handleBlur("vesselName")}
                disabled={status === "submitting"}
              />
            </FormField>

            <FormField
              id={`${formId}-vessel-size`}
              label="Vessel size"
              required
              hint="Length (ft/m) or tonnage"
              error={touched.vesselSize ? errors.vesselSize : undefined}
            >
              <input
                name="vesselSize"
                type="text"
                className={inputClass("vesselSize")}
                value={values.vesselSize}
                onChange={(e) => updateField("vesselSize", e.target.value)}
                onBlur={() => handleBlur("vesselSize")}
                disabled={status === "submitting"}
                placeholder="e.g. 72 ft"
              />
            </FormField>
          </div>

          <FormField
            id={`${formId}-location`}
            label="Vessel location"
            required
            hint="Marina, yard, or cruising area"
            error={touched.currentLocation ? errors.currentLocation : undefined}
          >
            <input
              name="currentLocation"
              type="text"
              className={inputClass("currentLocation")}
              value={values.currentLocation}
              onChange={(e) => updateField("currentLocation", e.target.value)}
              onBlur={() => handleBlur("currentLocation")}
              disabled={status === "submitting"}
              placeholder="e.g. Palm Beach, FL"
            />
          </FormField>
        </fieldset>

        <LuxuryDivider variant="rule" />

        <fieldset
          aria-invalid={
            touched.servicesNeeded && errors.servicesNeeded ? true : undefined
          }
          aria-describedby={
            touched.servicesNeeded && errors.servicesNeeded
              ? servicesErrorId
              : undefined
          }
        >
          <legend id={servicesLegendId} className="type-label">
            Services or program interest
          </legend>
          <p className="mt-2 type-body-sm text-navy-700/80">
            Select all that apply. We will tailor our response to your scope.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2" role="list">
            {serviceOptions.map((service) => {
              const checked = values.servicesNeeded.includes(service);
              const checkboxId = `${formId}-service-${service.replace(/\s+/g, "-").toLowerCase()}`;
              return (
                <li key={service}>
                  <label
                    htmlFor={checkboxId}
                    className={cn(
                      "form-check-card",
                      checked && "form-check-card--selected",
                    )}
                  >
                    <input
                      id={checkboxId}
                      type="checkbox"
                      name="servicesNeeded"
                      value={service}
                      checked={checked}
                      onChange={() => toggleService(service)}
                      disabled={status === "submitting"}
                      className="form-check-card__input"
                    />
                    <span className="form-check-card__label">{service}</span>
                  </label>
                </li>
              );
            })}
          </ul>
          {touched.servicesNeeded && errors.servicesNeeded ? (
            <p id={servicesErrorId} className="form-error mt-3" role="alert">
              {errors.servicesNeeded}
            </p>
          ) : null}
        </fieldset>

        <FormField
          id={`${formId}-message`}
          label="How can we help?"
          required
          hint="Timeline, how you use the vessel, and what “ready” means to you"
          error={touched.message ? errors.message : undefined}
        >
          <textarea
            name="message"
            rows={5}
            className={cn(inputClass("message"), "form-control--textarea")}
            value={values.message}
            onChange={(e) => updateField("message", e.target.value)}
            onBlur={() => handleBlur("message")}
            disabled={status === "submitting"}
          />
        </FormField>

        <fieldset
          aria-invalid={
            touched.preferredContactMethod && errors.preferredContactMethod
              ? true
              : undefined
          }
          aria-describedby={
            touched.preferredContactMethod && errors.preferredContactMethod
              ? contactMethodErrorId
              : undefined
          }
        >
          <legend id={contactLegendId} className="type-label">
            Preferred contact method
          </legend>
          <div
            className="mt-5 grid gap-3"
            role="radiogroup"
            aria-labelledby={contactLegendId}
            aria-required="true"
          >
            {preferredContactOptions.map((option) => {
              const radioId = `${formId}-contact-${option.value}`;
              const selected =
                values.preferredContactMethod === option.value;
              return (
                <label
                  key={option.value}
                  htmlFor={radioId}
                  className={cn(
                    "form-radio-card",
                    selected && "form-radio-card--selected",
                  )}
                >
                  <input
                    id={radioId}
                    type="radio"
                    name="preferredContactMethod"
                    value={option.value}
                    checked={selected}
                    onChange={() => {
                      updateField(
                        "preferredContactMethod",
                        option.value as PreferredContactMethod,
                      );
                      markTouched("preferredContactMethod");
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.preferredContactMethod;
                        if (option.value === "email") delete next.phone;
                        return next;
                      });
                    }}
                    disabled={status === "submitting"}
                    className="form-radio-card__input"
                  />
                  <span className="form-radio-card__content">
                    <span className="form-radio-card__label">
                      {option.label}
                    </span>
                    <span className="form-radio-card__description">
                      {option.description}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
          {touched.preferredContactMethod && errors.preferredContactMethod ? (
            <p id={contactMethodErrorId} className="form-error mt-3" role="alert">
              {errors.preferredContactMethod}
            </p>
          ) : null}
        </fieldset>

        <FormField
          id={`${formId}-consent`}
          label="Privacy acknowledgment"
          required
          error={touched.consent ? errors.consent : undefined}
        >
          <label className="flex items-start gap-3 text-sm text-navy-800">
            <input
              name="consent"
              type="checkbox"
              className="mt-1 h-4 w-4 shrink-0"
              checked={values.consent}
              onChange={(e) => {
                updateField("consent", e.target.checked);
                markTouched("consent");
              }}
              disabled={status === "submitting"}
            />
            <span>
              I understand this inquiry will be emailed to Anzalone&apos;s for
              review. See our{" "}
              <Link
                href="/privacy"
                className="font-medium text-navy-900 underline-offset-2 hover:underline"
              >
                privacy notice
              </Link>
              .
            </span>
          </label>
        </FormField>

        <div className="form-submit">
          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full sm:w-auto sm:min-w-[16rem]"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending…" : "Request Vessel Review"}
          </Button>
          <p className="form-disclaimer type-body-sm text-gray-500">
            Confidential inquiry. No call center — your request goes to the
            operator via our email provider. Always reachable at{" "}
            <a
              href={mailtoHref}
              className="font-medium text-navy-900 underline-offset-2 hover:underline"
            >
              {company.email}
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
