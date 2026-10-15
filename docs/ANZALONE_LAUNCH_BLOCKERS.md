# Anzalone Launch Blockers

**Date:** 14 October 2026  
**Updated by:** Agent 10  
**Live site noted historically:** https://anzalone-yacht-management.vercel.app/  
That deployment may still predate this local architecture until a new deploy is approved.

## P0 — Must resolve before calling public launch complete

| ID | Blocker | Evidence | Owner? | Next action |
|----|---------|----------|--------|-------------|
| B3 | Production email unverified | Resend key not confirmed in this session; live delivery not tested | Yes | Configure Resend; live-test all three forms |
| B4 | Sender domain | Must use verified `@anzaloneyacht.com` from-address | Yes | Replace `onboarding@resend.dev` for public |
| B5 | Synthetic founder file | Still in `public/`; registry `usePlaceholder: true` | Code OK; photo optional | Keep placeholder or supply real photo |
| B9 | Facebook / phone unknown | Env unset; UI hides correctly | Yes | Set only verified values |
| B22 | Formal privacy policy | `/privacy` flags pending counsel | Yes + counsel | Replace operational notice when approved |

## P1 — Domain / hosting

| ID | Blocker | Notes |
|----|---------|--------|
| B10 | Canonical vs live host | Code intends `https://www.anzaloneyacht.com`; align `NEXT_PUBLIC_SITE_URL` when DNS is ready |
| B11 | DNS | Re-check A/CNAME in Vercel before registrar edits; do not casually change MX |
| B12 | Search Console | Sitemap not submitted in this session |
| B13 | Deploy of this codebase | Local only; CLI deploy not authenticated here |

## P2 — Assets / copy gaps (leave empty rather than fake)

| ID | Gap |
|----|-----|
| B14 | Real truck photo |
| B15 | Branded uniforms |
| B16 | Hero mp4 (`heroVideoSrc` null) |
| B17 | Named founder / bio |
| B18–B21 | Regions locked; no fake credentials/prices/jobs |
| B23 | Analytics — none; wait for approval |
| B24 | Mobile Lighthouse Performance &lt; 90 on local prod server — re-measure on Vercel after deploy |

## Closed in code (Agent 10)

- Mock transport cannot report success in production  
- Vessel-review allowlist + limits; crew date validation  
- Privacy links on all three public forms  
- robots disallow `/api/`  
- Dead gallery/card leftovers removed  
- Hero frame mounting / art-direction eager-load reduced  

## External dependencies

Resend, Vercel env, DNS, brand photos, counsel privacy, optional analytics — all owner-gated. See owner handoff.
