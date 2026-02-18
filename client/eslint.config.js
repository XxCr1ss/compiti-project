/**
 * ESLint Configuration – Client
 *
 * Purpose:
 * Defines linting rules and formatting integration for the client-side codebase.
 *
 * Responsibilities:
 * - Enforce JavaScript and TypeScript best practices.
 * - Apply React Hooks linting rules.
 * - Enable React Refresh compatibility for Vite.
 * - Integrate Prettier as the source of formatting truth.
 *
 * Layer:
 * Frontend tooling configuration.
 *
 * Scope:
 * - Applies only to the client directory.
 * - Executed during linting processes (development, CI, pre-commit).
 * - Does not affect backend configuration.
 *
 * Dependencies:
 * - @eslint/js
 * - typescript-eslint
 * - eslint-plugin-react-hooks
 * - eslint-plugin-react-refresh
 * - eslint-plugin-prettier
 * - eslint-config-prettier
 *
 * Formatting Strategy:
 * - Prettier handles code formatting.
 * - ESLint reports formatting issues as errors.
 * - eslint-config-prettier disables conflicting ESLint rules.
 *
 * Notes:
 * Uses the modern flat configuration system.
 */

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prettier': prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error',
      ...prettierConfig.rules,
    },
  },
)