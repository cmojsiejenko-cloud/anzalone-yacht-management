import { cn } from "@/lib/cn";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

function enhanceControl(
  child: ReactElement<Record<string, unknown>>,
  id: string,
  error: string | undefined,
  required: boolean | undefined,
  describedBy: string | undefined,
): ReactElement {
  const tag =
    typeof child.type === "string" ? child.type : undefined;
  const isControl =
    tag === "input" || tag === "textarea" || tag === "select";

  if (!isControl) {
    return cloneElement(child, {
      children: Children.map(child.props.children as ReactNode, (nested) => {
        if (!isValidElement(nested)) return nested;
        return enhanceControl(
          nested as ReactElement<Record<string, unknown>>,
          id,
          error,
          required,
          describedBy,
        );
      }),
    });
  }

  return cloneElement(child, {
    id: (child.props.id as string | undefined) ?? id,
    "aria-invalid": error
      ? true
      : (child.props["aria-invalid"] as boolean | undefined),
    "aria-required": required
      ? true
      : (child.props["aria-required"] as boolean | undefined),
    "aria-describedby":
      [describedBy, child.props["aria-describedby"] as string | undefined]
        .filter(Boolean)
        .join(" ") || undefined,
  });
}

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

  const control = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    return enhanceControl(
      child as ReactElement<Record<string, unknown>>,
      id,
      error,
      required,
      describedBy,
    );
  });

  return (
    <div className={cn("form-field", error && "form-field--invalid", className)}>
      <label htmlFor={id} className="form-label">
        {label}
        {required ? (
          <span className="form-required">
            {" "}
            <span aria-hidden>*</span>
            <span className="sr-only"> (required)</span>
          </span>
        ) : null}
      </label>
      <div>{control}</div>
      {hint && !error ? (
        <p id={hintId} className="form-hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="form-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
