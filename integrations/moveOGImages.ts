import type { AstroIntegration } from 'astro'
import { fileURLToPath } from 'node:url'
import { opendir, copyFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import AstroConfig, { PWD } from '../astro.config.ts'
import path from 'node:path'

export default function (): AstroIntegration {
  return {
    name: 'MoveOGImages',
    hooks: {
      'astro:build:done': async ({ dir, logger: _logger }) => {
        const logger = _logger.fork('MoveOGImages')
        const inputDir = await opendir(path.resolve(PWD, AstroConfig.publicDir ?? 'public', 'og'))
        const outputDirPath = path.resolve(fileURLToPath(dir), 'og')
        if (!existsSync(outputDirPath)) {
          logger.info('Creating directory /og')
          await mkdir(outputDirPath)
        }
        for await (const entry of inputDir) {
          if (entry.isFile()) {
            logger.info(`Copying /og/${entry.name}`)
            await copyFile(path.resolve(entry.path, entry.name), path.resolve(outputDirPath, entry.name))
          }
        }
      }
    }
  }
}
