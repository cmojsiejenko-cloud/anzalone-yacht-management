"use client";

import { FormField } from "@/components/contact/FormField";
import { Honeypot } from "@/components/forms/Honeypot";
import { Button } from "@/components/ui/Button";
import { company, mailtoHref } from "@/lib/company";
import {
  crewExpenseInitial,
  expenseTotals,
  hasCrewExpenseErrors,
  validateCrewExpense,
  type CrewExpenseData,
  type CrewExpenseErrors,
} from "@/lib/crew-expense-form";
import { postFormData } from "@/lib/form-submit";
import { formatUsd } from "@/lib/money";
import { receiptUploadRules } from "@/lib/uploads";
import { useId, useState } from "react";

export function CrewExpenseForm() {
  const formId = useId();
  const [values, setValues] = useState<CrewExpenseData>(crewExpenseInitial);
  const [receipts, setReceipts] = useState<File[]>([]);
  const [errors, setErrors] = useState<CrewExpenseErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totals = expenseTotals(values);

  function update<K extends keyof CrewExpenseData>(
    key: K,
    value: CrewExpenseData[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateCrewExpense(values);

    if (receipts.length > receiptUploadRules.maxFiles) {
      nextErrors.receipts = `Attach at most ${receiptUploadRules.maxFiles} receipts.`;
    }

    setErrors(nextErrors);
    if (hasCrewExpenseErrors(nextErrors)) return;

    setStatus("submitting");
    setSubmitError(null);

    const form = new FormData();
    (
      [
        "name",
        "email",
        "vesselOrAssignment",
        "location",
        "workDescription",
        "workDate",
        "provisions",
        "travel",
        "tips",
        "otherExpenses",
        "otherLabel",
        "notes",
        "companyWebsite",
      ] as const
    ).forEach((key) => form.set(key, values[key]));
    form.set("consent", values.consent ? "true" : "false");
    receipts.forEach((file) => form.append("receipts", file));

    const result = await postFormData("/api/crew-expense", form);
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
          Expense report sent for review
        </h2>
        <p className="mt-4 type-body text-charcoal-soft">
          This does not approve payment or create an accounting entry. If you
          need to add a receipt, email{" "}
          <a href={mailtoHref} className="font-medium text-navy-900">
            {company.email}
          </a>
          .
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

      <p className="type-body-sm text-charcoal-soft">
        Submit expenses for review after dockside or assignment work. This form
        does not process payments, deposits, or reimbursements automatically.
      </p>

      <div className="grid gap-8 sm:grid-cols-2">
        <FormField
          id={`${formId}-name`}
          label="Name"
          required
          error={errors.name}
        >
          <input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
          />
        </FormField>
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
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
          />
        </FormField>
      </div>

      <FormField
        id={`${formId}-vessel`}
        label="Vessel or assignment reference"
        required
        error={errors.vesselOrAssignment}
      >
        <input
          id={`${formId}-vessel`}
          name="vesselOrAssignment"
          value={values.vesselOrAssignment}
          onChange={(event) =>
            update("vesselOrAssignment", event.target.value)
          }
        />
      </FormField>

      <div className="grid gap-8 sm:grid-cols-2">
        <FormField
          id={`${formId}-location`}
          label="Location"
          required
          error={errors.location}
        >
          <input
            id={`${formId}-location`}
            name="location"
            value={values.location}
            onChange={(event) => update("location", event.target.value)}
          />
        </FormField>
        <FormField
          id={`${formId}-date`}
          label="Relevant date"
          required
          error={errors.workDate}
        >
          <input
            id={`${formId}-date`}
            name="workDate"
            type="date"
            value={values.workDate}
            onChange={(event) => update("workDate", event.target.value)}
          />
        </FormField>
      </div>

      <FormField
        id={`${formId}-work`}
        label="Outing / work description"
        required
        error={errors.workDescription}
      >
        <textarea
          id={`${formId}-work`}
          name="workDescription"
          rows={4}
          value={values.workDescription}
          onChange={(event) => update("workDescription", event.target.value)}
        />
      </FormField>

      <fieldset className="space-y-6 border border-ivory-dark/70 p-6">
        <legend className="type-label px-2">Expense amounts (USD)</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            id={`${formId}-provisions`}
            label="Provisions"
            error={errors.provisions}
            hint="Use 0 if none"
          >
            <input
              id={`${formId}-provisions`}
              name="provisions"
              inputMode="decimal"
              placeholder="0.00"
              value={values.provisions}
              onChange={(event) => update("provisions", event.target.value)}
            />
          </FormField>
          <FormField
            id={`${formId}-travel`}
            label="Travel"
            error={errors.travel}
            hint="Use 0 if none"
          >
            <input
              id={`${formId}-travel`}
              name="travel"
              inputMode="decimal"
              placeholder="0.00"
              value={values.travel}
              onChange={(event) => update("travel", event.target.value)}
            />
          </FormField>
          <FormField
            id={`${formId}-tips`}
            label="Tips"
            error={errors.tips}
            hint="Use 0 if none"
          >
            <input
              id={`${formId}-tips`}
              name="tips"
              inputMode="decimal"
              placeholder="0.00"
              value={values.tips}
              onChange={(event) => update("tips", event.target.value)}
            />
          </FormField>
          <FormField
            id={`${formId}-other`}
            label="Other expenses"
            error={errors.otherExpenses}
            hint="Use 0 if none"
          >
            <input
              id={`${formId}-other`}
              name="otherExpenses"
              inputMode="decimal"
              placeholder="0.00"
              value={values.otherExpenses}
              onChange={(event) => update("otherExpenses", event.target.value)}
            />
          </FormField>
        </div>
        <FormField
          id={`${formId}-other-label`}
          label="Other category label"
          error={errors.otherLabel}
          hint="Required when other expenses are greater than zero"
        >
          <input
            id={`${formId}-other-label`}
            name="otherLabel"
            value={values.otherLabel}
            onChange={(event) => update("otherLabel", event.target.value)}
          />
        </FormField>
        <p
          className="border-t border-ivory-dark/70 pt-4 font-display text-2xl text-navy-900"
          aria-live="polite"
        >
          Display total: {formatUsd(totals.total)}
        </p>
        {errors.total ? (
          <p className="type-body-sm text-red-800" role="alert">
            {errors.total}
          </p>
        ) : null}
      </fieldset>

      <FormField
        id={`${formId}-receipts`}
        label="Receipts"
        error={errors.receipts}
        hint={receiptUploadRules.label}
      >
        <input
          id={`${formId}-receipts`}
          name="receipts"
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
          onChange={(event) =>
            setReceipts(event.target.files ? [...event.target.files] : [])
          }
        />
      </FormField>

      <FormField
        id={`${formId}-notes`}
        label="Notes"
        error={errors.notes}
        hint="Optional"
      >
        <textarea
          id={`${formId}-notes`}
          name="notes"
          rows={3}
          value={values.notes}
          onChange={(event) => update("notes", event.target.value)}
        />
      </FormField>

      <FormField
        id={`${formId}-consent`}
        label="Acknowledgment"
        required
        error={errors.consent}
      >
        <label className="flex items-start gap-3 text-sm text-charcoal">
          <input
            id={`${formId}-consent`}
            name="consent"
            type="checkbox"
            className="mt-1"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
          />
          <span>
            I confirm this is an expense report for review only. It does not
            request automatic payment or create an accounting ledger entry. See
            our{" "}
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
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Submit expense report"}
      </Button>
    </form>
  );
}
