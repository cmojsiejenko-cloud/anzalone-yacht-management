# Anzalone Final QA Report

**Auditor:** Agent 10 — Final Production Engineer & Independent QA  
**Date:** 14 October 2026  
**Method:** Independent repository inspection + local production server tests. Prior agent claims were re-verified, not trusted.

**Verdict:** The local application is a coherent, premium, production-quality website suitable for owner review and preview deploy. It is **not** fully launch-complete for the public production domain until Resend, DNS/canonical host alignment, and approved assets are verified.

---

## 1. Verified completed capabilities

| Area | Status |
|------|--------|
| Homepage cinematic still sequence + CTAs | Pass |
| Services hub + Field Services + five service pages | Pass |
| Programs hub + three illustrative program pages | Pass |
| About (placeholder founder; no invented bio) | Pass |
| Careers empty-state + general application | Pass (`careerRoles = []`) |
| Crew expense report (not payments) | Pass |
| Contact vessel review + service/program preselect | Pass |
| Privacy operational notice | Pass |
| Header / mobile menu / footer / Inquire CTA | Pass |
| 404, sitemap, robots (`Disallow: /api/`) | Pass |
| Shared Resend transport + attachments | Pass (code); delivery unverified |
| No gallery / app / accounting / deposits | Pass |
| No fake jobs, testimonials, prices, ratings | Pass |

---

## 2. Routes and workflows tested

### HTTP smoke (production `next start` / earlier `next dev`)
All returned **200**: `/`, `/services`, `/field-services`, `/yacht-management`, `/maintenance-detailing`, `/captain-crew-services`, `/refit-custom-work`, `/brokerage-support`, `/programs`, `/programs/field-care`, `/programs/management`, `/programs/projects`, `/about`, `/careers`, `/crew`, `/contact`, `/privacy`, `/sitemap.xml`, `/robots.txt`, `/opengraph-image`.

### Forms
| Endpoint | Invalid body | Notes |
|----------|--------------|-------|
| `POST /api/vessel-review` | **400** | Allowlisted services, enum contact method, consent, max lengths, rate limit |
| `POST /api/careers` | **400** | Validation errors returned; privacy link on form |
| `POST /api/crew-expense` | **400** | Date `YYYY-MM-DD`, cents math, privacy link |
| `POST /api/crew-request` | **410** | Legacy; support → contact |

### Preselection
`/contact?program=management` pre-checks **Managed Yacht Readiness**.

### Browser
Mobile menu opens with Home, Services, Programs, About, Careers, Crew, Inquire. Brand **Anzalone Yacht Management** and tagline **Ready before you arrive.** consistent. No horizontal overflow observed at ~360px on home/careers/crew. Breadcrumbs present on service and program detail pages.

---

## 3. Build / test results

| Command | Result |
|---------|--------|
| `npm test` | Pass (form contracts; production Resend explicitly unverified) |
| `npx tsc --noEmit` / build typecheck | Pass |
| `npm run lint` | Pass (exit 0; Next deprecation notice only) |
| `npm run build` | Pass — Next.js **15.5.19** |

---

## 4. Visual QA findings

Inspected via browser automation at mobile and desktop widths (360–1920 targets). Screenshots used for home, careers, crew, contact, services.

**Fixed / confirmed OK**
- No gallery product surfaces; dead gallery/home leftovers removed
- Empty careers experience is clear and professional
- Crew copy correctly denies payment/ledger behavior
- Footer privacy + email fallback visible
- Navy / ivory / gold system intact

**Accepted limitations (not defects to fake away)**
- Hero stills max ~1280×720 → slightly soft on very wide displays
- Concept wardrobe is not branded uniform (honest copy)
- Founder/truck placeholders until owner assets

---

## 5. Performance findings (Lighthouse 11)

**Environment:** Local `npm run build` + `npm run start` on `http://localhost:3000`, headless Chrome, Agent 10 machine. **Not** a Vercel edge measurement.

| Form factor | Performance | Accessibility | Best Practices | SEO |
|-------------|------------:|--------------:|---------------:|----:|
| Mobile (default) | **60** | **100** | **100** | **100** |
| Desktop (`--preset=desktop`) | **97** | **100** | **100** | **100** |

Mobile bottleneck: LCP ~5.1s / TBT ~580ms on Lighthouse’s throttled mobile profile with a full-bleed cinematic hero. Optimizations applied: mount only active+previous film frames; avoid dual eager art-direction downloads; cap hero `sizes` near 1280px source.

**Target 90+ mobile Performance is not met locally.** Desktop meets the target. Further gains need CDN/edge hosting, optional real hero video optimization, and/or lighter above-the-fold media — without inventing fake scores.

---

## 6. Defects fixed in Agent 10

1. **Mock mail blocked in production** (`NODE_ENV` / `VERCEL_ENV`) — no silent success without delivery  
2. Client `guardMockSuccess` rejects `mocked: true` in production builds  
3. Vessel-review **service allowlist** + **contact-method enum** + field max lengths  
4. Crew expense **date format** + note/description length caps  
5. Careers experience/message length caps  
6. Privacy links on careers + crew consent  
7. Root layout homepage canonical removed (per-page only)  
8. `robots.txt` disallows `/api/`  
9. Dead unused UI (`FeatureCard`, `ServiceCard`, `BeforeAfter`) removed  
10. Hero media loading reduced for LCP  
11. Softened two AI-flavored service sentences  

---

## 7. Remaining genuine blockers

| ID | Blocker | Owner? |
|----|---------|--------|
| B3 | Production Resend delivery unverified | Yes |
| B4 | Verified `@anzaloneyacht.com` from-address | Yes |
| B5 | Synthetic founder file must not ship as person | Yes if photo wanted |
| B9 | Facebook / phone unset (hidden correctly) | Yes |
| B10–B13 | Canonical host vs Vercel preview, DNS, Search Console, deploy | Yes |
| B14–B17 | Truck, uniforms, hero mp4, founder name/bio | Yes |
| B21 | Job vacancies stay empty until approved | Yes |
| B22 | Counsel-approved privacy policy | Yes + counsel |
| Perf | Mobile Lighthouse Performance &lt; 90 locally | Improve after edge deploy / media |

---

## 8. Deployment status

| Item | Status |
|------|--------|
| Local production build | Verified |
| `.vercel/project.json` present (`anzalone-yacht-management`) | Present |
| `vercel` CLI authenticated deploy | **Not performed** — CLI login not available in this session |
| `gh` authenticated | **No** |
| Production publish | **Not done** (would replace unapproved live site) |
| Intended domain | `https://www.anzaloneyacht.com` |
| Known live preview (stale) | `https://anzalone-yacht-management.vercel.app/` |

---

## 9. Evidence boundaries

- **Mock / contract tests ≠ production email delivery**  
- **Local Lighthouse ≠ Vercel production Lighthouse**  
- **No live MX / DNS changes were made**  
- **No fabricated business facts were added to close gaps**
