/* 2020 / 08 / 04
weihuiying
E贸易账号管理  */
<template>
  <div class="content-main">
    <Table
      ref="tables"
      height="800"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
    ></Table>
  </div>
</template>

<script>
import { getEAccount } from "@/api/ResManage";
export default {
  data() {
    return {
      listColums: [
        {
          title: "企业名称",
          key: "name",
        },
        {
          title: "企业简称",
          key: "company_abb",
        },
        {
          title: "企业名称(E)",
          key: "companyName",
        },
        {
          title: "企业编号(E)",
          key: "companyCode",
        },
        {
          title: "发货人名称",
          key: "shipper",
        },
        {
          title: "发货人地址",
          key: "shipperAddress",
        },
        {
          title: "发货人电话",
          key: "shipperTelephone",
        },
      ],
      filters: {
        status: "",
      },
      listData: [],
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