import { AboutPageContent } from "@/components/about/AboutPageContent";
import { aboutMetadata } from "@/lib/seo";

export const metadata = aboutMetadata;

export default function AboutPage() {
  return <AboutPageContent />;
}
