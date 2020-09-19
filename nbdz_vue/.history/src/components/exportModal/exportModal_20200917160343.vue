<template>
  <div>
    <Transfer
      :data="listData"
      :titles="titleArr"
      :target-keys="targetKeys"
      @on-change="handleChange"
      :list-style="listStyle"
      filterable
      :filter-method="filterMethod"
    ></Transfer>
    <div style="text-align:center;">
      <Button @click="parent.modelExport = false">取消</Button>
      <Button style="margin-left:20px;" type="primary" @click="saveCommit()">保存</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: { keyList: Array, parent: Object },
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
    handleChange(targetKeys, direction, moveKeys) {
      console.log(targetKeys);
      console.log(direction);
      console.log(moveKeys);
      // this.targetKeys = newTargetKeys;
    },
    filterMethod(data, query) {
      return data.label.indexOf(query) > -1;
    },
    saveCommit() {
      let keysObj = {};
      this.targetKeys.forEach((item) => {
        console.log(item.key);
        keysObj[item.key] = item.label;
      });
      console.log(keysObj);
      this.$props.parent.exportKey = keysObj;
      this.$emit("export");
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
<style lang="less" scoped>
</style>