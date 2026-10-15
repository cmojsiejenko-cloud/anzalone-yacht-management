# Anzalone — Live Production Verification

**Verified at:** 2026-10-15 (local agent session)  
**Production URL checked:** https://anzalone-yacht-management.vercel.app  
**Tested code SHA on GitHub:** `45ea829` (feature cutover in `02763c3`)  
**Vercel project (local link):** `prj_kI4vZJ8qJgyHTgpr3weagzVEkr3Y` / `anzalone-yacht-management`

## Verdict

**FAIL — production is not the finished build.**  
The live Vercel site still serves a prior revision. GitHub contains the finished work, but production did not update. Redeploy was not possible from this environment (no Vercel CLI login / no `VERCEL_TOKEN`).

## Checklist against live production

| # | Requirement | Live result |
|---|-------------|-------------|
| 1 | Official supplied logo displayed | **FAIL** — text wordmark “Anzalone / Yacht Management”; `/brand/anzalone-official-logo.png` → **404** |
| 2 | Pauly Anzalone maritime history | **FAIL** — About has no Pauly / Naples / merchant-marine father narrative |
| 3 | Published contact info correct | **FAIL** — live shows `info@anzaloneyacht.com`; no `(561) 850-4092`; no `anzaloneyachts@gmail.com` |
| 4 | Every page desktop + mobile | **PARTIAL / FAIL** — older pages load; new routes **404** (`/careers`, `/crew`, `/programs`, `/field-services`, `/services`, `/privacy`) |
| 5 | CTA / Contact / Careers / Crew forms | **FAIL for finished product** — Contact form exists on old site; Careers/Crew pages absent (404). End-to-end delivery not verified |
| 6 | Real email delivery | **NOT VERIFIED** — no `RESEND_API_KEY` in this environment; not tested against live inbox |
| 7 | No broken images/links/routes | **FAIL** — new intended routes 404; official logo asset 404 |
| 8 | Production deploy succeeded on intended project | **FAIL** — `X-Vercel-Cache: HIT` with multi-day `Age`; content matches old build, not `02763c3` |
| 9 | Live matches tested code | **FAIL** — mismatch confirmed |
| 10 | Original company website unchanged | **PASS** — https://anzaloneyachtmanagment.com/ still live with official name, Pauly narrative, services |

## Live route probe

| Path | Status |
|------|--------|
| `/` | 200 (old homepage) |
| `/about` | 200 (old About) |
| `/contact` | 200 (old contact + `info@…`) |
| `/yacht-management` | 200 |
| `/careers` | 404 |
| `/crew` | 404 |
| `/programs` | 404 |
| `/field-services` | 404 |
| `/services` | 404 |
| `/privacy` | 404 |
| `/brand/anzalone-official-logo.png` | 404 |

## Mobile browser check (live)

- Viewport ~360px: old homepage renders without horizontal overflow on careers 404 page check; homepage screenshot shows text logo, not official mark.
- Cannot pass finished-site mobile QA on production because finished routes are not deployed.

## What is verified in repository / local (not live)

Previously verified on local production build of the new code:

- `npx tsc --noEmit` pass  
- `npm run lint` pass  
- `npm test` pass  
- `npm run build` pass  
- Local smoke at `localhost:3456` showed official logo, Pauly narrative, correct phone/email  

Those results do **not** transfer to the live URL until redeploy.

## Blocker to cutover

1. Sign in to Vercel for project `anzalone-yacht-management`.  
2. Confirm Git link to `cmojsiejenko-cloud/anzalone-yacht-management` `main`.  
3. Redeploy commit `02763c3` or later (`45ea829`).  
4. Set `CONTACT_FORM_TO`, `CONTACT_FORM_FROM` (verified domain), `RESEND_API_KEY`.  
5. Re-run this live checklist.

## Original site

https://anzaloneyachtmanagment.com/ — independently confirmed still online and unchanged by this work (DNS/hosting not modified).
