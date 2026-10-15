import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { resolveContactInquiryParams } from "@/lib/contact-links";
import { contactMetadata } from "@/lib/seo";

export const metadata = contactMetadata;

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const initialServices = resolveContactInquiryParams({
    service: params.service,
    services: params.services,
    program: params.program,
  });

  return <ContactPageContent initialServices={initialServices} />;
}
