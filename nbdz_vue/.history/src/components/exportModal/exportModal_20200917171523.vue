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
    <div style="text-align:center;padding-top:20px">
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
    handleChange(newTargetKeys) {
      this.targetKeys = newTargetKeys;
    },
    filterMethod(data, query) {
      return data.label.indexOf(query) > -1;
    },
    saveCommit() {
      const _this = this;
      if (_this.targetKeys.length > 0) {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定要导出这些字段?</p>",
          onOk: () => {
            let keysObj = {};
            let keysArr = _this.listData.filter((item) => {
              for (let i = 0; i < _this.targetKeys.length; i++) {
                if (item.key == _this.targetKeys[i]) {
                  return item;
                }
              }
            });
            keysArr.forEach((item) => {
              console.log(item);
              keysObj[item.key] = item.label;
            });
            this.$props.parent.exportKey = keysObj;
            this.$emit("export");
          },
        });
      } else {
        this.$message.error("请选择要导出的字段");
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
<style lang="less" scoped>
</style>