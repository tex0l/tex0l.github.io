/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
import type { Alpine } from 'alpinejs'

interface Window {
  Alpine: Alpine
}
