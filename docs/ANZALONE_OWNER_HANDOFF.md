# Anzalone Owner Handoff

**From:** Agent 10 — Final Production Engineer  
**Date:** 14 October 2026  
**For:** Site owner / deployer

The Anzalone Yacht Management website is finished as a local, production-buildable application: clear services and programs, honest careers (no fake jobs), crew expense reports (not payments), owner inquiry form, privacy notice, and navy/gold luxury presentation.

It is **ready for your review and a preview deploy**. It is **not** fully “live complete” until you configure email, confirm the domain, and approve any remaining brand assets.

---

## What you have

- Premium marketing site (Next.js 15 on Vercel-ready stack)
- Homepage with cinematic still sequence (optional hero video when you add a file)
- Services + Field Services + five service detail pages
- Programs (illustrative — no prices)
- About without invented biography
- Careers with empty openings + general application + optional PDF
- Crew expense form with receipts emailed as attachments
- Contact vessel review with service/program preselection
- `/privacy` operational notice (flags that counsel review is still needed)
- Forms email via Resend when configured; otherwise a clear failure + `info@anzaloneyacht.com`

## Exact actions required from you

### 1. Email (P0)
1. Create/verify Resend for `anzaloneyacht.com`.  
2. In Vercel env (Production + Preview as appropriate):  
   - `RESEND_API_KEY`  
   - `CONTACT_FORM_TO=info@anzaloneyacht.com`  
   - `CONTACT_FORM_FROM=Anzalone Yacht Management <inquiries@anzaloneyacht.com>` (or your verified address)  
3. Leave `MAIL_TRANSPORT` **unset** in production.  
4. Send one real test of Contact, Careers (with PDF), and Crew (with receipt).

### 2. Deploy (P0 for public launch)
1. Commit/push this codebase when you are ready (no commit was made by agents unless you asked).  
2. Deploy a **preview** first — do not blindly overwrite the old live site until you approve visuals.  
3. Set `NEXT_PUBLIC_SITE_URL` to the host you want canonicals to use (`https://www.anzaloneyacht.com` when DNS is ready).  
4. Re-check DNS values in the Vercel dashboard before changing registrar records.  
5. **Do not alter email MX records** when connecting the website domain unless your DNS provider and Resend docs explicitly require a separate change you understand.

### 3. Optional brand facts (set or leave empty)
| Env / asset | If missing |
|-------------|------------|
| `NEXT_PUBLIC_COMPANY_PHONE` | Phone stays hidden |
| `NEXT_PUBLIC_FACEBOOK_URL` | Facebook stays hidden |
| `NEXT_PUBLIC_FOUNDER_NAME` | Role shows under company name |
| `NEXT_PUBLIC_RESPONSE_COMMITMENT` | “We reply personally…” only |
| Real founder photo | Keep CSS placeholder (`usePlaceholder: true`) |
| Real truck photo | Truck section stays hidden |
| `public/video/hero.mp4` | Still sequence continues |

### 4. Legal
Replace `/privacy` operational notice with counsel-approved language when ready. Until then, the page honestly says review is pending.

### 5. Jobs
Add openings only in `src/lib/careers.ts` when real. Do not invent vacancies.

---

## How to run locally

```bash
npm install
npm run dev          # development
npm test             # form contracts (not live email)
npm run build
npm run start        # production server locally
```

## Rollback (safe)

If a bad production deploy goes out: in Vercel, promote the previous known-good deployment. Keep Resend keys unchanged unless the failure is email-related. Do not touch MX while rolling back the website.

## Performance note

Local Lighthouse (production server): **desktop ~97**, **mobile ~60** Performance; Accessibility / Best Practices / SEO **100**. Mobile is limited by the full-bleed hero on a throttled profile. Re-measure on the real Vercel URL after deploy.

## Documents to keep

| Doc | Purpose |
|-----|---------|
| `docs/ANZALONE_FINAL_QA_REPORT.md` | Evidence-backed QA |
| `docs/ANZALONE_FINAL_LAUNCH_CHECKLIST.md` | Launch checkboxes |
| `docs/ANZALONE_LAUNCH_BLOCKERS.md` | Open blockers |
| `docs/ANZALONE_ASSET_REGISTER.md` | Photography / video inventory |
| `docs/ANZALONE_MASTER_SPEC.md` | Product rules |

No analytics were added. No payments. No customer app. That is intentional.
