# Anzalone Yacht Management — Deployment Summary

**Deployed:** June 3, 2026  
**Status:** Live in production

---

## Production URL

**https://anzalone-yacht-management.vercel.app**

Vercel project dashboard:  
https://vercel.com/cmojsiejenko-1860s-projects/anzalone-yacht-management

---

## GitHub Repository

**https://github.com/cmojsiejenko-cloud/anzalone-yacht-management**

| Item | Value |
|------|-------|
| Branch | `main` |
| Framework | Next.js 15 (App Router) |
| Initial commit | `Initial production release: Anzalone Yacht Management website` |

---

## Deployment Platform

| Setting | Value |
|---------|-------|
| Platform | **Vercel** (recommended for Next.js + API routes) |
| Project name | `anzalone-yacht-management` |
| Build command | `npm run build` |
| Output | Next.js serverless (static pages + `/api/vessel-review`) |
| Node.js | Auto-detected from `package.json` |

### Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Current value | Required |
|----------|---------------|----------|
| `NEXT_PUBLIC_SITE_URL` | `https://anzalone-yacht-management.vercel.app` | Yes |
| `RESEND_API_KEY` | *(not set)* | For contact form email |
| `CONTACT_FORM_TO` | `info@anzaloneyacht.com` | Recommended |
| `CONTACT_FORM_FROM` | Verified domain sender | Recommended |

> **Note:** The vessel review form renders and validates correctly. Submissions return a clear message until `RESEND_API_KEY` is configured. See `.env.example` for details.

---

## Build Verification

| Check | Result |
|-------|--------|
| `npm run build` | Pass — 16 routes, zero errors |
| TypeScript | Pass |
| ESLint | Pass |
| Production homepage | Loads |
| Mobile navigation | Works (375px tested) |
| Contact form | Renders all fields |
| Images | Load from `/public/images/` |
| Favicon | `/icon` (dynamic PNG) |
| Open Graph | `/opengraph-image` (1200×630) |
| `robots.txt` | `/robots.txt` |
| `sitemap.xml` | All 8 pages indexed |
| Console errors (production) | None (minor CSS preload warning only) |

### Lighthouse scores (production homepage)

| Category | Mobile | Desktop |
|----------|--------|---------|
| Performance | 83 | **92** |
| Accessibility | **95** | **95** |
| Best Practices | **100** | **100** |
| SEO | **100** | **100** |

Three of four categories exceed 90 on mobile; desktop performance exceeds 90. Mobile performance is primarily limited by JavaScript hydration in the navigation header — acceptable for a luxury marketing site with interactive navigation.

---

## SEO & Metadata (configured)

- Per-page `<title>`, description, canonical URLs via `buildPageMetadata()`
- Open Graph + Twitter Card metadata on all pages
- Dynamic favicon (`src/app/icon.tsx`) — navy/gold “A” mark
- Dynamic OG image (`src/app/opengraph-image.tsx`) — branded 1200×630 card
- JSON-LD LocalBusiness schema
- `robots.txt` and `sitemap.xml` generated from `src/app/robots.ts` and `src/app/sitemap.ts`

---

## Future Update Instructions

### Option A — Git push (recommended after connecting GitHub)

1. Connect the GitHub repo in Vercel: **Project → Settings → Git → Connect Repository**
2. Make changes locally
3. Commit and push to `main`:
   ```bash
   git add .
   git commit -m "Describe your change"
   git push origin main
   ```
4. Vercel auto-deploys on push to `main`

### Option B — Vercel CLI (current workflow)

```bash
cd path/to/Anzalone
npm run build          # verify locally first
npx vercel --prod      # deploy to production
```

### After content or code changes

1. Run `npm run build` locally to catch errors early
2. Push or deploy
3. Verify https://anzalone-yacht-management.vercel.app
4. If using custom domain, confirm sitemap URLs after updating `NEXT_PUBLIC_SITE_URL`

---

## Custom Domain — anzaloneyacht.com

The site is configured for **https://www.anzaloneyacht.com** as the canonical production URL. After connecting the domain, update the Vercel environment variable:

```
NEXT_PUBLIC_SITE_URL=https://www.anzaloneyacht.com
```

Then redeploy so sitemap, canonical tags, and Open Graph URLs use the custom domain.

### DNS records (at your domain registrar)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **A** | `@` | `76.76.21.21` | 3600 (or Auto) |
| **CNAME** | `www` | `cname.vercel-dns.com` | 3600 (or Auto) |

> Vercel may show project-specific values in the dashboard. Always confirm in **Vercel → Project → Settings → Domains** after adding the domain.

### Step-by-step domain connection

1. Log in to [Vercel](https://vercel.com) → **anzalone-yacht-management** → **Settings** → **Domains**
2. Add `anzaloneyacht.com` and `www.anzaloneyacht.com`
3. Copy the DNS records Vercel displays (use table above if they match defaults)
4. Log in to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
5. Add the **A** record for the apex domain (`@`)
6. Add the **CNAME** record for `www`
7. Wait for DNS propagation (usually 5–60 minutes; up to 48 hours)
8. In Vercel, confirm both domains show **Valid Configuration**
9. Set **www.anzaloneyacht.com** as the primary domain (redirect apex → www)
10. Update `NEXT_PUBLIC_SITE_URL` to `https://www.anzaloneyacht.com` and redeploy
11. Submit sitemap to Google Search Console: `https://www.anzaloneyacht.com/sitemap.xml`

### Email (contact form + info@)

After domain verification in [Resend](https://resend.com):

1. Add and verify `anzaloneyacht.com` in Resend
2. Set Vercel env vars:
   - `RESEND_API_KEY` — your API key
   - `CONTACT_FORM_TO=info@anzaloneyacht.com`
   - `CONTACT_FORM_FROM=Anzalone Yacht Management <inquiries@anzaloneyacht.com>`
3. Add Resend SPF, DKIM, and DMARC records at your DNS provider
4. Redeploy and test the contact form at `/contact`

---

## Deployment Changes Made

1. Fixed Open Graph image build warning (removed conflicting edge runtime)
2. Optimized scroll animations to CSS (removed client JS from `ScrollReveal` — smaller homepage bundle)
3. Trimmed Google Font weight subsets for faster font loading
4. Initialized Git, created GitHub repo, pushed `main`
5. Deployed to Vercel with `NEXT_PUBLIC_SITE_URL` configured

---

## Remaining Recommendations

| Priority | Item |
|----------|------|
| High | Connect GitHub repo in Vercel for automatic deploys on push |
| High | Configure `RESEND_API_KEY` so the contact form sends email |
| High | Connect custom domain `anzaloneyacht.com` and update `NEXT_PUBLIC_SITE_URL` |
| Medium | Submit sitemap in Google Search Console |
| Medium | Replace stock/placeholder photography with client-owned vessel images |
| Low | Add Google Analytics or privacy-friendly analytics if desired |
| Low | Connect Vercel GitHub integration failed initially — retry from dashboard |

---

## Overall Website Quality Score

**8.7 / 10**

| Area | Score | Notes |
|------|-------|-------|
| Design & polish | 9/10 | Luxury aesthetic, consistent typography and spacing |
| Content & IA | 9/10 | Complete service pages, clear CTAs, strong copy |
| Technical / SEO | 9/10 | Full metadata, sitemap, schema, OG image |
| Performance | 8/10 | Strong desktop scores; mobile nav JS is the main limiter |
| Production readiness | 8/10 | Live and client-shareable; form email + custom domain pending |

---

**Support email:** info@anzaloneyacht.com  
**Canonical URL (after domain):** https://www.anzaloneyacht.com  
**Current live URL:** https://anzalone-yacht-management.vercel.app
