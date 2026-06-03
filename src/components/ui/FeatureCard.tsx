import { cn } from "@/lib/cn";

type FeatureCardProps = {
  stat?: string;
  label: string;
  detail?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
};

export function FeatureCard({
  stat,
  label,
  detail,
  align = "left",
  theme = "light",
  className,
}: FeatureCardProps) {
  const isDark = theme === "dark";
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "feature-card-luxury transition-luxury",
        isCenter && "text-center",
        !isCenter && "text-center sm:text-left",
        className,
      )}
    >
      {stat && <p className="type-stat">{stat}</p>}
      <h3
        className={cn(
          "mt-2 text-sm font-semibold uppercase tracking-widest",
          isDark ? "text-ivory" : "text-navy-900",
          !stat && "mt-0",
        )}
      >
        {label}
      </h3>
      {detail && (
        <p
          className={cn(
            "mt-3 type-body-sm",
            isDark ? "text-ivory-muted" : "text-navy-700",
          )}
        >
          {detail}
        </p>
      )}
    </div>
  );
}
