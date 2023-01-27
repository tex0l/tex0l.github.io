<template>
  <div>
    <div
        class="mermaid flex justify-center"
        v-html="svg"/>
    <div
        ref="raw"
        class="hidden">
      <slot/>
    </div>
  </div>
</template>

<script>
import { htmlDecode } from '~/utils/utils'

export default {
  data () {
    return {
      svg: ''
    }
  },
  methods: {
    render () {
      try {
        this.input = htmlDecode(this.$refs.raw.innerHTML.replace(/<!--.*?-->/g, ''))
        if (window.mermaid.parse(this.input)) this.svg = window.mermaid.render('test', this.input)
      } catch (error) {
        console.error(error)
      }
    }
  },
  async mounted () {
    if (!window.mermaid) window.mermaid = (await import('mermaid')).default
    window.mermaid.initialize({ startOnLoad: false, theme: 'base' })
    this.render()
  }
}
</script>
