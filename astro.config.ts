import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import AutoImport from 'astro-auto-import'
import icon from 'astro-icon'
import asides, { asideAutoImport } from './integrations/asides'
import arraybuffer from 'vite-plugin-arraybuffer'
import alpinejs from '@astrojs/alpinejs'
import { env } from 'node:process'
import tailwindcss from '@tailwindcss/vite'
import mermaid from 'astro-mermaid'
import ctrk from '@tex0l/ctrk-astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    mermaid({ theme: 'neutral' }),
    AutoImport({ imports: [asideAutoImport] }),
    asides(),
    vue(),
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
    ctrk(),
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
    plugins: [arraybuffer(), tailwindcss()],
    resolve: {
      alias: [
        { find: /^leaflet$/, replacement: 'leaflet/dist/leaflet-src.esm.js' },
      ],
    },
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
      include: ['leaflet'],
    }
  }
})

if (typeof env.PWD !== 'string') throw new Error('PWD is undefined')
export const PWD: string = env.PWD