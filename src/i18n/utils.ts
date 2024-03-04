import { getRelativeLocaleUrl } from 'astro:i18n'
import { defaultLang, languages } from './index.ts'
import type { I18NArgument, LocaleId, Translation } from './types.ts'

export function validateLang (lang: unknown): asserts lang is string {
  if (typeof lang !== 'string') throw new Error('lang is not a string')
  if (!Object.keys(languages).includes(lang)) throw new Error(`Unknown lang ${lang}`)
}

export function useTranslatedPath (lang: LocaleId) {
  return (path: string) => getRelativeLocaleUrl(lang, path)
}

const retrieveLocalizedStringFromLocale = (key: string, locale: Translation): string | undefined => {
  let state: Translation | string = locale
  for (let i = 0, path = key.split('.'), len = path.length; i < len; i++) {
    if (typeof state !== 'string' && Object.keys(state).length !== 0 && Object.hasOwn(state, path[i])) state = state[path[i]]
  }
  if (typeof state === 'string') return state
}

export const retrieveLocalizedStringFromLocales = (key: string, locales: Translation[]): string | undefined => {
  for (const locale of locales) {
    const retrievedString = retrieveLocalizedStringFromLocale(key, locale)
    if (retrievedString != null) return retrievedString
  }
}

const interpolateString = (i18nString: string, interpolationArgs: I18NArgument[] | Record<string, I18NArgument>): string => {
  const reg = /\{(?:(?<variable>[^{}]*)|['"](?<literal>(?:[^']|\\.)*)['"])}/g
  return i18nString.replace(reg, (match, variable: string | undefined, literal: string | undefined): string => {
    if (variable != null) {
      if (Array.isArray(interpolationArgs)) {
        const index = Number.parseInt(variable, 10)
        if (!Number.isNaN(index) && index >= 0 && interpolationArgs.length > index) {
          if (interpolationArgs[index] instanceof Date) return `${interpolationArgs[index].toLocaleString()}`
          else return `${interpolationArgs[index] as (string | number)}`
        }
      } else if (Object.hasOwn(interpolationArgs, variable)) {
        if (interpolationArgs[variable] instanceof Date) return `${interpolationArgs[variable].toLocaleString()}`
        else return `${interpolationArgs[variable] as (string | number)}`
      }
      console.warn(`Could not find "${variable}" in interpolation arguments for "${i18nString}"`)
    } else if (literal != null) {
      return literal
    }
    return match
  })
}

const t = (key: string, args: I18NArgument[] | Record<string, I18NArgument>, locales: Translation[]): string => {
  const retrievedString = retrieveLocalizedStringFromLocales(key, locales)
  if (retrievedString != null) return interpolateString(retrievedString, args)
  else {
    console.warn(`key ${key} was not found`)
    return key
  }
}

export function useTranslations<T extends Translation> (lang: LocaleId, localLocale?: T) {
  return (key: string, args?: I18NArgument[] | Record<string, I18NArgument>) => {
    const locales: Translation[] = [languages[lang].translations, languages[defaultLang].translations]
    if (localLocale != null) locales.push(localLocale)
    return t(key, args ?? {}, locales)
  }
}
