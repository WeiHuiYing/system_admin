<template>
  <div class="content-main">
    <Tabs v-model="currentTab" @on-click="changeTabs()">
      <TabPane label="店铺汇总" name="store">
        <Table
          height="650"
          ref="storeTables"
          :loading="tableLoading"
          :data="storeData"
          v-bind:columns="storeColumns"
          stripe
        ></Table>
      </TabPane>
      <TabPane label="新增发货订单" name="order">
        <Table
          ref="orderTables"
          :loading="tableLoading"
          :data="orderData"
          v-bind:columns="orderColumns"
          stripe
        ></Table>
      </TabPane>
    </Tabs>
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
  GetTop5Platform,
  ExportTop5Platform,
  GetTop5Ship,
  ExportTop5Ship,
} from "@/api/finance";
import { filtersNewDate as filtersDate } from "@/libs/validator";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      filters: {},
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      orderData: [],
      storeData: [],
      totalVisible: false,
      currentTab: "",
      orderColumns: [
        {
          title: "平台",
          key: "platform",
        },
        {
          title: "货币类型",
          key: "currency",
        },
        {
          title: "订单数量",
          key: "orderQty",
        },
        {
          title: "商品数量",
          key: "productQty",
        },
        {
          title: "订单总运费",
          key: "shipFee",
        },
        {
          title: "订单总金额",
          key: "total",
        },
        {
          title: "订单总成本",
          key: "cost",
        },
        {
          title: "订单毛利率",
          key: "grossMargin",
        },
        {
          title: "成本占比",
          key: "costShare",
        },
      ],
      storeColumns: [
        {
          title: "公司",
          key: "company",
        },
        {
          title: "平台",
          key: "platform",
        },
        {
          title: "店铺",
          key: "storeName",
        },
        {
          title: "产品信息",
          key: "productSku",
        },
        {
          title: "产品条数",
          key: "qty",
        },
        {
          title: "品类",
          key: "productCategoryName",
        },
        {
          title: "一级品类",
          key: "productCategoryName1",
        },
        {
          title: "二级品类",
          key: "productCategoryName2",
        },
        {
          title: "三级品类",
          key: "productCategoryName2",
        },
        {
          title: "产品订单美元金额",
          key: "amountPaidUSD",
        },
        {
          title: "头套品类总收入",
          key: "amountPaid",
        },
        {
          title: "头套品类美元总收入",
          key: "linePriceUSD",
        },
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      plateList: [],
      wareList: [],
      shopList: [],
      plateShopList: [],
    };
  },
  methods: {
    loadShopTotal() {
      let _this = this;
      let data = {};
      let filterQuery = _this.filtersObj();
      data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      _this.tableLoading = true;
      GetTop5Platform(data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
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
    loadShipTotal() {
      let _this = this;
      let data = {};
      let filterQuery = _this.filtersObj();
      data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      _this.tableLoading = true;
      GetTop5Ship(data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
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
    // 筛选条件字段拼接
    filtersObj() {
      let _this = this;
      let filterQuery = [];
      return filterQuery;
    },
    // 改变每页数值
    changePageSize(val) {
      let _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
    // 改变页码
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    loadFilter() {
      const _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
    },
    // 切换tab
    // 页码设置为1，筛选条件不变
    changeTabs() {
      let _this = this;
      if (_this.currentTab == "store") {
        _this.totalVisible = false;
      } else {
        _this.totalVisible = true;
      }
      _this.pageCurrent = 1;

      _this.loadData();
    },
  },
  mounted() {
    this.loadShopTotal();
    this.loadShipTotal();
  },
};
</script>

<style lang="less" scoped>
</style>