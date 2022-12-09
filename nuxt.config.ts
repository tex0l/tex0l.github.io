// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtPage } from '@nuxt/schema'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image-edge',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    './modules/sitemap'
  ],
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  sitemap: {
    hostname: 'https://tex0l.github.io/',
    mapPages: (page: NuxtPage) => {
      if (page.path === '/blog/:slug') return null // this is done through the ~/server/routes/sitemap.xml.ts file which actually exposes the file as a public asset
      else return { url: page.path }
    }
  },
  image: {},
  tailwindcss: {
    // @ts-ignore
    config: {
      theme: {
        extend: {
          backgroundImage: {
            'hero-pattern': 'url(\'/img/hero-pattern.svg\')',
            'footer-texture': 'url(\'/img/footer-texture.png\')',
          }
        }
      },
      plugins: [
        require('@tailwindcss/line-clamp'),
      ]
    }
  },
  app: {
    head: {
      title: 'Timothée Rebours',
      meta: [
        {
          name: 'description', content: 'My personal website and blog, an experiment at this point.'
        }
      ],
      link: [
        {
          rel: 'icon', href: '/favicon.png', type: 'image/x-icon'
        }
      ]
    }
  },
  hooks: {
    'prerender:routes' (ctx) {
      ctx.routes.add('/sitemap.xml')
    }
  }
})
