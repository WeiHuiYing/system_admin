<template>
  <div class="content-main">
    <Table
      ref="tables"
      height="750"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      border
    ></Table>
  </div>
</template>

<script>
import { configLogistics as getList } from "@/api/Logistics";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      listColums: [
        {
          title: "预留参数",
          key: "name",
        },
        {
          title: "描述",
          key: "desc",
        },
        {
          title: "Value",
          key: "value",
        },
      ],
      listData: [],
      filters: {},
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      _this.tableLoading = true;
      getList()
        .then((res) => {
          _this.tableLoading = false;
          _this.listData = res.data.results;
          _this.pageTotal = res.data.count;
        })
        .catch((err) => {
          _this.tableLoading = false;
          console.log(err);
        });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less"></style>
