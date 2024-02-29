import satori from 'satori'
import roboto400Normal from '@fontsource/roboto/files/roboto-latin-400-normal.woff?arraybuffer'
import roboto700Normal from '@fontsource/roboto/files/roboto-latin-700-normal.woff?arraybuffer'
import { Resvg } from '@resvg/resvg-js'
import type { ReactNode } from 'react'
import type { Buffer } from 'node:buffer'

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
