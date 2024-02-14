import {getRelativeLocaleUrl} from 'astro:i18n'
import {defaultLang, languages} from './index.ts';
import type {I18NArgument, LocaleId, Translation} from "./types.ts";

export function getLangFromUrl(url: URL): LocaleId {
    const [, lang] = url.pathname.split('/');
    if (Object.hasOwn(languages, lang)) return <LocaleId>lang
    return defaultLang;
}

export function useTranslatedPath(lang: LocaleId) {
    return (path: string) => getRelativeLocaleUrl(lang, path)
}

export function switchLang(currentPath: string, l: LocaleId) {
    const path = currentPath.split('/')
    path.shift() // remove leading /
    path.shift() // remove current lang

    return getRelativeLocaleUrl(l, path.join('/'))
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
        if (retrievedString) return retrievedString
    }
}

const interpolateString = (i18nString: string, interpolationArgs: I18NArgument[] | Record<string, I18NArgument>) => {
    const reg = /\{(?:(?<variable>[^{}]*)|['"](?<literal>(?:[^']|\\.)*)['"])}/g;
    return i18nString.replace(reg, (match, variable: string | undefined, literal: string | undefined): string => {
        if (variable != null) {
            if (Array.isArray(interpolationArgs)) {
                const index = Number.parseInt(variable, 10)
                if (!Number.isNaN(index) && index >= 0 && interpolationArgs.length > index) {
                    return `${interpolationArgs[index]}`
                }
            } else if (Object.hasOwn(interpolationArgs, variable)) {
                return `${interpolationArgs[variable]}`
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
    if (retrievedString) return interpolateString(retrievedString, args)
    else {
        console.warn(`key ${key} was not found`)
        return key
    }
}

export function useTranslations<T extends Translation>(lang: LocaleId, localLocale?: T) {
    return (key: string, args?: I18NArgument[] | Record<string, I18NArgument>) => {
        const locales: Translation[] = [languages[lang].translations, languages[defaultLang].translations]
        if (localLocale != null) locales.push(localLocale)
        return t(key, args || {}, locales)
    }
}

export const useFormatDate = (lang: LocaleId) => lang === 'en' ? formatDateFromNowEn : formatDateFromNowFr

const formatDateFromNowEn = (date: Date) => {
    let ago = 'ago'
    let daysAgo = Math.floor(((new Date()).getTime() - date.getTime()) / 1000 / 3600 / 24)
    if (Number.isNaN(daysAgo)) return
    if (daysAgo === 0) return 'today'
    if (daysAgo === 1) return 'yesterday'
    if (daysAgo === -1) return 'tomorrow'
    if (daysAgo < 0) {
        ago = 'from now'
        daysAgo = -daysAgo
    }
    if (daysAgo < 7) return `${daysAgo} days ${ago}`
    if (daysAgo < 14) return `${Math.floor(daysAgo / 7)} week ${ago}`
    if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} weeks ${ago}`
    if (daysAgo < 60) return `${Math.floor(daysAgo / 30)} month ${ago}`
    if (daysAgo < 365) return `${Math.floor(daysAgo / 30)} months ${ago}`
    if (daysAgo < 365 * 2) return `${Math.floor(daysAgo / 365)} year ${ago}`
    return `${Math.floor(daysAgo / 365)} years ${ago}`
}

export const formatDateFromNowFr = (date: Date) => {
    let ago = 'il y a'
    let daysAgo = Math.floor(((new Date()).getTime() - date.getTime()) / 1000 / 3600 / 24)
    if (Number.isNaN(daysAgo)) return
    if (daysAgo === 0) return 'aujourd\'hui'
    if (daysAgo === 1) return 'hier'
    if (daysAgo === -1) return 'demain'
    if (daysAgo < 0) {
        ago = 'dans'
        daysAgo = -daysAgo
    }
    if (daysAgo < 7) return `${ago} ${daysAgo} jours`
    if (daysAgo < 14) return `${ago} ${Math.floor(daysAgo / 7)} semaine`
    if (daysAgo < 30) return `${ago} ${Math.floor(daysAgo / 7)} semaines`
    if (daysAgo < 60) return `${ago}${Math.floor(daysAgo / 30)} mois`
    if (daysAgo < 365) return `${ago} ${Math.floor(daysAgo / 30)} mois`
    if (daysAgo < 365 * 2) return `${ago} ${Math.floor(daysAgo / 365)} an`
    return `${ago} ${Math.floor(daysAgo / 365)} ans`
}

export const formatDateAbsolute = (rawDate: number | string | Date) => {
    const date = new Date(rawDate)
    return `${date.getUTCFullYear().toString().padStart(4, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`
}
