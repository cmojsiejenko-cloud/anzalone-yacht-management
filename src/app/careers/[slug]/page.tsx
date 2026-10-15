import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CareerApplicationForm } from "@/components/careers/CareerApplicationForm";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  careerDepartments,
  careerRoles,
  getCareerRole,
} from "@/lib/careers";
import { buildPageMetadata } from "@/lib/seo";
import { siteRoutes } from "@/lib/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return careerRoles
    .filter((role) => role.status === "active")
    .map((role) => ({ slug: role.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = getCareerRole(slug);
  if (!role || role.status !== "active") return {};
  return buildPageMetadata({
    title: role.title,
    description: role.summary,
    path: `${siteRoutes.careers}/${role.slug}`,
  });
}

export default async function CareerRolePage({ params }: Props) {
  const { slug } = await params;
  const role = getCareerRole(slug);
  if (!role || role.status !== "active") notFound();

  const department =
    careerDepartments.find((item) => item.slug === role.department)?.title ??
    role.department;

  return (
    <>
      <PageHero
        eyebrow={department}
        title={role.title}
        description={`${role.summary} ${role.location} · ${role.employmentType}`}
        minHeight="compact"
      />
      <section className="section-padding bg-ivory">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="space-y-10 lg:col-span-5">
              <div>
                <SectionHeading title="Role overview" />
                <ul className="mt-6 space-y-4">
                  {role.description.map((item) => (
                    <li key={item} className="type-body text-charcoal">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-3xl text-navy-900">
                  Responsibilities
                </h2>
                <ul className="mt-4 space-y-3">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="text-base text-charcoal">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-3xl text-navy-900">
                  Qualifications
                </h2>
                <ul className="mt-4 space-y-3">
                  {role.qualifications.map((item) => (
                    <li key={item} className="text-base text-charcoal">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={siteRoutes.careers}
                className="inline-flex min-h-11 items-center text-sm text-navy-800"
              >
                All careers
              </Link>
            </div>
            <div className="lg:col-span-7">
              <h2 className="mb-6 font-display text-3xl text-navy-900">
                Apply for this role
              </h2>
              <CareerApplicationForm interest={role.slug} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
