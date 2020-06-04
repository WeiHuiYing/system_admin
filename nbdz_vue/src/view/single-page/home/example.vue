<template>
    <div ref="dom"></div>
</template>

<script>
export default {
  name: 'serviceRequests',
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
  },
}
</script>
