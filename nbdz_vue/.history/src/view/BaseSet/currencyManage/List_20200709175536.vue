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
  </div>
</template>

<script>
import Detils from "./Detils";
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
        }
      ],
      tableLoading: false,
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100
    };
  },
  methods: {
    handleAdd() {
      const _this = this;
    },
    loadData() {
      const _this = this;
    },
    changePage(val) {
      const _this = this;
      _this.pageCurrent = val;
    },
    changePageSize(val) {
      const _this = this;
      _this.pageSize = val;
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>