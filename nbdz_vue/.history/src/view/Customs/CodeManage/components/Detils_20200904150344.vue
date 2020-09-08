<template>
  <div>
    <Form :model="rowInfo" :label-width="100"></Form>
  </div>
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

