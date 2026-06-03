import { cn } from "@/lib/cn";

export type LuxuryDividerVariant = "rule" | "ornate" | "wide" | "subtle" | "full";

type LuxuryDividerProps = {
  variant?: LuxuryDividerVariant;
  className?: string;
};

const variantClasses: Record<LuxuryDividerVariant, string> = {
  rule: "h-px w-16 bg-gold",
  wide: "h-px w-24 sm:w-32 bg-gradient-to-r from-gold via-gold-light to-gold-muted",
  subtle: "h-px w-full max-w-xs bg-gray-300",
  full: "h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent",
  ornate: "luxury-divider-ornate flex w-full max-w-md items-center",
};

export function LuxuryDivider({
  variant = "rule",
  className,
}: LuxuryDividerProps) {
  if (variant === "ornate") {
    return (
      <div
        className={cn(variantClasses.ornate, className)}
        role="separator"
        aria-hidden
      >
        <span className="luxury-divider-ornate__gem" />
      </div>
    );
  }

  return (
    <div
      className={cn("flex", className)}
      role="separator"
      aria-hidden
    >
      <span className={variantClasses[variant]} />
    </div>
  );
}
