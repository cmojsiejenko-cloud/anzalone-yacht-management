# Anzalone — Live Production Verification

**Verified at:** 2026-10-15 (final source control + live form verification)  
**Production URL:** https://anzalone-yacht-management.vercel.app  
**Vercel project:** `anzalone-yacht-management` (`prj_kI4vZJ8qJgyHTgpr3weagzVEkr3Y`)  
**Production deployment:** `dpl_AyPNwUVQtbBVmfDZ5YXDLYFTefBo` (READY, aliased)  
**Inspector:** https://vercel.com/cmojsiejenko-1860s-projects/anzalone-yacht-management/AyPNwUVQtbBVmfDZ5YXDLYFTefBo  
**Deployed source:** Local working tree via `vercel deploy --prod` (CLI), then synchronized to `origin/main` in this verification pass.

## Verdict

**PASS — production deployment is the intended refined site.**  
GitHub `main` is synchronized to the same refinement tree that produced `dpl_AyPNwUVQtbBVmfDZ5YXDLYFTefBo`.

**Email delivery: BLOCKED — Resend not configured in Vercel.**  
Live labeled vessel-review probe returned HTTP **503** with the honest unconfigured message. No fictitious careers or crew expense payloads were sent to the owner inbox.

## Checklist against live production

| # | Requirement | Live result |
|---|-------------|-------------|
| 1 | Official supplied logo displayed | **PASS** — `/brand/anzalone-official-logo.png` **200** |
| 2 | Hero media premium; yacht visible | **PASS** — cinematic still sequence; full-bleed hero |
| 3 | Header / logo / nav refined | **PASS** — desktop nav + Inquire + phone; mobile call + menu |
| 4 | Homepage section flow polished | **PASS** — seven-section editorial flow live |
| 5 | Pauly / Naples maritime history | **PASS** — About Naples / merchant-marine narrative |
| 6 | Published contact info correct | **PASS** — `anzaloneyachts@gmail.com`, `(561) 850-4092` |
| 7 | Pages desktop + mobile | **PASS** — key routes 200; mobile smoke in this pass |
| 8 | CTA / Contact / Careers / Crew forms | **PASS** handlers; **FAIL delivery** — see email section |
| 9 | No broken images / routes | **PASS** — logo + cinematic hero **200**; unknown path **404** |
| 10 | Deploy on intended Vercel project | **PASS** — aliased to production URL above |
| 11 | Live matches latest tested code | **PASS** after GitHub sync of refinement tree |

## Live route probe

| Path | Status |
|------|--------|
| `/` | 200 |
| `/about` | 200 |
| `/contact` | 200 |
| `/services` | 200 |
| `/programs` | 200 |
| `/careers` | 200 |
| `/crew` | 200 |
| `/brand/anzalone-official-logo.png` | 200 |
| `/api/vessel-review` GET | 405 |
| `/api/careers` GET | 405 |
| `/api/crew-expense` GET | 405 |
| `/api/crew-request` GET | 405 |

## Form POST audit

| Route | Behavior verified |
|-------|-------------------|
| `POST /api/vessel-review` | Rate limit, honeypot, validation, `sendOwnerEmail`. Labeled approved probe → **503** (no `RESEND_API_KEY`) |
| `POST /api/careers` | Multipart validation + optional resume; empty POST → **400** with field errors. No fake application sent |
| `POST /api/crew-expense` | Multipart validation + receipts; empty POST → **400** with field errors. No fake expense sent |
| `POST /api/crew-request` | Legacy **410** — redirects callers to contact / crew-expense |

Shared mail layer (`src/lib/mail.ts`): mock transport blocked when `NODE_ENV`/`VERCEL_ENV` is production; missing key returns 503 with direct-email fallback to `anzaloneyachts@gmail.com`.

## Email / Resend status (production)

| Item | Status |
|------|--------|
| Vercel Production env present | `NEXT_PUBLIC_SITE_URL` only |
| `RESEND_API_KEY` | **Missing** |
| `CONTACT_FORM_TO` | **Missing** (code defaults to `anzaloneyachts@gmail.com`) |
| `CONTACT_FORM_FROM` | **Missing** (code defaults to Resend onboarding sender) |
| Live delivery | **Not possible** until secrets + verified domain are set |
| Labeled vessel probe | **503** — `Contact form is not configured yet. Please email anzaloneyachts@gmail.com directly.` |

### Precise configuration steps (owner)

1. Create a Resend account and API key.
2. Verify a sending domain in Resend (prefer a domain you control, e.g. `anzaloneyacht.com`). Add the DNS records Resend shows (SPF/DKIM). Do **not** casually change MX for the website cutover.
3. In Vercel → Project `anzalone-yacht-management` → Settings → Environment Variables → **Production**:
   - `RESEND_API_KEY` = the Resend secret
   - `CONTACT_FORM_TO` = `anzaloneyachts@gmail.com`
   - `CONTACT_FORM_FROM` = `Anzalone's <inquiries@YOUR_VERIFIED_DOMAIN>` (must match a verified domain; `onboarding@resend.dev` is only a Resend sandbox fallback)
   - Keep `NEXT_PUBLIC_SITE_URL=https://anzalone-yacht-management.vercel.app` until the custom domain is live
4. Do **not** set `MAIL_TRANSPORT=mock` in Production.
5. Redeploy (or wait for the next production deploy) so serverless functions pick up the new env.
6. Send one clearly labeled approved test from `/contact` only (subject/vessel name containing `[APPROVED TEST]`). Confirm inbox delivery before inviting real traffic.
7. Only after that, optionally test careers/crew with similarly labeled approved payloads.

## Source control

- Pre-sync GitHub HEAD: `e6f3ea743629bf1d5b6cae38c9895f1938e6b586` (documentation of prior live verification failure).
- Production binary was already the refined tree via CLI deploy `dpl_AyPNwUVQtbBVmfDZ5YXDLYFTefBo`.
- This pass commits and pushes that refinement tree to `origin/main` without force-push or history rewrite.

## Remaining blockers

1. **Resend production secrets + verified From domain** (P0 for real form delivery).
2. Approved founder portrait + truck assets (placeholders remain honest).
3. Hero `public/video/hero.mp4` absent — cinematic stills remain correct.
4. Custom domain `www.anzaloneyacht.com` not assumed active.
5. Original site https://anzaloneyachtmanagment.com/ was not modified.
