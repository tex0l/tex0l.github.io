import { encryptAssets } from '@tex0l/encrypted-card/encryptAssets.js'

// Prod encryption
if (process.env.PASSWORD) {
  const result = await encryptAssets({
    sourceDir: './public_to_encrypt',
    outputDir: './public/encrypted',
    saltFile: './public/salt.txt',
    password: process.env.PASSWORD,
  })
  if (result.skipped) {
    console.log('[prod] All encrypted assets are valid, skipping re-encryption.')
  } else {
    for (const file of result.encrypted) console.log(`[prod] Encrypted: ${file}`)
    console.log('[prod] Encryption complete.')
  }
} else {
  console.log('[prod] No PASSWORD defined, skipping prod encryption.')
}

// Dummy encryption
const dummyResult = await encryptAssets({
  sourceDir: './publicDummy_to_encrypt',
  outputDir: './public/encryptedDummy',
  saltFile: './public/saltDummy.txt',
  password: 'my-super-secret-password',
})
if (dummyResult.skipped) {
  console.log('[dummy] All encrypted assets are valid, skipping re-encryption.')
} else {
  for (const file of dummyResult.encrypted) console.log(`[dummy] Encrypted: ${file}`)
  console.log('[dummy] Encryption complete.')
}
