/* 2020 / 08/ 24
weihuiying
综合站发货时效报表  */
<template>
  <div class="content-main">
    <div style="margin:10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="24"></Col>
      </Row>
    </div>
    <Table
      height="700"
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColumns"
      stripe
    ></Table>
  </div>
</template>

<script>
import { hsCode as getList } from "@/api/Customs";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listData: [],
      listColumns: [
        {
          title: "海关编码",
          key: "HsCode",
          align: "center",
        },
        {
          title: "申报中文名",
          key: "ReportName",
          align: "ReportName",
        },
        {
          title: "申报英文名",
          key: "ReportEnName",
          align: "ReportEnName",
        },
      ],
      tableLoading: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {};
      data = {};
      _this.tableLoading = true;
      getList(data, "Get")
        .then((res) => {
          console.log(res);
          const resData = res.data;
          _this.tableLoading = false;
          if (resData.status == 200) {
            _this.listData = resData.results;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
</style>