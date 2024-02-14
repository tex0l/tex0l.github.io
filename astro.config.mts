import { defineConfig } from 'astro/config'

import vue from '@astrojs/vue'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import asides, { asideAutoImport } from './integrations/asides'
import AutoImport from 'astro-auto-import'
import icon from "astro-icon"

// https://astro.build/config
export default defineConfig({
  integrations: [
    AutoImport({
      imports: [asideAutoImport],
    }),
    asides(),
    vue(), tailwind(), mdx(), sitemap(), icon()
  ],
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  site: 'https://tex0l.github.io'
})
