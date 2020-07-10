<template>
  <div class="content-main">
    <div class="button-top-warp">
      <Button class="search-btn" type="success" size="small" @click="handleAdd">
        <Icon type="md-add" />&nbsp;&nbsp;新增
      </Button>
    </div>
    <Table :loading="tableLoading" :data="listData" :columns="listColumns"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
          :page-size="pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="[100,200,300,400,500]"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </div>
    </div>
    <Modal
      title="详情"
      :mask-closable="false"
      v-model="modelDetils"
      width="90%"
      scrollable
      footer-hide
    >
      <Detils ref="detils" :parent="this" :detils-row="detilsRow"></Detils>
    </Modal>
  </div>
</template>

<script>
import Detils from "./Detils";
import { getCurrency as getList } from "@/api/ResCurrency";
export default {
  data() {
    return {
      listData: [],
      listColumns: [
        {
          title: "货币代码",
          key: "currencyCode"
        },
        {
          title: "货币名称",
          key: "currencyName"
        },
        {
          title: "对RMB汇率",
          key: "currencyRate2RMB"
        },
        {
          title: "对USD汇率",
          key: "currencyRate2USD"
        },
        {
          title: "开始时间",
          key: "startTime"
        },
        {
          title: "结束时间",
          key: "endTime"
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
      tableLoading: false,
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      modelDetils: false,
      detilsRow: {},
      isAdd: false
    };
  },
  methods: {
    handleAdd() {
      const _this = this;
    },
    loadData() {
      const _this = this;
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize
      };
      getList(data)
        .then(res => {
          const resData = res.data;
          if (resData.code == 200) {
            _this.listData = resData.data;
            _this.pageTotal = resData.totalCount;
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
    changePage(val) {
      const _this = this;
      _this.pageCurrent = val;
    },
    changePageSize(val) {
      const _this = this;
      _this.pageSize = val;
    },
    handleEdit(params) {
      const _this = this;
    },
    handleDelete(params) {
      const _this = this;
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>