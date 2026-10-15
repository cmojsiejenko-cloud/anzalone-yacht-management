import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/images/ResponsiveImage";
import { imageSizes, siteImages } from "@/lib/images";

export function LifeOnTheWater() {
  return (
    <section id="on-the-water" className="section-padding bg-ivory">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
          <figure className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:col-span-7">
            <ResponsiveImage
              definition={siteImages.aftDeck}
              sizes={imageSizes.half}
            />
          </figure>
          <div className="lg:col-span-5 lg:pb-8">
            <p className="type-label">Life on the water</p>
            <h2 className="mt-6 font-display text-4xl leading-tight text-navy-900 sm:text-5xl">
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

        <figure className="relative mt-16 aspect-[4/5] overflow-hidden sm:aspect-video">
          <ResponsiveImage
            definition={siteImages.departure}
            sizes={imageSizes.hero}
          />
        </figure>
      </Container>
    </section>
  );
}
