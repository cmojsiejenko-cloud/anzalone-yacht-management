import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { getServicePageMetadata } from "@/lib/service-metadata";
import { getServiceBySlug } from "@/lib/services";

const content = getServiceBySlug("captain-crew-services")!;

export const metadata = getServicePageMetadata(content);

export default function CaptainCrewServicesPage() {
  return <ServicePageLayout content={content} />;
}
