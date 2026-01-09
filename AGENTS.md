# Simon Lab Platform - AI Agent Context

This document provides context for AI agents working on any Simon Lab repository. It describes the overall platform architecture, repository relationships, and current development status.

## Platform Overview

Simon Lab is a computational engineering platform for the chemical industry, implementing the **Project-as-Code** philosophy: defining chemical projects in structured, version-controlled formats that are traceable, verifiable, and machine-readable.

## Repository Map

| Repository | Purpose | Deployment URL | Tech Stack |
|------------|---------|----------------|------------|
| **simon-lab_main** (this repo) | Static landing page & marketing | `simon-lab.org` | HTML, CSS, JS (GitHub Pages) |
| **simon-lab-platform** | Monorepo with all applications | Multiple (see below) | TypeScript, React, Vite, Supabase |

### simon-lab-platform Packages

```
simon-lab-platform/
├── packages/
│   ├── api/            → Supabase backend (auth, projects, realtime)
│   ├── auth/           → Shared auth components (@simon-lab/auth)
│   ├── auth-portal/    → Auth portal app → auth.simon-lab.org
│   ├── core/           → Shared TypeScript types (@simon-lab/core)
│   ├── processview/    → P&ID visualization → process.simon-lab.org
│   ├── labelhash/      → Label designer → label.simon-lab.org
│   └── capacityindex/  → Business intelligence → capacityindex.simon-lab.org
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        DOMAINS                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   simon-lab.org          ← This repo (GitHub Pages, static)     │
│       │                                                          │
│       └──► Sign In ──► auth.simon-lab.org (Auth Portal)         │
│                              │                                   │
│                              ▼                                   │
│              ┌───────────────┼───────────────┐                  │
│              │               │               │                   │
│              ▼               ▼               ▼                   │
│      process.simon-lab.org  label.simon-lab.org  capacityindex  │
│         (ProcessView)         (LabelHash)       .simon-lab.org  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Authentication Architecture

All apps share authentication via **Supabase**:

- **Single Supabase project** handles auth for all apps
- **Session sharing** via localStorage key `simon-lab-auth`
- **OAuth providers**: GitHub, Google (configurable)
- **Email/password** authentication supported
- **Quick Access**: Passphrase-based guest access for demos

### Auth Flow

1. User clicks "Sign In" on landing page → redirects to `auth.simon-lab.org`
2. Auth Portal handles login/signup
3. On success, redirects back to originating app (or shows dashboard)
4. Session is shared across all `*.simon-lab.org` subdomains

## When to Modify Which Repo

| Task | Repository |
|------|------------|
| Update landing page content | `simon-lab_main` |
| Add/modify marketing text | `simon-lab_main` |
| Update SEO metadata | `simon-lab_main` |
| Add new application | `simon-lab-platform/packages/` |
| Modify authentication | `simon-lab-platform/packages/auth-portal/` |
| Update shared types | `simon-lab-platform/packages/core/` |
| Database schema changes | `simon-lab-platform/packages/api/` |
| ProcessView features | `simon-lab-platform/packages/processview/` |
| LabelHash features | `simon-lab-platform/packages/labelhash/` |

## Tech Stack Summary

### Landing Page (this repo)
- Pure HTML/CSS/JavaScript
- No build step required
- i18n via JSON files (`lang/en.json`, `lang/pl.json`, `lang/de.json`)
- Hosted on GitHub Pages

### Platform Monorepo
- **Runtime**: Node.js 18+
- **Frontend**: React 18, Vite 6, TailwindCSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Language**: TypeScript
- **Package Manager**: npm workspaces

## Key Documentation References

For detailed technical documentation, see these files in `simon-lab-platform`:

| Document | Path | Description |
|----------|------|-------------|
| Platform AGENTS.md | `AGENTS.md` | Monorepo structure and dev guidelines |
| Architecture | `docs/ARCHITECTURE.md` | Database schema, auth flows, setup guide |
| Cross-App Roadmap | `docs/CROSS_APP_ROADMAP.md` | Integration status and future plans |
| ProcessView Guide | `packages/processview/AGENTS.md` | P&ID app specifics |
| LabelHash Guide | `packages/labelhash/AGENTS.md` | Label designer specifics |
| Supabase Setup | `packages/api/SETUP.md` | Backend configuration |

## Current Development Status

See `docs/PLATFORM_STATUS.md` in this repo for detailed feature status.

**Summary (January 2026):**
- ✅ LabelHash: Production-ready
- ✅ Auth Portal: Implemented (login, settings, dashboard)
- 🔄 ProcessView: Functional, database integration in progress
- 📋 CapacityIndex: Planned

## Environment Variables

### Landing Page
No environment variables required (static site).

### Platform Apps
All apps require Supabase credentials in `.env`:
```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Quick Reference Commands

### Landing Page
```bash
# No build required - just edit HTML/CSS/JS
# Test locally by opening index.html in browser
```

### Platform Monorepo
```bash
npm install                    # Install all dependencies
npm run dev:processview        # Start ProcessView dev server
npm run dev:labelhash          # Start LabelHash dev server
npm run dev:auth               # Start Auth Portal dev server
npm run build                  # Build all packages
```

---

*This document should be kept in sync with major platform changes.*
*Last updated: January 2026*
