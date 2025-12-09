# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Common Commands
- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Run ESLint with automatic fixes
- `yarn typecheck` - Run TypeScript type checking (alias: `yarn check`)
- `yarn format:check` - Check code formatting with Prettier
- `yarn format:write` - Format code with Prettier
- `yarn preview` - Build and start production server locally

### Environment Setup
Use Vercel CLI to pull environment variables:
```bash
vercel login  # Sign in with RAMSoc Google account
vercel link   # Link to "ramsoc-website" in "ramsoc-unsws-projects"
vercel env pull .env.local
```

## Architecture Overview

### Tech Stack Foundation
Built on **T3 Stack** with Next.js 15 (App Router), TypeScript 5.7, React 19, and Tailwind CSS v4. The architecture follows a strict separation between client/server code with tRPC providing end-to-end type safety.

### tRPC Router Architecture
All API logic follows a consistent 6-file pattern per domain:

```
src/server/api/routers/[domain]/
├── router.ts       # Router definition combining procedures
├── procedures.ts   # tRPC procedures using publicProcedure
├── service.ts      # Business logic and external API calls
├── schemas.ts      # Zod schemas for validation
├── exceptions.ts   # Custom error classes
└── index.ts        # Re-exports
```

**Key conventions:**
- All procedures in `procedures.ts` use `publicProcedure` from `@/server/api/trpc`
- Services handle all external API calls (Contentful, Notion, etc.)
- Custom exceptions extend base error classes defined in `src/server/api/exceptions.ts`
- All routers are manually registered in `src/server/api/root.ts`

**Example procedure pattern:**
```typescript
export const getSomethingProcedure = publicProcedure
  .input(getSomethingInput)  // Optional: from schemas.ts
  .query(async ({ input }) => {
    return await getSomething(input);  // Calls service.ts
  });
```

### Data Layer Integration

**Contentful CMS:** Used for events and team member profiles. Client initialized in `src/lib/contentful/client.ts` with credentials from `src/env.js`.

**Notion API:** Career listings managed via Notion database. Uses `@notionhq/client` for data fetching and custom `NotionCompatAPI` (in `src/lib/notion-compat/`) for rendering pages.

### State Management & Data Fetching
- **TanStack Query (React Query):** Handles caching, background refetching, and optimistic updates
- **tRPC Client:** Configured in `src/trpc/react.tsx` with `httpBatchStreamLink` and SuperJSON transformer
- **Query Client:** Singleton pattern on client-side, new instance per request on server-side

### Environment Variables
All environment variables are validated at build time using `@t3-oss/env-nextjs` in `src/env.js`. Variables are strictly typed with Zod schemas:
- Server-side: `CONTENTFUL_*`, `NOTION_TOKEN`, etc.
- Client-side: Must be prefixed with `NEXT_PUBLIC_`

### Styling Approach

**Tailwind CSS v4:** Uses modern CSS features with `@theme` directive and custom properties. The main stylesheet is `src/styles/globals.css`.

**Important styling rules:**
- Use Tailwind utility classes directly in JSX over custom CSS when possible
- For SCSS modules, use regular CSS instead of `@apply` directives (Tailwind v4 compatibility)
- Component styles in `src/components/` use CSS Modules (`.module.scss`)
- The `cn()` utility from `src/lib/utils.ts` combines `clsx` and `tailwind-merge` for conditional classes

### Path Aliases
The `@/*` alias maps to `src/*` (configured in `tsconfig.json`). Always use this alias for imports from the src directory.

## Project Structure Patterns

### Feature Organization
Features are organized in `src/features/[domain]/` with co-located components, hooks, and utilities specific to that domain (careers, events, team). Shared components live in `src/components/`.

### App Router Structure
- `src/app/` contains pages and route handlers
- `src/app/_components/` contains homepage-specific components
- `src/app/api/` contains standard Next.js API routes (separate from tRPC)
- Each route can have its own `layout.tsx`, `page.tsx`, and `loading.tsx`

### Root Layout Configuration
`src/app/layout.tsx` wraps all pages with:
1. Global styles import (`@/styles/globals.css`)
2. Providers component (React Query + tRPC)
3. NavBar and Footer components
4. Space Grotesk font configuration

## Key Implementation Details

### tRPC Timing Middleware
All procedures include artificial delay in development (100-500ms) to simulate network latency. This helps catch unwanted waterfalls. Configured in `src/server/api/trpc.ts`.

### Next.js Configuration
- **Redirects:** `/team` automatically redirects to `/team/[currentYear]`
- **Image Optimization:** Configured for Facebook CDN, Contentful, and AWS S3
- **Cache TTL:** Images cached for 7 days minimum

### Mock Service Worker
MSW configured in `src/mocks/` for API mocking. Enable with `NEXT_PUBLIC_ENABLE_MOCKING=true` environment variable. Handlers defined in `src/mocks/handlers.ts`.

## Common Gotchas

1. **Tailwind v4 `@apply`:** Don't use `@apply` in SCSS modules without `@reference` directive. Use regular CSS properties instead.

2. **Environment Variables:** Client-side access requires `NEXT_PUBLIC_` prefix. Server-side variables are NOT available in browser code.

3. **tRPC Router Registration:** New routers must be manually added to `src/server/api/root.ts`. They are not automatically discovered.

4. **Image Optimization:** Add new image domains to `next.config.js` `remotePatterns` before using them in `next/image`.

5. **Type Safety:** The tRPC client provides full type inference. Use `RouterInputs` and `RouterOutputs` types from `src/trpc/react.tsx` for external type references.

6. **Server-Only Code:** Use `import "server-only"` at the top of server-only modules to prevent client-side imports.
