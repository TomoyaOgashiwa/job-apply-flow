import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";

import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  baseDirectory: __dirname, // required so compat can resolve the preset
});

export default defineConfig([
  // ignores
  globalIgnores(["dist", "node_modules", ".next", "next-env.d.ts"]),

  // JS + TS (flat) presets
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // ✅ Load Next.js legacy preset via compat bridge
  ...compat.extends("plugin:@next/next/recommended"),
  // (or "plugin:@next/next/core-web-vitals" if you prefer)

  // your project rules
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      semi: "error",
      "prefer-const": "error",
    },
  },

  // keep Prettier LAST to disable conflicting stylistic rules
  prettier,
]);
