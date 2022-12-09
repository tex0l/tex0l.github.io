import { serverQueryContent } from '#content/server'
// @ts-ignore
import { SitemapStream, streamToPromise, XMLToSitemapItemStream } from 'sitemap'
import { resolve } from 'node:path'
import { createReadStream } from 'fs'

export default defineEventHandler(async (event) => {
  // Fetch all documents
  const docs = await serverQueryContent(event).find()

  const filePath = resolve(
    'node_modules/.cache/.sitemap/sitemap.xml'
  )

  const sitemap = new SitemapStream({
    hostname: 'https://tex0l.github.io'
  })

  for (const doc of docs) {
    sitemap.write({
      url: `/blog${doc._path}`,
      changefreq: 'monthly'
    })
  }

  createReadStream(filePath)
    .pipe(new XMLToSitemapItemStream())
    .pipe(sitemap)

  return streamToPromise(sitemap)
})
