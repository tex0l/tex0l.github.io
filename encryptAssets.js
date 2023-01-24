const { createCipheriv, createDecipheriv, randomBytes, scrypt } = require('node:crypto')
const { promisify } = require('node:util')
const { readFile, writeFile, access, readdir, stat, mkdir } = require('node:fs/promises')
const { constants } = require('node:fs')
const { Buffer } = require('node:buffer')
const path = require('node:path')

const scryptAsync = promisify(scrypt)
const N = 1024, r = 8, p = 1
const dkLen = 32

const isDummy = process.env.DUMMY === 'true'

const saltFile = path.join(__dirname, 'public', isDummy ? 'saltDummy' : 'salt')
const toEncryptDir = path.join(__dirname, isDummy ? 'publicDummy_to_encrypt' : 'public_to_encrypt')
const publicEncrypted = path.join(__dirname, 'public', isDummy ? 'encryptedDummy' : 'encrypted')

const getSalt = async (path = saltFile) => {
  try {
    await access(path, constants.F_OK)
    const saltB64 = await readFile(path)
    return Buffer.from(saltB64.toString(), 'base64')
  } catch (error) {
    const salt = randomBytes(16)
    await writeFile(path, salt.toString('base64'))
    return salt
  }
}

const getPassword = () => {
  if (process.env.PASSWORD) return normalizePassword(process.env.PASSWORD)
  else if (isDummy) return normalizePassword('my-super-secret-password')
  else throw new Error('Password is undefined')
}

const normalizePassword = password => {
  const b = Buffer.from(password.normalize('NFKC'), 'utf8')
  return b
}

const deriveKey = async (password, salt) => scryptAsync(password, salt, dkLen, { N, r, p })

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
