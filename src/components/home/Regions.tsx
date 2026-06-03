import { Container } from "@/components/ui/Container";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const regions = [
  {
    name: "South Florida",
    detail:
      "Home-port programs, yard periods, and year-round readiness from Palm Beach through the Keys.",
  },
  {
    name: "Bahamas & Caribbean",
    detail:
      "Seasonal cruising support, local vendor coordination, and pre-arrival preparation in key anchorages.",
  },
  {
    name: "Annapolis & Chesapeake Bay",
    detail:
      "Dockside programs, yard coordination, and seasonal readiness on the Bay and in Annapolis.",
  },
  {
    name: "Gulf Coast",
    detail:
      "Refit supervision, hurricane-season protocols, and operational support for vessels based west of Florida.",
  },
];

export function Regions() {
  return (
    <section id="regions" className="section-edge-dark bg-navy-900 text-ivory">
      <Container className="section-padding">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Regions Served"
            title="Where we operate"
            description="Programs are anchored where your vessel lives and extend to where you cruise. Remote oversight is standard; on-site presence follows your calendar and yard schedule."
            theme="dark"
          />
        </ScrollReveal>

        <ScrollReveal className="reveal-fade content-gap-sm" delay={120}>
          <LuxuryDivider variant="subtle" />
        </ScrollReveal>

        <div className="content-gap grid gap-6 sm:grid-cols-2 lg:gap-8">
          {regions.map((region, index) => (
            <ScrollReveal key={region.name} delay={index * 80}>
              <article className="card-luxury-dark h-full p-8 lg:p-10">
                <h3 className="type-display-sm text-ivory">{region.name}</h3>
                <p className="mt-4 type-body-sm text-ivory-muted">{region.detail}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="content-gap-sm" delay={200}>
          <p className="max-w-2xl type-body-sm text-ivory-muted/90">
            Operating elsewhere? Delivery support and project oversight are available
            under the same readiness standard — scope confirmed before we mobilize.
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
