import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteRoutes } from "@/lib/navigation";

type ClosingInquiryProps = {
  title: string;
  description: string;
  href?: string;
  buttonLabel?: string;
};

export function ClosingInquiry({
  title,
  description,
  href = siteRoutes.contact,
  buttonLabel = "Discuss Your Yacht",
}: ClosingInquiryProps) {
  return (
    <section className="section-padding-lg bg-navy-950">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Next step"
          title={title}
          description={description}
          align="center"
          theme="dark"
        />
        <div className="mt-10 flex justify-center">
          <Button href={href} variant="gold" size="lg">
            {buttonLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
