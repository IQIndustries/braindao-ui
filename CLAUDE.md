# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BrainDAO UI is a Next.js 15 landing page for BrainDAO, the governing DAO powering the IQ ecosystem. It showcases the IQ token, ecosystem products (IQ.wiki, IQ Dashboard, IQAI, Sophia), and team information.

## Commands

```bash
pnpm dev          # Start development server (http://localhost:3000)
pnpm build        # Production build
pnpm lint         # Run lint-staged (Biome)
pnpm format       # Format with Prettier
pnpm env:prod     # Pull production env vars from Vercel
pnpm env:dev      # Pull development env vars from Vercel
```

**Note:** This project requires pnpm (enforced via preinstall script). Node.js >= 20.0.0 and pnpm >= 9 required.

## Architecture

### App Router Structure
- `src/app/[locale]/` - Locale-based routing with next-intl
- `src/app/[locale]/page.tsx` - Main landing page (server component)
- `src/app/[locale]/layout.tsx` - Root layout with providers

### Internationalization
- **Library:** next-intl
- **Locales:** English (default), Korean (kr/ko), Chinese (zh)
- **Config:** `i18n/routing.ts` defines routing, `messages/_schema.ts` defines locale schema
- **Translation files:** `messages/{en,kr,zh}.json`
- **Middleware:** `src/middleware.ts` handles locale detection and routing

### Key Directories
- `src/components/layouts/` - Page sections (Hero, Navbar, Footer, ecosystem sections)
- `src/components/ui/` - Shadcn/ui components (button, card, dropdown-menu, popover)
- `src/components/icons/` - Exchange and brand icons
- `src/modules/` - Data fetching utilities (CoinGecko API, Alchemy, TVL calculations)
- `src/data/` - Static data (exchanges, team members, navigation)
- `src/config/` - Environment configuration

### Styling
- Tailwind CSS with custom configuration
- Shadcn/ui components (configured in `components.json`)
- Framer Motion for animations
- next-themes for dark mode (default theme is dark)

### Data Fetching
- Server components fetch IQ token data via IQ Gateway proxy to CoinGecko API
- `unstable_cache` used for caching API responses
- Alchemy SDK for blockchain data (hiIQ supply, lock overview)

### Client Providers
`src/components/layouts/ClientProviders.tsx` wraps the app with:
- ThemeProvider (next-themes)
- PostHogProvider (analytics)

### Path Aliases
- `@/*` maps to `./src/*`
