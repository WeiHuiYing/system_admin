<template>
  <div class="content-main">
    <div class="button-top-warp">
      <Button class="search-btn" type="success" size="small" @click="handleAdd">
        <Icon type="md-add" />&nbsp;&nbsp;新增
      </Button>
    </div>
    <Table :loading="tableLoading" :data="listData" :columns="listColumns"></Table>
  </div>
</template>

<script>
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
      tableLoading: false
    };
  },
  methods: {
    handleAdd() {},
    loadData() {
      const _this = this;
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>