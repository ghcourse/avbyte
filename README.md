# avbyte

A vibrant React + Vite site for a marketing and social networking concept focused on:
- latest market trends
- trending stocks
- crypto news
- AI news
- community and creator momentum

## Highlights

- premium neon/glassmorphism dashboard with tabbed navigation
- live browser-side stock, crypto, market, and AI feed integrations
- graceful demo fallback when external feeds are unavailable
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

After enabling **Settings → Pages → Source: GitHub Actions**, every push to `main` auto-deploys.

## Notes

Because GitHub Pages is a static host, the app uses browser-side public feeds and falls back to polished demo content if a provider blocks requests or rate-limits traffic.

Current live feed sources used by the dashboard:
- Yahoo Finance public search endpoint for stock quotes
- CoinGecko public markets endpoint for crypto pricing
- Reddit JSON feeds for market discussion headlines
- Hacker News Algolia API for AI-related stories
