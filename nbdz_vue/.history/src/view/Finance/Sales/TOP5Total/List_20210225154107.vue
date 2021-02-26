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
  GetTop5Platform ,
  ExportTop5Platform  ,
  GetTop5Ship ,
  ExportTop5Ship ,
} from "@/api/finance"; 
import { filtersNewDate as filtersDate } from "@/libs/validator";
import dayjs from "dayjs";
import excel from "@/libs/excel"; 
export default {
  data() {
    return {
      filters: { 
      },
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
          key: "grossMargin",
        },
        {
          title: "成本占比",
          key: "costShare",
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
      GetTop5Platform(data).then(res=>{
        console.log(res)
      }).catch((err) => {
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
    loadShipTotal(){
      let _this = this;
      let data = {};
      let filterQuery = _this.filtersObj(); 
      data = { 
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      _this.tableLoading = true;
      GetTop5Ship(data).then(res=>{
        console.log(res)
      }).catch((err) => {
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
    }
    // 筛选条件字段拼接
    filtersObj() {
      let _this = this;
      let filterQuery = [];
      if (_this.filters.platform && _this.filters.platform.length > 0) {
        let plateObj = {
          key: "platform",
          value: _this.filters.platform,
          option: "in",
          isAnd: "true",
        };
        filterQuery.push(plateObj);
      } else {
        filterQuery.push({
          key: "platform",
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
      if (_this.filters.storeName && _this.filters.storeName.length > 0) {
        let storeObj = {
          key: "storeName",
          value: _this.filters.storeName,
          option: "in",
          isAnd: "true",
        };
        filterQuery.push(storeObj);
      } else {
        filterQuery.push({
          key: "storeName",
          value: _this.shopList.map((item) => {
            return item.value;
          }),
          option: "in",
          isAnd: "true",
        });
      }
      if (_this.filters.orderStatus && _this.filters.orderStatus != "") {
        let statusObj = {
          key: "status",
          value: _this.filters.orderStatus,
          option: "in",
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
        const resData = res.data;
        _this.plateShopList = resData.data;
        _this.plateList = _this.plateShopList.map((item) => {
          return {
            label: item.permssion.permName,
            value: item.permssion.permCode,
          };
        });
        _this.plateShopList.forEach((item) => {
          _this.shopList = [..._this.shopList, ...item.permssion.childrens];
        });
        _this.shopList = _this.shopList.map((item) => {
          return {
            label: item.permName,
            value: item.permCode,
          };
        });
        _this.loadData();
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
      if (_this.filters.platform && _this.filters.platform.length > 0) {
        _this.plateShopList.forEach((item) => {
          if (_this.filters.platform.includes(item.permssion.permCode)) {
            _this.shopList = [..._this.shopList, ...item.permssion.childrens];
          }
        });
        _this.shopList = _this.shopList.map((item) => {
          return {
            label: item.permName,
            value: item.permCode,
          };
        });
      } else {
        _this.plateShopList.forEach((item) => {
          _this.shopList = [..._this.shopList, ...item.permssion.childrens];
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
      let _this = this;
      let titleArr = [];
      let keyArr = [];
      let columnsArr = [];
      if (_this.totalVisible === true) {
        _this.plateColumns.forEach((item) => {
          if (item.children) {
            item.children.forEach((child) => {
              let children = {};
              children.title = item.title + "|" + child.title;
              children.key = child.key;
              columnsArr.push(children);
            });
          } else {
            columnsArr.push(item);
          }
        });
      } else {
        _this.storeColumns.forEach((item) => {
          if (item.children) {
            item.children.forEach((child) => {
              let children = {};
              children.title = item.title + "|" + child.title;
              children.key = child.key;
              columnsArr.push(children);
            });
          } else {
            columnsArr.push(item);
          }
        });
      }

      titleArr = columnsArr.map((item) => {
        return item.title;
      });
      keyArr = columnsArr.map((item) => {
        return item.key;
      });
      const params = {
        title: titleArr,
        key: keyArr,
        data: _this.totalVisible === true ? _this.plateData : _this.storeData,
        autoWidth: true,
        filename:
          _this.totalVisible === true
            ? "财务订单合计报表(平台)"
            : "财务订单合计报表(店铺)",
      };
      excel.export_array_to_excel(params);
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