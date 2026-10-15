import { Container } from "@/components/ui/Container";
import { LuxuryDivider } from "@/components/ui/LuxuryDivider";
import { ResponsiveImage } from "@/components/ui/images/ResponsiveImage";
import { imageSizes, siteImages } from "@/lib/images";

export function LifeOnTheWater() {
  return (
    <section
      id="on-the-water"
      className="home-section home-section--ivory section-padding"
    >
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-14">
          <figure className="editorial-frame relative aspect-[4/5] sm:aspect-[16/10] lg:col-span-7">
            <ResponsiveImage
              definition={siteImages.aftDeck}
              sizes={imageSizes.half}
            />
          </figure>
          <div className="reveal lg:col-span-5 lg:pb-6">
            <LuxuryDivider variant="rule" className="mb-6" />
            <p className="type-label">Life on the water</p>
            <h2 className="mt-5 type-display-lg text-balance text-navy-900">
              The day is the point.
            </h2>
            <div className="mt-6 space-y-5 type-body text-charcoal-soft">
              <p>
                A yacht is for the morning you leave the dock, not for the week spent getting it there. When the care is already done, the only decision left is where to point the bow.
              </p>
              <p>
                That is the ownership Anzalone is built to protect.
              </p>
            </div>
          </div>
        </div>

        <figure className="editorial-frame relative mt-12 aspect-[4/5] sm:mt-14 sm:aspect-video">
          <ResponsiveImage
            definition={siteImages.departure}
            sizes={imageSizes.hero}
          />
        </figure>
      </Container>
    </section>
  );
}
