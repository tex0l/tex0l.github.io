import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import AutoImport from 'astro-auto-import'
import icon from 'astro-icon'
import asides, { asideAutoImport } from './integrations/asides'
import moveOgImages from './integrations/moveOGImages.ts'
import arraybuffer from 'vite-plugin-arraybuffer'
import alpinejs from '@astrojs/alpinejs'
import react from '@astrojs/react'
import { env } from 'node:process'
// https://astro.build/config
export default defineConfig({
  integrations: [
    AutoImport({ imports: [asideAutoImport] }),
    asides(),
    vue(),
    tailwind(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          fr: 'fr-FR'
        }
      }
    }),
    icon(),
    alpinejs({ entrypoint: '/src/utils/alpineSetup' }),
    react(),
    moveOgImages()
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    }
  },
  site: 'https://tex0l.github.io',
  vite: {
    plugins: [arraybuffer()],
    optimizeDeps: { exclude: ['@resvg/resvg-js', 'fsevents'] }
  }
})

if (typeof env.PWD !== 'string') throw new Error('PWD is undefined')
export const PWD: string = env.PWD
