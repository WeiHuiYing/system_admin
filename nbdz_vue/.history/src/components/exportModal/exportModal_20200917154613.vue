<template>
  <div>
    <Transfer
      :data="listData"
      :titles="titleArr"
      :target-keys="targetKeys"
      @on-change="handleChange"
      :list-style="listStyle"
    ></Transfer>
  </div>
</template>

<script>
export default {
  props: { keyList: Object, parent: Object },
  data() {
    return {
      listData: [],
      targetKeys: [],
      titleArr: ["全部字段", "导出字段"],
      listStyle: {
        width: "30%",
        height: "600px",
      },
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
    handleChange(newTargetKeys) {
      this.targetKeys = newTargetKeys;
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
<style lang="less" scoped>
</style>