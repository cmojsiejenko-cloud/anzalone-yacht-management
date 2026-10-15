import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { programs } from "@/lib/programs";
import { siteRoutes } from "@/lib/navigation";

export function ProgramsPreview() {
  return (
    <section id="programs" className="section-padding bg-ivory">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="type-label">Programs</p>
            <h2 className="mt-6 font-display text-4xl leading-tight text-navy-900 sm:text-5xl">
              A service is a task. A program is the rhythm.
            </h2>
            <p className="mt-6 type-body text-charcoal-soft">
              Engage one service when that is all you need. A program is the arrangement: who is responsible, what is checked, and what you hear before you arrive. The three examples are illustrative — not a rate card.
            </p>
            <Link
              href={siteRoutes.programs}
              className="mt-8 inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.2em] text-navy-900 underline-offset-4 hover:text-gold-muted hover:underline"
            >
              View programs
            </Link>
          </div>
          <ol className="border-t border-ivory-dark/70 lg:col-span-7">
            {programs.map((program, index) => (
              <li key={program.slug} className="border-b border-ivory-dark/70">
                <Link
                  href={`${siteRoutes.programs}/${program.slug}`}
                  className="group grid gap-2 py-7 sm:grid-cols-12 sm:gap-6"
                >
                  <span className="type-label sm:col-span-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="sm:col-span-10">
                    <span className="block font-display text-3xl text-navy-900 transition-luxury group-hover:text-yacht-800">
                      {program.title}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-charcoal-soft">
                      {program.summary}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
