
<template>
  <div class="content-main">
    <div class="button-top-warp">
      <Button class="search-btn" type="success" size="small" @click="handleAdd">
        <Icon type="md-add" />&nbsp;&nbsp;新增
      </Button>
    </div>
    <Table row-key="id" :indent-size="20" :columns="listColums" :data="listData" border></Table>

    <Modal
      title="编辑"
      :mask-closable="false"
      v-model="modelEdit"
      width="1200"
      scrollable
      footer-hide
    >
      <Edit ref="edit" :parent="this" :edit-row="eidtRow"></Edit>
    </Modal>
  </div>
</template>
<script>
import "@/assets/css/util.less";
import Edit from "./Edit";
import { getList, deleteMenus } from "@/api/ResMenus";
export default {
  data() {
    return {
      listData: [],
      listColums: [
        {
          title: "名称",
          key: "name",
          tree: true
        },
        {
          title: "路径",
          key: "path"
        },
        {
          title: "组件",
          key: "component"
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
                    size: "small"
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
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.handleAddChild(params);
                    }
                  }
                },
                "新增子菜单"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
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
      eidtRow: {},
      isAdd: false
    };
  },
  components: {
    Edit
  },
  methods: {
    loadData() {
      let _this = this;
      getList().then(res => {
        const resData = res.data;
        _this.listData = resData.data;
      });
    },
    handleEdit(params) {
      let _this = this;
      _this.eidtRow = params.row;
      _this.modelEdit = true;
      _this.isAdd = false;
    },
    handleDelete(params) {
      let _this = this;
      deleteMenus(params.row.id).then(res => {
        const resData = res.data;
        const data = resData.data;
        const code = resData.code;
        const msg = resData.msg;
        if (code == 200) {
          this.$Message.info("删除成功");
          this.loadData();
        } else {
          this.$Message.error({ content: msg, duration: 10, closable: true });
        }
      });
    },
    handleAdd() {
      let _this = this;
      _this.eidtRow = {
        component: "components/main"
      };
      _this.modelEdit = true;
      _this.isAdd = true;
    },
    handleAddChild(params) {
      let _this = this;
      _this.eidtRow = {
        parentId: params.row.id
      };
      _this.modelEdit = true;
      _this.isAdd = true;
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
</style>