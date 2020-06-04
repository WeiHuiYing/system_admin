<template>
  <div>
    <Tree :data="DeptTree" @on-select-change="deptTreeChange"></Tree>
  </div>
</template>
<script>
import { getList } from "@/api/ResDept";
export default {
  props: {
    parent: {}
  },
  data() {
    return {
      Depts: [],
      DeptTree: [],
      DeptTreeItems: []
    };
  },
  methods: {
    loadData() {
      let _this = this;
      _this.Depts = [];
      _this.DeptTree = [];
      _this.DeptTreeItems = [];
      let data = {
        navPropertyPaths: ["childrenDept"]
      };
      getList(data)
        .then(res => {
          const resData = res.data;
          const data = resData.data;
          _this.Depts = data;
          _this.loadTree();
        })
        .catch(err => {});
    },
    loadTree() {
      let _this = this;
      _this.DeptTree = _this.loadDeptChild(_this.Depts);
    },
    loadDeptChild(treeData) {
      let _this = this;
      let treeItem = [];
      treeItem = treeData
        .map(item => {
          if (!item.parentId) {
            let obj = {
              expand: true
            };
            obj.title = item.deptName;
            obj.id = item.id;
            obj.value = item.deptCode;
            if (item.childrenDept.length > 0) {
              obj.children = this.loadDeptChildItem(item.childrenDept);
            } else {
              obj.children = [];
            }
            return obj;
          }
        })
        .filter(item => {
          if (item) {
            return item;
          }
        });
      return treeItem;
    },
    loadDeptChildItem(treeData) {
      let _this = this;
      let treeItem = [];
      treeItem = treeData.map(item => {
        let obj = {
          expand: true
        };
        obj.title = item.deptName;
        obj.id = item.id;
        obj.value = item.deptCode;
        if (item.childrenDept.length > 0) {
          obj.children = this.loadDeptChildItem(item.childrenDept);
        } else {
          obj.children = [];
        }
        return obj;
      });
      return treeItem;
    },
    deptSelect() {
      if (!this.Depts || this.Depts.length <= 0) {
        this.loadData();
      }
    },
    deptTreeChange(data) {
      var item0 = data[0];
      this.parent.deptChange(item0);
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>