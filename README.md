# avbyte

A vibrant React + Vite site focused on:
- passive-income business ideas
- niche micro-SaaS opportunities
- daily market brief updates
- trending stocks, crypto, and AI news
- research-backed signals from Reddit and social media

## Highlights

- premium neon/glassmorphism dashboard with tabbed navigation
- passive-income idea feed with monetization and build-angle framing
- market brief section for stocks, crypto, and AI
- research source panel for social-media and Reddit mining
- lightweight editorial template for daily updates
- GitHub Pages-compatible Vite configuration
- automatic deployment with GitHub Actions

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

This repo is configured for GitHub Pages under:

- Repo: `ghcourse/avbyte`
- Base path: `/avbyte/`

After enabling **Settings → Pages → Source: GitHub Actions**, every push to `main` auto-deploys from the fresh Vite `dist/` build output.

## Notes

Because GitHub Pages is a static host, the current site is structured as a polished editorial dashboard with curated content that can be refreshed daily.

## Daily updates

Use `content/daily-update-template.md` as the source-of-truth checklist when refreshing:
- passive-income idea cards
- market brief summaries
- stock and crypto watchlists
- AI / builder signals
- research source notes from Reddit and social media

Automation included:
- `npm run update:data` rotates the site data stamp and refreshes selected content blocks
- `.github/workflows/daily-refresh.yml` runs daily and pushes changes to `main`
- the existing Pages workflow then deploys the refreshed site automatically
