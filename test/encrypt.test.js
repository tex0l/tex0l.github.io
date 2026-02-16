import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import { access, readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { encryptAssets } from '@tex0l/encrypted-card/encryptAssets.js'

const rootDir = path.resolve(import.meta.dirname, '..')

describe('encrypt.js integration', () => {
  describe('dummy encryption', () => {
    const outputDir = path.join(rootDir, 'public', 'encryptedDummy')
    const saltFile = path.join(rootDir, 'public', 'saltDummy.txt')

    before(async () => {
      await encryptAssets({
        sourceDir: path.join(rootDir, 'publicDummy_to_encrypt'),
        outputDir,
        saltFile,
        password: 'my-super-secret-password',
      })
    })

    it('produces encrypted files matching source files', async () => {
      const sourceFiles = await readdir(path.join(rootDir, 'publicDummy_to_encrypt'))
      const encryptedFiles = await readdir(outputDir)

      for (const file of sourceFiles) {
        assert.ok(
          encryptedFiles.includes(file + '.encrypted'),
          `Expected ${file}.encrypted in output`
        )
      }
    })

    it('creates a salt file', async () => {
      await access(saltFile)
      const content = await readFile(saltFile, 'utf8')
      assert.ok(content.length > 0, 'Salt file should not be empty')
    })

    it('encrypted files are non-empty', async () => {
      const files = await readdir(outputDir)
      for (const file of files) {
        const content = await readFile(path.join(outputDir, file))
        assert.ok(content.length > 0, `${file} should not be empty`)
      }
    })

    it('skips re-encryption on second run', async () => {
      const result = await encryptAssets({
        sourceDir: path.join(rootDir, 'publicDummy_to_encrypt'),
        outputDir,
        saltFile,
        password: 'my-super-secret-password',
      })
      assert.equal(result.skipped, true)
    })
  })
})
