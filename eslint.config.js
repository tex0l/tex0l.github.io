import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'
import eslintPluginAstro from 'eslint-plugin-astro'

export default [
  ...eslintPluginAstro.configs.recommended,
  ...neostandard({
    ts: true,
    ignores: resolveIgnoresFromGitignore(),
  }),
]
