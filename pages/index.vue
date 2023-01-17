<template>
  <NuxtLayout name="default">
    <div class="
    flex
    flex-col
    lg:flex-row lg:space-x-12 h-[calc(100vh-16rem)] items-center justify-center">
      <div class="inline-block flex-shrink-0 flex-grow-0 max-w-sm relative mt-20 mx-16 md:mx-0" >
        <div class="rounded-b-full aspect-[10/11] relative overflow-hidden" >
            <div class="w-4/5 ml-[11%]">
              <nuxt-img preload src="IMG-20220515-WA0004-removebg-preview.png"/>
            </div>
        </div>
        <div class="absolute bottom-0 left-0 rounded-full aspect-square bg-gradient-to-t from-gray-900 to-gray-500 w-full overflow-hidden -z-50" ></div>
      </div>
      <div class="mt-6 space-y-6">
        <h1 class="text-7xl font-bold">Hey!</h1>
        <h2 class="text-2xl font-light">I'm a France-based technology entrepreneur, involved in bringing end-2-end encryption to developers with <a class="underline font-bold" href="https://www.seald.io/" target="_blank" rel="noopener">Seald</a>.</h2>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: 'Timothée Rebours'
})
</script>
