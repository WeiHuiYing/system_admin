<template>
  <div>
    <Card>
      <div class="button-top-warp">
        <Button class="search-btn" type="success" size="small" @click="handleAdd">
          <Icon type="md-add" />&nbsp;&nbsp;新增
        </Button>
      </div>
      <Table ref="tables" :data="tableData" v-bind:columns="tableColumns" stripe></Table>
    </Card>
    <Modal title="编辑" :mask-closable="false" v-model="modelEdit" width="800" scrollable footer-hide>
      <Edit ref="edit" :parent="this" :edit-row="editPermission"></Edit>
    </Modal>
  </div>
</template>

<script>
import {
  getList as getFunction,
  Delete as deleteFunction
} from "@/api/pubFunction";
import "@/assets/css/util.less";
import Edit from "./Edit";
export default {
  props: { editRow: Object, parent: Object },
  components: {
    Edit
  },
  data() {
    return {
      Row: {},
      tableData: [],
      tableColumns: [
        {
          title: "英文名",
          key: "enName"
        },
        {
          title: "中文名",
          key: "cnName"
        },
        {
          title: "编码",
          key: "permissionCode"
        },
        {
          title: "创建时间",
          key: "createDate",
          sortable: true
        },
        {
          title: "操作",
          key: "action",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    icon: "md-create"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.handleEdit(params);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    icon: "md-trash"
                  },
                  on: {
                    click: () => {
                      this.handleDelete(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      modelEdit: false,
      isAdd: false,
      editPermission: {}
    };
  },
  watch: {
    editRow(newVal, oldVal) {
      this.Row = Object.assign({}, newVal);
      if (this.Row.id) {
        this.loadData();
      }
    }
  },
  methods: {
    loadData() {
      let _this = this;
      getFunction(_this.Row.id)
        .then(res => {
          const resData = res.data;
          if (resData.code == 200) {
            _this.tableData = resData.data;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(params) {
      let _this = this;
      _this.isAdd = false;
      _this.editPermission = params.row;
      _this.modelEdit = true;
    },
    handleDelete(params) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要删除?</p>",
        onOk: () => {
          deleteFunction(params.row.id)
            .then(res => {
              const resData = res.data;
              if (resData.code == 200) {
                this.$Message.info("删除成功");
              } else {
                this.$Message.error({
                  content: resData.msg,
                  duration: 10,
                  closable: true
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        },
        onCancel: row => {}
      });
    },
    handleAdd() {
      let _this = this;
      _this.isAdd = true;
      _this.editPermission = {
        resResourceId: _this.Row.id
      };
      _this.modelEdit = true;
    }
  },
  mounted() {}
};
</script>