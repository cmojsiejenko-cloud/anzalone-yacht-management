import { Container } from "@/components/ui/Container";
import { ImageGallery } from "@/components/ui/images";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryImages } from "@/lib/images";

export function WorkGallery() {
  return (
    <section
      id="gallery"
      className="section-edge-light section-padding bg-surface-muted"
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Vessel Care"
            title="The standard, documented in the field"
            description="From dockside readiness checks to show-ready brokerage presentation — every engagement is supervised and held to the Anzalone standard."
          />
        </ScrollReveal>

        <ScrollReveal className="reveal-fade content-gap-sm" delay={120}>
          <LuxuryDivider variant="full" />
        </ScrollReveal>

        {/*
          Final photography — add to public/images/:
            marina-vessel-check.jpg
            captain-services.jpg
            refit-custom-work.jpg
            brokerage-prep.jpg
          Then set usePlaceholder: false on each entry in src/lib/images.ts
        */}
        <ScrollReveal className="content-gap" delay={160}>
          <ImageGallery images={[...galleryImages]} featured />
        </ScrollReveal>
      </Container>
    </section>
  );
}
