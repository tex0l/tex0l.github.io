import { languages } from '~/i18n'

const switchLang = (path: string, lang: string): string => {
  if (!Object.hasOwn(languages, lang)) throw new Error('Provided lang prefix is unknown')

  const splitPath = path.split('/').filter(x => x !== '')

  if (splitPath.length === 0) throw new Error('Once split, path is empty')
  if (!Object.hasOwn(languages, splitPath[0])) throw new Error('Once split, lang prefix is unknown')
  splitPath[0] = lang

  return `/${splitPath.join('/')}/`
}

const handleToggleLanguage = (event: Event): void => {
  if (event.target != null) {
    const l = (event.target as HTMLSelectElement).value
    window.localStorage.setItem('i18n', l)
    window.location.assign(switchLang(window.location.pathname, l))
  }
}

const languageSelector = document.getElementById('language-selector')
if (languageSelector != null) languageSelector.addEventListener('change', handleToggleLanguage)
