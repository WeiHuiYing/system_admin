<template>
  <div class="content-main">
    <Card>
      <div class="button-top-warp">
        <Button class="search-btn" type="success" size="small" @click="handleAdd">
          <Icon type="md-add" />&nbsp;&nbsp;新增
        </Button>
      </div>
      <Table ref="tables" :data="listData" v-bind:columns="listColumns" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page
            :total="pageTotal"
            :current="pageCurrent"
            @on-change="changePage"
            @on-page-size-change="changePageSize"
            :page-size="pageSize"
            :page-size-opts="[100,200,300,400,500]"
            show-total
            show-elevator
            show-sizer
          ></Page>
        </div>
      </div>
    </Card>
    <Modal title="编辑" :mask-closable="false" v-model="modelEdit" width="800" scrollable footer-hide>
      <Edit ref="edit" :parent="this" :edit-row="eidtRow"></Edit>
    </Modal>
    <Modal
      title="权限"
      :mask-closable="false"
      v-model="modelPermission"
      width="1000"
      scrollable
      footer-hide
    >
      <Permission ref="permission" :parent="this" :edit-row="eidtRow"></Permission>
    </Modal>
  </div>
</template>

<script>
import "@/assets/css/util.less";
import Edit from "./Edit";
import Permission from "@/view/Permission/List";
import { getList, getPage, Delete as deleteResource } from "@/api/ResResource";
export default {
  components: {
    Edit,
    Permission
  },
  data() {
    return {
      filters: {},
      listData: [],
      listColumns: [
        {
          title: "类型名称",
          key: "typeName"
        },
        {
          title: "中文名",
          key: "cnName"
        },
        {
          title: "英文名",
          key: "enName"
        },
        {
          title: "创建时间",
          key: "createDate"
        },
        {
          title: "编码",
          key: "resourceCode"
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
                    type: "default",
                    size: "small",
                    icon: "md-key"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.handlePermission(params);
                    }
                  }
                },
                "授权"
              ),
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
      eidtRow: {},
      isAdd: false,
      modelPermission: false,
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        order: {},
        query: [],
        navPropertyPaths: []
      };
      getPage(data)
        .then(res => {
          const resData = res.data;
          if (resData.code == 200) {
            _this.listData = resData.data;
            _this.pageTotal = resData.count;
          } else {
            this.$Message.error(resData.msg);
          }
        })
        .catch(err => {});
    },
    handleAdd() {
      let _this = this;
      _this.eidtRow = {};
      _this.modelEdit = true;
      _this.isAdd = true;
    },
    handlePermission(params) {
      let _this = this;
      _this.eidtRow = params.row;
      _this.modelPermission = true;
    },
    handleEdit(params) {
      let _this = this;
      _this.eidtRow = params.row;
      _this.modelEdit = true;
      _this.isAdd = false;
    },
    handleDelete(params) {
      let _this = this;
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要删除?</p>",
        onOk: () => {
          deleteResource(params.row.id)
            .then(res => {
              const resData = res.data;
              if (resData.code === 200) {
                this.$Message.info("删除成功");
                this.loadData();
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
        onCancel: row => {}
      });
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    changePageSize(size) {
      let _this = this;
      _this.pageSize = size;
      _this.loadData();
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
