import { ContactCTA } from "@/components/home/ContactCTA";
import { Difference } from "@/components/home/Difference";
import { Hero } from "@/components/home/Hero";
import { LifeOnTheWater } from "@/components/home/LifeOnTheWater";
import { OwnershipPromise } from "@/components/home/OwnershipPromise";
import { ProgramsPreview } from "@/components/home/ProgramsPreview";
import { Services } from "@/components/home/Services";
import { homeMetadata } from "@/lib/seo";

export const metadata = homeMetadata;

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <OwnershipPromise />
      <Services />
      <ProgramsPreview />
      <Difference />
      <LifeOnTheWater />
      <ContactCTA />
    </div>
  );
}
