import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { fieldServicesContent } from "@/lib/field-services";
import { getServicePageMetadata } from "@/lib/service-metadata";

export const metadata = getServicePageMetadata(fieldServicesContent);

export default function FieldServicesPage() {
  return <ServicePageLayout content={fieldServicesContent} />;
}
