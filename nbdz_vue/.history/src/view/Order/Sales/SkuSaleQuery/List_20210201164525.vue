<template>
  <div class="content-main">
    <div style="margin: 10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="22">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="85"
            inline
          >
            <FormItem prop="sku" label="SKU">
              <Input
                clearable
                style="width: 200px"
                v-model="filters.sku"
                placeholder="请输入搜索的sku"
              ></Input>
            </FormItem>
            <FormItem prop="refNo" label="参考单号">
              <Input
                clearable
                style="width: 200px"
                v-model="filters.refNo"
                placeholder="请输入搜索的参考单号"
              ></Input>
            </FormItem>
            <FormItem prop="createTimeStart" label="系统创建开始时间">
              <DatePicker
                v-model="filters.createTimeStart"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem prop="createTimeEnd" label="系统创建结束时间">
              <DatePicker
                v-model="filters.createTimeEnd"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 200px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button
                @click="loadFilter()"
                style="margin-right: 5px"
                class="search-btn"
                type="primary"
              >
                <Icon type="search" />&nbsp;&nbsp;搜索
              </Button>
              <Button @click="filtersData()" class="search-btn" type="primary">
                <Icon type="search" />&nbsp;&nbsp;更多筛选
              </Button>
            </FormItem>
          </Form>
        </Col>
        <Col :span="2">
          <Button @click="exportAll()" class="search-btn" type="primary"
            >导出</Button
          >
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
    <Modal
      title="筛选"
      :mask-closable="false"
      v-model="modelFilters"
      width="90%"
      scrollable
      footer-hide
    >
      <Form ref="formInline" label-position="right" :label-width="120" inline>
        <FormItem prop="sku" label="SKU">
          <Input
            clearable
            style="width: 200px"
            v-model="filters.sku"
            placeholder="请输入搜索的sku"
          ></Input>
        </FormItem>
        <FormItem prop="productCategory" label="商品类型">
          <Input
            clearable
            style="width: 200px"
            v-model="filters.productCategory"
            placeholder="请输入搜索的商品类型"
          ></Input>
        </FormItem>
        <FormItem prop="productCategoryName1" label="商品一级分类">
          <Select
            v-model="filters.productCategoryName1"
            clearable
            style="width: 150px"
          >
            <Option label="全部" value="">全部</Option>
            <Option label="服装" value="服装">服装</Option>
            <Option label="假发" value="假发">假发</Option>
          </Select>
        </FormItem>
        <FormItem prop="status" label="状态">
          <Select v-model="filters.status" clearable style="width: 150px">
            <Option
              v-for="(item, index) in statusList"
              :key="index"
              :label="item.value"
              :value="item.value"
              >{{ item.value }}</Option
            >
          </Select>
        </FormItem>
        <FormItem prop="countryCode" label="国家">
          <Input
            clearable
            style="width: 200px"
            v-model="filters.countryCode"
            placeholder="请输入搜索的国家"
          ></Input>
        </FormItem>
        <FormItem prop="refNo" label="参考单号">
          <Input
            clearable
            style="width: 200px"
            v-model="filters.refNo"
            placeholder="请输入搜索的参考单号"
          ></Input>
        </FormItem>
        <FormItem prop="platform" label="平台">
          <Select
            v-model="filters.platform"
            @on-change="changePlate"
            clearable
            style="width: 200px"
          >
            <Option
              v-for="(item, index) in plateList"
              :key="index"
              :label="item"
              :value="item"
              >{{ item }}</Option
            >
          </Select>
        </FormItem>
        <FormItem prop="storeName" label="店铺">
          <Select
            :disabled="
              !filters.platform || filters.platform == '' ? true : false
            "
            v-model="filters.storeName"
            clearable
            style="width: 200px"
            multiple
          >
            <Option
              v-for="(item, index) in shopList"
              :key="index"
              :label="item"
              :value="item"
              >{{ item }}</Option
            >
          </Select>
        </FormItem>

        <FormItem label="发货仓库">
          <Select
            v-model="filters.warehouseDesc"
            style="width: 150px"
            clearable
          >
            <Option
              v-for="(item, index) in warehouseList"
              :label="item.warehouseDesc"
              :value="item.warehouseDesc"
              :key="index"
              >{{ item.warehouseDesc }}</Option
            >
          </Select>
        </FormItem>
        <FormItem prop="createTimeStart" label="系统创建开始时间">
          <DatePicker
            v-model="filters.createTimeStart"
            type="date"
            :options="dateOptions"
            placeholder="请选择开始时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="createTimeEnd" label="系统创建结束时间">
          <DatePicker
            v-model="filters.createTimeEnd"
            type="date"
            :options="dateOptions"
            placeholder="请选择结束时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="fkTimeStart" label="付款开始时间">
          <DatePicker
            v-model="filters.fkTimeStart"
            type="date"
            :options="dateOptions"
            placeholder="请选择开始时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="fkTimeEnd" label="付款结束时间">
          <DatePicker
            v-model="filters.fkTimeEnd"
            type="date"
            :options="dateOptions"
            placeholder="请选择结束时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="fhTimeStart" label="发货开始时间">
          <DatePicker
            v-model="filters.fhTimeStart"
            type="date"
            :options="dateOptions"
            placeholder="请选择开始时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="fhTimeEnd" label="发货结束时间">
          <DatePicker
            v-model="filters.fhTimeEnd"
            type="date"
            :options="dateOptions"
            placeholder="请选择结束时间"
            style="width: 200px"
            clearable
          ></DatePicker>
        </FormItem>
        <div style="text-align: right">
          <Button @click="filtersLoad()" class="search-btn" type="primary"
            >搜索</Button
          >
        </div>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { GetPlateform, GetShop, getWareList as getWare } from "@/api/public";
import {
  SkuSaleQuery as getList,
  ExportSkuSaleQuery as exportOrder,
} from "@/api/order";
import {
  filtersNewDate as filtersDate,
  filtersNewDateTime as filtersDateTime,
} from "@/libs/validator";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      filters: {
        refNo: "",
        storeName: [],
        warehouseCode: "",
        createTimeStart: "",
        createTimeEnd: "",
        fkTimeStart: "",
        fkTimeEnd: "",
        fhTimeStart: "",
        fhTimeEnd: "",
        sku: "",
        platform: "",
        warehouseDesc: "",
        productCategory: "",
        productCategoryName1: "",
        countryCode: "",
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      listData: [],
      listColumns: [
        {
          title: "店铺",
          key: "storeName",
          width: 200,
          align: "center",
        },
        {
          title: "国家",
          key: "countryCode",
          width: 200,
          align: "center",
        },
        {
          title: "商品类型",
          key: "productCategory",
          width: 200,
          align: "center",
        },
        {
          title: "状态",
          key: "status",
          width: 200,
          align: "center",
        },
        {
          title: "子sku",
          key: "sku",
          width: 200,
          align: "center",
        },
        {
          title: "运输方式",
          key: "shipMethod",
          width: 200,
          align: "center",
        },
        {
          title: "跟踪号",
          key: "shipNo",
          width: 200,
          align: "center",
        },
        {
          title: "参考单号",
          key: "refNo",
          width: 200,
          align: "center",
        },
        {
          title: "销售单号",
          key: "saleOrderCode",
          width: 200,
          align: "center",
        },
        {
          title: "仓库单号",
          key: "warehouseOrderCode",
          width: 200,
          align: "center",
        },
        {
          title: "付款时间",
          key: "datePaidPlatform",
          width: 200,
          align: "center",
        },
        {
          title: "发货时间",
          key: "dateWarehouseShipping",
          width: 200,
          align: "center",
        },
        {
          title: "发货仓库",
          key: "warehouseDesc",
          width: 200,
          align: "center",
        },
        {
          title: "数量",
          key: "qty",
          width: 200,
          align: "center",
        },
        {
          title: "客服备注",
          key: "customerServiceNote",
          width: 200,
          align: "center",
        },
        {
          title: "订单重量",
          key: "orderWeight",
          width: 200,
          align: "center",
        },
        {
          title: "系统创建时间",
          key: "dateCreateSys",
          width: 200,
          align: "center",
        },
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      modelFilters: false,
      plateList: [],
      shopList: [],
      warehouseList: [],
    };
  },
  computed: {
    statusList() {
      return this.$store.state.orderStatus;
    },
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {};
      let filterQuery = _this.filtersObj();
      let filterCreate = filtersDate(
        "createTimeStart",
        _this.filters.createTimeStart,
        _this.filters.createTimeEnd,
        "createTimeEnd"
      );
      let filterPaid = filtersDateTime(
        "fkTimeStart",
        _this.filters.fkTimeStart,
        _this.filters.fkTimeEnd,
        "fkTimeEnd"
      );
      let filterFh = filtersDate(
        "fhTimeStart",
        _this.filters.fhTimeStart,
        _this.filters.fhTimeEnd,
        "fhTimeEnd"
      );
      if (filterCreate && filterPaid) {
        if (filterCreate.length > 0) {
          filterQuery = filterQuery.concat(filterCreate);
        }
        if (filterPaid.length > 0) {
          filterQuery = filterQuery.concat(filterPaid);
        }
        if (filterFh.length > 0) {
          filterQuery = filterQuery.concat(filterFh);
        }
      } else {
        return false;
      }
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
    loadFilter() {
      let _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
    },
    filtersObj() {
      let _this = this;
      let filterQuery = [];
      Object.keys(_this.filters).forEach((keyItem) => {
        if (
          _this.filters[keyItem] &&
          _this.filters[keyItem] != "" &&
          keyItem != "createTimeStart" &&
          keyItem != "createTimeEnd" &&
          keyItem != "fkTimeStart" &&
          keyItem != "fkTimeEnd" &&
          keyItem != "fhTimeStart" &&
          keyItem != "fhTimeEnd"
        ) {
          if (
            keyItem == "sku" ||
            keyItem == "refNo" ||
            keyItem == "productCategory" ||
            keyItem == "countryCode"
          ) {
            filterQuery.push({
              key: keyItem,
              value: _this.filters[keyItem],
              option: "lk",
              isAnd: "true",
            });
          } else if (keyItem == "storeName") {
            filterQuery.push({
              key: keyItem,
              value: _this.filters[keyItem],
              option: "in",
              isAnd: "true",
            });
          } else {
            filterQuery.push({
              key: keyItem,
              option: "eq",
              value: _this.filters[keyItem],
              isAnd: "true",
            });
          }
        }
      });
      return filterQuery;
    },

    selectLoad() {
      let _this = this;
      let data = {};
      GetPlateform().then((res) => {
        _this.plateList = res.data;
      });
      getWare(data).then((res) => {
        const resData = res.data;
        if (resData.code == 200) {
          _this.warehouseList = resData.data;
        } else {
          this.$Message.error(resData.msg);
        }
      });
    },
    changePlate() {
      let _this = this;
      GetShop(_this.filters.platform)
        .then((res) => {
          _this.shopList = res.data;
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
      let _this = this;
      let data = {};
      let filterQuery = _this.filtersObj();
      let filterCreate = filtersDate(
        "createTimeStart",
        _this.filters.createTimeStart,
        _this.filters.createTimeEnd,
        "createTimeEnd"
      );
      let filterPaid = filtersDateTime(
        "fkTimeStart",
        _this.filters.fkTimeStart,
        _this.filters.fkTimeEnd,
        "fkTimeEnd"
      );
      let filterFh = filtersDate(
        "fhTimeStart",
        _this.filters.fhTimeStart,
        _this.filters.fhTimeEnd,
        "fhTimeEnd"
      );
      if (filterCreate && filterPaid) {
        if (filterCreate.length > 0) {
          filterQuery = filterQuery.concat(filterCreate);
        }
        if (filterPaid.length > 0) {
          filterQuery = filterQuery.concat(filterPaid);
        }
        if (filterFh.length > 0) {
          filterQuery = filterQuery.concat(filterFh);
        }
      } else {
        return false;
      }
      data = {
        query: filterQuery,
      };
      this.$Spin.show();
      exportOrder(data).then((res) => {
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel",
        });
        const fileName = "SKU销售明细报表.xlsx";
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
    this.selectLoad();
  },
};
</script>

<style lang="less" scoped>
</style>