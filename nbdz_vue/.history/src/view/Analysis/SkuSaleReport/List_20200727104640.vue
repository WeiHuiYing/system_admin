/* 2020 / 07 / 24
weihuiying
产品销售分析报表  */
<template>
  <div class="content-main">
    <div style="margin:10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="22">
          <Form ref="formInline" label-position="right" :label-width="80" inline>
            <FormItem label="产品信息（sku）">
              <Input class="search-input" clearable v-model="filters.sku" />
            </FormItem>
            <FormItem label="公司">
              <Input class="search-input" clearable v-model="filters.company" />
            </FormItem>
            <FormItem label="发货仓库">
              <Select v-model="filters.wareHouseDesc" style="width:200px" clearable>
                <Option
                  v-for="item in warehouseList"
                  :value="item.wareHouseDesc"
                  :key="item.wareHouseDesc"
                >{{ item.warehouseDesc }}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button
                @click="loadFilter()"
                style="margin-right:5px"
                class="search-btn"
                type="primary"
              >搜索</Button>
              <Button @click="filtersData()" class="search-btn" type="primary">更多筛选</Button>
            </FormItem>
          </Form>
        </Col>
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
    <Modal
      title="筛选"
      :mask-closable="false"
      v-model="modelFilters"
      width="90%"
      scrollable
      footer-hide
    >
      <Form ref="formInline" label-position="right" :label-width="150" inline>
        <FormItem label="产品信息（sku）">
          <Input class="search-input" clearable v-model="filters.sku" />
        </FormItem>
        <FormItem label="公司">
          <Input class="search-input" clearable v-model="filters.company" />
        </FormItem>
        <FormItem label="发货仓库">
          <Select v-model="filters.wareHouseDesc" style="width:200px" clearable>
            <Option
              v-for="item in warehouseList"
              :value="item.wareHouseDesc"
              :key="item.wareHouseDesc"
            >{{ item.warehouseDesc }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="FkStart" label="付款开始时间">
          <DatePicker
            v-model="filters.FkStart"
            type="date"
            :options="dateOptions"
            placeholder="请选择开始时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="FkEnd" label="付款结束时间">
          <DatePicker
            v-model="filters.FkEnd"
            type="date"
            :options="dateOptions"
            placeholder="请选择结束时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="FhStart" label="发货开始时间">
          <DatePicker
            v-model="filters.FhStart"
            type="date"
            :options="dateOptions"
            placeholder="请选择开始时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="FhEnd" label="发货结束时间">
          <DatePicker
            v-model="filters.FhEnd"
            type="date"
            :options="dateOptions"
            placeholder="请选择结束时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="plateform" label="平台">
          <Select
            v-model="filters.plateform"
            @on-change="changePlate"
            clearable
            style="width:200px"
          >
            <Option
              v-for="(item,index) in plateList"
              :key="index"
              :label="item"
              :value="item"
            >{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem prop="storeName" label="店铺">
          <Select
            :disabled="filters.plateform == ''? true : false"
            v-model="filters.storeName"
            clearable
            style="width:200px"
            multiple
          >
            <Option
              v-for="(item,index) in shopList"
              :key="index"
              :label="item"
              :value="item"
            >{{item}}</Option>
          </Select>
        </FormItem>
        <div style="text-align:right;">
          <Button @click="filtersLoad()" class="search-btn" type="primary">搜索</Button>
        </div>
      </Form>
    </Modal>
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
      filters: {
        company: "",
        wareHouseDesc: "",
      },
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
          width: "100",
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
          width: "100",
        },
        {
          title: "产品重量(总重量净重)",
          key: "zproductNetWeight",
          width: "150",
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
          title: "州",
          key: "state",
          width: "200",
        },
        {
          title: "订单总金额",
          key: "amountpaid",
          width: "80",
          sortable: true,
        },
        {
          title: "公司",
          key: "company",
          width: "200",
          sortable: true,
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
      warehouseList: [],
      modelFilters: false,
      plateList: [],
      shopList: [],
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
    loadWare() {
      const _this = this;
      let data = {};
      getWare(data).then((res) => {
        const resData = res.data;
        if (resData.code == 200) {
          _this.warehouseList = resData.data;
        } else {
          this.$Message.error(resData.msg);
        }
      });
    },
    loadPlate() {
      let _this = this;
      let data = {};
      GetPlateform().then((res) => {
        _this.plateList = res.data;
      });
    },
    changePlate() {
      let _this = this;
      GetShop(_this.filters.plateform)
        .then((res) => {
          _this.shopList = res.data;
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
    filtersData() {
      let _this = this;
      _this.modelFilters = true;
    },
    filtersLoad() {
      let _this = this;
      _this.modelFilters = false;
      _this.pageCurrent = 1;
      _this.loadData();
    },
  },
  mounted() {
    this.loadData();
    this.loadWare();
    this.loadPlate();
  },
};
</script>

<style lang="less" scoped>
</style>