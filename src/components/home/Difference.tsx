import { Container } from "@/components/ui/Container";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";

const points = [
  {
    title: "Maritime heritage",
    text: "Family roots in Naples, Italy, and a father who served as a merchant marine captain — seamanship carried into the care of the yacht.",
  },
  {
    title: "22 years of hands-on care",
    text: "Decades of practical yacht management and maintenance experience — years with vessels, not a founding-date claim.",
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
];

export function Difference() {
  return (
    <section
      id="difference"
      className="home-section home-section--ink section-padding text-ivory"
    >
      <Container>
        <header className="reveal max-w-xl">
          <LuxuryDivider variant="rule" className="mb-6" />
          <p className="type-label-light">The Anzalone difference</p>
          <h2 className="mt-5 type-display-lg text-balance text-ivory">
            Attention you can locate.
          </h2>
        </header>
        <ol className="mt-12 divide-y divide-ivory/12 border-y border-ivory/12 lg:mt-14">
          {points.map((point, index) => (
            <li
              key={point.title}
              className="grid gap-3 py-7 sm:grid-cols-12 sm:items-baseline sm:gap-8 sm:py-8"
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
