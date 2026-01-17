import type { LocaleId } from '~/i18n/types'
import { useTranslatedPath, useTranslations } from '~/i18n/utils'

interface BreadcrumbItem {
  name: string
  url?: string
}

interface BreadcrumbListItem {
  '@type': 'ListItem'
  position: number
  name: string
  item?: string
}

interface BreadcrumbListSchema {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: BreadcrumbListItem[]
}

/**
 * Creates a JSON-LD BreadcrumbList schema for SEO
 * @param lang - Current language
 * @param origin - Site origin URL (e.g., https://tex0l.github.io)
 * @param items - Array of breadcrumb items (name and optional URL)
 *                The last item should not have a URL (current page)
 * @returns JSON-LD BreadcrumbList schema object
 */
export function createBreadcrumbSchema(
  lang: LocaleId,
  origin: string,
  items: BreadcrumbItem[]
): BreadcrumbListSchema {
  const t = useTranslations(lang)
  const localizePath = useTranslatedPath(lang)

  // Always start with Home
  const allItems: BreadcrumbItem[] = [
    { name: t('layout.home'), url: localizePath('/') },
    ...items
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => {
      const listItem: BreadcrumbListItem = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name
      }
      // Add URL for all items except the last one (current page)
      if (item.url != null && index < allItems.length - 1) {
        listItem.item = `${origin}${item.url}`
      }
      return listItem
    })
  }
}
