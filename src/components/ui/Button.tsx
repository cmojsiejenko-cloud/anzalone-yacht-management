import Link from "next/link";
import { type ComponentPropsWithoutRef, type MouseEventHandler } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "gold"
  | "link";

export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-900 text-ivory border border-navy-900 hover:bg-navy-800 hover:border-navy-800 active:bg-navy-950 btn-luxury-shadow",
  secondary:
    "bg-transparent text-navy-900 border border-navy-900 hover:bg-navy-900 hover:text-ivory active:bg-navy-950 btn-luxury",
  ghost:
    "bg-transparent text-ivory border border-ivory/40 hover:border-ivory hover:bg-ivory/10 active:bg-ivory/15 btn-luxury",
  gold:
    "bg-gold text-navy-950 border border-gold hover:bg-gold-muted hover:border-gold-muted active:bg-gold-muted btn-luxury-shadow",
  link:
    "bg-transparent text-navy-900 border-0 border-b border-transparent px-0 py-0 rounded-none hover:text-gold-muted hover:border-gold-muted uppercase tracking-[0.2em] font-semibold btn-luxury",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4 text-sm",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  disabled,
  onClick,
  tabIndex,
  ...props
}: ButtonProps) {
  const base = cn(
    "inline-flex items-center justify-center font-medium tracking-wide uppercase btn-luxury",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
    variant !== "link" && sizes[size],
    variants[variant],
    disabled && "pointer-events-none opacity-50",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={base}
        aria-disabled={disabled}
        onClick={onClick}
        tabIndex={tabIndex}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={base}
      disabled={disabled}
      onClick={onClick}
      tabIndex={tabIndex}
      {...props}
    >
      {children}
    </button>
  );
}
