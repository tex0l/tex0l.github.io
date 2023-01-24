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
import mermaid from 'mermaid'
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
        if (mermaid.parse(this.input)) this.svg = mermaid.render('test', this.input)
      } catch (error) {
        console.error(error)
      }
    }
  },
  async mounted () {
    mermaid.initialize({ startOnLoad: false, theme: 'base' })
    await this.render()
  }
}
</script>
