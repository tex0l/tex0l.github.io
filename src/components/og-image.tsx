import { Buffer } from 'node:buffer'
import sharp from 'sharp'
import { findLargestUsableFontSize } from '@altano/satori-fit-text'
import roboto400Normal from '@fontsource/roboto/files/roboto-latin-400-normal.woff?arraybuffer'
import roboto700Normal from '@fontsource/roboto/files/roboto-latin-700-normal.woff?arraybuffer'
import type { OGImageOptions } from '~/utils/createImage.ts'

export default async ({
  image,
  title,
  description,
  author,
  date,
  width = 1200,
  height = 630,
  dateFormat = 'en'
}: OGImageOptions) => {
  const resizedImage = await sharp(Buffer.from(image))
    .resize({ width: Math.floor(width / 3), height: 1.25 * Math.floor(width / 3), fit: 'cover' })
    .png()
    .toBuffer()

  const b64ImageSrc = `data:image/png;base64,${resizedImage.toString('base64')}`
  const dateString = date != null
    ? dateFormat === 'en'
      ? `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear().toString().padStart(4, '0')}`
      : `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().padStart(4, '0')}`
    : undefined

  const frameWidth = 48
  const imageMargin = 20

  const contentWidth = width - 40 - 2 * 48 - Math.floor(width / 3) - 20

  const titleMaxHeight = 220

  const titleFontSize = await findLargestUsableFontSize({
    lineHeight: 1.3,
    font: { name: 'Roboto', data: roboto700Normal },
    text: title,
    minFontSize: 65,
    maxWidth: contentWidth,
    maxHeight: titleMaxHeight
  })

  const descriptionFontSize = await findLargestUsableFontSize({
    lineHeight: 1.3,
    font: { name: 'Roboto', data: roboto400Normal },
    text: description,
    maxFontSize: 50,
    maxWidth: contentWidth,
    maxHeight: height - 2 * frameWidth - 30 - titleMaxHeight - imageMargin - /* space between author line and description */ 3 * imageMargin
  })

  return <div style={{ display: 'flex', padding: frameWidth, width, height }}>
    <div style={{
      display: 'flex',
      maxWidth: '100%',
      maxHeight: '100%',
      flexDirection: 'column',
      backgroundColor: 'white',
      justifyContent: 'center',
      borderRadius: 16,
      paddingRight: imageMargin,
      boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      width,
      height
    }}>
      <div style={{
        display: 'flex',
        maxWidth: '100%',
        maxHeight: '100%',
        width: width - 2 * frameWidth,
        height: height - 2 * frameWidth
      }}>
        <img style={{ margin: imageMargin }} src={b64ImageSrc} width={Math.floor(width / 3)}/>
        <div style={{ display: 'flex', flexDirection: 'column', width: contentWidth, height: height - 2 * frameWidth }}>
          <h1 style={{
            display: 'block',
            position: 'absolute',
            left: 0,
            top: 0,
            fontSize: titleFontSize,
            fontWeight: 700,
            maxWidth: contentWidth,
            lineClamp: 2,
            lineHeight: 1.3
          }}>{title}</h1>
          <span style={{
            display: 'block',
            position: 'absolute',
            left: 0,
            top: titleMaxHeight + imageMargin,
            fontSize: descriptionFontSize,
            fontWeight: 400,
            maxWidth: contentWidth,
            lineClamp: 3,
            lineHeight: 1.3
          }}>{description}</span>
          {author != null
            ? <span style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              fontSize: 30,
              marginBottom: imageMargin
            }}>{author}</span>
            : <></>}
          {dateString != null
            ? <span
            style={{ position: 'absolute', bottom: imageMargin, right: 0, fontSize: 30 }}>{dateString}</span>
            : <></>}
        </div>
      </div>
    </div>
  </div>
}
