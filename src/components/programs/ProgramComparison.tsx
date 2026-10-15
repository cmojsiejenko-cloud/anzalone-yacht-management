import {
  comparisonLabels,
  comparisonRows,
  programs,
  type ComparisonValue,
} from "@/lib/programs";
import { cn } from "@/lib/cn";

function Tone({ value }: { value: ComparisonValue }) {
  const label = comparisonLabels[value];
  const isPositive = value === "yes" || value === "primary";
  const isNeutral = value === "as-needed" || value === "project";

  return (
    <span
      className={cn(
        "text-sm leading-snug",
        isPositive && "text-navy-900",
        isNeutral && "text-charcoal",
        value === "no" && "text-charcoal-soft",
      )}
    >
      {label}
    </span>
  );
}

export function ProgramComparison() {
  return (
    <div className="mt-12">
      {/* Mobile: stacked program cards */}
      <div className="grid gap-6 lg:hidden">
        {programs.map((program) => (
          <article
            key={program.slug}
            className="border border-ivory-dark/70 bg-surface p-6"
          >
            <p className="type-label">{program.shortTitle}</p>
            <h3 className="mt-3 font-display text-2xl text-navy-900">
              {program.title}
            </h3>
            <p className="mt-3 type-body-sm text-charcoal-soft">
              {program.bestFor}
            </p>
            <ul className="mt-6 space-y-4 border-t border-ivory-dark/70 pt-6">
              {comparisonRows.map((row) => (
                <li
                  key={row.id}
                  className="flex items-start justify-between gap-4"
                >
                  <span className="text-sm text-charcoal">{row.label}</span>
                  <Tone value={program.comparison[row.id] ?? "no"} />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* Desktop: comparison table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[44rem] border-collapse text-left">
          <caption className="sr-only">
            Illustrative comparison of Anzalone yacht management programs
          </caption>
          <thead>
            <tr className="border-b border-ivory-dark/70">
              <th
                scope="col"
                className="py-4 pr-6 type-label font-medium text-charcoal-soft"
              >
                Focus
              </th>
              {programs.map((program) => (
                <th
                  key={program.slug}
                  scope="col"
                  className="px-4 py-4 font-display text-2xl font-normal text-navy-900"
                >
                  {program.shortTitle}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.id} className="border-b border-ivory-dark/70">
                <th
                  scope="row"
                  className="max-w-[14rem] py-5 pr-6 align-top type-body text-navy-900"
                >
                  {row.label}
                  {row.hint ? (
                    <span className="mt-1 block text-sm font-normal text-charcoal-soft">
                      {row.hint}
                    </span>
                  ) : null}
                </th>
                {programs.map((program) => (
                  <td key={program.slug} className="px-4 py-5 align-top">
                    <Tone value={program.comparison[row.id] ?? "no"} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
