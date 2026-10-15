import { CareerApplicationForm } from "@/components/careers/CareerApplicationForm";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  careerDepartments,
  getActiveCareerRoles,
  getActiveRolesByDepartment,
} from "@/lib/careers";
import { buildPageMetadata } from "@/lib/seo";
import { siteRoutes } from "@/lib/navigation";
import { siteImages } from "@/lib/images";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: "Careers",
  description:
    "Careers at Anzalone's Full Service Yacht Management Group across field service, captain and crew, and yacht management. Open roles appear only when published. General applications are emailed for review.",
  path: siteRoutes.careers,
  keywords: ["yacht careers", "marine field service jobs", "yacht crew careers"],
});

export default function CareersPage() {
  const activeRoles = getActiveCareerRoles();

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Work that happens beside the yacht"
        description="Field service, crew-aligned work, and management coordination. Open roles appear here only when one is actually listed — never as invented vacancies."
        minHeight="tall"
        backgroundImage={siteImages.preparation}
        backgroundOverlay="hero"
      />

      <section className="section-padding bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Departments"
            title="How opportunities are grouped"
            description="Categories help you find the right conversation. They are not a promise that every track has an opening today."
          />
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {careerDepartments.map((department, index) => {
              const roles = getActiveRolesByDepartment(department.slug);
              return (
                <article
                  key={department.slug}
                  className="border-t border-ivory-dark/70 pt-8"
                >
                  <span className="type-label text-gold-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-4 font-display text-3xl text-navy-900">
                    {department.title}
                  </h2>
                  <p className="mt-4 type-body text-charcoal-soft">
                    {department.description}
                  </p>
                  {roles.length > 0 ? (
                    <ul className="mt-6 space-y-3">
                      {roles.map((role) => (
                        <li key={role.slug}>
                          <Link
                            href={`${siteRoutes.careers}/${role.slug}`}
                            className="font-display text-xl text-navy-900 transition-luxury hover:text-yacht-800"
                          >
                            {role.title}
                          </Link>
                          <p className="type-body-sm text-charcoal-soft">
                            {role.location} · {role.employmentType}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-6 type-body-sm text-charcoal-soft">
                      No active openings in this category.
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-surface">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Open roles"
                title={
                  activeRoles.length === 0
                    ? "No current openings"
                    : "Roles accepting applications"
                }
                description={
                  activeRoles.length === 0
                    ? "Nothing is listed right now. You can still send a general-interest application. It is emailed for review and is not a promise of a position."
                    : "Each role has its own detail page with description, qualifications, and an application form."
                }
              />
              {activeRoles.length > 0 ? (
                <ul className="mt-10 divide-y divide-ivory-dark/70 border-y border-ivory-dark/70">
                  {activeRoles.map((role) => (
                    <li key={role.slug}>
                      <Link
                        href={`${siteRoutes.careers}/${role.slug}`}
                        className="block py-6"
                      >
                        <span className="block font-display text-2xl text-navy-900">
                          {role.title}
                        </span>
                        <span className="mt-2 block text-sm text-charcoal-soft">
                          {role.location} · {role.employmentType}
                        </span>
                        <span className="mt-2 block type-body-sm text-charcoal">
                          {role.summary}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="lg:col-span-7">
              <p className="type-label">General application</p>
              <h2 className="mt-3 font-display text-4xl text-navy-900">
                Send a note of interest
              </h2>
              <p className="mt-4 mb-8 type-body-sm text-charcoal-soft">
                Tell us where you are and what you have done on the water or in
                a yard. You may attach one PDF resume. Files are emailed to the
                company and are not published on this website.
              </p>
              <CareerApplicationForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
