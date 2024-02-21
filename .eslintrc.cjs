module.exports = {
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      extends: 'standard',
      parserOptions: {
        sourceType: 'script'
      }
    },
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
        sourceType: 'module'
      },
      plugins: ['astro'],
      env: {
        // Enables global variables available in Astro components.
        node: true,
        'astro/astro': true,
        es2020: true
      },
      extends: [
        'plugin:astro/recommended',
        'standard-with-typescript'
      ],
      processor: 'astro/client-side-ts',
      rules: {
        semi: 'off', // Don't need ESLint's semi, so turn it off. see https://github.com/ota-meshi/eslint-plugin-astro/issues/165
        'astro/semi': [
          'error',
          'never'
        ]
      }
    },
    {
      files: ['*.client.ts', '**/*.astro/*.ts', '*.astro/*.ts'],
      extends: 'standard-with-typescript',
      env: {
        browser: true,
        es2020: true
      }
    },
    {
      files: ['*.ts'],
      extends: 'standard-with-typescript',
      env: {
        es2020: true,
        node: true
      }
    },
    {
      files: ['*.mjs', '*.cjs', '*.js'],
      extends: 'standard',
      env: {
        es2020: true,
        node: true
      }
    },
    {
      files: ['*.client.mjs', '*.client.cjs', '*.client.js', '**/*.astro/*.js', '*.astro/*.js'],
      extends: 'standard',
      env: {
        browser: true,
        es2020: true
      }
    }
  ],
  ignorePatterns: ['dist/**/*']
}
