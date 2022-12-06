<template>
  <NuxtLayout name="default">
    <div
        class="
    flex
    flex-col
    h-[calc(100vh-4rem)] items-center px-2">
      <h1 class="text-7xl font-bold my-8">
        Blog
      </h1>
      <div class="text-justify my-8">
        <p>In this blog, I talk about climate change, politics, economics, religion, cybersecurity, and other topics I
          find interesting.</p>
        <p>I only express my opinion here, if you think I made a mistake or that my opinion is flawed, feel free to
          contact me!</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <ContentList
            v-slot="{ list }"
            :query="query">
          <div
              v-for="article in list"
              :key="article._path"
              class="flex flex-col max-w-sm hover:scale-105 rounded-md overflow-hidden shadow-xl hover:shadow-2xl transition shadow transform duration-300"
          >
            <nuxt-link :to="`/blog${article._path}`">
              <div class="width-full aspect-video overflow-hidden flex items-center justify-center">
                <nuxt-img
                    preload
                    v-if="article.image"
                    :src="article.image"/>
              </div>
              <div class="width-full aspect-video overflow-hidden relative p-6">
                <h2 class="text-xl font-medium mb-4">{{ article.title }}</h2>
                <p class="italic text-justify mb-4 line-clamp-3">{{ article.description }}</p>
                <div
                    class="absolute bottom-6 right-6 text-sm text-gray-600"
                    v-if="isValid(article.date)">
                  <ClientOnly>
                    {{ formatDateFromNow(article.date) }} ({{ formatDateAbsolute(article.date) }})
                    <template #fallback>
                      ({{ formatDateAbsolute(article.date) }})
                    </template>
                  </ClientOnly>
                </div>
              </div>
            </nuxt-link>
          </div>
        </ContentList>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { formatDateFromNow, formatDateAbsolute, isValid } from '~/utils/formatDate'

const query = { path: '/', limit: 10, sort: { date: -1 } }
</script>
