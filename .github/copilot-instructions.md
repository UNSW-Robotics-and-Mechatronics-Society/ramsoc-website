# RAMSoc Website - AI Coding Instructions

## Architecture Overview

This is a **T3 Stack** Next.js 15 app (App Router) with type-safe APIs via tRPC, fetching content from Contentful CMS and Notion API.

### Data Flow

- **Contentful (GraphQL/Apollo)** → Team member data by year (`src/server/api/routers/team/`)
- **Notion API** → Career listings (`src/server/api/routers/careers/`)
- **Meta Graph API** → Facebook events (via tRPC, mocked in dev)
- **tRPC** → Type-safe client-server communication with React Query caching

### Key Directories

- `src/app/` - Next.js App Router pages and route-specific components in `_components/`
- `src/features/` - Feature modules with co-located components, hooks, types, utils (careers, events, team)
- `src/server/api/routers/` - tRPC routers organized by domain (careers, events, team, hello)
- `src/components/ui/` - Reusable UI primitives (shadcn/ui style)
- `src/lib/` - Shared utilities, constants, external client configs

## Development Workflow

### Setup & Running

```bash
# Required: Yarn 1.22+ (specified in package.json)
yarn install

# Environment: Pull from Vercel (preferred) or create .env.local manually
vercel env pull .env.local

# Dev server with Turbopack
yarn dev

# Type checking + linting
yarn check
```

### Environment Variables

Managed via `@t3-oss/env-nextjs` in `src/env.js` with Zod validation. Server vars: `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `NOTION_TOKEN`. Client vars prefixed with `NEXT_PUBLIC_`. Add new vars in THREE places:

1. Schema definition in `src/env.js`
2. `runtimeEnv` object in `src/env.js`
3. `.env.local` or Vercel env vars

### Testing & Mocking

MSW (Mock Service Worker) mocks external APIs when `NEXT_PUBLIC_ENABLE_MOCKING=true`. See `src/mocks/handlers.ts` for Meta Graph API event mocks. Initialize in `src/app/providers.tsx`.

## Coding Conventions

### Component Patterns

- **Named exports** for feature components: `export const ProfileGrid = () => ...` (see `src/features/team/components/`)
- **Default exports** for page-level components: `export default function CurrentEvents() { ... }`
- Use `"use client"` directive for client components (hooks, event handlers, browser APIs)
- Loading states via dedicated `*-loading.tsx` components (e.g., `career-card-loading.tsx`)

### Styling

- **Tailwind CSS v4** with custom theme in `src/styles/globals.css` (inline `@theme` directive, NOT `tailwind.config.ts`)
- Primary brand colors: `primary-500` (#21a0b9), use `cn()` utility from `src/lib/utils.ts` for conditional classes
- SCSS modules for complex animations (e.g., `career-card.module.scss`)
- Container component: `<Container>` with nested outer/inner variants for consistent page layout

### tRPC Architecture

Each router domain follows this structure (example: `src/server/api/routers/team/`):

```
team/
├── router.ts          # Exports createTRPCRouter with procedures
├── procedures.ts      # Input validation + service calls
├── schemas.ts         # Zod schemas for inputs/outputs
├── service.ts         # Business logic, external API calls
├── exceptions.ts      # Custom error classes
├── graphql.ts         # GraphQL queries (for Contentful)
└── graphql.types.ts   # GraphQL type definitions
```

**Creating a new tRPC endpoint:**

1. Define Zod schema in `schemas.ts`
2. Add service function in `service.ts` (handles API calls, data transformation)
3. Create procedure in `procedures.ts` using `publicProcedure.input(schema).query()`
4. Export from `router.ts` via `createTRPCRouter()`
5. Add to `src/server/api/root.ts` appRouter
6. Client usage: `const { data } = api.team.getByYear.useQuery({ year: 2025 })`

### Type Safety

- **Strict mode** enabled in `tsconfig.json` with `noUncheckedIndexedAccess`
- Path alias: `@/*` maps to `src/*`
- tRPC provides end-to-end type safety: `RouterInputs<AppRouter>` and `RouterOutputs<AppRouter>` for type inference
- Always validate env vars in `src/env.js` before use

### Error Handling

- Custom exception classes per router (e.g., `TeamNotFoundException`, `ContentfulApiException`)
- tRPC automatically formats Zod validation errors for client consumption
- Throw exceptions in service layer, handle in UI with React Query error states

## External Integrations

### Contentful (Team Data)

- Use **Apollo Client** (`src/lib/contentful/apolloClient`) for GraphQL queries
- Cache policy: `cache-first` with 1-hour TTL
- Pagination: Batch fetching with `skip`/`limit` (see `getTeamByYear` in `team/service.ts`)
- Team members categorized by role: executives (ordered by `EXECUTIVES_IN_ORDER`), directors (alphabetical), subcommittees (by portfolio)

### Notion (Careers)

- Notion API via `@notionhq/client` for database queries
- `NotionCompatAPI` wrapper for rendering Notion pages as React components
- Career visibility controlled by Notion "Visibility" select property (filter out "Hidden")
- Map Notion properties to `CareerMetaDataSchema` in `careers/service.ts`

### Image Optimization

Remote patterns in `next.config.js`: Contentful (`images.ctfassets.net`), Facebook (`**.fna.fbcdn.net`), Notion S3 (`prod-files-secure.s3.us-west-2.amazonaws.com`). Use Next.js `<Image>` with 7-day cache TTL.

## Common Tasks

### Adding a New Route

1. Create route folder in `src/app/{route}/`
2. Add `page.tsx` (default export) and optional `layout.tsx`
3. Create feature module in `src/features/{route}/` with components, hooks, types
4. Import feature components in page via barrel export `src/features/{route}/index.ts`

### Modifying Team Year Logic

Years are dynamically fetched from Contentful in `YEAR_SEARCH_RANGE` (constants.ts). Default redirect in `next.config.js` sends `/team` → `/team/{currentYear}`.

### Debugging Build Errors

- Run `yarn check` for type errors + lint issues
- Skip env validation: `SKIP_ENV_VALIDATION=true yarn build`
- Check `@theme` syntax in `globals.css` for Tailwind v4 compatibility
- Ensure GraphQL types match Contentful schema (`graphql.types.ts`)

## Notes

- **Package manager**: Yarn 1.22 enforced via `packageManager` field
- **Deployment**: Vercel with automatic previews, uses Vercel Toolbar in dev
- **Analytics**: Vercel Analytics + Google Tag Manager (GTM ID in env vars)
- **React 19**: Using latest features, ensure client components use `"use client"` for hooks
