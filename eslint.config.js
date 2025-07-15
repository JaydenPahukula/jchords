import eslint from '@eslint/js';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // general config
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/dist/'],
    plugins: {
      js: eslint,
      ts: tseslint,
      'no-relative-import-paths': noRelativeImportPaths,
    },
    extends: ['js/recommended', 'ts/recommended'],
    rules: {
      'no-empty': 'warn',
      'no-relative-import-paths/no-relative-import-paths': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': ['warn', { allowObjectTypes: 'always' }],
      '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
    },
  },
  // no relative paths
  ...['backend', 'frontend', 'engine'].map((root) => ({
    files: [`${root}/**/*.{ts,tsx}`],
    ignores: ['**/dist/'],
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
    },
    rules: {
      'no-relative-import-paths/no-relative-import-paths': ['warn', { rootDir: root }],
    },
  })),
]);
