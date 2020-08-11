/* 2020 / 08 / 04
weihuiying
E贸易账号管理  */
<template>
  <div></div>
</template>

<script>
import { getEAccount } from "@/api/ResManage";
export default {
  data() {
    return {
      listColums: [
        {
          title: "名称",
          key: "name",
        },
      ],
      filters: {
        status: "",
      },
      listData: [],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
    };
  },
  methods: {
    loadData() {
      const _this = this;
      let data = {};
      _this.tableLoading = true;
      getEAccount(data)
        .then((res) => {
          _this.tableLoading = false;
          let resData = res.data;
          if (res.status == 200) {
            _this.listData = resData.results;
            _this.pageTotal = resData.count;
          } else {
            this.$Message.error({
              content: resData.results,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          _this.tableLoading = false;
          if (err.response && err.response.request) {
            const response = err.response.request;
            this.$Message.error({
              content: response.responseText,
              duration: 10,
              closable: true,
            });
          }
        });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>