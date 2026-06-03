# Anzalone Yacht Management

Premium yacht management website built with Next.js, TypeScript, and Tailwind CSS.

## Stack

- **Next.js 15** — App Router
- **TypeScript**
- **Tailwind CSS v4**
- **Google Fonts** — Cormorant Garamond (display), DM Sans (body)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/
│   ├── globals.css      # Brand tokens, base styles
│   ├── layout.tsx       # Root layout, fonts, metadata
│   └── page.tsx         # Homepage composition
└── components/
    ├── home/            # Homepage sections
    ├── layout/          # Header, Footer
    └── ui/              # Shared UI (Button, etc.)
```

## Design system

Tokens, typography scale, spacing, cards, and motion live in `src/app/globals.css`. Reusable UI is in `src/components/ui/`:

| Component | Purpose |
|-----------|---------|
| `Container` | Narrow / default / wide / full-width layout |
| `SectionHeading` | Eyebrow, display title, optional description |
| `PageHero` | Full-bleed navy hero with gold atmosphere |
| `Button` | Primary, secondary, ghost, gold, link variants |
| `ServiceCard` | Service grid blocks with animated gold rule |
| `FeatureCard` | Stat / label / detail trust pillars |
| `LuxuryDivider` | Rule, ornate, wide, subtle, full variants |

Import from `@/components/ui` or individual files.

### Brand colors

| Token | Use |
|-------|-----|
| `navy-950` / `navy-900` | Deep navy backgrounds, headings |
| `ink` | Near-black body text |
| `ivory` | Page background, light text on dark |
| `gold` / `gold-muted` | Accents, rules, labels |
| `gray-*` | Soft gray UI chrome and muted copy |

## Customization

1. **Founder imagery** — Replace the gradient placeholder in `FounderStory.tsx` with `next/image` and assets in `public/`.
2. **Copy** — Edit section components in `src/components/home/`.
3. **Contact** — Update email in `Footer.tsx`, `ContactCTA.tsx`, and metadata as needed.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
