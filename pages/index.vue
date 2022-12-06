<template>
  <NuxtLayout name="default">
    <div class="
    flex
    flex-col
    lg:flex-row lg:space-x-12 h-[calc(100vh-4rem)] items-center justify-center">
      <div class="inline-block flex-shrink-0 flex-grow-0 max-w-sm relative" >
        <div class="rounded-b-full aspect-[10/11] relative overflow-hidden" >
            <div class="w-4/5 ml-[11%]">
              <nuxt-img preload src="IMG-20220515-WA0004-removebg-preview.png"/>
            </div>
        </div>
        <div class="absolute bottom-0 left-0 rounded-full aspect-square bg-gradient-to-t from-gray-900 to-gray-500 w-full overflow-hidden -z-50" ></div>
      </div>
      <div class="space-y-6">
        <h1 class="text-7xl font-bold">Hi!</h1>
        <h2 class="text-2xl font-light">Welcome to my personal website where I talk about stuff I find interesting on my blog.</h2>
      </div>
    </div>
  </NuxtLayout>
</template>
