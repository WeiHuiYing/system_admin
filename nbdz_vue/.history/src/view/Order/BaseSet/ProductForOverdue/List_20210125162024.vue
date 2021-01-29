<template>
  <div>
    <Table
      :loading="tableLoading"
      v-bind:columns="tableColumns"
      :data="tableData"
      stripe
      height="700"
    ></Table>
  </div>
</template>

<script>
import { ProductForDays, EditProductForDays } from "@/api/order";
export default {
  data() {
    return {
      tableLoading: false,
      tableColumns: [
        {
          title: "产品品类",
          key: "type",
        },
        {
          title: "逾期天数",
          key: "expiryDays",
        },
        {
          title: "处理日期",
          key: "dealTime",
        },
      ],
      tableData: [],
    };
  },
  methods: {
    loadData(type) {
      const _this = this;
      if (type && type == "filter") {
        _this.pageCurrent = 1;
      }
      let filterQuery = [];
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      _this.tableLoading = true;
      ProductForDays(data)
        .then((res) => {
          console.log(res);
          const resData = res.data;
          _this.tableLoading = false;
          _this.tableData = resData.data;
        })
        .catch((err) => {
          _this.tableLoading = false;
          const response = err.response;
          if (response.data && response.data.detail) {
            this.$Message.error({
              content: response.data.detail,
              duration: 10,
              closable: true,
            });
          } else if (response.data) {
            let msg = "";
            Object.keys(response.data).forEach((key) => {
              msg += key + ":" + response.data[key];
            });
            this.$Message.error({
              content: msg,
              duration: 10,
              closable: true,
            });
          }
        });
    },
    changePageSize(val) {
      let _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>