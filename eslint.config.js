// @ts-check
import js from "@eslint/js";
import globals from "globals";
import playwright from "eslint-plugin-playwright";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["tests/**/*.spec.js"],
    ...playwright.configs["flat/recommended"],
  },
  prettierConfig,
  {
    ignores: ["node_modules/**", "playwright-report/**", "test-results/**", "blob-report/**"],
  },
];
