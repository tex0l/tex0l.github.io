import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { languages } from '~/i18n'
import { useTranslations, validateLang } from '~/i18n/utils.ts'
import { getCollection } from 'astro:content'
import { slugify } from '~/utils'
import { getAbsoluteLocaleUrl } from 'astro:i18n'
import sanitizeHtml from 'sanitize-html'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMDX from 'remark-mdx'
import remarkHtml from 'remark-html'
import type { Root, Node } from 'mdast'

const removeImportsAndExports = () => {
  return (tree: Root) => {
    tree.children = tree.children.filter((node: Node) => {
      return node.type !== 'mdxjsEsm' && // import tags
        node.type !== 'mdxJsxFlowElement' // custom components (Image, Pintora)
    })
  }
}
const convertMDXToHTML = async (mdxContent: string): Promise<string> => {
  try {
    const file = await unified()
      .use(remarkParse) // Parse the Markdown syntax
      .use(remarkMDX) // Parse the MDX syntax
      .use(removeImportsAndExports)
      .use(remarkHtml) // Convert to HTML
      .process(mdxContent) // Process the MDX content
    return String(file)
  } catch (error) {
    console.error('Error converting MDX to HTML:', error)
    throw error
  }
}

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
