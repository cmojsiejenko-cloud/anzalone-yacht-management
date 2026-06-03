import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { getServicePageMetadata } from "@/lib/service-metadata";
import { getServiceBySlug } from "@/lib/services";

const content = getServiceBySlug("refit-custom-work")!;

export const metadata = getServicePageMetadata(content);

export default function RefitCustomWorkPage() {
  return <ServicePageLayout content={content} />;
}
