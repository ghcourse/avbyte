# avbyte

A vibrant React + Vite site for a marketing and social networking concept focused on:
- latest market trends
- trending stocks
- crypto news
- AI news
- community and creator momentum

## Highlights

- premium neon/glassmorphism landing experience
- live-friendly crypto and news fetching in the browser
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
