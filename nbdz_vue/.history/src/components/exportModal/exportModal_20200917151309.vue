<template>
  <div>111</div>
</template>

<script>
export default {
  props: { keyList: Object, parent: Object },
  data() {
    return {
      listData: [],
    };
  },
  methods: {
    loadData() {
      const _this = this;
      this.$props.keyList.forEach((item) => {
        if (item.key) {
          let obj = {
            label: item.key,
            value: item.title,
          };
          _this.listData, push(obj);
        }
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
<style lang="less" scoped>
</style>