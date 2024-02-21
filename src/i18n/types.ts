import { type languages } from './index.ts'

export declare type LocaleCode = 'en-US' | 'fr-FR'

export declare interface Locale {
  code: LocaleCode
  label: string
  translations: Translation
}
const emptySymbol = Symbol('EmptyObject type')

export declare interface Translation {
  [emptySymbol]?: never
  [key: string]: Translation | string
}

export declare type I18NArgument = string | number | Date

export declare type LocaleId = keyof typeof languages
