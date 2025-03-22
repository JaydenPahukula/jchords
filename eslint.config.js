import eslint from '@eslint/js';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

// list of workspaces with a src/ directory, so that no-relative-import-paths
// can correctly fix relative paths
const workspaces = ['backend', 'jchords'];

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
      'no-relative-import-paths/no-relative-import-paths': ['warn'],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  // no relative paths
  ...workspaces.map((root) => ({
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
