import type { Alpine } from 'alpinejs'
import { navigate } from 'astro:transitions/client'
import { languages } from '~/i18n'

const switchLang = (path: string, lang: string): string => {
  if (!Object.hasOwn(languages, lang)) throw new Error('Provided lang prefix is unknown')

  const splitPath = path.split('/').filter(x => x !== '')

  if (splitPath.length === 0) throw new Error('Once split, path is empty')
  if (!Object.hasOwn(languages, splitPath[0])) throw new Error('Once split, lang prefix is unknown')
  splitPath[0] = lang

  return `/${splitPath.join('/')}/`
}

export default (Alpine: Alpine): void => {
  Alpine.data('languageSelector', () => ({
    change ($event: Event) {
      navigate(switchLang(window.location.pathname, ($event.target as HTMLSelectElement).value)).catch(console.error)
    }
  }))
}
