import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { heroSequence, heroVideoSrc } from "@/lib/media";
import { siteRoutes } from "@/lib/navigation";

export function Hero() {
  return (
    <PageHero
      eyebrow="Anzalone's · Full Service Yacht Management"
      title="Ready before you arrive."
      description="One person is accountable for the care of the yacht. Maintenance, coordination, and preparation are handled. You arrive, and the water is yours to enjoy."
      film={{ frames: heroSequence, videoSrc: heroVideoSrc }}
      backgroundOverlay="hero"
    >
      <Button href={siteRoutes.contact} variant="gold">
        Discuss Your Yacht
      </Button>
      <Button href={siteRoutes.services} variant="ghost">
        Explore Services
      </Button>
    </PageHero>
  );
}
