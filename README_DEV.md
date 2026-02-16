# Developer Guide

## Build Commands

```bash
npm run lint      # ESLint + astro check (runs prelint automatically)
npm run build     # Static production build
npm run dev       # Dev server with hot reload
npm run preview   # Preview the build
```

The `prestart` and `prebuild` scripts automatically encrypt assets before starting the dev server or building.

## Project Architecture

### Tech Stack

- **Astro 5** — Static site generator with Island Architecture
- **Vue 3** — Client-side interactive components (`.client.vue` suffix)
- **Alpine.js** — Lightweight interactions (language selector, date formatting)
- **Tailwind CSS 4** — Utility-first styling with typography plugin
- **TypeScript** — Strict mode with `strictNullChecks`

### Folder Structure

```
src/
├── components/     # Astro and Vue components
│   └── i18n/       # Translation components
├── content/blog/   # MDX blog posts (en/ and fr/)
├── i18n/           # i18n definitions and utilities
├── layouts/        # Astro layouts (BaseLayout, Layout)
├── pages/          # Astro routes
│   ├── [lang]/     # Localized pages
│   └── og/         # OG image generation
├── utils/          # TypeScript utilities
└── resources/      # Images and assets
integrations/       # Custom remark plugins
projects/           # Git submodules for extracted packages
scripts/            # Build-time scripts (encryption)
```

### Naming Conventions

- `.client.vue`: client-only Vue components
- `{number}.{slug}.mdx`: blog posts (number defines order)
- Collection IDs include the language prefix (`en/` or `fr/`)

## Internationalization (i18n)

### Supported Languages

- **English** (`en`) — Default language
- **French** (`fr`)

### Using Translations

```typescript
import { useTranslations, useTranslatedPath } from '~/i18n/utils'

const t = useTranslations(lang)
const translatePath = useTranslatedPath(lang)

// Access translations
t('about-me.title')
t('index.greeting', ['John'])  // Positional interpolation {0}

// Generate localized paths
translatePath('/blog')  // → /en/blog or /fr/blog
```

### Translation Structure

Translations are in `src/i18n/index.ts` with hierarchical keys:
- `layout.*`: Navigation, footer
- `index.*`: Home page
- `about-me.*`: About page
- `blog.*`: Blog list and metadata
- `rss.*`: RSS feed

## Content Collections

### Blog

Posts are in `src/content/blog/{lang}/` with the schema:

```typescript
{
  title: string,          // Required
  date: Date,             // Default: now
  description?: string,   // Optional
  image?: ImageMetadata,  // Optional
  alt: string,            // Default: "cover picture"
  tags: string[]          // Default: []
}
```

### Callout Boxes (Asides)

Syntax in MDX files:

```mdx
:::note[Optional Title]
Note content
:::

:::tip
Tip without title
:::

:::caution
Warning
:::

:::danger
Danger
:::
```

## Encryption System

### Architecture

End-to-end encryption for the business card, provided by [`@tex0l/encrypted-card`](https://github.com/tex0l/encrypted-card):
- **Algorithm**: AES-256-GCM
- **Key derivation**: Scrypt (N=1024, r=8, p=1)
- **Distribution**: Password in URL hash (not sent to server)

### Build-time

`scripts/encrypt.js` encrypts files from `public_to_encrypt/` to `public/encrypted/`.

The `prebuild` and `prestart` scripts automatically run both encryptions (prod and dummy) via `.env.local`. If `PASSWORD` is not defined, only dummy encryption runs.

### Runtime

Vue components from `@tex0l/encrypted-card` handle client-side decryption using the password extracted from the URL hash.

## OG Image Generation

Open Graph images are dynamically generated via `astro-og-canvas` in `src/pages/og/[...route].ts`.

Image route: `/og/{route}.png`

Route naming:
- Blog: `blog-{lang}-{slug}` (e.g. `blog-fr-hello-world`)
- Pages: `{lang}-{page}` (e.g. `en-about-me`)

## Best Practices

### TypeScript

- Always use `validateLang()` to validate language parameters
- Prefer type guards and assertions for type safety
- Use the `~/` alias for imports from `src/`

### Components

- Prefer Astro components (`.astro`) for static content
- Use Vue (`.client.vue`) only for client-side interactivity
- Use `client:only="vue"` for Vue components without SSR

### Styling

- Use Tailwind utility classes directly
- `@tailwindcss/typography` plugin for prose styling in articles
- Avoid CSS modules, prefer utility classes

### Performance

- Static build only, no SSR
- Image optimization via Astro's `Picture` component
- View Transitions via Astro's `ClientRouter`

## Notable Dependencies

| Package | Usage |
|---------|-------|
| `@tex0l/encrypted-card` | Encrypted business card components |
| `@tex0l/ctrk-astro` | CTRK telemetry exporter components |
| `astro-og-canvas` | OG image generation |
| `astro-icon` | Icon system |
| `@iconify-json/*` | Icon collections (carbon, mdi, octicon, emojione, noto) |
| `luxon` | Date formatting with i18n support |
| `unified` + `remark-*` | MDX processing pipeline |

## Debugging

### Common Issues

1. **OG images not generated for a language**: Check that the article ID includes the correct language prefix in `src/pages/og/[...route].ts`

2. **Missing translations**: Check the console for missing i18n key warnings

3. **Type errors after content changes**: Run `npm run lint` (includes `astro sync`)

4. **Encryption fails**: Check that `PASSWORD` is defined in `.env.local` (dummy encryption always works)
