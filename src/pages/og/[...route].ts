import { OGImageRoute } from 'astro-og-canvas'
import { getCollection, type CollectionEntry } from 'astro:content'
import { useTranslations } from '~/i18n/utils'
import { slugify } from '~/utils'

const blogEntries = await getCollection('blog')
type BlogEntryData = CollectionEntry<'blog'>['data']
type PageData = Pick<BlogEntryData, 'title' | 'description'>
const fr = useTranslations('fr')
const en = useTranslations('en')

const blogPages = Object.fromEntries(
  blogEntries.map(({ data, id }) => [`blog-fr-${slugify(id)}`, { title: data.title, description: data.description }] as const)
) as Record<string, PageData>

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',

  pages: {
    ...blogPages,
    'fr-about-me': {
      title: fr('about-me.title'),
      description: fr('about-me.description'),
    },
    'en-about-me': {
      title: en('about-me.title'),
      description: en('about-me.description'),
    },
  },

  getImageOptions: (_path, page: PageData) => ({
    title: page.title,
    description: page.description,
    logo: { path: './src/resources/portrait-blog.png', size: [350] },
  }),
})