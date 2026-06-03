import { ContactCTA } from "@/components/home/ContactCTA";
import { DetailingShowcase } from "@/components/home/DetailingShowcase";
import { FounderStory } from "@/components/home/FounderStory";
import { Hero } from "@/components/home/Hero";
import { ReadinessCTA } from "@/components/home/ReadinessCTA";
import { Regions } from "@/components/home/Regions";
import { Services } from "@/components/home/Services";
import { Standard } from "@/components/home/Standard";
import { Trust } from "@/components/home/Trust";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { WorkGallery } from "@/components/home/WorkGallery";
import { homeMetadata } from "@/lib/seo";

export const metadata = homeMetadata;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Trust />
      <Standard />
      <Services />
      <DetailingShowcase />
      <WorkGallery />
      <WhyChooseUs />
      <Regions />
      <FounderStory />
      <ReadinessCTA />
      <ContactCTA />
    </>
  );
}
