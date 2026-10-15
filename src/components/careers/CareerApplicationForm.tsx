"use client";

import { FormField } from "@/components/contact/FormField";
import { Honeypot } from "@/components/forms/Honeypot";
import { Button } from "@/components/ui/Button";
import { careerRoles, generalCareerInterests } from "@/lib/careers";
import {
  careerApplicationInitial,
  hasCareerErrors,
  validateCareerApplication,
  type CareerApplicationData,
  type CareerApplicationErrors,
} from "@/lib/careers-form";
import { company, mailtoHref } from "@/lib/company";
import { postFormData } from "@/lib/form-submit";
import { resumeUploadRules } from "@/lib/uploads";
import { useId, useState } from "react";

type CareerApplicationFormProps = {
  interest?: string;
};

export function CareerApplicationForm({
  interest = "field-service",
}: CareerApplicationFormProps) {
  const formId = useId();
  const [values, setValues] = useState<CareerApplicationData>({
    ...careerApplicationInitial,
    interest,
  });
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<CareerApplicationErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const interestOptions = [
    ...generalCareerInterests.map((item) => ({
      value: item.value,
      label: item.label,
    })),
    ...careerRoles
      .filter((role) => role.status === "active")
      .map((role) => ({ value: role.slug, label: role.title })),
  ];

  function update<K extends keyof CareerApplicationData>(
    key: K,
    value: CareerApplicationData[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateCareerApplication(values);
    if (resume) {
      if (resume.size > resumeUploadRules.maxBytes) {
        nextErrors.resume = "Resume must be 5 MB or smaller.";
      } else if (!resume.name.toLowerCase().endsWith(".pdf")) {
        nextErrors.resume = "Resume must be a PDF.";
      }
    }
    setErrors(nextErrors);
    if (hasCareerErrors(nextErrors)) return;

    setStatus("submitting");
    setSubmitError(null);

    const form = new FormData();
    form.set("name", values.name);
    form.set("email", values.email);
    form.set("phone", values.phone);
    form.set("interest", values.interest);
    form.set("location", values.location);
    form.set("experience", values.experience);
    form.set("message", values.message);
    form.set("consent", values.consent ? "true" : "false");
    form.set("companyWebsite", values.companyWebsite);
    if (resume) form.set("resume", resume);

    const result = await postFormData("/api/careers", form);
    if (result.ok) {
      setStatus("success");
      return;
    }
    setStatus("error");
    setSubmitError(result.error);
  }

  if (status === "success") {
    return (
      <div
        className="vessel-review-form vessel-review-form--success"
        aria-live="polite"
      >
        <h2 className="type-display-sm text-navy-900">
          Your application was sent
        </h2>
        <p className="mt-4 type-body text-charcoal-soft">
          We received your note for review. This is not a job offer. You may
          also email{" "}
          <a href={mailtoHref} className="font-medium text-navy-900">
            {company.email}
          </a>{" "}
          if you need to add anything.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="vessel-review-form relative space-y-8"
      aria-busy={status === "submitting"}
    >
      <Honeypot
        id={`${formId}-company`}
        value={values.companyWebsite}
        onChange={(value) => update("companyWebsite", value)}
      />

      <FormField
        id={`${formId}-name`}
        label="Full name"
        required
        error={errors.name}
      >
        <input
          id={`${formId}-name`}
          name="name"
          autoComplete="name"
          enterKeyHint="next"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
        />
      </FormField>

      <div className="grid gap-8 sm:grid-cols-2">
        <FormField
          id={`${formId}-email`}
          label="Email"
          required
          error={errors.email}
        >
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            enterKeyHint="next"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
          />
        </FormField>
        <FormField
          id={`${formId}-phone`}
          label="Phone"
          error={errors.phone}
          hint="Optional"
        >
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            enterKeyHint="next"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
        </FormField>
      </div>

      <FormField
        id={`${formId}-location`}
        label="Location"
        required
        error={errors.location}
      >
        <input
          id={`${formId}-location`}
          name="location"
          autoComplete="address-level2"
          enterKeyHint="next"
          value={values.location}
          onChange={(event) => update("location", event.target.value)}
        />
      </FormField>

      <FormField
        id={`${formId}-interest`}
        label="Area of interest"
        required
        error={errors.interest}
      >
        <select
          id={`${formId}-interest`}
          name="interest"
          value={values.interest}
          onChange={(event) => update("interest", event.target.value)}
        >
          {interestOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        id={`${formId}-experience`}
        label="Relevant experience"
        required
        error={errors.experience}
      >
        <textarea
          id={`${formId}-experience`}
          name="experience"
          rows={4}
          value={values.experience}
          onChange={(event) => update("experience", event.target.value)}
        />
      </FormField>

      <FormField
        id={`${formId}-message`}
        label="Cover message"
        required
        error={errors.message}
      >
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
        />
      </FormField>

      <FormField
        id={`${formId}-resume`}
        label="Resume"
        error={errors.resume}
        hint={`${resumeUploadRules.label}. Optional.`}
      >
        <input
          id={`${formId}-resume`}
          name="resume"
          type="file"
          accept=".pdf,application/pdf"
          onChange={(event) => setResume(event.target.files?.[0] ?? null)}
        />
      </FormField>

      <FormField
        id={`${formId}-consent`}
        label="Acknowledgment"
        required
        error={errors.consent}
      >
        <label className="flex min-h-11 items-start gap-3 text-sm text-charcoal">
          <input
            id={`${formId}-consent`}
            name="consent"
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0 accent-navy-900"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
          />
          <span>
            I understand this is an application for review, not a job offer or
            confirmation of employment. See our{" "}
            <a href="/privacy" className="underline underline-offset-2">
              privacy notice
            </a>
            .
          </span>
        </label>
      </FormField>

      {status === "error" && submitError ? (
        <p className="type-body-sm text-red-800" role="alert">
          {submitError}{" "}
          <a href={mailtoHref} className="underline">
            {company.email}
          </a>
        </p>
      ) : null}

      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="min-h-12 w-full sm:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Submit application"}
      </Button>
    </form>
  );
}
