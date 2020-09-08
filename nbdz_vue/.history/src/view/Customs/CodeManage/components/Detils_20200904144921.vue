<template>
  <div></div>
</template>

<script>
export default {
  props: { detilsRow: Object, parent: Object },
  data() {
    return {
      rowInfo: {},
    };
  },
  watch: {
    detilsRow(newVal, oldVal) {
      this.loadData();
    },
  },
  methods: {
    loadData() {},
  },
};
</script>

