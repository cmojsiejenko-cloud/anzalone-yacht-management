# Anzalone — Final Owner Checklist

Actions only the owner (or account holders) can complete. Nothing below is marked done in software alone.

## Brand & media

- [ ] Supply an approved photograph of Pauly Anzalone for the About page (optional but recommended). Until then, the site correctly omits a fake portrait.
- [ ] Supply an authentic branded company truck photograph if desired for field storytelling.
- [ ] Supply a real 20–35s muted cinematic lifestyle video for `public/video/hero.mp4` if desired. The still sequence already works as the reliable hero.
- [ ] Confirm biography wording (Naples heritage; father as merchant marine captain; 22 years experience ≠ founding year).
- [ ] Confirm which services are actively offered today (especially specialized electronics, A/C, and interior custom work).
- [ ] Confirm whether Awlgrip/Awlcraft (or any) coating certification should be published. Currently **not** claimed as active.

## Contact & email delivery

- [ ] Keep public phone `(561) 850-4092` and email `anzaloneyachts@gmail.com` as the customer-facing contacts (already in code defaults).
- [ ] In Vercel project env, set:
  - `CONTACT_FORM_TO=anzaloneyachts@gmail.com`
  - `RESEND_API_KEY=…` (server-only)
  - `CONTACT_FORM_FROM=…` using a **verified Resend sending domain** (do not use the Gmail address as the From domain)
  - Optional: `NEXT_PUBLIC_SITE_URL` when the final hostname is confirmed
- [ ] Send one real test each of: vessel review, career application, crew expense — confirm inbox delivery and that success UI only appears when email actually sends.
- [ ] Confirm Facebook destination resolves to the intended page: https://www.facebook.com/share/1FHAxJNNao/?mibextid=wwXIfr

## Domain decision

- [ ] Decide production hostname:
  - Keep `https://anzalone-yacht-management.vercel.app`, **or**
  - Attach a custom domain you control (do **not** point `anzaloneyachtmanagment.com` unless you intend to migrate the original site).
- [ ] If using a custom domain, update `NEXT_PUBLIC_SITE_URL` and re-deploy.
- [ ] Do not change DNS for the original site without explicit ownership and a migration plan.

## Careers & crew

- [ ] Confirm crew expense fields match how the business actually reviews reports.
- [ ] Publish any real job openings only when ready (empty vacancies by design today).

## After deploy

- [ ] Mobile smoke: home, services, one program, about, contact, careers, crew — call and email links.
- [ ] Share final live URL with stakeholders.
- [ ] Keep a rollback note: redeploy previous Vercel deployment or `git revert` + push.
