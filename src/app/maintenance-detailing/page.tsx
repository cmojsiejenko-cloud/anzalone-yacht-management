import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { getServicePageMetadata } from "@/lib/service-metadata";
import { getServiceBySlug } from "@/lib/services";

const content = getServiceBySlug("maintenance-detailing")!;

export const metadata = getServicePageMetadata(content);

export default function MaintenanceDetailingPage() {
  return <ServicePageLayout content={content} />;
}
