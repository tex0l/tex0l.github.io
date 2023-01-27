<template>
  <div class="w-screen min-h-screen">
    <div class="
    sticky h-20 -top-4 w-full z-20
    before:sticky
    before:block
    before:h-4
    before:content-['']
    before:top-12
    before:shadow-md
    after:sticky
    after:block
    after:h-4
    after:content-['']
    after:top-0
    after:bg-gradient-to-b
    after:from-white
    after:via-white
    after:via-white
    after:via-white
    after:z-30
">
      <div class="w-full h-16 flex items-center -mt-4 sticky top-0 px-3 md:px-12 z-50 bg-white">
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
    </div>
    <div class="container sm:px-16 md:px-20 lg:px-32 m-auto min-h-[calc(100vh-5rem)] space-y-4 mb-4">
      <div><slot/></div>
      <div class="text-center w-full text-xs">This website is hosted with Github Pages, the source code is <a href="https://github.com/tex0l/tex0l.github.io" rel="noopener" class="underline cursor-pointer">available here</a>.</div>
      <div class="text-center w-full text-xs">All rights reserved, Timothée Rebours 2022-<ClientOnly :fallback="(new Date()).getFullYear()">{{(new Date()).getFullYear()}}.</ClientOnly></div>
    </div>
  </div>
</template>
