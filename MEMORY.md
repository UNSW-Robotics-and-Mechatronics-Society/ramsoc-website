# RAMSOC Website — Working Memory

> Maintained by **Dash** (Webmaster / IT Lead)
> Last updated: 2026-02-17

---

## Table of Contents

- [Active Sprint — Tasks](#active-sprint--tasks)
- [Website Status](#website-status)
- [Backlog & Planned Work](#backlog--planned-work)
- [Known Issues & Bugs](#known-issues--bugs)
- [Society Information](#society-information)
- [Key Links & URLs](#key-links--urls)
- [Personal Tasks](#personal-tasks)
- [Notes & Reference](#notes--reference)

---

## Active Sprint — Tasks

### 1. Team Page — Year Navigation Guard
**Priority**: High | **Status**: DONE
- Arrow selector now uses actual `availableYears` array for navigation
- Year validation in page.tsx redirects invalid years to latest available
- Error boundary at `src/app/team/[year]/error.tsx` catches unhandled errors
- `/team` now dynamically redirects to latest year (no more hardcoded year in next.config.js)
- **Files changed**: `year-arrow-selector.tsx`, `page.tsx`, `error.tsx` (new), `src/app/team/page.tsx` (new), `next.config.js`

### 2. Nav Bar Fixes
**Priority**: High | **Status**: DONE
- Solid white background (no transparency)
- Removed bold from RAMSOC letters in logo
- **Files changed**: `navbar.tsx`, `logo.tsx`

### 3. Brand Color Scheme Update
**Priority**: High | **Status**: DONE
- Updated `--color-primary-*` scale in `src/styles/globals.css`
- Primary `#29ABE2` (logo teal), Secondary `#0D2631` (dark navy)

### 4. Society Email Setup (Resend)
**Priority**: High | **Status**: TODO — Awaiting Resend API key from Dash
- **Existing Google Workspace email groups** (`@ramsocunsw.org`):
  | Email | Group Name | Members | Type |
  |-------|-----------|---------|------|
  | `exec@` | Exec | 9 | Custom |
  | `info@` | Info | 3 | Custom |
  | `sponsorships@` | RAMSoc Industry & Sponsor... | 2 | Team |
  | `industry@` | RAMSoc Industry & Sponsor... | 3 | Custom |
  | `it@` | RAMSoc IT | 2 | Custom |
  | `marketing@` | RAMSoc Marketing & Creativ... | 3 | Team |
  | `outreach@` | RAMSoc Outreach | 3 | Custom |
  | `projects@` | RAMSoc Projects | 3 | Custom |
  | `socials@` | RAMSoc Socials | 3 | Team |
  | `wim@` | RAMSoc Women in Mechatr... | 3 | Team |
  | `workshops@` | RAMSoc Workshops | 3 | Custom |
  | `team@` | Team | 2 | Custom |
- **Implementation**:
  - Set up Resend for transactional email sending (contact form responses)
  - Add `resend` package to project
  - Create API route / tRPC procedure for sending emails
  - Add `RESEND_API_KEY` to `src/env.js` environment validation
  - Resend API key will be provided by Dash later

### 5. Contact Form
**Priority**: High | **Status**: TODO
- **Form fields**:
  - Name (text input)
  - Email (email input)
  - Inquiry Type (dropdown): General, Sponsorship/Industry, Events, Technical, Membership, Other
  - Message (textarea, detailed)
- **Behavior**:
  - On submit: sends **two emails** via Resend:
    1. **Confirmation to sender** — "Thanks for reaching out, here's a copy of your inquiry"
    2. **Alert to RAMSOC** — currently all route to `info@ramsocunsw.org`
  - **Future**: Add custom routing per inquiry type to specific email groups (sponsorships@, it@, socials@, etc.)
  - Replace the current `mailto:` contact section or add alongside it
- **Files to create/modify**: New contact form component, new tRPC procedure, `src/app/_components/contact-us.tsx`

### 6. Rambo Mascot Page
**Priority**: Medium | **Status**: BLOCKED — Waiting on lore from MXC directors meeting
- **Route**: `/rambo`
- **Images received** (saved locally, need to copy to `/public/rambo/`):
  - `RAMSOC_MASCOT_WAVE_1.png` — Front view, waving
  - `RAMSOC_MASCOT_OG_2.png` — Front view, standard pose
  - `Group_46_1.png` — Back view
  - `Meet_Ramtiago.png` — ID card with stats
- **Known lore from ID card**:
  - Name: RAMBO
  - Birthday: 28th March
  - Height: 6ft ("true i promise")
  - Star sign: Aries (ram symbol)
  - Design: Robot-ram hybrid with antenna, curly gold horns, RAMSoc logo on chest
  - There's also a character called "Ramtiago" (possibly girlfriend?) — details TBD
- **Content**: Backstory, personality, fun facts — coming from meeting with MXC directors
- **Interactive feature**: Mini platformer game (similar to `/gambling` slots)

### 7. Rubric API — Live Events Integration
**Priority**: Medium | **Status**: DONE
- Replaced Meta Graph API with Rubric API (`POST https://api.hellorubric.com/`)
- Society ID: 12676
- Events now pull live from Rubric with pre-formatted dates
- **Files**: `rubric.provider.ts`, `rubric.types.ts`, `service.ts`, event card components, `useEvents.ts`
- **Commit**: `3529d0b`

### 8. Blog Page
**Priority**: Medium | **Status**: Planning
- **Route**: `/blog`
- **Decisions needed**:
  - CMS choice: Notion (already integrated), Contentful (already integrated), or new (MDX files?)
  - Content types: society news, event recaps, technical articles, member spotlights?
  - Author system needed?
- **For now**: Scaffold the page structure and decide on content source

### 9. Linktree Integration
**Priority**: Low | **Status**: DONE
- Added to footer, contact section, and `src/lib/constants/urls.ts`

### 10. Subcommittee Application Link Update
**Priority**: Low | **Status**: TODO
- **New URL**: `http://app.tribespot.co/form/ramsocsubcom2026`
- Update `NEXT_PUBLIC_SUBCOMMITTEE_APPLICATION_FORM_URL` env var in Vercel
- Used in `src/features/team/components/subcom-profiles.tsx`

### 11. Society Structure Disclaimer
**Priority**: Low | **Status**: DONE
- Added `SocietyStructure` component to team page (`src/app/team/[year]/_components/society-structure.tsx`)
- Visual flowchart: Executives (AGM T3) → Directors (Interview T3) → Subcommittee (Applications T1)
- Includes CTA linking to subcommittee application form

---

## Website Status

### Live Pages
| Page | Route | Status | Notes |
|------|-------|--------|-------|
| Homepage | `/` | Live | Redesigned (Feb 2026) |
| Events | `/events` | Live | Pulls from Rubric API (live events) |
| Careers / Job Board | `/careers` | Live | Pulls from Notion database |
| Team | `/team/[year]` | Live | Auto-redirects `/team` → `/team/2026` |
| Sponsors | `/sponsors` | Live | Tier system, prospectus download |
| Contact | `/#contact` | Live | Embedded in homepage footer section |
| Slots Mini-Game | `/gambling` | WIP | Fun easter egg on `dashs-playground` branch |

### Active Branches
| Branch | Purpose | Status |
|--------|---------|--------|
| `main` | Production | Stable, deployed to Vercel |
| `dashs-playground` | Dash's dev branch | Current working branch |
| `dev` | Development integration | Merch store merged here |
| `fix-hx-events-hook` | Rubric event integration | WIP — has Rubric Data Adapter |
| `logos` | Logo updates | Local branch |

### Tech Stack Summary
- **Framework**: Next.js 16 (App Router) + TypeScript 5.8 (strict)
- **Styling**: Tailwind CSS v4 + SCSS modules
- **API**: tRPC v11 + TanStack Query v5
- **CMS**: Contentful (team) + Notion (careers) + Rubric (events)
- **Email**: Resend (planned)
- **Deployment**: Vercel (auto-deploy from `main`)
- **Package Manager**: Yarn 1.22

### Content Management
- **Events**: Pulled live from Rubric API (society ID 12676)
- **Team**: Managed in Contentful CMS
- **Career Listings**: Managed in Notion database
- **Sponsorship**: Hardcoded in codebase (`src/features/sponsors/`)
- **Static Assets**: `/public/` directory (logos, images, prospectus PDF)

---

## Backlog & Planned Work

### 2026 New Year Updates
- [ ] Update team page content for 2026 exec/subcommittee
- [ ] Refresh homepage content and statistics for new year
- [ ] Update sponsorship page with 2026 sponsors and prospectus
- [ ] Prepare for new exec handover (document processes, access credentials)

### UI/UX Polish
- [ ] Continue the UI overhaul work
- [ ] Improve mobile responsiveness across all pages
- [ ] Refine animations and transitions
- [ ] Ensure consistent design language with new brand colors

### Future Considerations
- [ ] Merch store — evaluate `feat-merch-store` branch on `dev`
- [ ] Analytics review — `feat-analytics` branch exists, check GTM setup
- [ ] Photo gallery page for past events
- [ ] Members portal / dashboard
- [ ] Dark mode support
- [ ] Accessibility audit (WCAG compliance)

### Exec Handover Preparation
- [ ] Document all service credentials and access (Vercel, Contentful, Notion, Resend, GitHub)
- [ ] Write onboarding guide for next Webmaster
- [ ] Ensure all environment variables are documented
- [ ] Review GitHub org permissions and team access

---

## Known Issues & Bugs

| Issue | Severity | Location | Notes |
|-------|----------|----------|-------|
| ~~Team page crashes on non-existent year~~ | ~~High~~ | | **FIXED** — Year validation + error boundary |
| ~~Nav bar transparency~~ | ~~Medium~~ | | **FIXED** — Solid white bg |
| ~~Color scheme too dark~~ | ~~Medium~~ | | **FIXED** — Brand teal palette |
| ~~`/team` redirect hardcoded year~~ | ~~Low~~ | | **FIXED** — Dynamic redirect via `src/app/team/page.tsx` |
| Notion compat layer incomplete | **Low** | `src/lib/notion-compat/` | Table formatting, synced blocks, embedding |
| tRPC dev latency middleware | **Info** | `src/server/api/trpc.ts` | 100-400ms artificial delay, dev only |

---

## Society Information

### About RAMSOC
- **Full Name**: Robotics and Mechatronics Society at UNSW
- **Mascot**: Rambo (details/lore to be documented)
- **Location**: UNSW Kensington, NSW 2052
- **Members**: 900+ active (1,800+ total)
- **Affiliated with**: UNSW Arc (student organization umbrella)

### Society Structure
- **Executives**: President, Vice President, Secretary, Treasurer, Arc Delegate
- **Directors**: Portfolio leads (Events, Marketing, Technical, Industry, etc.)
- **Subcommittees**: Team members under each director portfolio
- **Application process**: Open applications via Tribespot form each year

### Email Groups (Google Workspace)
| Email | Group Name | Members | Type |
|-------|-----------|---------|------|
| `exec@` | Exec | 9 | Custom |
| `info@` | Info | 3 | Custom |
| `sponsorships@` | Industry & Sponsorships | 2 | Team |
| `industry@` | Industry & Sponsorships | 3 | Custom |
| `it@` | IT | 2 | Custom |
| `marketing@` | Marketing & Creative | 3 | Team |
| `outreach@` | Outreach | 3 | Custom |
| `projects@` | Projects | 3 | Custom |
| `socials@` | Socials | 3 | Team |
| `wim@` | Women in Mechatronics | 3 | Team |
| `workshops@` | Workshops | 3 | Custom |
| `team@` | Team | 2 | Custom |

All addresses are `@ramsocunsw.org`.

### Social Media
| Platform | Handle / Link |
|----------|--------------|
| LinkedIn | robotics-and-mechatronics-society-unsw |
| Facebook | RAMSOCUNSW |
| Instagram | @ramsocunsw |
| Discord | discord.gg/invite/4dWMWAjWm9 |
| Linktree | linktr.ee/RAMSocUNSW |

### Flagship Events
| Event | Description | 2025 Stats |
|-------|-------------|------------|
| **Sumobots** | Autonomous robot ring-pushing competition | 371 participants, ARC Award winners |
| **Buildathon** | Humanitarian engineering hackathon | 193 participants, 41 teams, $300 prizes |
| **Industry Night** | Networking with industry partners | 409 attendees |
| **Women in Mechatronics Panel** | Diversity and inclusion initiative | 90 attendees |

### 2025 Awards
- ARC Clubs Outstanding Event Series Award (Sumobots) — Winners
- ARC Club of the Year — Runners Up

### 2026 Goals
1. Expand Women in Mechatronics community
2. Give back through impactful fundraising and outreach
3. Elevate flagship events to new heights

### Current Sponsors (2026)
UNSW Arc, UNSW Engineering, UNSW Founders, Engineers Australia, Jinro, Pure Matcha, Domino's, KOKO Amusement

---

## Key Links & URLs

| Resource | URL | Notes |
|----------|-----|-------|
| Production site | ramsocunsw.org | Vercel deployment |
| Sumobots | sumobots.ramsocunsw.org | Flagship event site |
| Membership (Rubric) | campus.hellorubric.com/?s=12676 | Club membership platform |
| Subcom Applications | app.tribespot.co/form/ramsocsubcom2026 | **2026 — update env var** |
| Linktree | linktr.ee/RAMSocUNSW | **Add to site** |
| GitHub Repo | (check org) | Source code |
| Vercel Dashboard | (check project settings) | Deployment & env vars |
| Contentful | (check credentials) | CMS for events & team |
| Notion | (check credentials) | CMS for careers |

---

## Personal Tasks

> Dash's personal TODO list for the website and society work.

- [x] Send brand hex color screenshot to update theme — DONE (primary `#29ABE2`, secondary `#0D2631`)
- [x] Provide Rambo artwork/images — DONE (4 images received, lore from MXC meeting TBD)
- [ ] Review and clean up stale feature branches
- [ ] Set up Resend account and get API key
- [ ] Update `NEXT_PUBLIC_SUBCOMMITTEE_APPLICATION_FORM_URL` in Vercel to `http://app.tribespot.co/form/ramsocsubcom2026`
- [ ] Set up proper staging/preview environment workflow
- [ ] Consider CI improvements (automated testing, lighthouse scores)
- [ ] Document the Contentful content model for future reference
- [ ] Set up DNS records for new email addresses (hello@, president@, secretary@, events@, marketing@)

---

## Notes & Reference

- The website uses `@t3-oss/env-nextjs` for environment variable validation — new env vars must be added to `src/env.js`
- Image domains must be whitelisted in `next.config.js` for Next.js Image optimization
- The `/team` year redirect in `next.config.js` needs manual update at the start of each year
- Sponsorship tier data is currently hardcoded — consider moving to CMS if sponsors change frequently
- Resend requires DNS verification (MX, SPF, DKIM records) for `ramsocunsw.org` domain
- Rubric API integration is complete — events now pull from Rubric (society ID 12676)
- Meta Graph API code has been replaced (was in `fix-hx-events-hook` branch)
- Rambo images are saved locally at `c:\Users\Dashi\Downloads\` — copy to `/public/rambo/` when building the page

### Git Commits on `dashs-playground`
- `ed16c77` — Brand colors, nav/footer rework, team page guard, society structure, linktree
- `3529d0b` — Replace Meta Graph API with Rubric API for live events
