import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { getServicePageMetadata } from "@/lib/service-metadata";
import { getServiceBySlug } from "@/lib/services";

const content = getServiceBySlug("yacht-management")!;

export const metadata = getServicePageMetadata(content);

export default function YachtManagementPage() {
  return <ServicePageLayout content={content} />;
}
