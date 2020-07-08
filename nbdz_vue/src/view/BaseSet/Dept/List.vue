
<template>
  <div class="content-main">
    <Split v-model="split1">
      <div slot="left" class="demo-split-pane" max="300" min="300">
        <h3>组织结构</h3>
        <dept-tree ref="deptTree" :parent="this"></dept-tree>
      </div>
      <div slot="right" class="demo-split-pane">
        <h3>同级及下级</h3>
        <div class="button-top-warp">
          <Button class="search-btn" type="success" size="small" @click="handleAdd">
            <Icon type="md-add" />&nbsp;&nbsp;新增
          </Button>
        </div>
        <div>
          <Collapse simple>
            <Panel v-for="(item,index) in listData" :key="index">
              <div style="width:80%;display:inline-block;position:relative">
                {{item.deptName}}
                <div style="position:absolute;right:0;top:0;">
                  <Button style="margin-right:10px;" type="primary" size="small" @click="handleEdit(item)">编辑</Button>
                  <Button type="error" size="small" @click="handleDelete(item)">删除</Button>
                </div>
              </div>
              <p slot="content"><Table ref="tables" :data="item.resUsers" v-bind:columns="tableColumns" stripe></Table></p>
            </Panel>
          </Collapse>
        </div>
      </div>
    </Split>
    <!--垂直居中 class-name="vertical-center-modal" 和draggable冲突 draggable后mask强制变为false-->
    <Modal
      title="编辑"
      :mask-closable="false"
      v-model="modelEdit"
      width="800"
      scrollable
      footer-hide
      @on-ok="saveEdit"
    >
      <Edit ref="edit" :parent="this" :edit-row="eidtRow"></Edit>
    </Modal>
  </div>
</template>
<script>
import "@/assets/css/util.less";
import DeptTree from "./DeptTree";
import Edit from "./Edit";
import { getChildList, Delete as deleteDept, getList ,Get } from "@/api/ResDept";
export default {
  data() {
    return {
      split1: 0.2,
      listData: [],
      pageTotal: 0,
      pageCurrent: 1,
      modelEdit: false,
      isAdd: true,
      eidtRow: {},
      selectedId: "",
      tableColumns: [
        {
          title: "编号",
          key: "id"
        },
        {
          title: "用户名",
          key: "userName"
        },
        {
          title: "真实姓名",
          key: "realName"
        },
        {
          title: "电话",
          key: "phone"
        },
        {
          title: "部门",
          key: "deptName"
        },
        {
          title: "创建时间",
          key: "createDate",
          sortable: true
        },
      ]
    };
  },
  components: {
    DeptTree,
    Edit
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        navPropertyPaths: ["resUsers"]
      };
      getList(data).then(res => {
        const resData = res.data;
        if (resData.code == 200) {
          
          _this.listData = resData.data;
        } else {
          this.$Message.error({
            content: resData.msg,
            duration: 10,
            closable: true
          });
        }
      });
    },
    getData() {
      let _this = this;
      let data = {
        id: _this.selectedId,
        navPropertyPaths: ["resUsers","childrenDept.resUsers","childrenDept.childrenDept"]
      };
      _this.listData = []
      Get(data)
        .then(res => {
          const resData = res.data;
          if (resData.code == 200) {
            _this.loadChild(resData.data);
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {});
    },
    loadChild(data){
      let _this = this;
      _this.listData.push(data)
      if(data.childrenDept.length>0){
        data.childrenDept.forEach(item => {
          _this.loadChild(item)
        });
      }
    },
    handleDelete(params) {
      var row = params;
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要删除[" + row.deptCode + "]?</p>",
        onOk: () => {
          this.remove(row);
        },
        onCancel: row => {}
      });
    },
    handleAdd() {
      this.$refs.edit.handleReset();
      this.modelEdit = true;
      this.isAdd = true;
      this.eidtRow = {};
    },
    handleEdit(params) {
      this.modelEdit = true;
      this.isAdd = false;
      this.eidtRow = params;
    },
    remove(row) {
      var id = row.id;
      deleteDept(id)
        .then(res => {
          const resData = res.data;
          const data = resData.data;
          const code = resData.code;
          const msg = resData.msg;
          if (code == 200) {
            this.$Message.info("删除成功");
            this.getData();
          } else {
            this.$Message.error({ content: msg, duration: 10, closable: true });
          }
        })
        .catch(err => {});
    },
    saveEdit() {
      var row = this.$refs.edit.Row;
    },
    deptChange(data) {
      let _this = this;
      _this.selectedId = data.id
      this.getData();
    },
    reloadAll(parnetId) {
      let data = {
        id : parnetId
      }
      this.$refs.deptTree.loadData();
      this.deptChange(data);
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
  .content-main {
    height: 99%;
    border: 1px solid #dcdee2;
    /* background-color: #fff; */
  }
  .demo-split-pane {
    padding: 10px;
  }
</style>