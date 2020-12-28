<template>
  <div class="content-main">
    <div style="margin: 10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="100"
            inline
          >
            <FormItem prop="plateForm" label="平台">
              <Select
                v-model="filters.plateForm"
                @on-change="changePlate"
                clearable
                style="width: 150px"
                multiple
              >
                <Option
                  v-for="(item, index) in plateList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </FormItem>
            <FormItem prop="storeName" label="店铺">
              <Select
                :disabled="
                  !filters.plateForm || filters.plateForm == '' ? true : false
                "
                v-model="filters.storeName"
                clearable
                style="width: 150px"
                multiple
              >
                <Option
                  v-for="(item, index) in shopList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </FormItem>
            <FormItem prop="orderStatus" label="订单状态">
              <Select
                v-model="filters.orderStatus"
                clearable
                style="width: 150px"
              >
                <Option
                  v-for="(item, index) in statusList"
                  :key="index"
                  :label="item.value"
                  :value="item.label"
                  >{{ item.value }}</Option
                >
              </Select>
            </FormItem>
            <FormItem prop="warehouseCode" label="发货仓库">
              <Select
                v-model="filters.warehouseCode"
                clearable
                style="width: 150px"
              >
                <Option
                  v-for="(item, index) in wareList"
                  :key="index"
                  :label="item.warehouseCode"
                  :value="item.warehouseCode"
                  >{{ item.warehouseCode }}</Option
                >
              </Select>
            </FormItem>
            <FormItem prop="createTimeStart" label="创建开始时间">
              <DatePicker
                v-model="filters.createTimeStart"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem prop="createTimeEnd" label="创建结束时间">
              <DatePicker
                v-model="filters.createTimeEnd"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem prop="fkStart" label="付款开始时间">
              <DatePicker
                v-model="filters.fkStart"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem prop="fkEnd" label="付款结束时间">
              <DatePicker
                v-model="filters.fkEnd"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem prop="fhStart" label="发货开始时间">
              <DatePicker
                v-model="filters.fhStart"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem prop="fhEnd" label="发货结束时间">
              <DatePicker
                v-model="filters.fhEnd"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 200px"
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
              <Button @click="exportAll()" class="search-btn" type="primary"
                >导出</Button
              >
            </FormItem>
          </Form>
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
      <TabPane label="平台汇总" name="plateform">
        <Table
          ref="plateformTables"
          :loading="tableLoading"
          :data="plateData"
          v-bind:columns="plateColumns"
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
  OrderCostTotal as getList,
  ExportOrderCostTotal as exportOrder,
} from "@/api/Analysis";
import { getList as getWare } from "@/api/ECWarehouse";
import { getDataPerms } from "@/api/Auth";
import { filtersNewDate as filtersDate } from "@/libs/validator";
import dayjs from "dayjs";
import excel from "@/libs/excel";
import store from "@/store";
export default {
  data() {
    return {
      filters: {
        plateForm: "",
        storeName: "",
        warehouseCode: "",
        createTimeStart: "",
        createTimeEnd: "",
        orderStatus: "",
        fkStart: "",
        fkEnd: "",
        fhStart: "",
        fhEnd: "",
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      plateData: [],
      storeData: [],
      totalVisible: "false",
      currentTab: "",
      plateColumns: [
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
          key: "grossmargin",
        },
      ],
      storeColumns: [
        {
          title: "平台",
          key: "platform",
        },
        {
          title: "店铺",
          key: "storeName",
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
          key: "grossmargin",
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
        "createdDate",
        _this.filters.createTimeStart,
        _this.filters.createTimeEnd
      );
      let filterPay = filtersDate(
        "DatePaidPlatform",
        _this.filters.fkStart,
        _this.filters.fkEnd
      );
      let filterShip = filtersDate(
        "DateWarehouseShipping",
        _this.filters.fhStart,
        _this.filters.fhEnd
      );
      if (filterCreate && filterPay && filterShip) {
        if (filterCreate.length > 0) {
          filterQuery = filterQuery.concat(filterCreate);
        }
        if (filterPay.length > 0) {
          filterQuery = filterQuery.concat(filterPay);
        }
        if (filterShip.length > 0) {
          filterQuery = filterQuery.concat(filterShip);
        }
      } else {
        return false;
      }
      _this.listData = [];
      data = {
        data: {
          pageNum: _this.pageCurrent,
          pageSize: _this.pageSize,
          query: filterQuery,
        },
        total: _this.totalVisible,
      };
      if (this.currentTab == "") {
        this.currentTab = this.totalVisible == true ? "plateform" : "store";
      }
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          const resData = res.data;
          _this.tableLoading = false;
          if (resData.code == 200) {
            if (_this.currentTab == "plateform") {
              _this.plateData = resData.data;
              _this.storeData = [];
            } else {
              _this.storeData = resData.data;
              _this.plateData = [];
            }
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
      if (_this.filters.plateForm && _this.filters.plateForm.length > 0) {
        let plateObj = {
          key: "plateForm",
          value: _this.filters.plateForm,
          option: "in",
          isAnd: "true",
        };
        filterQuery.push(plateObj);
      } else {
        filterQuery.push({
          key: "plateForm",
          value: _this.plateList.map((item) => {
            return item.value;
          }),
          option: "in",
          isAnd: "true",
        });
      }
      if (_this.filters.warehouseCode && _this.filters.warehouseCode != "") {
        let wareObj = {
          key: "warehouseCode",
          value: _this.filters.warehouseCode,
          option: "eq",
          isAnd: "true",
        };
        filterQuery.push(wareObj);
      }
      if (_this.filters.storeName && _this.filters.storeName != "") {
        let storeObj = {
          key: "storeName",
          value: _this.filters.storeName,
          option: "in",
          isAnd: "true",
        };
        filterQuery.push(storeObj);
      }
      if (_this.filters.orderStatus && _this.filters.orderStatus != "") {
        let statusObj = {
          key: "orderStatus",
          value: _this.filters.orderStatus,
          option: "eq",
          isAnd: "true",
        };
        filterQuery.push(statusObj);
      }

      return filterQuery;
    },
    // 筛选条件列表
    selectLoad() {
      let _this = this;
      let params = {
        data: { userId: this.$store.state.user.userId },
        method: "get",
      };
      getDataPerms(params).then((res) => {
        console.log(res);
        const resData = res.data;
        _this.plateShopList = resData.data;
        _this.plateList = _this.plateShopList.map((item) => {
          return {
            label: item.permssion.permName,
            value: item.permssion.permCode,
          };
        });
      });
      let data = {};
      getWare(data).then((res) => {
        const resData = res.data;
        if (resData.code == 200) {
          _this.wareList = resData.data;
        } else {
          this.$Message.error(resData.msg);
        }
      });
    },
    changePlate() {
      let _this = this;
      _this.shopList = [];
      if (_this.filters.plateForm) {
        _this.plateShopList.forEach((item) => {
          if (_this.filters.plateForm.includes(item.permssion.permCode)) {
            _this.shopList = [..._this.shopList, ...item.permssion.childrens];
          }
        });
        _this.shopList = _this.shopList.map((item) => {
          return {
            label: item.permName,
            value: item.permCode,
          };
        });
      }
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
    // 导出
    exportAll() {
      let data = {};
      let _this = this;
      let filterQuery = _this.filtersObj();
      let filterCreate = filtersDate(
        "createdDate",
        _this.filters.createTimeStart,
        _this.filters.createTimeEnd
      );
      let filterPay = filtersDate(
        "DatePaidPlatform",
        _this.filters.fkStart,
        _this.filters.fkEnd
      );
      let filterShip = filtersDate(
        "DateWarehouseShipping",
        _this.filters.fhStart,
        _this.filters.fhEnd
      );
      if (filterCreate && filterPay && filterShip) {
        if (filterCreate.length > 0) {
          filterQuery = filterQuery.concat(filterCreate);
        }
        if (filterPay.length > 0) {
          filterQuery = filterQuery.concat(filterPay);
        }
        if (filterShip.length > 0) {
          filterQuery = filterQuery.concat(filterShip);
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
        const fileName = "财务订单合计报表.xlsx";
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
    this.selectLoad();
  },
};
</script>

<style lang="less" scoped>
</style>