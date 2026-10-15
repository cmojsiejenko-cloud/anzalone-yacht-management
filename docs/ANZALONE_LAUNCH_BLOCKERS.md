# Anzalone Launch Blockers

**Date:** 14 October 2026  
**Updated by:** Agent 10  
**Live site noted historically:** https://anzalone-yacht-management.vercel.app/  
That deployment may still predate this local architecture until a new deploy is approved.

## P0 — Must resolve before calling public launch complete

| ID | Blocker | Evidence | Owner? | Next action |
|----|---------|----------|--------|-------------|
| B3 | Production email unverified | Vercel Production env has **no** `RESEND_API_KEY`; labeled vessel probe → **503** | Yes | Add Resend secrets; verified From domain; labeled inbox test |
| B4 | Sender domain | `CONTACT_FORM_FROM` unset in Vercel; code falls back to onboarding sender | Yes | Set verified domain From before public launch |
| B5 | Synthetic founder file | Still in `public/`; registry `usePlaceholder: true` | Code OK; photo optional | Keep placeholder or supply real photo |
| B9 | Facebook / phone | Published values live in UI; env overrides optional | Mostly closed | Keep only verified public values |
| B22 | Formal privacy policy | `/privacy` flags pending counsel | Yes + counsel | Replace operational notice when approved |

## P1 — Domain / hosting

| ID | Blocker | Notes |
|----|---------|--------|
| B10 | Canonical vs live host | Code intends `https://www.anzaloneyacht.com`; align `NEXT_PUBLIC_SITE_URL` when DNS is ready |
| B11 | DNS | Re-check A/CNAME in Vercel before registrar edits; do not casually change MX |
| B12 | Search Console | Sitemap not submitted in this session |
| B13 | Deploy of this codebase | Closed for current refinements — production `dpl_AyPNwUVQtbBVmfDZ5YXDLYFTefBo` + GitHub sync |

## P2 — Assets / copy gaps (leave empty rather than fake)

| ID | Gap |
|----|-----|
| B14 | Real truck photo |
| B15 | Branded uniforms |
| B16 | Hero mp4 still absent. Player is wired; `heroVideoSrc` stays null until `public/video/hero.mp4` exists |
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
