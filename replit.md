# VanoBaby

## Overview
A Next.js 16 application using React 19, TypeScript, and Tailwind CSS 4.

## Project Structure
- `app/` - Next.js App Router pages and layouts
- `public/` - Static assets (SVGs, images)
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS config for Tailwind

## Tech Stack
- **Framework**: Next.js 16.1.6 (Turbopack)
- **UI**: React 19.2.3
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **Package Manager**: npm

## Development
- Dev server runs on port 5000 via `npm run dev -- -p 5000 -H 0.0.0.0`
- `allowedDevOrigins` set to `["*"]` in next.config.ts for Replit proxy compatibility

## Deployment
- Build: `npm run build`
- Start: `npm run start -- -p 5000 -H 0.0.0.0`
