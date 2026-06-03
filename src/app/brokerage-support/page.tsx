import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { getServicePageMetadata } from "@/lib/service-metadata";
import { getServiceBySlug } from "@/lib/services";

const content = getServiceBySlug("brokerage-support")!;

export const metadata = getServicePageMetadata(content);

export default function BrokerageSupportPage() {
  return <ServicePageLayout content={content} />;
}
