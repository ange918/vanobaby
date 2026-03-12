# VanoBaby — 10 Ans de Règne

## Overview
Premium multipage website celebrating 10 years of career of Beninese artist Vano Baby (Azéto Gbèdé). Built with Next.js 16 Pages Router, TypeScript, Tailwind CSS 4, and Framer Motion.

## Design
- Dark luxury aesthetic: #080808 background, #C0392B red accent, #ffffff text
- Bebas Neue (headings) + Playfair Display italic (editorial text)
- Custom red cursor (dot + ring) via `CustomCursor.tsx`
- Grain texture overlay (4% opacity via CSS pseudo-element)
- Smooth Framer Motion page transitions + scroll animations

## Architecture
- **Router**: Next.js Pages Router (`src/pages/`)
- **Global layout** in `_app.tsx`: fonts, CustomCursor, IntroLoader, Navbar, AnimatePresence page transitions, Footer

## Pages
| Route | File | Content |
|---|---|---|
| `/` | `pages/index.tsx` | Hero fullscreen only |
| `/about` | `pages/about.tsx` | About + Owl emblem + Awards + Press quotes |
| `/career` | `pages/career.tsx` | Timeline + Sound evolution + Labels |
| `/music` | `pages/music.tsx` | Discography (filtered) + Streaming platforms + Video |
| `/concert` | `pages/concert.tsx` | Countdown + Tickets + Gallery + FAQ accordion |
| `/contact` | `pages/contact.tsx` | Contact form + Info + International booking |

## Components
- `OwlIcon.tsx` — reusable geometric SVG owl, props: `size`, `animated`
- `IntroLoader.tsx` — fullscreen intro (owl + counter 0→100 + split exit), sessionStorage-aware
- `Navbar.tsx` — fixed nav, scroll opacity, hamburger mobile, active route highlighting
- `Hero.tsx` — fullscreen hero with overlay, giant VANO/BABY text
- `About.tsx` — 2-col bio + animated stat counters
- `Timeline.tsx` — vertical timeline 2013–2024, responsive (alternating desktop / left-column mobile)
- `Footer.tsx` — OwlIcon + social icons

## Tech Stack
- **Framework**: Next.js 16.1.6, Pages Router
- **UI**: React 19.2.3
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS 4
- **Fonts**: next/font/google — Bebas Neue + Playfair Display (CSS vars: `--font-bebas`, `--font-playfair`)
- **Images**: next/image with picsum.photos placeholder (TODO: replace with official Vano Baby photos)

## Development
- Dev server: `npm run dev -- -p 5000 -H 0.0.0.0`
- `allowedDevOrigins` configured in next.config.ts for Replit proxy
- picsum.photos configured in next.config.ts remotePatterns

## Notes
- Countdown targets December 31, 2025 (Concert section)
- All images are picsum.photos placeholders — marked with `// TODO: replace with official Vano Baby press photo`
- IntroLoader uses `sessionStorage.getItem('vb_intro_seen')` — shows once per session
- Pages Router NOT App Router — `_app.tsx` is the global layout
