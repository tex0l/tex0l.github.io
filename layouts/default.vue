<template>
  <div class="absolute w-screen min-h-screen">
    <div class="fixed w-full flex items-center h-16 top-0 left-0 px-3 md:px-12">
      <nuxt-link to="/">
        <div class="flex flex-row h-full items-center">
          <span class="bg-gray-900 w-10 h-10 text-2xl text-white flex justify-center items-center rounded-md flex-shrink-0">TR</span>
          <span class="text-gray-900 ml-6 text-xl font-bold">Timothée Rebours</span>
        </div>
      </nuxt-link>
      <div class="flex-grow"></div>
      <div class="text-xl space-x-6 flex-shrink-0">
        <span><nuxt-link to="/about-me">About me</nuxt-link></span>
        <span><nuxt-link to="/blog">Blog</nuxt-link></span>
      </div>
    </div>
    <div class="container sm:px-16 md:px-20 lg:px-32 m-auto min-h-fit h-screen pt-16">
      <slot/>
    </div>
  </div>
</template>
