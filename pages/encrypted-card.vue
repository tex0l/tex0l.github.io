<template>
  <div>
    <ClientOnly>
      <div
          v-if="contactInfo"
          class="flex flex-col justify-center items-center">
        <div class="inline-block flex-shrink-0 flex-grow-0 max-w-sm relative my-10 mx-16 md:mx-0">
          <div class="rounded-b-full aspect-[10/11] relative overflow-hidden">
            <div class="w-4/5 ml-[11%]">
              <EncryptedImage
                  src="/encrypted/IMG-20220515-WA0004-removebg-preview.png.encrypted"
                  :encryption-key="encryptionKey"/>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 rounded-full aspect-square bg-gradient-to-t from-gray-900 to-gray-500 w-full overflow-hidden -z-50"></div>
        </div>
        <div
            v-if="contactInfo"
            class="space-y-3 w-4/5">
          <div class="text-3xl font-bold text-center">{{ contactInfo.firstName }} {{ contactInfo.lastName }}</div>
          <div class="text-xl font-bold text-center">{{ contactInfo.jobTitle }} @ <a
              class="underline"
              :href="contactInfo.companyLink"
              target="_blank"
              rel="noreferrer noopener">{{
              contactInfo.companyName
            }}</a></div>
          <div class="text-center space-x-2">
            <Icon name="carbon:phone"/>
            <a
                class="underline"
                :href="contactInfo.phoneNumberLink">{{ contactInfo.phoneNumber }}</a></div>
          <div class="text-center space-x-2">
            <Icon name="carbon:email"/>
            <a
                class="underline"
                :href="contactInfo.emailAddressLink">{{ contactInfo.emailAddress }}</a></div>
          <div
              @click="downloadVCF"
              class="w-16 aspect-square fixed right-0 flex flex-col justify-center items-center shadow-xl border border-gray-200 rounded-l-lg cursor-pointer hover:scale-105 transition">
            <Icon name="carbon:download"/>
            <Icon name="mdi:card-account-phone-outline"/>
          </div>
          <div class="text-center space-x-2">
            <Icon name="carbon:logo-linkedin"/>
            <a
                class="underline"
                :href="contactInfo.linkedinLink"
                target="_blank"
                rel="noreferrer noopener">{{ contactInfo.linkedin }}</a></div>
          <div class="text-center space-x-2">
            <Icon name="carbon:logo-twitter"/>
            <a
                class="underline"
                :href="contactInfo.twitterLink"
                target="_blank"
                rel="noreferrer noopener">{{ contactInfo.twitter }}</a></div>
          <div class="text-center space-x-2">
            <Icon name="carbon:http"/>
            <a
                class="underline"
                :href="contactInfo.personalWebsiteLink"
                target="_blank"
                rel="noreferrer noopener">Personal website</a></div>
        </div>
      </div>
      <div
          class="flex justify-center items-center min-h-screen"
          v-else>
        <div class="space-y-6 text-center shadow-2xl p-12 rounded-md">
          <div>Password is incorrect, try again:</div>
          <input class="rounded-sm border border-gray-200" v-model="password">
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import EncryptedImage from '~/components/EncryptedImage.client.vue'
import { deriveKey, decrypt } from '~/utils/encryption'
import { Buffer } from 'buffer'
import vCard from 'vcard-creator'

// TODO server:false is needed because of https://github.com/nuxt/nuxt/issues/13857
const { data: salt } = useLazyFetch('/salt', { server: false, responseType: 'text' })
const { data: encryptedContactInfo } = useLazyFetch('/encrypted/contactInfo.json.encrypted', {
  server: false,
  responseType: 'arrayBuffer'
})
const encryptionKey = ref(null)
const contactInfo = ref(null)
const password = ref(null)

function downloadVCF () {
  if (contactInfo.value) {
    const card = new vCard()
    const text = card
        .addName(contactInfo.value.lastName, contactInfo.value.firstName)
        .addCompany(contactInfo.value.companyName)
        .addJobtitle(contactInfo.value.jobTitle)
        .addEmail(contactInfo.value.emailAddress)
        .addPhoneNumber(contactInfo.value.phoneNumber)
        .addSocial(contactInfo.value.twitterLink, 'Twitter', contactInfo.value.twitter)
        .addSocial(contactInfo.value.linkedinLink, 'LinkedIn', contactInfo.value.linkedin)
        .addURL(contactInfo.value.personalWebsiteLink)
        .addURL(contactInfo.value.companyLink)
        // TODO .addPhoto()
        .buildVCard()

    const blob = new Blob([text], { type: 'text/vcard' })

    const a = document.createElement('a')
    a.download = `${contactInfo.value.firstName}-${contactInfo.value.lastName}.vcard`
    a.href = URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/vcard', a.download, a.href].join(':')
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(function () { URL.revokeObjectURL(a.href) }, 1500)
  }
}

onMounted(() => {
  const route = useRoute()
  password.value = route.hash.substr(1)

  watch([password, salt], async ([newPassword, newSalt]) => {
    console.log('got new password', newPassword, newSalt)
    if (newSalt && newPassword) {
      try {
        encryptionKey.value = await deriveKey(newPassword, Buffer.from(newSalt, 'base64'))
      } catch (error) {
        console.error('failed derivation', error)
        encryptionKey.value = null
      }
    } else console.warn('not ready for derivation', newSalt, newPassword)
  }, { immediate: true })

  watch([encryptionKey, encryptedContactInfo], async ([newKey, newEncryptedContactInfo]) => {
    if (newKey && newEncryptedContactInfo) {
      try {
        contactInfo.value = JSON.parse(Buffer.from(await decrypt(newEncryptedContactInfo, newKey)).toString('utf-8'))
      } catch (error) {
        console.error('failed decryption', error)
        contactInfo.value = null
      }
    } else console.warn('not ready for decryption')
  }, { immediate: true })
})
</script>
