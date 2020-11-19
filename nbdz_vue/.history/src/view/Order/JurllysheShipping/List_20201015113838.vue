/* 2020 / 10/ 14
weihuiying
亚马逊索赔报表  */
<template>
  <div>
    <Row class="search-con search-con-top">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="店铺">
            <Select
              clearable
              placeholder="请选择店铺"
              v-model="filters.store_name"
              style="width: 200px"
            >
              <Option
                v-for="(item, index) in amazonStore"
                :key="index"
                :value="item"
                >{{ item }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="开始时间">
            <DatePicker
              v-model="filters.approval_date_gte"
              type="date"
              :options="dateOptions"
              placeholder="请选择开始时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="结束时间">
            <DatePicker
              v-model="filters.approval_date_lte"
              type="date"
              :options="dateOptions"
              placeholder="请选择结束时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem>
            <Button
              style="margin-right: 5px"
              @click="loadData('filter')"
              type="primary"
              >搜索</Button
            >
          </FormItem>
        </Form>
      </Col>
      <Col :span="2"
        ><Button style="margin-right: 5px" @click="exportData()" type="primary"
          >导出</Button
        ></Col
      >
    </Row>
    <Table
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :border="true"
      height="700"
    >
    </Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
          :page-size="pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="[100, 200, 300, 400, 500]"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
import {
  JurllysheGetList as getList,
  JurllysheExportList as exportList,
} from "@/api/Order";
import dayjs from "dayjs";
import { filtersLogDate as filtersDate } from "@/libs/validator";
export default {
  data() {
    return {
      tableLoading: false,
      listData: [],
      pageCurrent: 1,
      pageTotal: 1,
      pageSize: 100,
      filters: {
        store_name: "",
        approval_date_gte: "",
        approval_date_lte: "",
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      selectionList: [],
      listColums: [
        {
          title: "销售单号",
          key: "saleOrderCode",
          align: "center",
        },
        {
          title: "参考单号",
          key: "refNo",
          align: "center",
        },
        {
          title: "订单号",
          key: "amazon_order_id",
          align: "center",
        },
        {
          title: "赔偿金额",
          key: "amount_total",
          align: "center",
        },
        {
          title: "sku",
          key: "inside_sku",
          align: "center",
        },
        {
          title: "子商品",
          key: "child_sn",
          align: "center",
          width: 200,
          type: "html",
        },
        {
          title: "店铺名称",
          key: "store_name",
          align: "center",
        },
        {
          title: "赔偿数量合计",
          key: "quantity_reimbursed_total",
          align: "center",
        },
        {
          title: "原因",
          key: "reason",
          align: "center",
        },
      ],
    };
  },
  computed: {
    amazonStore() {
      return this.$store.state.amazonStore;
    },
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
      getList(data)
        .then((res) => {
          const resData = res.data;
          _this.tableLoading = false;
          _this.listData = resData.data;
          _this.pageTotal = resData.totalCount;
        })
        .catch((err) => {
          _this.tableLoading = false;
          console.log(err);
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
    exportData() {
      const _this = this;
      let data = {};

      _this.tableLoading = true;
      exportList(data)
        .then((res) => {
          _this.tableLoading = false;
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "亚马逊索赔报表.xlsx";
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放 URL对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
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