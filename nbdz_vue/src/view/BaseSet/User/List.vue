<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Form ref="formInline" label-position="right" :label-width="60" inline>
        <FormItem label="用户名">
          <Input class="search-input" clearable v-model="filters.userName" />
        </FormItem>
        <FormItem label="电话">
          <Input class="search-input" clearable v-model="filters.phone" />
        </FormItem>
        <FormItem>
          <Button @click="loadFilter()" class="search-btn" type="primary">
            <Icon type="search" />&nbsp;&nbsp;搜索
          </Button>
        </FormItem>
      </Form>
    </div>
    <Card>
      <div class="button-top-warp">
        <Button class="search-btn" type="success" size="small" @click="handleAdd">
          <Icon type="md-add" />&nbsp;&nbsp;新增
        </Button>
      </div>
      <Table ref="tables" :data="listData" v-bind:columns="tableColumns1" stripe></Table>
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
      width="800"
      scrollable
      footer-hide
    >
      <Permission ref="Permission" :parent="this" :edit-row="eidtRow"></Permission>
    </Modal>
  </div>
</template>
<script>
import "@/assets/css/util.less";
import { getList, Delete as deleteUser } from "@/api/ResUser";
import Edit from "./Edit";
import Permission from "./Permission";
export default {
  name: "userManage", //与 router.js notCache:fasle且name相同 将缓存组件。
  components: {
    Edit,
    Permission
  },
  data() {
    return {
      filters: {
        userName: "",
        phone: ""
      },
      listData: [],
      pageTotal: 0,
      pageCurrent: 1,
      pageSize: 100,
      tableColumns1: [
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
          key: "createDate"
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
      modelPermission: false
    };
  },
  computed: {},
  methods: {
    loadData() {
      let _this = this;
      if (!_this.pageCurrent) _this.pageCurrent = 1;
      let filtersQuery = [];
      let filersName = {};
      let filersPhone = {};
      if (_this.filters.userName && _this.filters.userName != "") {
        filersName = {
          key: "userName",
          binaryop: "eq",
          value: _this.filters.userName,
          andorop: "and"
        };
        filtersQuery.push(filersName);
      }
      if (_this.filters.phone && _this.filters.phone != "") {
        filersPhone = {
          key: "phone",
          binaryop: "eq",
          value: _this.filters.phone,
          andorop: "and"
        };
        filtersQuery.push(filersPhone);
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        order: {},
        query: filtersQuery,
        navPropertyPaths: ["resUserRoles"]
      };
      getList(data)
        .then(res => {
          if (res.data.code == 200) {
            _this.listData = res.data.data;
            _this.pageTotal = res.data.count;
          } else {
            this.$Message.error({
              content: res.data.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleDelete(params) {
      let _this = this;
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要删除?</p>",
        onOk: () => {
          deleteUser(params.row.id)
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
    handleEdit(params) {
      let _this = this;
      _this.eidtRow = params.row;
      _this.isAdd = false;
      _this.modelEdit = true;
    },
    handlePermission(params) {
      let _this = this;
      _this.eidtRow = params.row;
      _this.modelPermission = true;
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
    },
    loadFilter() {
      const _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
    },
    handleAdd() {
      let _this = this;
      _this.eidtRow = {};
      _this.isAdd = true;
      _this.modelEdit = true;
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
