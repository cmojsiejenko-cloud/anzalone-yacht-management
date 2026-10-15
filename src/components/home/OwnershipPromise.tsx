import { Container } from "@/components/ui/Container";

export function OwnershipPromise() {
  return (
    <section id="promise" className="section-padding bg-ivory">
      <Container size="narrow">
        <p className="type-label">The ownership promise</p>
        <h2 className="mt-6 font-display text-4xl leading-tight text-navy-900 sm:text-5xl">
          The yacht should not become another job.
        </h2>
        <div className="mt-8 max-w-xl space-y-6 type-body text-charcoal">
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
