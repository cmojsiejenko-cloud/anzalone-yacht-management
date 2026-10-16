import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { heroSequence, heroVideo } from "@/lib/media";
import { siteRoutes } from "@/lib/navigation";

export function Hero() {
  return (
    <PageHero
      title="Ready before you arrive."
      description="One person is accountable for the care of the yacht. Maintenance, coordination, and preparation are handled. You arrive, and the water is yours to enjoy."
      minHeight="tall"
      film={{ frames: heroSequence, video: heroVideo }}
    >
      <Button
        href={siteRoutes.contact}
        variant="gold"
        className="hero-cta-primary"
      >
        Discuss Your Yacht
      </Button>
      <Button
        href={siteRoutes.services}
        variant="ghost"
        className="hero-cta-secondary"
      >
        Explore Services
      </Button>
    </PageHero>
  );
}
