
<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Form ref="formInline" label-position="right" :label-width="60" inline>
        <FormItem label="角色名">
          <Input class="search-input" clearable v-model="filters.roleName" />
        </FormItem>
          <Button class="search-btn" type="primary" @click="loadFilter()">
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
      <Table ref="tables" :data="tableData" :loading="tableLoading" v-bind:columns="tableColumns" stripe></Table>
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

      <Modal
      title="授权"
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
import Edit from "./Edit";
import Permission from "./Permission";
import { getPage , Delete as deleteRole} from "@/api/ResRole";

export default {
  components: {
    Edit,
    Permission
  },
  data() {
    return {
      tableData: [],
      filters: {
        roleName:''
      },
      pageTotal: 0,
      pageCurrent: 1,
      pageSize:100,
      modelEdit: false,
      modelPermission:false,
      isAdd: true,
      eidtRow: {},
      tableColumns: [
        {
          title: "编号",
          key: "roleCode"
        },
        {
          title: "角色名",
          key: "roleName"
        },
        {
          title: "创建时间",
          key: "createDate"
        },
        {
          title: "写入时间",
          key: "writeDate"
        },
        {
          title: "备注",
          key: "remark"
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
      tableLoading:false,
    };
  },
  computed: {},
  methods: {
    loadData(){
      let _this = this;
      let filtersQuery = [];
      let filersRole = {};
      if (_this.filters.roleName && _this.filters.roleName != "") {
        filersRole = {
          key: "roleName",
          binaryop: "eq",
          value: _this.filters.roleName,
          andorop: "and"
        };
        filtersQuery.push(filersRole);
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        order: {},
        query: filtersQuery,
        navPropertyPaths: []
      }
      _this.tableData = [];
      _this.tableLoading = true;
      getPage(data).then(res => {
        _this.tableLoading = false;
        const resData = res.data;
        if(resData.code === 200){
          if(resData.data){
            _this.tableData = resData.data;
          }
          
          _this.pageTotal = resData.count;
        }else{
          this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true
          });
        }
      }).catch(res => {
        _this.tableLoading = false;
        console.log(res)
      })
    },
    changePage(page) {
      let _this = this;
      _this.pageCurrent = page;
      _this.loadData();
    },
    changePageSize(pageSize) {
      let _this = this;
      _this.pageSize = pageSize;
      _this.loadData();
    },
    
    loadFilter() {
      const _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
    },
    handleDelete(params) {
      var row = params.row;
      let _this = this;
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要删除[" + row.roleName + "]?</p>",
        onOk: () => {
          deleteRole(row.id).then(res=>{
            const resData = res.data;
            if(resData.code === 200){
              this.$Message.info("删除成功");
              _this.loadData()
            }else{
              this.$Message.error({
                  content: resData.msg,
                  duration: 10,
                  closable: true
              });
            }
          }).catch(err =>{console.log(err)})
        },
        onCancel: row => {}
      });
    },
    handleAdd() {
      this.modelEdit = true;
      this.isAdd = true;
      this.eidtRow = {};
    },
    handleEdit(params) {
      this.modelEdit = true;
      this.isAdd = false;
      this.eidtRow = params.row;
    },
    handlePermission(params) {
      this.modelPermission = true;
      this.eidtRow = params.row;
    },
    saveEdit() {
      var row = this.$refs.edit.Row;
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

