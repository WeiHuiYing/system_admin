<template>
  <div>
    <Transfer :data="listData" @on-change="handleChange"></Transfer>
  </div>
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
            key: item.key,
            label: item.title,
          };
          _this.listData.push(obj);
        }
      });
    },
    handleChange() {},
  },
  mounted() {
    this.loadData();
  },
};
</script>
<style lang="less" scoped>
</style>