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
    loadData() {
      //   const _this = this;
      //   getList(_this.detilsRow)
      //     .then((res) => {
      //       if (res.status == 200) {
      //         _this.rowInfo = res.data;
      //       }
      //     })
      //     .catch((err) => {
      //       if (err.response && err.response.request) {
      //         const response = err.response.request;
      //         this.$Message.error({
      //           content: response.responseText,
      //           duration: 10,
      //           closable: true,
      //         });
      //       }
      //     });
    },
  },
};
</script>

