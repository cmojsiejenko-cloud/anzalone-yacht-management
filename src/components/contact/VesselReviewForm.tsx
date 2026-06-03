"use client";

import { Button } from "@/components/ui/Button";
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
import { useCallback, useId, useRef, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function VesselReviewForm() {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<VesselReviewFormData>(
    vesselReviewInitialValues,
  );
  const [errors, setErrors] = useState<VesselReviewFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({});

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
    setValues(vesselReviewInitialValues);
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
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setStatus("error");
    setSubmitError(result.error);
  };

  if (status === "success") {
    return (
      <div
        className="vessel-review-form vessel-review-form--success"
        aria-live="polite"
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
          Thank you, {values.name.trim().split(" ")[0] || "there"}. A member of
          our team will respond personally — typically within one business day
          — using your preferred contact method.
        </p>
        <LuxuryDivider variant="rule" className="mt-8" />
        <p className="mt-6 type-body-sm text-gray-500">
          Prefer to follow up directly?{" "}
          <a
            href="mailto:info@anzaloneyacht.com"
            className="font-medium text-navy-900 transition-luxury hover:text-gold-muted"
          >
            info@anzaloneyacht.com
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

  return (
    <div className="vessel-review-form">
      <form
        ref={formRef}
        id={formId}
        onSubmit={handleSubmit}
        noValidate
        className="space-y-8"
        aria-busy={status === "submitting"}
      >
        {status === "error" && submitError && (
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
                href="mailto:info@anzaloneyacht.com"
                className="font-medium text-navy-900 underline-offset-2 hover:underline"
              >
                info@anzaloneyacht.com
              </a>{" "}
              with your vessel details.
            </p>
          </div>
        )}

        <fieldset className="space-y-6">
          <legend className="sr-only">Your contact information</legend>
          <p className="type-label">Your details</p>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              id={`${formId}-name`}
              label="Name"
              required
              error={touched.name ? errors.name : undefined}
            >
              <input
                id={`${formId}-name`}
                name="name"
                type="text"
                autoComplete="name"
                className={inputClass("name")}
                value={values.name}
                onChange={(e) => updateField("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                aria-invalid={!!errors.name}
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
                id={`${formId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                className={inputClass("email")}
                value={values.email}
                onChange={(e) => updateField("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                aria-invalid={!!errors.email}
                disabled={status === "submitting"}
              />
            </FormField>
          </div>

          <FormField
            id={`${formId}-phone`}
            label="Phone"
            required
            hint="Include country code if outside the U.S."
            error={touched.phone ? errors.phone : undefined}
          >
            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              className={inputClass("phone")}
              value={values.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              aria-invalid={!!errors.phone}
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
                id={`${formId}-vessel-name`}
                name="vesselName"
                type="text"
                className={inputClass("vesselName")}
                value={values.vesselName}
                onChange={(e) => updateField("vesselName", e.target.value)}
                onBlur={() => handleBlur("vesselName")}
                aria-invalid={!!errors.vesselName}
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
                id={`${formId}-vessel-size`}
                name="vesselSize"
                type="text"
                className={inputClass("vesselSize")}
                value={values.vesselSize}
                onChange={(e) => updateField("vesselSize", e.target.value)}
                onBlur={() => handleBlur("vesselSize")}
                aria-invalid={!!errors.vesselSize}
                disabled={status === "submitting"}
                placeholder="e.g. 72 ft"
              />
            </FormField>
          </div>

          <FormField
            id={`${formId}-location`}
            label="Current location"
            required
            hint="Marina, yard, or cruising area"
            error={touched.currentLocation ? errors.currentLocation : undefined}
          >
            <input
              id={`${formId}-location`}
              name="currentLocation"
              type="text"
              className={inputClass("currentLocation")}
              value={values.currentLocation}
              onChange={(e) => updateField("currentLocation", e.target.value)}
              onBlur={() => handleBlur("currentLocation")}
              aria-invalid={!!errors.currentLocation}
              disabled={status === "submitting"}
              placeholder="e.g. Palm Beach, FL"
            />
          </FormField>
        </fieldset>

        <LuxuryDivider variant="rule" />

        <fieldset>
          <legend className="type-label">Services needed</legend>
          <p className="mt-2 type-body-sm text-navy-700/80">
            Select all that apply. We will tailor our response to your scope.
          </p>
          <ul
            className="mt-5 grid gap-3 sm:grid-cols-2"
            aria-describedby={
              touched.servicesNeeded && errors.servicesNeeded
                ? `${formId}-services-error`
                : undefined
            }
          >
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
          {touched.servicesNeeded && errors.servicesNeeded && (
            <p
              id={`${formId}-services-error`}
              className="form-error mt-3"
              role="alert"
            >
              {errors.servicesNeeded}
            </p>
          )}
        </fieldset>

        <FormField
          id={`${formId}-message`}
          label="Message"
          required
          hint="Timeline, how you use the vessel, and what “ready” means to you"
          error={touched.message ? errors.message : undefined}
        >
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            className={cn(inputClass("message"), "form-control--textarea")}
            value={values.message}
            onChange={(e) => updateField("message", e.target.value)}
            onBlur={() => handleBlur("message")}
            aria-invalid={!!errors.message}
            disabled={status === "submitting"}
          />
        </FormField>

        <fieldset>
          <legend className="type-label">Preferred contact method</legend>
          <div
            className="mt-5 grid gap-3"
            role="radiogroup"
            aria-describedby={
              touched.preferredContactMethod && errors.preferredContactMethod
                ? `${formId}-contact-method-error`
                : undefined
            }
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
          {touched.preferredContactMethod &&
            errors.preferredContactMethod && (
              <p
                id={`${formId}-contact-method-error`}
                className="form-error mt-3"
                role="alert"
              >
                {errors.preferredContactMethod}
              </p>
            )}
        </fieldset>

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
            Confidential inquiry. No call center — your request goes directly to
            the operator. We never share your information with third parties.
          </p>
        </div>
      </form>
    </div>
  );
}
