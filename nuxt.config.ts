// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image-edge',
    '@nuxtjs/tailwindcss',
    'nuxt-icon'
  ],
  content: {
    // https://content.nuxtjs.org/api/configuration
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
  }
})
