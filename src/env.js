import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    META_API_PAGE_ACCESS_TOKEN: z.string(),
    CONTENTFUL_SPACE_ID: z.string(),
    CONTENTFUL_ACCESS_TOKEN: z.string(),
    NOTION_TOKEN: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: z.string(),
    NEXT_PUBLIC_NOTION_CAREERS_DB_SOURCE_ID: z.string(),
    NEXT_PUBLIC_SUBCOMMITTEE_APPLICATION_FORM_URL: z.string().url(),
    NEXT_PUBLIC_ENABLE_MOCKING: z.string().optional(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    META_API_PAGE_ACCESS_TOKEN: process.env.META_API_PAGE_ACCESS_TOKEN,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NEXT_PUBLIC_NOTION_CAREERS_DB_SOURCE_ID:
      process.env.NEXT_PUBLIC_NOTION_CAREERS_DB_SOURCE_ID,
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID:
      process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    NEXT_PUBLIC_SUBCOMMITTEE_APPLICATION_FORM_URL:
      process.env.NEXT_PUBLIC_SUBCOMMITTEE_APPLICATION_FORM_URL,
    NEXT_PUBLIC_ENABLE_MOCKING: process.env.NEXT_PUBLIC_ENABLE_MOCKING,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});

export const isDev =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
