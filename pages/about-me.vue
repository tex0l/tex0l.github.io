<template>
  <NuxtLayout name="default">
    <div
        class="
    flex
    flex-col mx-auto sm:shadow-2xl mb-12 px-6 py-12 min-h-[70vh] md:max-w-3xl lg:max-w-4xl">
      <div class="prose lg:prose-lg prose-slate mx-auto text-justify">
        <h1>About me</h1>
        I was born in 1993 near Paris, I have always been passionate about science and technology. I'm an engineer from
        the École Polytechnique, and I founded my company in cybersecurity.
        <h2>Areas of interest</h2>
        <div class="grid grid-cols-2 gap-x-6 gap-y-2">
          <div>
            <h3>
              <Icon
                  name="noto:man-technologist"
                  class="mr-2"/>
              Digital technologies
            </h3>
            <p>We all have a computer in our pockets, which allow us to learn anything, order anything, communicate with
              everybody. And we use it for watching cat videos
              <Icon name="emojione:person-facepalming"/>
              .
            </p>
          </div>
          <div>
            <h3>
              <Icon
                  name="noto:man-scientist"
                  class="mr-2"/>
              Science
            </h3>
            <p>I am deeply interested in understanding how things work at a fundamental level, whether it's physics (even
              if I'm out of my depth), chemistry, mechanics, biology, engineering...</p>
          </div>
          <div>
            <h3>
              <Icon
                  name="emojione:ballot-box-with-ballot"
                  class="mr-2"/>
              Politics & geopolitics
            </h3>
            <p>When I was a kid, I apparently said I wanted to become President. I don't want that anymore, but I still
              have an urge to participate in the public debate. By the way, I made this entire website because of I want
              to force myself to make some research when giving my opinion.</p>
          </div>
          <div>
            <h3>
              <Icon
                  name="emojione:cat"
                  class="mr-2"/>
              Cats
            </h3>
            <p>I present you my beloved little demon:</p>
            <div class="not-prose flex justify-center">
              <nuxt-picture
                  preload
                  src="PXL_20230106_141516359.PORTRAIT.jpg"
                  sizes="sm:200px lg:300px"></nuxt-picture>
            </div>
          </div>
        </div>
        <h2>Job experiences</h2>
        <div class="space-x-4"><span class="italic">2016-present</span><span>Seald</span><span>Co-founder & CEO</span></div>
        <p>
          I founded <a class="not-prose" href="https://www.seald.io" target="_blank" rel="noopener"><nuxt-img class="inline" src="seald-logo.png" width="80px"/></a> in 2016 with 3 other co-founders. Our mission is to help protect data on the web, and we strongly believe this can only be done through a zero-trust architecture, fine-grained encryption and if possible end-2-end encryption.
          <br/>
          Our value proposition is to bring end-to-end encryption and other tools to developers so that they can build secure by design applications.
        </p>
        <h2>Education</h2>
        <div class="space-x-4"><span class="italic">2012-2016</span><span>École Polytechnique</span></div>
        <p>
          École Polytechnique is among the top-ranked higher education institutions in France.<br/>
          I studied generalist courses such as computer science, applied mathematics and special relativity during the first two years.<br/>
          During the next two years (M1 and M2), I studied entrepreneurship-oriented courses such as law, company management, innovation and went to UC Berkeley in the Learn2Launch program.<br/>
          I actually ended up creating Seald as my last year internship.
        </p>
        <!--<h2>Skills</h2>-->
      </div>
    </div>
  </NuxtLayout>
</template>

<script
    setup
    lang="ts">
useHead({
  title: 'About me | Timothée Rebours'
})
</script>
