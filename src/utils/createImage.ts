import satori from 'satori'
import roboto400Normal from '@fontsource/roboto/files/roboto-latin-400-normal.woff?arraybuffer'
import roboto700Normal from '@fontsource/roboto/files/roboto-latin-700-normal.woff?arraybuffer'
import { Resvg } from '@resvg/resvg-js'
import type { ReactNode } from 'react'
import { Buffer } from 'node:buffer'
import { createHash } from 'node:crypto'
import path from 'node:path'
import AstroConfig, { PWD } from '../../astro.config.ts'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import ogImage from '~/components/og-image.tsx'

export interface OGImageOptions {
  image: ArrayBuffer
  title: string
  description: string
  width?: number
  height?: number
  author?: string
  date?: Date
  dateFormat?: string
}

const PUBLIC_DIR = path.resolve(PWD, AstroConfig.publicDir ?? 'public')
const OG_DIR = path.resolve(PUBLIC_DIR, 'og')
if (!(existsSync(OG_DIR))) await mkdir(OG_DIR)

export const SVG = async (component: ReactNode): Promise<string> => {
  return await satori(component, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Roboto',
        data: roboto400Normal,
        weight: 400,
        style: 'normal'
      },
      {
        name: 'Roboto',
        data: roboto700Normal,
        weight: 700,
        style: 'normal'
      }
    ]
  })
}

export const PNG = async (component: ReactNode): Promise<Buffer> => {
  const resvg = new Resvg(await SVG(component), {
    background: 'transparent',
    fitTo: {
      mode: 'width',
      value: 1200
    }
  })
  const pngData = resvg.render()
  return pngData.asPng()
}
const generateHash = (input: string): string => {
  const hash = createHash('sha256')
  hash.update(input)
  return hash.digest().toString('hex')
}

export const getCachedImage = async (options: OGImageOptions): Promise<string> => {
  const image = Buffer.from(options.image)

  const hash = generateHash(JSON.stringify({ ...options, image: image.toString('base64') }))

  const generatedImagePath = path.resolve(OG_DIR, `${hash}.png`)

  if (!(existsSync(generatedImagePath))) {
    const generatedImage = await PNG(await ogImage({ ...options, image }))
    await writeFile(generatedImagePath, generatedImage)
  }

  return `/og/${hash}.png`
}
