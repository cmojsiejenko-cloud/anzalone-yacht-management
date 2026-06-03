import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { siteRoutes } from "@/lib/navigation";
import { siteImages } from "@/lib/images";

export function Hero() {
  return (
    <PageHero
      eyebrow="Owner-Operated Yacht Management"
      title="Ready before you arrive."
      description="South Florida, Annapolis, and the Chesapeake — one accountable operator for yacht management, maintenance, detailing, captain services, and brokerage preparation."
      backgroundImage={siteImages.yachtManagementHero}
      backgroundOverlay="hero"
    >
      <Button href={siteRoutes.contact} variant="ghost">
        Discuss Your Vessel
      </Button>
      <Button
        href="#standard"
        variant="secondary"
        className="border-ivory/40 text-ivory hover:bg-ivory hover:text-navy-900"
      >
        The Anzalone Standard
      </Button>
    </PageHero>
  );
}
