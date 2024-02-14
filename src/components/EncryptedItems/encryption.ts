import { Buffer } from 'buffer'
import { scrypt } from 'scrypt-js'

const normalizePassword = (password: string): Buffer => Buffer.from(password.normalize('NFKC'), 'utf8')

const N = 1024, r = 8, p = 1
const dkLen = 32

export const deriveKey = async (password:string, salt:Buffer): Promise<CryptoKey> =>
  self.crypto.subtle.importKey(
    'raw',
    await scrypt(normalizePassword(password), salt, N, r, p, dkLen),
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  )

export const decrypt = async (data: Uint8Array, key: CryptoKey): Promise<ArrayBuffer> => {
  const nonce = data.slice(0, 12)
  const ciphertext = data.slice(12)

  return self.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: nonce
    },
    key,
    ciphertext
  )
}
