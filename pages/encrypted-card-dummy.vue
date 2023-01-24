<template>
  <div>
    <EncryptedBusinessCard
        salt-path="/saltDummy"
        contact-info-path="/encryptedDummy/contactInfo.json.encrypted"
        image-path="/encryptedDummy/np_Portrait of Black business man smiling in an office with his arms crossed_5wll14_free.png.encrypted"
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
