# Anzalone Master Spec

**Status:** Approved foundation for implementation  
**Author:** Agent 01 — repository auditor and implementation lead  
**Date:** 14 October 2026  
**Repository:** existing Next.js site at this workspace  
**Supersedes for product direction:** older visual and information-architecture choices in `README.md`, `LAUNCH_CHECKLIST.md`, and `DEPLOYMENT_SUMMARY.md`  
**Does not supersede:** working routes, the design tokens, or the Resend contact API. Improve them. Do not rebuild the app.

This document is the source of truth for business facts, sitemap, design, components, content, assets, forms, and acceptance. If a later agent finds a conflict between this file and older marketing copy, this file wins. If a fact is missing here, it is not approved to invent.

---

## 1. Purpose

Build a cinematic, simple, production-grade website for Anzalone Yacht Management on the existing Next.js 15 App Router codebase.

The site must feel like a luxury yacht operation: navy, white, and gold; Princess-class vessel photography; field work in the foreground; a short path from arrival to a real email.

It must not become a gallery, a customer app, an accounting product, or a checkout.

## 2. Verified facts versus unconfirmed information

### 2.1 Verified in this audit

These items were confirmed from the owner brief on 14 October 2026, from files in this repository, or from a live fetch of the current deployment.

| Fact | Evidence |
|------|----------|
| Legal / public name used on the site: Anzalone Yacht Management | Owner brief; `src/lib/seo.ts`; live homepage |
| Tagline: “Ready before you arrive.” | Owner brief; homepage `Hero`; footer |
| Public email: info@anzaloneyacht.com | Owner brief; footer, contact page, `.env.example` |
| Intended canonical domain: https://www.anzaloneyacht.com | Owner brief; `NEXT_PUBLIC_SITE_URL` default in `src/lib/seo.ts` |
| Current deployment URL: https://anzalone-yacht-management.vercel.app | Owner brief; `DEPLOYMENT_SUMMARY.md`; live fetch on 14 October 2026 returned the current homepage |
| Stack: Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS v4, Cormorant Garamond, DM Sans, Vercel, Resend-backed contact API | `package.json` (installed Next is 15.5.19), `src/app/layout.tsx`, `src/app/api/vessel-review/route.ts` |
| Existing public routes: `/`, `/about`, `/contact`, `/yacht-management`, `/maintenance-detailing`, `/captain-crew-services`, `/refit-custom-work`, `/brokerage-support` | `src/app/**/page.tsx`; production build route table |
| Contact form posts to `POST /api/vessel-review` and sends through Resend when `RESEND_API_KEY` is set | `src/lib/vessel-review-form.ts`, `src/app/api/vessel-review/route.ts` |
| If Resend is unset, the API returns HTTP 503 and tells the visitor to email info@anzaloneyacht.com | Same route |
| `.env.example` lists `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_FORM_TO`, `CONTACT_FORM_FROM`, and an optional `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` | File on disk. It was gitignored by `.env*` until this audit |
| Seven JPEGs exist in `public/images/` and are tracked in git | See `docs/ANZALONE_ASSET_REGISTER.md` |
| No phone number, Facebook URL, job listing, price, or named person is stored as data | Repository search |
| No test suite, no gallery route, no app route, no payment route | Repository search |
| `npm run lint`, `npx tsc --noEmit`, and `npm run build` passed on 14 October 2026 before the small fixes in this audit | See handoff |

### 2.2 Owner instructions that are requirements, not yet built

| Requirement | Current state |
|-------------|---------------|
| Navigation must cover Services, Programs, About, Careers, Crew, and Contact | Header is Home, Services dropdown, About, Contact |
| Programs section | Missing |
| Careers experience comparable in function to Yacht Management Services (departments, role pages, application that reaches the owner) | Missing. Do not copy YMS jobs |
| Crew forms emailed to the owner | Missing. Captain & Crew is a marketing page only |
| Field services emphasized | Mentioned inside maintenance and management copy, not a primary story |
| Real company pickup with authentic Paulie/Anzalone branding | No truck photograph in the repo |
| Clean professional uniform presentation | Current people pictures are generic and unbranded |
| High-quality video if generation is actually available | No video file. This session has an image generator, not a video generator |
| Appropriate Facebook integration | No URL was supplied. Do not invent one |
| No gallery | Homepage still renders `WorkGallery` (`#gallery`) |
| No customer app, no financial-accounting platform, no deposits or checkout | None exist. Keep it that way |

### 2.3 Present in the current site, not confirmed by the latest owner brief

Do not add to these claims. Do not treat them as legal or biographical facts. Later agents may keep the existing sentences until the owner corrects them, and must not extend them.

| Claim in the current build | Where | Rule |
|----------------------------|-------|------|
| Service geography: South Florida (Palm Beach through the Keys), Annapolis, Chesapeake Bay, Bahamas & Caribbean, Gulf Coast, selective work elsewhere, U.S. East Coast in schema | `Regions.tsx`, `schema.ts`, footer, metadata | Unconfirmed. Do not add marinas, cities, or new regions |
| “Owner-operated” and “one accountable operator” | Homepage, about, schema-adjacent copy | Positioning already published. Do not name the operator |
| “Founder & Operator” as a role label | `FounderStory.tsx`, `AboutPageContent.tsx` | A role label only. No name, bio, years, or headcount |
| “Paulie” | Owner brief, truck branding only | A brand mark for an authentic truck photograph. Not a biography and not a page title |
| Reply “within one business day” | Contact metadata, contact page, homepage CTA, form success | Unconfirmed service promise. Make it configurable. If unset, say the team replies personally and do not state a deadline |
| “Selective roster” / limited new programs each season | About, footer, why-us | Unconfirmed capacity claim. Do not add numbers |
| Insurance, compliance, and documentation coordination as a management activity | Yacht management bullets | Describes coordination, not a license. Do not write “licensed” or “insured” |
| `priceRange: "$$$"` in JSON-LD | `src/lib/schema.ts` | Unconfirmed. Remove it. Do not publish prices |
| “Without markup games” | `WhyChooseUs.tsx` | Unconfirmed commercial claim. Do not add rates or markups |
| Charter programs as a use case | `WhyChooseUs.tsx` | Do not build a charter product |
| Six locations, years in business, vendor relationships, customer yachts, testimonials | Not on this site. They appear on the competitor | Forbidden to import |

### 2.4 Forbidden to invent

- Founder identity, legal name, biography, age, hometown, or years of experience
- Employees, crew roster, or team size
- Yacht ownership, managed vessels, or customer relationships
- Testimonials, reviews, star ratings, or case studies
- Marina, yard, or brand partnerships
- Insurance, licenses, certifications, or “fully bonded” language
- Service guarantees, uptime, response-time SLAs, or “free assessment”
- Prices, day rates, program fees, or payment terms
- Active job vacancies
- Phone numbers
- Facebook, Instagram, or other social URLs
- A generated person presented as staff
- A generated truck presented as the company truck

Missing facts stay in configuration with empty values. The UI hides the control when the value is empty.

---

## 3. Competitor reference (structure only)

Reference site: https://yachtmgtservices.com/

Studied on 14 October 2026: homepage, about, programs index, signature program, captain and crew, careers, field-service category, sample role pages, contact, and the app page.

Use the workflows. Do not copy names, sentences, layout chrome, photography, or code.

What is worth learning:

- Homepage moves from a clear promise to a few service pillars, then to programs, then to a single contact path.
- Programs are a separate layer from individual services. A program is how an owner engages. A service is what the work is.
- Captain and crew is both a service explanation and a request path. Anzalone’s request path is a form emailed to the owner, not an app.
- Careers is a directory: department, then role, then responsibilities, qualifications, and an application. An empty directory still offers a general application.
- Contact asks for the vessel and the need, and gives a direct alternative to the form.
- Field service is treated as the hands-on core of the company.

What must not be learned into this site:

- Their app (“Mariner Pro”), owner login, checklists in an app, or remote monitoring
- Their accounting, sales, social, or app-development career tracks
- Their program names (Entry, Moderate, Signature, Sportfish) and any prices, including captain day rates
- Testimonials and named customer boats
- “Licensed and insured,” location counts, and years-in-business claims
- Phone numbers shown in their header
- Product-dealer content

## 4. Target sitemap

Keep existing URLs. Add routes. Do not add redirects that drop the five service pages.

| URL | Status | Purpose |
|-----|--------|---------|
| `/` | Exists. Revise | Cinematic home. Field service first. No photo gallery |
| `/services` | New | Simple index of the service pages |
| `/field-services` | New | Primary field-work page: dockside care, detailing, checks, yard presence |
| `/yacht-management` | Exists | Full-program oversight |
| `/maintenance-detailing` | Exists | Planned care and presentation |
| `/captain-crew-services` | Exists | Marketing explanation. Crew *requests* live on `/crew` |
| `/refit-custom-work` | Exists | Yard and custom project oversight |
| `/brokerage-support` | Exists | Sale preparation |
| `/programs` | New | How owners engage. No prices |
| `/programs/[slug]` | New, data-driven | Only published program records |
| `/about` | Exists. Revise | Company story without a fictional person |
| `/careers` | New | Departments and open roles. Empty state is valid |
| `/careers/[slug]` | New, data-driven | Role detail. Render nothing for unknown slugs except `notFound()` |
| `/crew` | New | Request captain or crew support. Form emails the owner |
| `/contact` | Exists | Vessel review |
| `/api/vessel-review` | Exists | Resend |
| `/api/crew-request` | New | Resend. Same env vars |
| `/api/careers` | New | Resend. Same env vars |
| `/sitemap.xml`, `/robots.txt`, `/icon`, `/opengraph-image` | Exist. Update sitemap when routes are added | SEO |

Explicitly absent:

- `/gallery` and homepage `#gallery`
- `/app`, accounts, dashboards
- `/accounting`, invoices, portals
- `/checkout`, deposits, carts, “book now” payments
- A blog, unless the owner later asks

### 4.1 Navigation

Desktop and mobile, in this order:

1. Services (menu: Field Services, then the five existing services)
2. Programs
3. About
4. Careers
5. Crew
6. Contact, as the header button labeled **Inquire**

The wordmark links home. Do not also put Home in the bar.

Footer columns: Services, Company (About, Programs, Careers, Crew, Contact), Contact (email, and phone or Facebook only when configured).

### 4.2 Homepage order

1. Cinematic hero with the tagline and two actions: discuss the vessel, and jump to field services.
2. Short trust row. Three ideas, no fake statistics.
3. Field services emphasis.
4. Services index.
5. One detailing comparison, not a gallery grid.
6. Programs preview linking to `/programs`.
7. Where we operate, using only the regions already on the site.
8. About preview without a synthetic portrait.
9. Crew and careers text links, secondary to the owner inquiry.
10. Contact close.

Remove `WorkGallery`.

## 5. Design direction

Keep the current token system in `src/app/globals.css`.

| Role | Token | Value |
|------|--------|--------|
| Deep background | `navy-950` | `#060d18` |
| Primary navy | `navy-900` | `#0a1628` |
| Mid navy | `navy-800` / `700` / `600` | existing scale |
| Page background | `ivory` | `#f7f4ef` |
| Surface | `surface` | `#ffffff` |
| Text | `ink` / navy scale | existing |
| Accent | `gold` | `#c9a962` |
| Accent muted | `gold-muted` | `#8f7538` |
| Accent light | `gold-light` | `#dbc48a` |

Do not add a second yellow, a new font, or a component library.

Typography stays Cormorant Garamond for display and DM Sans for UI and body. Weights already loaded in `src/app/layout.tsx` are enough.

Motion stays CSS-based (`ScrollReveal`, hero entrance, `prefers-reduced-motion`). Do not add a scroll library.

Hero photography should be full-bleed, with the existing scrim so the headline stays readable. One still image is the required baseline. Video is optional and must degrade to that still.

Layout stays simple: one idea per section, one primary button, generous space, no card mosaics that behave like a gallery.

## 6. Component architecture

Preserve and reuse:

- `src/components/layout/Header.tsx`, `Footer.tsx`
- `src/components/ui/Button.tsx`, `Container.tsx`, `SectionHeading.tsx`, `PageHero.tsx`, `ServiceCard.tsx`, `FeatureCard.tsx`, `LuxuryDivider.tsx`, `ScrollReveal.tsx`
- `src/components/ui/images/LuxuryImage.tsx`, `ResponsiveImage.tsx`, `ImagePlaceholder.tsx`, `ImageOverlay.tsx`, `BeforeAfter.tsx`
- `src/components/services/ServicePageLayout.tsx`
- `src/components/contact/VesselReviewForm.tsx`, `FormField.tsx`
- `src/lib/navigation.ts`, `services.ts`, `seo.ts`, `schema.ts`, `images.ts`, `vessel-review-form.ts`

Add, when implementing the new routes:

| Module | Responsibility |
|--------|----------------|
| `src/lib/company.ts` | Email, optional phone, optional Facebook URL, optional response sentence. Empty optionals render nothing |
| `src/lib/programs.ts` | Published program records only. Empty array is allowed |
| `src/lib/careers.ts` | Departments and roles. Default roles array is empty |
| `src/lib/crew-form.ts` | Crew request validation, shared by the form and `POST /api/crew-request` |
| `src/lib/careers-form.ts` | Application validation, shared by the form and `POST /api/careers` |
| `src/components/forms/` | Shared field, error, and success patterns extracted only if duplication is real |

`ImageGallery` exists only to support the homepage gallery. Delete it when `WorkGallery` is removed, unless another non-gallery use is required. Do not keep a dead gallery component “for later.”

Do not add dependencies. The contact API already calls Resend with `fetch`. New email routes use the same pattern.

## 7. Content rules

- Write original sentences. Do not paraphrase the competitor page by page.
- Tagline stays exact: “Ready before you arrive.”
- Speak to the owner. Short sections. No keyword lists in visible copy.
- Field work is concrete: washdowns, systems checks, detailing, dockside preparation, yard supervision.
- Program pages describe scope and how to start. They do not list prices, vessel-length bands, or hour minimums unless those values are later added to `programs.ts` by the owner.
- Careers copy may describe the kind of field work Anzalone does. It may not claim a headcount or an open seat.
- With zero roles, `/careers` says no roles are listed and offers a general application.
- Crew copy explains that owners can request support. It does not publish rates or promise availability.
- About copy may stay owner-operated and direct. It may not introduce a person.
- Remove `priceRange` from JSON-LD.
- Do not add `Review`, `AggregateRating`, or `FAQPage` schema.
- `areaServed` stays limited to regions already published, and should be driven by one list so schema and the regions section cannot drift.
- Alt text describes what is visible. It does not claim the person is an Anzalone employee or that the yacht is a client vessel.
- The one-business-day sentence is removed from metadata, hero copy, and the success state unless `company.responseCommitment` is set.

Proposed program records, safe to publish because they restate existing services and contain no new commercial terms:

| Slug | Working title | Points at |
|------|----------------|-----------|
| `field-care` | Field care | `/field-services`, maintenance and detailing |
| `management` | Management | `/yacht-management` |
| `projects` | Projects and yard periods | `/refit-custom-work`, brokerage support |

The owner may rename them. Do not add a fourth tier to look more like the competitor.

## 8. Asset requirements

Full register: `docs/ANZALONE_ASSET_REGISTER.md`.

Rules:

- `usePlaceholder: true` renders the CSS frame in `ImagePlaceholder`. `false` renders `next/image` from `public/`.
- There is no `onError` fallback. A missing file with `usePlaceholder: false` is a broken image. Flip the flag, or add the file, before shipping.
- Declared `width` and `height` must match the file. All current JPEGs are 1536×1024.
- The file `anzalone-founder.jpg` is unapproved. Keep `usePlaceholder: true` until the owner supplies a real photograph and explicitly approves its use.
- Do not generate a founder, a staff roster, or a truck. Image generation in this environment cannot establish that a picture is the company’s truck or a real person.
- Truck photography belongs in field services and about only after a real file is added, for example `public/images/anzalone-truck.jpg`, with `usePlaceholder` starting at `true`.
- Uniform photography must show the actual uniform. Generic white shirts are not that asset.
- Video, if a real file is provided later: `public/video/hero.mp4`, poster set to the hero still, `muted`, `playsInline`, `loop`, no audio required. Respect `prefers-reduced-motion` by showing the poster only. Do not block launch on video.
- No stock watermark. No competitor imagery. No client vessel presented as Anzalone’s own.

## 9. Forms and data flow

All three forms:

- Client validation and the same validation on the server
- Honeypot field ignored by users and rejected when filled
- No success state until the API returns ok
- Failure text includes mailto:info@anzaloneyacht.com
- HTML email bodies escape every interpolated field
- Subjects are single-line
- `reply_to` is the visitor’s email
- Recipient is `CONTACT_FORM_TO`, defaulting to info@anzaloneyacht.com
- Sender is `CONTACT_FORM_FROM`
- Missing `RESEND_API_KEY` returns 503 with an honest message
- Do not log message bodies
- Do not add a database

### 9.1 Vessel review (exists)

`POST /api/vessel-review`

Fields already required: name, email, phone, vessel name, size, location, at least one service, message of 20+ characters, preferred contact method.

Extend the service checklist with Field Services, Programs, and Crew when those pages exist. Keep “General inquiry.”

### 9.2 Crew request (new)

`POST /api/crew-request`

Fields: name, email, phone, vessel name, location, date or date range, roles (captain, deck, interior, other), notes, preferred contact. Vessel size is optional.

Subject prefix: `Crew request —`.

This is an email to the owner. It is not a booking confirmation and it does not show a price.

### 9.3 Careers application (new)

`POST /api/careers`

Fields: name, email, phone, interest (field service by default, or a role slug when applying from a role page), location, experience summary, optional resume or portfolio URL, message.

Do not accept file uploads. There is no object storage in this project, and adding it is out of scope. The success state tells the applicant they may also email a resume to info@anzaloneyacht.com.

Subject prefix: `Career application —`.

Unknown role slugs are `notFound()` on the page and rejected by the API if a slug is supplied that is not in `careers.ts`.

### 9.4 Facebook

When `company.facebookUrl` is an `https` URL, show one text or icon link in the footer: “Facebook”, `rel="noopener noreferrer"`, `target="_blank"`. Do not embed a page plugin, pixel, or SDK. When the value is missing, render nothing.

## 10. SEO, accessibility, and configuration

- Every indexable page uses `buildPageMetadata`.
- Canonical host remains `https://www.anzaloneyacht.com` once `NEXT_PUBLIC_SITE_URL` is set. Until DNS is connected, the live host may still be the Vercel URL. Do not hard-code the Vercel host into new canonicals.
- Sitemap lists every public page, not the API routes.
- One `h1` per page. Header buttons and form errors stay labeled. Focus-visible gold outline stays.
- Decorative hero images stay `alt=""` / `decorative`.
- `next lint` on Next 15.5 prints a deprecation warning and still exits 0. Do not run the canary codemod unless the script actually breaks.

Environment:

| Variable | Required | Notes |
|----------|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | Yes in production | `https://www.anzaloneyacht.com` after the domain is primary |
| `RESEND_API_KEY` | Yes for any form to send | Absent in the last written deployment notes |
| `CONTACT_FORM_TO` | Yes | `info@anzaloneyacht.com` |
| `CONTACT_FORM_FROM` | Yes | A verified domain sender. `onboarding@resend.dev` is only a development fallback |
| `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` | No | Overrides the vessel form only. Do not point crew or careers at a public third party unless the owner asks |

## 11. Acceptance criteria

Agent 02 is done when all of the following are true:

1. `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass.
2. Header, footer, mobile menu, and sitemap include Services, Programs, About, Careers, Crew, and Contact, and every link resolves.
3. Homepage has no gallery section and no `#gallery` target.
4. Field services are visible without opening a menu: homepage section plus `/field-services`.
5. `/programs` explains engagement without prices. Detail pages exist only for records in `programs.ts`.
6. `/careers` renders an empty state and a working general application when no roles are configured.
7. `/crew` submits to `/api/crew-request`. With Resend unset, the user sees the 503 message and no fake success.
8. `/contact` still submits to `/api/vessel-review`.
9. HTML emails escape user content.
10. Phone, Facebook, response deadline, and founder portrait appear only when configured or explicitly approved.
11. JSON-LD has no `priceRange` and no reviews.
12. No new npm dependencies.
13. No gallery, app, accounting, or payment UI.
14. Copy contains no new named people, testimonials, licenses, prices, or vacancies.
15. Reduced motion, skip link, form labels, and keyboard access on the services menu still work.

## 12. Historical documents

`LAUNCH_CHECKLIST.md` and `DEPLOYMENT_SUMMARY.md` record a 3 June 2026 release. They are useful for the Vercel project name and DNS notes. They are stale where they say photography is only a gradient, where they rate the site launch-ready, and where they omit Programs, Careers, and Crew. Do not delete them. Do not follow them over this spec.
