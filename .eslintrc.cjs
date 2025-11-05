import { FlatCompat } from "@eslint/eslintrc";
import tailwind from "eslint-plugin-tailwindcss";
import fs from "fs";
import path from "path";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/**
 * Recursively walks `dir`, looking for the first .css file
 * that has a line starting with @import "tailwindcss
 * @param {string} dir  absolute path to start searching from
 * @returns {string|null}  absolute path to matching CSS, or null if none found
 *
 * @example
 * const twCssPath = findTailwindImportCss(process.cwd())
 */
function findTailwindImportCss(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const found = findTailwindImportCss(fullPath);
      if (found) return found;
    } else if (entry.isFile() && entry.name.endsWith(".css")) {
      // read & scan lines
      const lines = fs.readFileSync(fullPath, "utf8").split(/\r?\n/);
      for (let line of lines) {
        if (line.trim().startsWith('@import "tailwindcss')) {
          return fullPath;
        }
      }
    }
  }

  return null;
}

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "prisma/generated/**",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    extends: ["next", "prettier", "next/typescript", "next/core-web-vitals"],
    plugins: ["@typescript-eslint", "prettier"],
  }),
  ...tailwind.configs["flat/recommended"],
  {
    settings: {
      tailwindcss: {
        config: findTailwindImportCss(process.cwd()),
        callees: ["cn", "classnames", "clsx", "ctl"],
        removeDuplicates: true,
      },
    },
  },
];

export default eslintConfig;
