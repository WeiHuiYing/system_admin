<template>
  <div class="content-main">
    <div style="margin-bottom: 10px">
      <Row>
        <Col :span="20">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="100"
            inline
          >
            <FormItem label="发货开始时间">
              <DatePicker
                v-model="filters.SDate"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem label="发货结束时间">
              <DatePicker
                v-model="filters.EDate"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem :label-width="10">
              <Button @click="loadFilter('filter')" type="primary">搜索</Button>
            </FormItem>
          </Form>
        </Col>
        <Col :span="4" style="text-align: right">
          <Button @click="exportData()" type="primary">导出</Button>
        </Col>
      </Row>
    </div>
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
          height="650"
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
import { filtersNewDate as filtersDate, fileToJson } from "@/libs/validator";
import dayjs from "dayjs";
export default {
  data() {
    return {
      filters: {
        dateWarehouseShipping_gte: null,
        dateWarehouseShipping_lte: null,
      },
      orderData: [],
      storeData: [],
      currentTab: "store",
      orderColumns: [
        {
          title: "备注",
          key: "orderDesc",
          width: 200,
        },
        {
          title: "付款时间",
          key: "datePaidPlatform",
          width: 200,
        },
        {
          title: "发货时间",
          key: "dateWarehouseShipping",
          width: 200,
        },
        {
          title: "销售单号",
          key: "saleOrderCode",
          width: 200,
        },
        {
          title: "参考单号",
          key: "refNo",
          width: 200,
        },
        {
          title: "仓库单号",
          key: "wareHouseOrderCode",
          width: 200,
        },
        {
          title: "订单类型",
          key: "orderType",
          width: 100,
        },
        {
          title: "发货仓库",
          key: "wareHouseDesc",
          width: 200,
        },
        {
          title: "产品信息",
          key: "productSku",
          width: 200,
        },
        {
          title: "商品成本",
          key: "spUnitPrice",
          width: 200,
        },
        {
          title: "商品总成本",
          key: "zSpUnitPrice",
          width: 200,
        },
        {
          title: "产品条数",
          key: "qty",
          width: 100,
        },
        {
          title: "公司",
          key: "company",
          width: 200,
        },
        {
          title: "平台",
          key: "platform",
          width: 200,
        },
        {
          title: "店铺",
          key: "storeName",
          width: 200,
        },
        {
          title: "币种",
          key: "currency",
          width: 100,
        },
        {
          title: "订单总金额",
          key: "amountPaid",
          width: 100,
        },
        {
          title: "订单美元金额",
          key: "amountPaidUSD",
          width: 200,
        },
        {
          title: "订单人民币金额",
          key: "amountPaidRMB",
          width: 200,
        },
        {
          title: "进口税",
          key: "importVAT",
          width: 100,
        },
        {
          title: "销售税",
          key: "saleVAT",
          width: 100,
        },
        {
          title: "关税",
          key: "tariff",
          width: 100,
        },
        {
          title: "增值税",
          key: "addTax",
          width: 100,
        },
        {
          title: "税费",
          key: "tax",
          width: 100,
        },
        {
          title: "实收物流费用",
          key: "shipFee",
          width: 200,
        },
        {
          title: "paypal手续费",
          key: "platformFeeTotal",
          width: 200,
        },
        {
          title: "物流方式",
          key: "shipChannel",
          width: 200,
        },
        {
          title: "快递单号",
          key: "shippingMethodNo",
          width: 200,
        },
        {
          title: "实际运费",
          key: "uploadShippingFee",
          width: 200,
        },
        {
          title: "实际运费币种",
          key: "uploadShippingCurrency",
          width: 200,
        },
        {
          title: "买家名称",
          key: "buyerName",
          width: 200,
        },
        {
          title: "电话",
          key: "phone",
          width: 100,
        },
        {
          title: "国家",
          key: "countryName",
          width: 100,
        },
        {
          title: "州",
          key: "state",
          width: 100,
        },
        {
          title: "收货人",
          key: "name",
          width: 100,
        },
        {
          title: "地址",
          key: "address",
          width: 200,
        },
        {
          title: "邮箱",
          key: "buyerMail",
          width: 100,
        },
        {
          title: "是否9610",
          key: "isE",
          width: 100,
        },
        {
          title: "品类",
          key: "productCategoryName",
          width: 100,
        },
        {
          title: "一级品类",
          key: "productCategoryName1",
          width: 100,
        },
        {
          title: "二级品类",
          key: "productCategoryName2",
          width: 100,
        },
        {
          title: "三级品类",
          key: "productCategoryName3",
          width: 100,
        },
        {
          title: "总放款金额",
          key: "fkTotalAmount",
          width: 100,
        },
        {
          title: "是否全额放款",
          key: "isFkTotal",
          width: 120,
        },
        {
          title: "标准售价",
          key: "price",
          width: 100,
        },
        {
          title: "每行标准售价",
          key: "linePrice",
          width: 120,
        },
        {
          title: "标准售价",
          key: "price",
          width: 100,
        },
        {
          title: "标准售价占比",
          key: "priceRate",
          width: 200,
        },
        {
          title: "每行产品订单美元金额",
          key: "linePriceUSD",
          width: 200,
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
          title: "每行标准售价",
          key: "linePriceUSD",
        },
        {
          title: "订单美元金额",
          key: "amountPaidUSD",
        },
        {
          title: "订单总金额",
          key: "amountPaid",
        },
      ],
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
    loadShopTotal() {
      let _this = this;
      let data = {};
      data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: [],
      };
      _this.tableLoading = true;
      GetTop5Platform(data)
        .then((res) => {
          _this.tableLoading = false;
          const resData = res.data;
          _this.storeData = resData.data;
          _this.pageTotal = resData.totalCount;
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
      let filterFh = filtersDate(
        "dateWarehouseShipping",
        _this.filters.dateWarehouseShipping_gte,
        _this.filters.dateWarehouseShipping_lte
      );
      if (filterFh && filterFh.length > 0) {
        filterQuery = filterQuery.concat(filterFh);
      }
      data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      _this.tableLoading = true;
      GetTop5Ship(data)
        .then((res) => {
          _this.tableLoading = false;
          const resData = res.data;
          _this.orderData = resData.data;
          _this.pageTotal = resData.totalCount;
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
      if (_this.currentTab == "store") {
        _this.loadShopTotal();
      } else {
        _this.loadShipTotal();
      }
    },
    // 改变页码
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      if (_this.currentTab == "store") {
        _this.loadShopTotal();
      } else {
        _this.loadShipTotal();
      }
    },
    loadFilter() {
      const _this = this;
      _this.pageCurrent = 1;
      if (_this.currentTab == "store") {
        _this.loadShopTotal();
      } else {
        _this.loadShipTotal();
      }
    },
    // 切换tab
    // 页码设置为1，筛选条件不变
    changeTabs() {
      let _this = this;
      _this.pageCurrent = 1;
      if (_this.currentTab == "store") {
        _this.loadShopTotal();
      } else {
        _this.loadShipTotal();
      }
    },
    exportData() {
      if (this.currentTab == "store") {
        this.exportShopTotal();
      } else {
        this.exportShipTotal();
      }
    },
    exportShopTotal() {
      const _this = this;
      let filterQuery = [];
      let data = {
        query: filterQuery,
      };
      _this.tableLoading = true;
      ExportTop5Platform(data)
        .then((res) => {
          _this.tableLoading = false;
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "TOP5店铺汇总.xlsx";
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
          if (err.response && err.response.data) {
            fileToJson(err.response.data).then((errData) => {
              _this.$Message.error({
                content: errData.message,
                duration: 10,
                closable: true,
              });
            });
          }
        });
    },
    exportShipTotal() {
      const _this = this;
      let filterQuery = _this.filtersObj();
      let filterFh = filtersDate(
        "dateWarehouseShipping",
        _this.filters.dateWarehouseShipping_gte,
        _this.filters.dateWarehouseShipping_lte
      );
      if (filterFh && filterFh.length > 0) {
        filterQuery = filterQuery.concat(filterFh);
      }
      let data = {
        query: filterQuery,
      };
      _this.tableLoading = true;
      ExportTop5Ship(data)
        .then((res) => {
          _this.tableLoading = false;
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "新增TOP5发货订单明细.xlsx";
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
          if (err.response && err.response.data) {
            fileToJson(err.response.data).then((errData) => {
              _this.$Message.error({
                content: errData.message,
                duration: 10,
                closable: true,
              });
            });
          }
        });
    },
  },
  mounted() {
    if (this.currentTab == "store") {
      this.loadShopTotal();
    } else {
      this.loadShipTotal();
    }
  },
};
</script>

<style lang="less" scoped>
</style>