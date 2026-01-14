import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: [
      'dist/**/*',
      '.astro/**/*',
      'encryptAssets.js',
      'tailwind.config.js',
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['integrations/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
)
