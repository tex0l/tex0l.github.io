import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { languages } from '~/i18n/index.ts'
import { useTranslations, validateLang } from '~/i18n/utils.ts'
import { getCollection } from 'astro:content'
import { slugify } from '~/utils/index.ts'
import { getAbsoluteLocaleUrl } from 'astro:i18n'
import sanitizeHtml from 'sanitize-html'
import { convertMDXToHTML } from '~/utils/mdxToHtml.ts'

export const GET: APIRoute = async (context) => {
  const lang = context.params.lang
  validateLang(lang)
  const posts = (await getCollection('blog', ({ id }) => id.split('/')[0] === lang))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  const t = useTranslations(lang)

  const items = []
  for (const post of posts) {
    items.push({
      link: getAbsoluteLocaleUrl(lang, `blog/${slugify(post.id)}`),
      content: sanitizeHtml(await convertMDXToHTML(post.body)),
      title: post.data.title,
      pubDate: post.data.date
    })
  }
  return await rss({
    title: t('rss.title'),
    description: t('rss.description'),
    site: context.site ?? '',
    items
  })
}

export function getStaticPaths (): Array<{ params: { lang: string } }> {
  return Object.keys(languages).map(lang => ({ params: { lang } }))
}
