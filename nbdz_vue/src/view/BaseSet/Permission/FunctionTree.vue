<template>
  <div>
    <Tree :data="functionTree"></Tree>
  </div>
</template>
<script>
import { getList as getFunctions } from "@/api/ResResource";
export default {
  props: {
    parent: {}
  },
  data() {
    return {
      functions: [],
      functionTree: [],
      functionTreeItems: []
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        navPropertyPaths: ["resPermissions"]
      };
      _this.functions = [];
      _this.functionTree = [];
      _this.functionTreeItems = [];
      getFunctions(data)
        .then(res => {
          const resData = res.data;
          if (resData.code == 200) {
            _this.functions = resData.data;
            _this.loadFunction();
          } else {
            this.$Message.error({
              content: msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {});
    },
    loadFunction() {
      let _this = this;
      _this.functionTree = _this.functions.map(item => {
        let obj = {
          expand: true,
          checked: false,
          children: []
        };
        obj.title = item.cnName;
        obj.id = item.id;
        if (item.resPermissions.length > 0) {
          obj.children = item.resPermissions.map(child => {
            let childrenItem = {
              expand: true
            };
            childrenItem.checked = _this.checkedCodes.includes(child.id);
            childrenItem.title = child.cnName;
            childrenItem.id = child.id;
            return childrenItem;
          });
        }
        return obj;
      });
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
