import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**",
      ".sst/**",
      ".vercel/**",
      ".netlify/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // ===== Formatting =====
      // Prettier owns formatting; disable eslint rules that would conflict.
      ...prettierConfig.rules,
      "prettier/prettier": "error",

      // ===== React Best Practices =====
      "react/jsx-key": "error",
      "react/no-array-index-key": "warn",
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],

      // ===== TypeScript Best Practices =====
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      // ===== General Best Practices =====
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // ===== Accessibility =====
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
    },
  },
  {
    files: ["**/*.{tsx,jsx}"],
    rules: {
      "max-lines": [
        "error",
        {
          max: 80,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
    },
  },
];

export default defineConfig(eslintConfig);
