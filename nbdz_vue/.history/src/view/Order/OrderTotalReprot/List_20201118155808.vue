/* 2020 / 07 / 28
weihuiying
订单数量报表  */
<template>
  <div class="content-main">
    <div style="margin: 10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="22">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="80"
            inline
          >
            <FormItem label="参考单号">
              <Input clearable v-model="filters.RefNo" />
            </FormItem>
            <FormItem label="发货仓库">
              <Select
                v-model="filters.saleWarehourse"
                style="width: 200px"
                clearable
              >
                <Option
                  v-for="(item, index) in warehouseList"
                  :label="item.warehouseCode"
                  :value="item.warehouseCode"
                  :key="index"
                  >{{ item.warehouseCode }}</Option
                >
              </Select>
            </FormItem>
            <FormItem>
              <Button
                @click="loadFilter()"
                style="margin-right: 5px"
                class="search-btn"
                type="primary"
                >搜索</Button
              >
              <Button @click="filtersData()" class="search-btn" type="primary"
                >更多筛选</Button
              >
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
      <Form ref="formInline" label-position="right" :label-width="150" inline>
        <FormItem label="产品信息（sku）">
          <Input clearable v-model="filters.ProductSku" />
        </FormItem>
        <FormItem label="参考单号">
          <Input clearable v-model="filters.RefNo" />
        </FormItem>
        <FormItem label="公司">
          <Input clearable v-model="filters.company" />
        </FormItem>
        <FormItem label="产品一级品类">
          <Select
            v-model="filters.ProcutCategoryName1"
            clearable
            style="width: 150px"
          >
            <Option label="服装" value="服装">服装</Option>
            <Option label="假发" value="假发">假发</Option>
            <Option label="家纺" value="家纺">家纺</Option>
            <Option label="新品" value="新品">新品</Option>
          </Select>
        </FormItem>
        <FormItem label="产品二级品类">
          <Input clearable v-model="filters.ProcutCategoryName2" />
        </FormItem>
        <FormItem label="产品三级品类">
          <Input clearable v-model="filters.ProcutCategoryName3" />
        </FormItem>
        <FormItem label="发货仓库">
          <Select
            v-model="filters.saleWarehourse"
            style="width: 200px"
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
        <FormItem prop="plateform" label="平台">
          <Select
            v-model="filters.plateform"
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
              !filters.plateform || filters.plateform == '' ? true : false
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
        <FormItem prop="status" label="订单状态">
          <Select v-model="filters.status" clearable style="width: 150px">
            <Option
              v-for="(item, index) in statusList"
              :key="index"
              :label="item.value"
              :value="item.label"
              >{{ item.value }}</Option
            >
          </Select>
        </FormItem>
        <FormItem prop="OrderType" label="订单类型">
          <Select v-model="filters.OrderType" clearable style="width: 150px">
            <Option key="1" label="正常销售订单" value="正常销售订单"
              >正常销售订单</Option
            >
            <Option key="2" label="重发订单" value="重发订单">重发订单</Option>
            <Option key="3" label="营销单" value="营销单">营销单</Option>
            <Option key="4" label="线下单分" value="线下单分">线下单分</Option>
          </Select>
        </FormItem>
        <FormItem prop="FkStart" label="付款开始时间">
          <DatePicker
            v-model="filters.FkStart"
            type="date"
            :options="dateOptions"
            placeholder="请选择开始时间"
            style="width: 150px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="FkEnd" label="付款结束时间">
          <DatePicker
            v-model="filters.FkEnd"
            type="date"
            :options="dateOptions"
            placeholder="请选择结束时间"
            style="width: 150px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="FhStart" label="发货开始时间">
          <DatePicker
            v-model="filters.FhStart"
            type="date"
            :options="dateOptions"
            placeholder="请选择开始时间"
            style="width: 150px"
            clearable
          ></DatePicker>
        </FormItem>
        <FormItem prop="FhEnd" label="发货结束时间">
          <DatePicker
            v-model="filters.FhEnd"
            type="date"
            :options="dateOptions"
            placeholder="请选择结束时间"
            style="width: 150px"
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
import {
  SaleNumberReport as getList,
  exportSaleNumberReport as exportReport,
} from "@/api/Analysis";
import { getList as getWare } from "@/api/ECWarehouse";
import { GetPlateform, GetShop } from "@/api/Order";
import { filtersDate } from "@/libs/validator";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      filters: {
        ProductSku: "",
        plateform: "",
        storeName: "",
        OrderType: "",
        ProcutCategoryName1: "",
        ProcutCategoryName2: "",
        ProcutCategoryName3: "",
        company: "",
        saleWarehourse: "",
        status: "",
        FkStart: "",
        FkEnd: "",
        FhStart: "",
        FhEnd: "",
        RefNo: "",
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      listData: [],
      listColumns: [
        {
          title: "订单总金额",
          key: "amountpaid",
          width: "100",
          sortable: true,
        },
        {
          title: "公司",
          key: "company",
          width: "200",
          sortable: true,
        },
        {
          title: "总价格",
          key: "companyAmount",
          width: "200",
          sortable: true,
        },
        {
          title: "国家",
          key: "country",
          width: "200",
          sortable: true,
        },
        {
          title: "币种",
          key: "currency",
          width: "200",
          sortable: true,
        },
        {
          title: "每笔订单发货运费占比",
          key: "orderShipFeeRate",
          width: "200",
          sortable: true,
        },
        {
          title: "订单类型",
          key: "orderType",
          width: "200",
          sortable: true,
        },
        {
          title: "产品销售数量",
          key: "productSaleQty",
          width: "200",
          sortable: true,
        },
        {
          title: "每件产品发货运费占比",
          key: "productShipFeeRate",
          width: "200",
          sortable: true,
        },
        {
          title: "数量",
          key: "qty",
          width: "200",
          sortable: true,
        },
        {
          title: "参考单号",
          key: "refNo",
          width: "200",
          sortable: true,
        },
        {
          title: "销售单号",
          key: "saleOrderCode",
          width: "200",
          sortable: true,
        },
        {
          title: "仓库单号",
          key: "wareHouseOrderCode",
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
          title: "物流费用币种",
          key: "shipCurrency",
          width: "200",
          sortable: true,
        },
        {
          title: "物流费用",
          key: "shipFee",
          width: "200",
        },
        {
          title: "sku",
          key: "sku",
          width: "200",
        },
        {
          title: "店铺",
          key: "storeName",
          width: "200",
        },
        {
          title: "价格(公司未折扣前价格)",
          key: "totalCompanyAmount",
          width: "200",
        },
        {
          title: "发货仓库",
          key: "wareHouseCode",
          width: "200",
        },
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      modelFilters: false,
      warehouseList: [],
      plateList: [],
      shopList: [],
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
      let filterFk = filtersDate(
        "FkStart",
        _this.filters.FkStart,
        _this.filters.FkEnd,
        "FkEnd"
      );
      let filterFh = filtersDate(
        "FhStart",
        _this.filters.FhStart,
        _this.filters.FhEnd,
        "FhEnd"
      );
      if (filterFk && filterFh) {
        if (filterFk.length > 0) {
          filterQuery = filterQuery.concat(filterFk);
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
        });
    },
    // 筛选条件字段拼接
    filtersObj() {
      let _this = this;
      let filterQuery = [];
      if (_this.filters.ProductSku && _this.filters.ProductSku != "") {
        let skuObj = {
          key: "ProductSku",
          binaryop: "like",
          value: _this.filters.ProductSku,
          andorop: "and",
        };
        filterQuery.push(skuObj);
      }
      if (_this.filters.RefNo && _this.filters.RefNo != "") {
        let RefNoObj = {
          key: "RefNo",
          binaryop: "like",
          value: _this.filters.RefNo,
          andorop: "and",
        };
        filterQuery.push(RefNoObj);
      }
      if (_this.filters.OrderType && _this.filters.OrderType != "") {
        let OrderTypeObj = {
          key: "OrderType",
          binaryop: "like",
          value: _this.filters.OrderType,
          andorop: "and",
        };
        filterQuery.push(OrderTypeObj);
      }
      if (_this.filters.company && _this.filters.company != "") {
        let companyObj = {
          key: "company",
          binaryop: "like",
          value: _this.filters.company,
          andorop: "and",
        };
        filterQuery.push(companyObj);
      }
      if (
        _this.filters.ProcutCategoryName1 &&
        _this.filters.ProcutCategoryName1 != ""
      ) {
        let CategoryObj1 = {
          key: "ProcutCategoryName1",
          binaryop: "eq",
          value: _this.filters.ProcutCategoryName1,
          andorop: "and",
        };
        filterQuery.push(CategoryObj1);
      }
      if (
        _this.filters.ProcutCategoryName2 &&
        _this.filters.ProcutCategoryName2 != ""
      ) {
        let CategoryObj2 = {
          key: "ProcutCategoryName2",
          binaryop: "like",
          value: _this.filters.ProcutCategoryName2,
          andorop: "and",
        };
        filterQuery.push(CategoryObj2);
      }
      if (
        _this.filters.ProcutCategoryName3 &&
        _this.filters.ProcutCategoryName3 != ""
      ) {
        let CategoryObj3 = {
          key: "ProcutCategoryName3",
          binaryop: "like",
          value: _this.filters.ProcutCategoryName3,
          andorop: "and",
        };
        filterQuery.push(CategoryObj3);
      }
      if (_this.filters.plateform && _this.filters.plateform != "") {
        let plateObj = {
          key: "plateform",
          binaryop: "eq",
          value: _this.filters.plateform,
          andorop: "and",
        };
        filterQuery.push(plateObj);
      }
      if (_this.filters.saleWarehourse && _this.filters.saleWarehourse != "") {
        let wareObj = {
          key: "saleWarehourse",
          binaryop: "eq",
          value: _this.filters.saleWarehourse,
          andorop: "and",
        };
        filterQuery.push(wareObj);
      }
      if (_this.filters.storeName && _this.filters.storeName != "") {
        let storeObj = {
          key: "storeName",
          binaryop: "eq",
          value: _this.filters.storeName,
          andorop: "and",
        };
        filterQuery.push(storeObj);
      }
      if (_this.filters.status && _this.filters.status != "") {
        let statusObj = {
          key: "status",
          binaryop: "eq",
          value: _this.filters.status,
          andorop: "and",
        };
        filterQuery.push(statusObj);
      }
      return filterQuery;
    },
    loadFilter() {
      const _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
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
      let filterQuery = _this.filtersObj();
      let filterFk = filtersDate(
        "FkStart",
        _this.filters.FkStart,
        _this.filters.FkEnd,
        "FkEnd"
      );
      let filterFh = filtersDate(
        "FhStart",
        _this.filters.FhStart,
        _this.filters.FhEnd,
        "FhEnd"
      );
      if (filterFk && filterFh) {
        if (filterFk.length > 0) {
          filterQuery = filterQuery.concat(filterFk);
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
      exportReport(data).then((res) => {
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel",
        });
        const fileName = "订单数量报表.xlsx";
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