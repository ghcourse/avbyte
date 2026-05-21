# avbyte

MaintenanceOS is a React + Vite product site for a landlord-focused maintenance workflow tool.

## Product concept

A focused micro-SaaS for:
- maintenance request intake
- repair status tracking
- vendor coordination
- tenant visibility
- clean maintenance timelines for small landlords and property managers

## Positioning

This is intentionally **not** a full property management suite.

The wedge is maintenance communication for operators who are stuck between:
- random text threads
- spreadsheets
- bloated all-in-one landlord software

## Current site sections

- hero positioning for the product
- pain-point framing
- MVP feature scope
- workflow breakdown
- product surface/modules
- phased roadmap
- simple pricing model

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

## Automation

The existing automation is still present:
- `npm run update:data` regenerates live research content
- `.github/workflows/daily-refresh.yml` runs daily at `06:15 UTC`
- pushes to `main` trigger `.github/workflows/deploy-pages.yml`

That means the repo is already set up for daily scheduled refreshes and automatic deployment.
