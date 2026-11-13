import comments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import js from '@eslint/js'
import astro from 'eslint-plugin-astro'
import sonarjs from 'eslint-plugin-sonarjs'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

// Hodi's rules, with Astro's for the .astro files.
export default defineConfig(
  { ignores: ['dist/', 'node_modules/', '.astro/', 'demo/', 'src/demo/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  comments.recommended,
  {
    plugins: { sonarjs },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // == null stays: it covers null and undefined at once.
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      '@eslint-community/eslint-comments/require-description': 'error',
      'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['error', { max: 80, skipBlankLines: true, skipComments: true }],
      'sonarjs/cognitive-complexity': ['error', 15]
    }
  },
  {
    files: ['src/scripts/**/*.ts'],
    languageOptions: { globals: globals.browser }
  },
  {
    files: ['*.{js,ts}', 'src/lib/**/*.ts', 'src/pages/**/*.ts'],
    languageOptions: { globals: globals.node }
  }
)
