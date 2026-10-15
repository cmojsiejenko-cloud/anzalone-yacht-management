# Anzalone Final Launch Checklist

**Date:** 14 October 2026  
**Use with:** `docs/ANZALONE_FINAL_QA_REPORT.md`, `docs/ANZALONE_OWNER_HANDOFF.md`, `docs/ANZALONE_LAUNCH_BLOCKERS.md`

Check items only when independently verified. Do not check boxes from assumption.

## A. Code freeze (local — verified by Agent 10)

- [x] `npm test` passes
- [x] `npm run lint` passes
- [x] `npm run build` passes
- [x] All public routes return 200 locally
- [x] Forms reject invalid payloads (400)
- [x] Legacy `/api/crew-request` returns 410
- [x] `careerRoles` empty — no invented jobs
- [x] No gallery / payment / accounting product
- [x] Mock transport cannot succeed in production env
- [x] Privacy notice page + footer link present
- [ ] Owner has accepted local visual review of every page

## B. Email (required before calling forms “live”)

- [ ] Resend account ready
- [ ] Domain `anzaloneyacht.com` verified in Resend
- [ ] `RESEND_API_KEY` set in Vercel (server only)
- [ ] `CONTACT_FORM_TO=info@anzaloneyacht.com` (or approved alternate)
- [ ] `CONTACT_FORM_FROM` uses verified domain (not `onboarding@resend.dev` for public)
- [ ] `MAIL_TRANSPORT` is **unset** in production
- [ ] Live test: vessel review
- [ ] Live test: careers (+ PDF)
- [ ] Live test: crew expense (+ receipt)
- [ ] Confirm no success UI when Resend fails

## C. Domain & hosting

- [ ] Preview deploy of **this** codebase (not the old gallery site)
- [ ] Owner smoke-tests preview on phone + desktop
- [ ] `NEXT_PUBLIC_SITE_URL=https://www.anzaloneyacht.com` (when that host is real)
- [ ] DNS A/CNAME match current Vercel values (re-check in dashboard)
- [ ] HTTPS certificate valid on intended host
- [ ] Canonical URLs / sitemap / OG point at intended host
- [ ] Search Console sitemap submitted
- [ ] Production promote only after owner approval

## D. Brand & content approvals

- [ ] Founder name / bio (or leave unset)
- [ ] Real founder photograph (or keep CSS placeholder)
- [ ] Real truck photograph (or keep section hidden)
- [ ] Facebook URL (or leave hidden)
- [ ] Public phone (or leave hidden)
- [ ] Optional hero `public/video/hero.mp4` + `heroVideoSrc`
- [ ] Counsel-reviewed privacy policy (replace operational notice)
- [ ] Any real job openings added to `careerRoles` only when approved

## E. Post-deploy smoke

- [ ] Home, Services, Programs, About, Careers, Crew, Contact, Privacy
- [ ] Mobile menu + Inquire
- [ ] One inquiry with real Resend delivery
- [ ] 404 page
- [ ] `/sitemap.xml` and `/robots.txt`
- [ ] Lighthouse on **production URL** (record real scores)

## F. Rollback

If production must be reverted after a bad deploy:

1. In Vercel → Project → Deployments → open the last known-good deployment → **Promote to Production**.  
2. Or redeploy the previous git commit / previous preview that was approved.  
3. Confirm forms still 503 (safe) or still deliver if keys unchanged.  
4. Do **not** change DNS MX records while rolling back the site.  
5. Document the rollback deployment URL and time.
