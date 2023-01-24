<template>
  <div>
    <EncryptedBusinessCard
        salt-path="/salt"
        contact-info-path="/encrypted/contactInfo.json.encrypted"
        image-path="/encrypted/IMG-20220515-WA0004-removebg-preview.png.encrypted"
        v-model:password="password"/>
  </div>
</template>

<script setup>
const password = ref('')
onMounted(() => {
  const route = useRoute()
  password.value = route.hash.substr(1)
})
</script>
