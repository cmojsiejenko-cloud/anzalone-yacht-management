import { Container } from "@/components/ui/Container";

const points = [
  {
    title: "Maritime heritage",
    text: "Family roots in Naples, Italy, and a father who served as a merchant marine captain — a tradition of seamanship behind the work.",
  },
  {
    title: "22 years of hands-on care",
    text: "Decades of practical yacht management and maintenance experience — distinct from any claim about company founding year.",
  },
  {
    title: "Owner-operated accountability",
    text: "Pauly Anzalone is the operator you reach. Questions are not passed through a desk that has never seen the boat.",
  },
  {
    title: "Readiness before arrival",
    text: "The standard is a yacht prepared for the way you use it — not a list closed the night before you step aboard.",
  },
  {
    title: "Documented condition",
    text: "What was done, what was found, and what needs attention are written in plain language.",
  },
]

export function Difference() {
  return (
    <section id="difference" className="section-padding bg-navy-950 text-ivory">
      <Container>
        <p className="type-label-light">The Anzalone difference</p>
        <h2 className="mt-6 max-w-xl font-display text-4xl leading-tight text-ivory sm:text-5xl">
          Attention you can locate.
        </h2>
        <ol className="mt-14 divide-y divide-ivory/15 border-y border-ivory/15">
          {points.map((point, index) => (
            <li
              key={point.title}
              className="grid gap-3 py-8 sm:grid-cols-12 sm:items-baseline sm:gap-8"
            >
              <span className="type-label-light sm:col-span-2">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl text-ivory sm:col-span-4 sm:text-3xl">
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed text-ivory-muted sm:col-span-6">
                {point.text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
