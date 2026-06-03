# Anzalone Yacht Management — Launch Checklist

**Audit date:** June 3, 2026  
**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS v4  
**Final quality rating:** **8.5 / 10** (see scoring at bottom)

---

## Production audit summary

| Area | Status | Notes |
|------|--------|-------|
| Build (`npm run build`) | ✅ Pass | 15 routes, all static except API + OG image |
| Lint (`npm run lint`) | ✅ Pass | No ESLint warnings or errors |
| TypeScript (`tsc --noEmit`) | ✅ Pass | Strict type check clean |
| Mobile layout | ✅ Pass | Responsive nav, stacked grids, touch-friendly CTAs |
| Tablet layout | ✅ Pass | 2-column grids, sticky sidebars on contact |
| Desktop layout | ✅ Pass | Full nav, dropdown services menu, wide containers |
| Broken links | ✅ Fixed | Service hero “View All Services” now links to `/#services` |
| Missing pages | ✅ Complete | 8 content pages + custom 404 |
| Repeated copy | ✅ Reduced | Homepage founder section trimmed; full story on `/about` |
| Headings | ✅ Good | Single H1 per page; logical H2/H3 hierarchy |
| Button consistency | ✅ Fixed | Header, footer, and CTAs use shared `Button` component |
| Contact form | ⚠️ Config required | API route ready; needs Resend env vars in production |
| SEO metadata | ✅ Complete | Per-page titles, descriptions, canonical, OG, Twitter, sitemap, robots |
| Accessibility | ✅ Good | Skip link, landmarks, ARIA on nav/form, focus states, reduced motion |
| Performance | ✅ Good | Static pages ~111 kB first load; fonts use `display: swap` |
| Visual polish | ⚠️ Placeholders | Premium gradient placeholders until real photography is added |

---

## What was completed in this audit

### Build & code quality
- [x] Production build compiles with zero errors
- [x] ESLint passes with zero warnings
- [x] TypeScript strict check passes
- [x] Fixed `Button` component to support `onClick` / `tabIndex` on link variants
- [x] Cleaned up homepage `page.tsx` import/export order

### Pages & routing
- [x] **Home** (`/`) — full marketing funnel with 11 sections
- [x] **About** (`/about`)
- [x] **Contact** (`/contact`) — vessel review form
- [x] **Yacht Management** (`/yacht-management`)
- [x] **Maintenance & Detailing** (`/maintenance-detailing`)
- [x] **Captain & Crew Services** (`/captain-crew-services`)
- [x] **Refit & Custom Work** (`/refit-custom-work`)
- [x] **Brokerage Support** (`/brokerage-support`)
- [x] **Custom 404** (`src/app/not-found.tsx`) — branded with navigation CTAs
- [x] **Sitemap** (`/sitemap.xml`) — all 8 routes indexed
- [x] **Robots** (`/robots.txt`) — allows crawling, points to sitemap
- [x] **Favicon** (`src/app/icon.tsx`) — generated navy/gold “A” mark
- [x] **Open Graph image** (`/opengraph-image`) — dynamic 1200×630 branded card

### Fixes applied
- [x] Contact form no longer fakes success — posts to `/api/vessel-review` with honest error when email is not configured
- [x] Created `/api/vessel-review` route with server-side validation + Resend email delivery
- [x] Service page hero “View All Services” links to `/#services` instead of homepage top
- [x] Readiness CTA links to `/contact` instead of in-page anchor
- [x] Header and footer “Inquire” buttons use shared `Button` component
- [x] Service cards include accessible `aria-label` on links
- [x] Homepage founder section shortened; “About Anzalone” button links to full story
- [x] Removed awkward keyword-stuffed copy in Regions section
- [x] Gallery copy no longer claims photos are “photographed” before real assets exist
- [x] Updated `.env.example` with all production environment variables

### SEO & structured data
- [x] Unique `<title>` and meta description per page via `buildPageMetadata()`
- [x] Canonical URLs on every page
- [x] Open Graph + Twitter Card metadata
- [x] JSON-LD LocalBusiness / ProfessionalService schema
- [x] Target keywords integrated naturally in copy and metadata

### Accessibility
- [x] Skip-to-content link
- [x] Semantic landmarks (`header`, `nav`, `main`, `footer`)
- [x] Mobile menu: `aria-expanded`, `aria-controls`, escape key, body scroll lock
- [x] Services dropdown: keyboard navigation (arrows, home, end)
- [x] Form: labels, `aria-invalid`, error announcements, fieldset legends
- [x] `prefers-reduced-motion` respected in scroll reveal animations
- [x] Focus-visible gold outline on interactive elements

---

## What still needs real content / photos

These items are **expected placeholders** — the site is structurally ready, but final brand assets are needed:

| Asset | File path | Used on |
|-------|-----------|---------|
| Hero photo | `public/images/yacht-management-hero.jpg` | Homepage hero, yacht management page |
| Founder portrait | `public/images/anzalone-founder.jpg` | Homepage founder, about page |
| Vessel readiness | `public/images/marina-vessel-check.jpg` | Work gallery |
| Captain & crew | `public/images/captain-services.jpg` | Gallery, captain services hero |
| Refit project | `public/images/refit-custom-work.jpg` | Gallery, refit page hero |
| Brokerage prep | `public/images/brokerage-prep.jpg` | Gallery, brokerage page hero |
| Detailing before/after | `public/images/detailing-before-after.jpg` | Detailing showcase, maintenance page hero |

**After adding each file:** set `usePlaceholder: false` on the matching entry in `src/lib/images.ts`.

### Recommended copy additions (optional, post-launch)
- [ ] Founder name and brief bio on About page (currently generic “Founder & Operator”)
- [ ] Phone number (if desired for public display — currently email-only)
- [ ] Client testimonials or case studies (when available and approved)
- [ ] Specific marina / yard partner names (if client approves)

---

## Contact form — required before launch

The vessel review form **will show an error** until email delivery is configured. This is intentional — it prevents silent lost leads.

### Option A: Resend (recommended)

1. Create account at [resend.com](https://resend.com)
2. Verify domain `anzaloneyacht.com`
3. Create API key
4. Set Vercel environment variables:

```
RESEND_API_KEY=re_xxxxxxxx
CONTACT_FORM_TO=info@anzaloneyacht.com
CONTACT_FORM_FROM=Anzalone Yacht Management <inquiries@anzaloneyacht.com>
```

5. Submit a test form on `/contact` after deploy

### Option B: Formspree or external endpoint

Set in Vercel:

```
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

---

## Deployment instructions (Vercel)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Anzalone Yacht Management — production-ready site"
git branch -M main
git remote add origin https://github.com/YOUR_ORG/anzalone-yacht.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Root directory: `.` (project root)
5. Build command: `npm run build` (default)
6. Output directory: `.next` (default)

### 3. Environment variables

Add in **Project → Settings → Environment Variables** (Production):

| Variable | Value | Required |
|----------|-------|----------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.anzaloneyacht.com` | Yes |
| `RESEND_API_KEY` | Your Resend API key | Yes (for form) |
| `CONTACT_FORM_TO` | `info@anzaloneyacht.com` | Yes (for form) |
| `CONTACT_FORM_FROM` | Verified sender address | Yes (for form) |

### 4. Deploy

Click **Deploy**. Vercel runs `npm run build` automatically. First deploy URL will be `https://anzalone-yacht-xxx.vercel.app`.

### 5. Post-deploy verification

- [ ] Visit all 8 pages — no 404s
- [ ] Test mobile menu and services dropdown
- [ ] Submit contact form — confirm email arrives
- [ ] Check `/sitemap.xml` and `/robots.txt`
- [ ] Validate OG tags: [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Run Lighthouse audit (target: 90+ performance, 100 accessibility)

---

## Recommended domain setup

### Registrar / DNS (Cloudflare recommended)

| Record | Type | Value | Purpose |
|--------|------|-------|---------|
| `@` | A | `76.76.21.21` | Apex → Vercel |
| `www` | CNAME | `cname.vercel-dns.com` | www subdomain |
| `@` or `mail` | MX | (your email provider) | Keep existing email |

### In Vercel

1. **Project → Settings → Domains**
2. Add `anzaloneyacht.com` and `www.anzaloneyacht.com`
3. Set **www → apex redirect** (or apex → www — pick one canonical; site defaults to `www`)
4. Enable **automatic HTTPS**

### Email DNS (for Resend)

Add the SPF, DKIM, and DMARC records Resend provides after domain verification so inquiry emails deliver reliably.

### Google Search Console

1. Add property for `https://www.anzaloneyacht.com`
2. Submit sitemap: `https://www.anzaloneyacht.com/sitemap.xml`

---

## Final quality rating: 8.5 / 10

| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Code quality & build | 10/10 | Clean build, lint, types; no errors |
| Content & copy | 9/10 | Professional, keyword-aware, owner-focused tone |
| Design & UX | 9/10 | Cohesive luxury design system, clear CTAs, smooth navigation |
| SEO | 9/10 | Full metadata, schema, sitemap; needs Search Console post-launch |
| Accessibility | 9/10 | Strong fundamentals; no formal audit tool run |
| Performance | 9/10 | Static generation, optimized fonts; real images will add weight |
| Photography | 5/10 | Placeholder gradients only — largest gap before full launch |
| Form / backend | 7/10 | API ready; requires Resend configuration to go live |

**Path to 9.5+:** Add real photography, configure Resend, add founder name, run Lighthouse + axe audit after deploy.

---

## Quick reference

```bash
npm run dev      # Local development (http://localhost:3000)
npm run build    # Production build
npm run start    # Serve production build locally
npm run lint     # ESLint check
npx tsc --noEmit # TypeScript check
```

**Support email:** info@anzaloneyacht.com  
**Canonical URL:** https://www.anzaloneyacht.com
