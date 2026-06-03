import { cn } from "@/lib/cn";
import type { SiteImageDefinition } from "@/lib/images";

type ImagePlaceholderProps = {
  definition: SiteImageDefinition;
  /** Visual tone — "before" renders slightly muted for comparison panels */
  tone?: "default" | "before" | "after";
  className?: string;
  showCaption?: boolean;
  ariaHidden?: boolean;
};

const toneGradients = {
  default: "from-navy-700 via-navy-800 to-navy-950",
  before: "from-navy-800 via-navy-900 to-navy-950",
  after: "from-navy-600 via-navy-700 to-navy-900",
} as const;

export function ImagePlaceholder({
  definition,
  tone = "default",
  className,
  showCaption = true,
  ariaHidden = false,
}: ImagePlaceholderProps) {
  const { placeholderLabel, subject } = definition;

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-navy-800",
        className,
      )}
      {...(ariaHidden
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": definition.alt })}
    >
      {/* Premium placeholder gradient — replace with real photo at public/images/[filename] */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          toneGradients[tone],
          tone === "before" && "saturate-[0.65] brightness-[0.85]",
          tone === "after" && "saturate-110 brightness-105",
        )}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(201, 169, 98, 0.6) 60px, rgba(201, 169, 98, 0.6) 61px)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 30% 20%, rgba(201, 169, 98, 0.18), transparent)",
        }}
        aria-hidden
      />

      {showCaption && placeholderLabel && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-end p-6 pb-8 text-center sm:p-8 sm:pb-10">
          <p className="type-label-light">{placeholderLabel}</p>
          <p className="mt-2 max-w-xs type-body-sm text-ivory-muted/80">
            {subject}
          </p>
        </div>
      )}
    </div>
  );
}
