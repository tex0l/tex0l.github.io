<template>
  <NuxtLayout name="default">
    <ContentDoc
        :path="$route.params.slug"
        v-if="$route.params.slug"
        class="min-h-screen"
        v-slot="{ doc }">
      <div class="space-y-2 mb-2">
        <h1 class="text-5xl font-medium text-center">{{ doc.title }}</h1>
        <p class="text-gray-500 text-center">
          <ClientOnly v-if="isValid(doc.date)">
            Published {{ formatDateFromNow(doc.date) }} ({{ formatDateAbsolute(doc.date) }})
            <template #fallback>
              Published on the {{ formatDateAbsolute(doc.date) }}
            </template>
          </ClientOnly>
        </p>
      </div>
      <div class="max-h-60 md:max-h-72 lg:max-h-96 overflow-hidden flex items-center justify-center" v-if="doc.image">
        <nuxt-picture preload :src="doc.image"/>
      </div>
      <main class="min-h-[70vh] sm:mx-auto sm:-mt-12 sm:mb-12 sm:shadow-2xl px-6 py-12 z-10 bg-white relative md:max-w-3xl lg:max-w-4xl">
        <ContentRenderer
            class="mx-auto prose lg:prose-lg prose-slate prose-headings:scroll-mt-20 [&_h1>a]:no-underline [&_h2>a]:no-underline [&_h3>a]:no-underline [&_h4>a]:no-underline [&_h5>a]:no-underline [&_h6>a]:no-underline"
            :value="doc"/>
      </main>
    </ContentDoc>
  </NuxtLayout>
</template>

<script setup>
import { formatDateFromNow, formatDateAbsolute, isValid } from '~/utils/formatDate'

useHead({
  titleTemplate: string => `${string} | Timothée Rebours`
})
</script>
