/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-arraybuffer/types" />
import type { AriaAttributes, DOMAttributes } from 'react'

interface Window {
  Alpine: import('alpinejs').Alpine
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    tw?: string
    width?: number
    height?: number
  }
}
