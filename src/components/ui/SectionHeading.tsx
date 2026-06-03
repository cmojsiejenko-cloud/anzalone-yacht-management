import { cn } from "@/lib/cn";
import { LuxuryDivider } from "./LuxuryDivider";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  showDivider?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
  showDivider = true,
  className,
}: SectionHeadingProps) {
  const isDark = theme === "dark";
  const isCenter = align === "center";

  return (
    <header
      className={cn(
        "max-w-2xl",
        isCenter && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {showDivider && (
        <LuxuryDivider
          variant="rule"
          className={cn(isCenter && "justify-center")}
        />
      )}
      {eyebrow && (
        <p
          className={cn(
            "mt-6",
            isDark ? "type-label-light" : "type-label",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-4 type-display-lg text-balance",
          isDark ? "text-ivory" : "text-navy-900",
          !eyebrow && showDivider && "mt-0",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 type-body-lg text-pretty",
            isDark ? "text-ivory-muted" : "text-navy-700",
          )}
        >
          {description}
        </p>
      )}
    </header>
  );
}
