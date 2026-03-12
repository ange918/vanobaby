# VanoBaby — 10 Ans de Règne

## Overview
Premium website celebrating 10 years of career of Beninese artist Vano Baby (Azéto Gbèdé). Built with Next.js 16, TypeScript, Tailwind CSS 4, and Framer Motion.

## Design
- Dark luxury aesthetic: #080808 background, #C0392B red accent, #ffffff text
- Bebas Neue (headings) + Playfair Display (editorial text)
- Custom red cursor (dot + ring)
- Grain texture overlay
- Smooth scroll + Framer Motion animations

## Project Structure
- `src/pages/` — Next.js Pages Router
  - `_app.tsx` — fonts, metadata, global cursor
  - `index.tsx` — main page assembling all sections
- `src/components/` — all sections as isolated components
  - `CustomCursor.tsx` — animated red dot + lagging ring
  - `Navbar.tsx` — fixed, transparent → black on scroll, hamburger mobile
  - `Hero.tsx` — fullscreen hero with overlay, VANO/BABY giant text, badge
  - `About.tsx` — 2-col layout, animated stat counters, decorative circles
  - `Timeline.tsx` — vertical timeline 2013–2024, alternating cards
  - `Discography.tsx` — 3-col grid of 10 tracks, hover play overlay
  - `Concert.tsx` — live countdown to Dec 31 2025, CTA button
  - `Footer.tsx` — logo, social icons, copyright
- `src/styles/globals.css` — Tailwind v4, grain texture, custom scrollbar

## Tech Stack
- **Framework**: Next.js 16.1.6 (Turbopack), Pages Router
- **UI**: React 19.2.3
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS 4
- **Fonts**: next/font/google (Bebas Neue + Playfair Display)
- **Images**: next/image with picsum.photos placeholder
- **Language**: TypeScript 5

## Development
- Dev server runs on port 5000 via `npm run dev -- -p 5000 -H 0.0.0.0`
- `allowedDevOrigins` set to `["*.replit.dev", "*.riker.replit.dev"]` in next.config.ts
- Images from picsum.photos configured in remotePatterns

## Notes
- All photos use picsum.photos placeholders — marked with `// TODO: replace with official Vano Baby press photo`
- Countdown targets December 31, 2025
