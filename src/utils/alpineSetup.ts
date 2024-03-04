import type { Alpine } from 'alpinejs'
import { DateTime } from 'luxon'
import { navigate } from 'astro:transitions/client'
import { languages } from '~/i18n'

const formatDate = (jSDate: Date, lang: string, shortVersion: boolean): string => {
  const date = DateTime.fromJSDate(jSDate).setLocale(lang)

  const delta = Math.abs(date.diffNow().as('days'))

  const formattedAbsoluteDate = date.toLocaleString(DateTime.DATE_FULL)
  const formattedRelativeDate = date.toRelative()

  if (shortVersion && delta <= 7 && formattedRelativeDate != null) return formattedRelativeDate
  if (delta <= 30 && formattedRelativeDate != null) return `${formattedRelativeDate} (${formattedAbsoluteDate})`
  return `${!shortVersion ? lang === 'fr-FR' ? 'le ' : 'on ' : ''}${formattedAbsoluteDate}`
}

const switchLang = (path: string, lang: string): string => {
  if (!Object.hasOwn(languages, lang)) throw new Error('Provided lang prefix is unknown')

  const splitPath = path.split('/').filter(x => x !== '')

  if (splitPath.length === 0) throw new Error('Once split, path is empty')
  if (!Object.hasOwn(languages, splitPath[0])) throw new Error('Once split, lang prefix is unknown')
  splitPath[0] = lang

  return `/${splitPath.join('/')}/`
}

export default (Alpine: Alpine): void => {
  Alpine.data('formatDate', (jsDateString: Date, lang: string, shortVersion: boolean) => {
    return {
      formattedDate: formatDate(new Date(jsDateString), lang, shortVersion)
    }
  })

  Alpine.data('languageSelector', () => ({
    change ($event: Event) {
      navigate(switchLang(window.location.pathname, ($event.target as HTMLSelectElement).value)).catch(console.error)
    }
  }))
}
