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
  blogEntries.map(({ data, id }) => {
    const lang = id.startsWith('en/') ? 'en' : 'fr'
    return [`blog-${lang}-${slugify(id)}`, { title: data.title, description: data.description }] as const
  })
) as Record<string, PageData>

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',

  pages: {
    ...blogPages,
    'fr-index': {
      title: 'Timothée Rebours',
      description: fr('index.description'),
    },
    'en-index': {
      title: 'Timothée Rebours',
      description: en('index.description'),
    },
    'fr-blog': {
      title: fr('blog.title'),
      description: fr('blog.subtitle'),
    },
    'en-blog': {
      title: en('blog.title'),
      description: en('blog.subtitle'),
    },
    'fr-about-me': {
      title: fr('about-me.title'),
      description: fr('about-me.description'),
    },
    'en-about-me': {
      title: en('about-me.title'),
      description: en('about-me.description'),
    },
    'fr-encrypted-card': {
      title: 'Carte de visite chiffrée',
      description: 'Récupérez mes coordonnées (si vous avez le mot de passe)',
    },
    'en-encrypted-card': {
      title: 'Encrypted business card',
      description: 'Retrieve my contact information (if you have the password)',
    },
    'fr-encrypted-card-dummy': {
      title: 'Carte de visite chiffrée (démo)',
      description: 'Version de démonstration de la carte de visite chiffrée',
    },
    'en-encrypted-card-dummy': {
      title: 'Encrypted business card (demo)',
      description: 'Demo version of the encrypted business card',
    },
    'fr-privacy': {
      title: fr('privacy.title'),
      description: fr('privacy.description'),
    },
    'en-privacy': {
      title: en('privacy.title'),
      description: en('privacy.description'),
    },
  },

  getImageOptions: (_path, page: PageData) => ({
    title: page.title,
    description: page.description,
    logo: { path: './src/resources/portrait-blog.png', size: [200] },
    bgGradient: [[30, 41, 59], [51, 65, 85]],
    border: { color: [100, 116, 139], width: 20 },
    padding: 60,
    font: {
      title: {
        size: 64,
        lineHeight: 1.2,
        color: [248, 250, 252],
        weight: 'Bold',
      },
      description: {
        size: 32,
        lineHeight: 1.4,
        color: [203, 213, 225],
        weight: 'Normal',
      },
    },
  }),
})