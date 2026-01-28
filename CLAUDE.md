# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development
yarn dev              # Start dev server with Turbopack
yarn build            # Build for production
yarn start            # Start production server
yarn preview          # Build and start production server locally

# Code Quality
yarn lint             # Run ESLint
yarn lint:fix         # Fix ESLint issues automatically
yarn typecheck        # Run TypeScript type checking
yarn check            # Run both lint and typecheck

# Formatting
yarn format:check     # Check code formatting with Prettier
yarn format:write     # Auto-format code with Prettier
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5.8 with strict mode (`noUncheckedIndexedAccess` enabled)
- **Styling**: Tailwind CSS v4 (using modern `@theme` directive) + SCSS modules
- **API Layer**: tRPC v11 for type-safe server-client communication
- **State Management**: TanStack Query (React Query) for data fetching/caching
- **CMS**: Contentful for team/events, Notion for career listings
- **Package Manager**: Yarn 1.22

### Key Architectural Patterns

#### Feature-Based Organization
Code is organized by feature rather than by technical type. Each feature module (`src/features/[feature]/`) contains:
- `components/` - Feature-specific React components
- `hooks/` - Custom hooks wrapping tRPC queries
- `types/` - TypeScript interfaces and types
- `utils/` - Feature utilities
- `styles/` - SCSS modules (when needed)

#### tRPC Router Pattern
Server-side routers follow a consistent structure in `src/server/api/routers/[feature]/`:
- `procedures.ts` - Query/mutation definitions using `publicProcedure`
- `schemas.ts` - Zod validation schemas
- `service.ts` - Business logic and external API calls
- `exceptions.ts` - Custom error classes
- `router.ts` - Router assembly using `createTRPCRouter`
- `index.ts` - Public exports

All feature routers are combined in [src/server/api/root.ts](src/server/api/root.ts).

#### Type-Safe Data Flow
1. Zod schemas validate runtime data in `schemas.ts`
2. Services throw custom exceptions for error handling
3. tRPC procedures use schemas for input validation
4. SuperJSON handles serialization of complex types (Dates, etc.)
5. Client gets full TypeScript inference via `@trpc/react-query`

### Custom Notion Compatibility Layer

Located in [src/lib/notion-compat/](src/lib/notion-compat/), this converts Notion API responses to `react-notion-x` format:
- `NotionCompatAPI` class wraps `@notionhq/client`
- Converts Notion blocks to `ExtendedRecordMap` format
- Uses `p-queue` for concurrent block resolution
- Handles recursive child block fetching

This enables rendering Notion pages in the careers portal using the `react-notion-x` renderer.

## Important Configuration

### Environment Variables
Validated at build time via [src/env.js](src/env.js) using `@t3-oss/env-nextjs`:

**Server-side** (never exposed to client):
- `CONTENTFUL_SPACE_ID` - Contentful CMS space ID
- `CONTENTFUL_ACCESS_TOKEN` - Contentful API token
- `NOTION_TOKEN` - Notion integration token
- `META_API_PAGE_ACCESS_TOKEN` - Facebook Graph API token

**Client-side** (prefixed with `NEXT_PUBLIC_`):
- `NEXT_PUBLIC_NOTION_CAREERS_DB_SOURCE_ID` - Notion careers database ID
- `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID` - GTM tracking ID
- `NEXT_PUBLIC_SUBCOMMITTEE_APPLICATION_FORM_URL` - Application form URL
- `NEXT_PUBLIC_ENABLE_MOCKING` - Enable MSW API mocking in development

Use `vercel env pull .env.local` to sync from Vercel project.

### Path Aliases
TypeScript and Next.js use `@/*` alias for `src/*` directory (configured in [tsconfig.json](tsconfig.json) and [next.config.js](next.config.js)).

### Image Optimization
[next.config.js](next.config.js) configures:
- Approved domains: `**.fna.fbcdn.net` (Facebook), `images.ctfassets.net` (Contentful), `prod-files-secure.s3.us-west-2.amazonaws.com` (Notion)
- WebP format optimization
- 7-day minimum cache TTL

### Redirects
`/team` automatically redirects to `/team/{currentYear}` (configured in [next.config.js](next.config.js)).

## Styling Guidelines

### Tailwind CSS v4 Usage
- Use utility classes in JSX/TSX files
- Define custom theme tokens in [src/styles/globals.css](src/styles/globals.css) using `@theme` directive
- Avoid `@apply` in SCSS modules (Tailwind v4 requires `@reference` directive which causes linting issues)
- When converting `@apply` rules: extract Tailwind utility values to regular CSS

### SCSS Modules
Used only for complex component styles that are difficult to express with utilities:
- Import as `import styles from './component.module.scss'`
- Use camelCase for class names
- Co-locate with components in feature directories
- See [src/features/team/styles/](src/features/team/styles/) for examples

## Data Fetching Patterns

### Using tRPC on Client
```typescript
import { api } from "@/trpc/react";

// In component
const { data, isLoading, error } = api.careers.getAll.useQuery();
```

### Custom Hooks Pattern
Wrap tRPC queries in feature-specific hooks with custom configuration:
```typescript
// features/careers/hooks/useCareers.ts
export const useCareers = () => {
  return api.careers.getAll.useQuery(undefined, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};
```

### Server-Side Data Fetching
Use tRPC's server-side caller in Server Components:
```typescript
import { api } from "@/trpc/server";

const data = await api.careers.getAll();
```

## Adding New Features

### Adding a New tRPC Router
1. Create router directory: `src/server/api/routers/[feature]/`
2. Create files: `schemas.ts`, `exceptions.ts`, `service.ts`, `procedures.ts`, `router.ts`, `index.ts`
3. Export router from [src/server/api/routers/index.ts](src/server/api/routers/index.ts)
4. Add to main router in [src/server/api/root.ts](src/server/api/root.ts)

Example procedure structure:
```typescript
// procedures.ts
export const getItemsProcedure = publicProcedure
  .input(getItemsInputSchema)
  .query(async ({ input }) => {
    return await getItems(input);
  });
```

### Adding Shadcn UI Components
```bash
# Use npx to add components from shadcn/ui registry
npx shadcn@latest add [component-name]
```

Components are configured in [components.json](components.json) with:
- Style: "new-york"
- Base color: "neutral"
- CSS variables: enabled
- Path aliases: `@/components` and `@/lib/utils`

## Development Workflow

### Code Quality Checks
Before committing:
1. Run `yarn check` (lint + typecheck)
2. Run `yarn format:write` to auto-format
3. Ensure no TypeScript errors (strict mode is enabled)

### Commit Convention
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation
- `style:` - Code formatting
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance
- `build:` - Build system/dependencies

### Pull Request Requirements
PRs are validated by [.github/workflows/pull_request.yml](.github/workflows/pull_request.yml):
- Title must follow conventional commit format
- Must have at least one label
- Must have at least one assignee

## MSW API Mocking

Mock Service Worker is configured for development testing:
- Browser worker: [src/mocks/browser.ts](src/mocks/browser.ts)
- Server worker: [src/mocks/server.ts](src/mocks/server.ts)
- Handlers: [src/mocks/handlers.ts](src/mocks/handlers.ts)

Enable via `NEXT_PUBLIC_ENABLE_MOCKING=true` in `.env.local`.

## Important Notes

### TypeScript Configuration
- Strict mode enabled with `noUncheckedIndexedAccess`
- Always check array access with optional chaining: `array[0]?.property`
- Use `satisfies` for type narrowing without losing inference

### tRPC Timing Middleware
Development mode adds 100-400ms artificial delay to simulate network latency ([src/server/api/trpc.ts:79-94](src/server/api/trpc.ts#L79-L94)). This helps catch unwanted request waterfalls.

### Component Organization
- Page-specific sections: `src/app/[page]/_components/`
- Reusable UI primitives: `src/components/ui/`
- Feature components: `src/features/[feature]/components/`
- Global components: `src/components/` (NavBar, Footer, Hero)

### Error Handling Pattern
Services throw custom exceptions (e.g., `CareerNotFoundException`). tRPC catches these and formats errors with Zod validation details for client consumption.
