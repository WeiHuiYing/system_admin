/* 2020 / 07 / 24
weihuiying
产品销售分析报表  */
<template>
  <div class="content-main">
    <div style="margin:10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="22"></Col>
        <Col :span="2">
          <Button @click="exportAll()" class="search-btn" type="primary">导出</Button>
        </Col>
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
import {
  SkuSaleReport as getList,
  exportSkuSaleReport as exportReport,
} from "@/api/Analysis";
import { getList as getWare } from "@/api/ECWarehouse";
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
      listData: [],
      listColumns: [
        {
          title: "sku",
          key: "productSku",
          width: "200",
        },
        {
          title: "参考单号",
          key: "refNo",
          width: "200",
        },
        {
          title: "销售单号",
          key: "saleOrderCode",
          width: "200",
        },
        {
          title: "数量",
          key: "qty",
          width: "80",
        },
        {
          title: "商品成本",
          key: "spUnitPrice",
          width: "80",
        },
        {
          title: "state",
          key: "state",
          width: "200",
        },
        {
          title: "状态",
          key: "status",
          width: "200",
        },
        {
          title: "仓库",
          key: "wareHouseDesc",
          width: "200",
        },
        {
          title: "仓库编码",
          key: "warehouseOrderCode",
          width: "200",
        },
        {
          title: "商品总成本",
          key: "zSpUnitPrice",
          width: "200",
        },
        {
          title: "产品重量(总重量净重)",
          key: "zproductNetWeight",
          width: "200",
        },
        {
          title: "店铺",
          key: "storeName",
          width: "200",
        },
        {
          title: "国家",
          key: "countryName",
          width: "200",
        },
        {
          title: "订单总金额",
          key: "amountpaid",
          width: "200",
          sortable: true,
          width: "200",
        },
        {
          title: "公司",
          key: "company",
          width: "200",
          sortable: true,
          width: "200",
        },
        {
          title: "店铺佣金/手续费",
          key: "finalvaluefeeTotal",
          width: "200",
        },
        {
          title: "订单类型",
          key: "orderType",
          width: "200",
        },
        {
          title: "交易ID",
          key: "paypalTransactionId",
          width: "200",
        },
        {
          title: "平台",
          key: "plateform",
          width: "200",
        },
        {
          title: "一级品类",
          key: "procutCategoryName1",
          width: "200",
        },
        {
          title: "二级品类",
          key: "procutCategoryName2",
          width: "200",
        },
        {
          title: "三级品类",
          key: "procutCategoryName3",
          width: "200",
        },
        {
          title: "产品重量(净重)",
          key: "productNetWeight",
          width: "200",
        },
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      modelFilters: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {};
      let filterQuery = [];
      data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          const resData = res.data;
          _this.tableLoading = false;
          if (resData.code == 200) {
            _this.listData = resData.data;
            _this.pageTotal = resData.totalCount;
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
    exportAll() {
      let data = {};
      let _this = this;
      let filterQuery = [];
      data = {
        query: filterQuery,
      };
      this.$Spin.show();
      exportReport(data).then((res) => {
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel",
        });
        const fileName = "产品销售分析报表.xlsx";
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
        this.$Spin.hide();
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