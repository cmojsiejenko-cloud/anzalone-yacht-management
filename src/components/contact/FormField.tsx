import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

export function FormField({
  id,
  label,
  error,
  hint,
  required,
  className,
  children,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy =
    [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("form-field", className)}>
      <label htmlFor={id} className="form-label">
        {label}
        {required && (
          <span className="form-required" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      <div
        className={cn(error && "form-field--invalid")}
        aria-describedby={describedBy}
      >
        {children}
      </div>
      {hint && !error && (
        <p id={hintId} className="form-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
