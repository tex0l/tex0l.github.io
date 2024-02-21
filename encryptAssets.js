import { createCipheriv, randomBytes, scrypt } from 'node:crypto'
import { promisify } from 'node:util'
import { access, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import { Buffer } from 'node:buffer'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const workingDirectory = dirname(fileURLToPath(import.meta.url))

const scryptAsync = promisify(scrypt)
const N = 1024; const r = 8; const p = 1
const dkLen = 32

const isDummy = process.env.DUMMY === 'true'

const saltFile = path.join(workingDirectory, 'public', isDummy ? 'saltDummy.txt' : 'salt.txt')
const toEncryptDir = path.join(workingDirectory, isDummy ? 'publicDummy_to_encrypt' : 'public_to_encrypt')
const publicEncrypted = path.join(workingDirectory, 'public', isDummy ? 'encryptedDummy' : 'encrypted')

const getSalt = async (path = saltFile) => {
  try {
    await access(path, constants.F_OK)
    const saltB64 = await readFile(path)
    return Buffer.from(saltB64.toString(), 'base64')
  } catch (error) {
    console.log(`No salt was found at ${path}, generating one.`)
    const salt = randomBytes(16)
    await writeFile(path, salt.toString('base64'))
    return salt
  }
}

const getPassword = () => {
  if (isDummy) return normalizePassword('my-super-secret-password')
  else if (process.env.PASSWORD) return normalizePassword(process.env.PASSWORD)
  else throw new Error('Password is undefined')
}

const normalizePassword = password => Buffer.from(password.normalize('NFKC'), 'utf8')

const deriveKey = async (password, salt) => await scryptAsync(password, salt, dkLen, { N, r, p })

const encryptFile = async (buf, key) => {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const encryptedData = Buffer.concat([cipher.update(buf), cipher.final()])

  const authTag = cipher.getAuthTag()

  return Buffer.concat([iv, encryptedData, authTag])
}

const encryptDir = async (dir, key) => {
  const files = await readdir(dir)
  for (const file of files) {
    if ((await stat(path.join(dir, file))).isDirectory()) return encryptDir(path.join(dir, file), key)
    else {
      const relativePath = path.relative(toEncryptDir, dir)
      await mkdir(path.join(publicEncrypted, relativePath), { recursive: true })
      await writeFile(path.join(publicEncrypted, relativePath, file + '.encrypted'), await encryptFile(await readFile(path.join(toEncryptDir, relativePath, file)), key))
    }
  }
}

const main = async () => {
  const salt = await getSalt()
  const password = getPassword()
  const key = await deriveKey(password, salt)

  await encryptDir(toEncryptDir, key)
}

main()
  .catch(console.error)
