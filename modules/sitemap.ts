import { Readable } from 'node:stream'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { defineNuxtModule, createResolver } from '@nuxt/kit'
import type { NuxtPage } from '@nuxt/schema'
import { SitemapStream, streamToPromise, SitemapItemLoose } from 'sitemap'
async function createSitemapFile(sitemap: string, filepath: string) {
  const dirPath = dirname(filepath)
  await mkdir(dirPath, { recursive: true })
  await writeFile(filepath, sitemap)
}

export default defineNuxtModule({
  meta: {
    // Usually  npm package name of your module
    name: '@tex0l/nuxt3-sitemap',
    // The key in `nuxt.config` that holds your module options
    configKey: 'sitemap',
    // Compatibility constraints
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '^3.0.0'
    }
  },
  // Default configuration options for your module
  defaults: {
    hostname: 'http://localhost:3000',
    mapPages: (x: NuxtPage): SitemapItemLoose|null => ({ url: x.path })
  },
  async setup(options, nuxt) {
    async function generateSitemap(routes: NuxtPage[]) {
      const sitemapRoutes = routes.map(options.mapPages).filter(x => x !== null)
      const stream = new SitemapStream({ hostname: options.hostname })
      for (const route of sitemapRoutes) {
        stream.write(route)
      }
      stream.end()

      return streamToPromise(stream).then(data =>
        data.toString()
      )
    }
    const resolver = createResolver(import.meta.url)
    const filePath = resolver.resolve(
      nuxt.options.srcDir,
      'node_modules/.cache/.sitemap/sitemap.xml'
    )

      nuxt.hook('pages:extend', async pages => {
        const sitemap = await generateSitemap(pages)
        await createSitemapFile(sitemap, filePath)
      })
    }
})
