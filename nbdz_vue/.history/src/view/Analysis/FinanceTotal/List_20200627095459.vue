<template>
  <div class="content-main">
    <div style="margin:10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form ref="formInline" label-position="right" :label-width="100" inline>
            <FormItem prop="plateform" label="平台">
              <Select
                v-model="filters.plateform"
                @on-change="changePlate"
                clearable
                style="width:150px"
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
                style="width:150px"
              >
                <Option
                  v-for="(item,index) in shopList"
                  :key="index"
                  :label="item"
                  :value="item"
                >{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem prop="status" label="订单状态">
              <Select v-model="filters.status" clearable style="width:150px">
                <Option
                  v-for="(item,index) in statusList"
                  :key="index"
                  :label="item.value"
                  :value="item.label"
                >{{item.value}}</Option>
              </Select>
            </FormItem>
            <FormItem prop="warehouseCode" label="发货仓库">
              <Select v-model="filters.warehouseCode" clearable style="width:150px">
                <Option
                  v-for="(item,index) in wareList"
                  :key="index"
                  :label="item.warehouseCode"
                  :value="item.warehouseCode"
                >{{item.warehouseCode}}</Option>
              </Select>
            </FormItem>
            <FormItem prop="startTime" label="创建开始时间">
              <DatePicker
                v-model="filters.startTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem prop="endTime" label="创建结束时间">
              <DatePicker
                v-model="filters.endTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem prop="PayStartTime" label="付款开始时间">
              <DatePicker
                v-model="filters.PayStartTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem prop="PayEndTime" label="付款结束时间">
              <DatePicker
                v-model="filters.PayEndTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem prop="ShipStartTime" label="发货开始时间">
              <DatePicker
                v-model="filters.ShipStartTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem prop="ShipEndTime" label="发货结束时间">
              <DatePicker
                v-model="filters.ShipEndTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button
                @click="loadFilter()"
                style="margin-right:5px"
                class="search-btn"
                type="primary"
              >
                <Icon type="search" />&nbsp;&nbsp;搜索
              </Button>
              <Button @click="exportAll()" class="search-btn" type="primary">导出</Button>
              <!-- <Button @click="filtersData()" class="search-btn" type="primary">
                <Icon type="search" />&nbsp;&nbsp;更多筛选
              </Button>-->
            </FormItem>
          </Form>
        </Col>
        <!-- <Col :span="1">
          
        </Col>-->
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
import { GetPlateform, GetShop } from "@/api/Order";
import {
  OrderCostTotal as getList,
  ExportOrderCostTotal as exportOrder
} from "@/api/Analysis";
import { getList as getWare } from "@/api/ECWarehouse";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      filters: {
        plateform: "",
        storeName: "",
        warehouseCode: "",
        startTime: "",
        endTime: "",
        status: "",
        PayStartTime: "",
        PayEndTime: "",
        ShipStartTime: "",
        ShipEndTime: ""
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        }
      },
      plateData: [],
      storeData: [],
      totalVisible: "false",
      currentTab: "",
      plateColumns: [
        {
          title: "平台",
          key: "plateform"
        },
        {
          title: "货币类型",
          key: "currency"
        },
        {
          title: "订单数量",
          key: "orderQty"
        },
        {
          title: "商品数量",
          key: "productQty"
        },
        {
          title: "订单总运费",
          key: "shipFee"
        },
        {
          title: "订单总金额",
          key: "total"
        },
        {
          title: "订单总成本",
          key: "cost"
        },
        {
          title: "订单毛利率",
          key: "grossmargin"
        }
      ],
      storeColumns: [
        {
          title: "平台",
          key: "plateform"
        },
        {
          title: "店铺",
          key: "storeName"
        },
        {
          title: "货币类型",
          key: "currency"
        },
        {
          title: "订单数量",
          key: "orderQty"
        },
        {
          title: "商品数量",
          key: "productQty"
        },
        {
          title: "订单总运费",
          key: "shipFee"
        },
        {
          title: "订单总金额",
          key: "total"
        },
        {
          title: "订单总成本",
          key: "cost"
        },
        {
          title: "订单毛利率",
          key: "grossmargin"
        }
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      modelFilters: false,
      plateList: [],
      wareList: [],
      shopList: []
    };
  },
  computed: {
    statusList() {
      return this.$store.state.orderStatus;
    }
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {};
      let filterQuery = _this.filtersObj();
      _this.listData = [];
      data = {
        data: {
          pageNum: _this.pageCurrent,
          pageSize: _this.pageSize,
          query: filterQuery
        },
        total: _this.totalVisible
      };
      if (this.currentTab == "") {
        this.currentTab = this.totalVisible == true ? "plateform" : "store";
      }
      _this.tableLoading = true;
      getList(data)
        .then(res => {
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
              closable: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 筛选条件字段拼接
    filtersObj() {
      let _this = this;
      let filterQuery = [];
      let filterCreate = _this.filtersDate(
        "createdDate",
        _this.filters.startTime,
        _this.filters.endTime
      );
      let filterPay = _this.filtersDate(
        "DatePaidPlatform",
        _this.filters.PayStartTime,
        _this.filters.PayEndTime
      );
      let filterShip = _this.filtersDate(
        "PlatformShipTime",
        _this.filters.ShipStartTime,
        _this.filters.ShipEndTime
      );
      if (filterCreate.length > 0) {
        filterQuery = filterQuery.concat(filterCreate);
      }
      if (filterPay.length > 0) {
        filterQuery = filterQuery.concat(filterPay);
      }
      if (filterShip.length > 0) {
        filterQuery = filterQuery.concat(filterShip);
      }
      if (_this.filters.plateform && _this.filters.plateform != "") {
        let plateObj = {
          key: "plateform",
          binaryop: "eq",
          value: _this.filters.plateform,
          andorop: "and"
        };
        filterQuery.push(plateObj);
      }
      if (_this.filters.warehouseCode && _this.filters.warehouseCode != "") {
        let wareObj = {
          key: "warehouseCode",
          binaryop: "eq",
          value: _this.filters.warehouseCode,
          andorop: "and"
        };
        filterQuery.push(wareObj);
      }
      if (_this.filters.storeName && _this.filters.storeName != "") {
        let storeObj = {
          key: "storeName",
          binaryop: "eq",
          value: _this.filters.storeName,
          andorop: "and"
        };
        filterQuery.push(storeObj);
      }
      if (_this.filters.status && _this.filters.status != "") {
        let statusObj = {
          key: "status",
          binaryop: "eq",
          value: _this.filters.status,
          andorop: "and"
        };
        filterQuery.push(statusObj);
      }

      return filterQuery;
    },
    // 筛选条件列表
    selectLoad() {
      let _this = this;
      let data = {};
      GetPlateform().then(res => {
        _this.plateList = res.data;
      });
      getWare(data).then(res => {
        const resData = res.data;
        if (resData.code == 200) {
          _this.wareList = resData.data;
        } else {
          this.$Message.error(resData.msg);
        }
      });
    },
    // 筛选时间字段拼接
    filtersDate(keyString, startTime, endTime) {
      let filterQuery = [];
      if (startTime != "" && endTime != "") {
        if (!dayjs(endTime).isAfter(dayjs(startTime))) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true
          });
          return false;
        } else {
          let Start = {
            key: keyString,
            binaryop: "gte",
            value: dayjs(startTime).format("YYYY-MM-DD HH:mm:ss"),
            andorop: "and"
          };
          let End = {
            key: keyString,
            binaryop: "lte",
            value: dayjs(endTime).format("YYYY-MM-DD HH:mm:ss"),
            andorop: "and"
          };
          filterQuery.push(Start);
          filterQuery.push(End);
        }
      }
      return filterQuery;
    },
    changePlate() {
      let _this = this;
      GetShop(_this.filters.plateform)
        .then(res => {
          _this.shopList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
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
    // 搜索弹框
    filtersData() {
      let _this = this;
      _this.modelFilters = true;
    },
    // 搜索弹框
    filtersLoad() {
      let _this = this;
      _this.modelFilters = false;
      _this.pageCurrent = 1;
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
      this.$Spin.show();
      let filterQuery = _this.filtersObj();
      data = {
        query: filterQuery
      };
      exportOrder(data).then(res => {
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel"
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
    }
  },
  mounted() {
    this.loadData();
    this.selectLoad();
  }
};
</script>

<style lang="less" scoped>
</style>