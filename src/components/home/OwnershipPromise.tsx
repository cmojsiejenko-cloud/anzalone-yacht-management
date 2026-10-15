import { Container } from "@/components/ui/Container";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";

export function OwnershipPromise() {
  return (
    <section
      id="promise"
      className="home-section home-section--after-hero section-padding"
    >
      <Container size="narrow" className="reveal">
        <LuxuryDivider variant="rule" className="mb-6" />
        <p className="type-label">The ownership promise</p>
        <h2 className="mt-5 type-display-lg text-balance text-navy-900">
          The yacht should not become another job.
        </h2>
        <div className="mt-7 max-w-xl space-y-5 type-body text-charcoal-soft">
          <p>
            Washdowns, vendor calls, yard dates, and the question of whether the boat is actually ready belong with the operator, not with you.
          </p>
          <p>
            Anzalone takes that work. You keep the use of the yacht, and a clear account of its condition.
          </p>
        </div>
      </Container>
    </section>
  );
}
