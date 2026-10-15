# Anzalone — Production Deployment Report

## Target project

| Item | Value |
|------|--------|
| Intended production URL | https://anzalone-yacht-management.vercel.app |
| Git remote | `https://github.com/cmojsiejenko-cloud/anzalone-yacht-management.git` |
| Branch | `main` |
| Original public site (do not overwrite) | https://anzaloneyachtmanagment.com/ |
| Custom domain assumption | None — `www.anzaloneyacht.com` not treated as controlled |

## Local verification (completed)

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | Pass |
| `npm run lint` | Pass (0 warnings/errors) |
| `npm test` (form contracts) | Pass |
| `npm run build` | Pass — homepage ~2.52 kB page / ~113 kB first load JS |
| Local prod smoke (`localhost:3456`) | Pass — brand, phone, email, Facebook, About narrative, no H-overflow at 360px |

## Deployment attempts

| Method | Status |
|--------|--------|
| `vercel` CLI | **Blocked** — no credentials; device login prompted (`vercel whoami` waiting for OAuth). No `VERCEL_TOKEN` in environment. |
| GitHub `gh` CLI | **Blocked** — not logged in |
| `git push` credentials | Available (dry-run succeeded against origin) |

## Deployment action taken

| Step | Result |
|------|--------|
| Commit | `02763c3` — *Ship official Anzalone branding, heritage narrative, and production polish.* |
| `git push origin main` | **Succeeded** (`94a5a92..02763c3`) |
| Auto-deploy to Vercel | **Not observed** — as of post-push checks, https://anzalone-yacht-management.vercel.app still served the prior build (`info@anzaloneyacht.com`, older homepage). Likely causes: Vercel project not linked to this GitHub repo, deploy paused, or build failed in the dashboard. |
| CLI `vercel --prod` | **Blocked** — no Vercel login / `VERCEL_TOKEN` |

### Owner action to complete production cutover

1. Sign in at https://vercel.com and open the `anzalone-yacht-management` project.
2. Confirm Git integration with `cmojsiejenko-cloud/anzalone-yacht-management` on `main`.
3. Trigger **Redeploy** of commit `02763c3` (or reconnect the repo and redeploy).
4. Set env vars below, then redeploy again if forms must deliver.
5. Confirm live markers:
   - Title contains `Anzalone's | Premium Yacht Care & Maintenance`
   - Footer email `anzaloneyachts@gmail.com`
   - Phone `(561) 850-4092`
   - Official logo in the header

## Environment variables required in Vercel

```
CONTACT_FORM_TO=anzaloneyachts@gmail.com
CONTACT_FORM_FROM=<Verified Name> <sender@verified-domain>
RESEND_API_KEY=<server secret>
NEXT_PUBLIC_SITE_URL=https://anzalone-yacht-management.vercel.app
# optional overrides:
# NEXT_PUBLIC_COMPANY_EMAIL=
# NEXT_PUBLIC_COMPANY_PHONE=
# NEXT_PUBLIC_FACEBOOK_URL=
```

Do **not** set `MAIL_TRANSPORT=mock` in production.

## Email delivery status

| Item | Status |
|------|--------|
| Recipient default | `anzaloneyachts@gmail.com` |
| Mock transport blocked in production | Yes |
| Live Resend end-to-end | **Unverified** — requires project secrets |

## Rollback

1. Vercel Dashboard → Deployments → Promote previous successful deployment, **or**
2. `git revert` the release commit on `main` and push.

## Secrets

No API keys are written into this report or the repository.
