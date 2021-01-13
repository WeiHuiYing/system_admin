<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="搜索内容">
            <Input
              clearable
              v-model="filters.search"
              placeholder="请输入搜索内容"
            ></Input>
          </FormItem>
          <FormItem label="订单支付开始时间">
            <DatePicker
              v-model="filters.startTime"
              type="date"
              placeholder="请选择开始时间"
              style="width: 200px"
              :options="dateOptions"
            ></DatePicker>
          </FormItem>
          <FormItem label="订单支付结束时间">
            <DatePicker
              v-model="filters.endTime"
              type="date"
              placeholder="请选择结束时间"
              style="width: 200px"
              :options="dateOptions"
            ></DatePicker>
          </FormItem>
          <FormItem>
            <Button
              style="margin-right: 5px"
              @click="loadFilter()"
              type="primary"
              >搜索</Button
            >
            <Button @click="filtersData()" type="primary">
              <Icon type="search" />&nbsp;&nbsp;更多筛选
            </Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="2">
        <Button @click="exportExcel()" type="primary">导出</Button>
      </Col>
    </Row>
    <Table
      :loading="loading"
      ref="tables"
      height="700"
      :data="listData"
      v-bind:columns="listColums"
      stripe
    ></Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="totalCount"
          :current="currentPage"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size="pageSize"
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
        <FormItem label="搜索内容">
          <Input
            clearable
            v-model="filters.search"
            placeholder="请输入搜索内容"
          ></Input>
        </FormItem>
        <FormItem label="订单支付开始时间">
          <DatePicker
            v-model="filters.startTime"
            type="date"
            :options="dateOptions"
            placeholder="请选择开始时间"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem label="订单支付结束时间">
          <DatePicker
            v-model="filters.endTime"
            type="date"
            :options="dateOptions"
            placeholder="请选择结束时间"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem label="妥投开始时间">
          <DatePicker
            v-model="filters.deliveredStart"
            type="date"
            :options="dateOptions"
            placeholder="请选择开始时间"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem label="妥投结束时间">
          <DatePicker
            v-model="filters.deliveredEnd"
            type="date"
            :options="dateOptions"
            placeholder="请选择结束时间"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem label="发货开始时间">
          <DatePicker
            v-model="filters.DateWarehouseShipping_gte"
            type="date"
            :options="dateOptions"
            placeholder="请选择开始时间"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem label="发货结束时间">
          <DatePicker
            v-model="filters.DateWarehouseShipping_lte"
            type="date"
            :options="dateOptions"
            placeholder="请选择结束时间"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem prop="OrderId" label="订单id">
          <Input
            clearable
            style="width: 200px"
            v-model="filters.OrderId"
            placeholder="请输入搜索的订单id"
          ></Input>
        </FormItem>
        <FormItem prop="logistics__DeliveredStatus" label="妥投状态">
          <Select
            clearable
            style="width: 200px"
            v-model="filters.logistics__DeliveredStatus"
          >
            <Option value="null" key="null">未查询</Option>
            <Option value="pending" key="pending">查询中</Option>
            <Option value="notfound" key="notfound">查询不到</Option>
            <Option value="transit" key="transit">运输途中</Option>
            <Option value="pickup" key="pickup">到达待取</Option>
            <Option value="delivered" key="delivered">成功签收</Option>
            <Option value="undelivered" key="undelivered">投递失败</Option>
            <Option value="exception" key="exception">可能异常</Option>
            <Option value="expired" key="expired">运输过久</Option>
          </Select>
        </FormItem>
        <FormItem prop="Plateform" label="平台代码">
          <Select
            clearable
            style="width: 200px"
            :disabled="plateDisable"
            v-model="filters.Plateform"
          >
            <Option value="aliexpress" key="aliexpress">速卖通</Option>
            <Option value="aliexpresscn" key="aliexpresscn"
              >aliexpresscn</Option
            >
            <Option value="amazon" key="amazon">亚马逊</Option>
            <Option value="ebay" key="ebay">ebay</Option>
            <Option value="magento" key="magento">magento</Option>
            <Option value="magento2" key="magento2">magento2</Option>
            <Option value="shopify" key="shopify">shopify</Option>
          </Select>
        </FormItem>
        <FormItem prop="OrderType" label="订单类型">
          <Select clearable style="width: 200px" v-model="filters.OrderType">
            <Option value="sale" key="sale">正常销售订单</Option>
            <Option value="resend" key="resend">重发订单</Option>
            <Option value="line" key="line">线下订单</Option>
          </Select>
        </FormItem>
        <FormItem prop="PlatformUserName" label="账号别名">
          <Input
            clearable
            style="width: 200px"
            v-model="filters.PlatformUserName"
            placeholder="请输入搜索的账号别名"
            :disabled="storeDisable"
          ></Input>
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
  batchOrder as getList,
  exportOrder as exportList,
} from "@/api/Logistics";
import { getDataPerms } from "@/api/Auth";
import rowColums from "./components/rowColums.vue";
import { filtersAfterDate as filtersDate } from "@/libs/validator";
import store from "@/store";
import dayjs from "dayjs";
export default {
  components: { rowColums },
  data() {
    return {
      listColums: [
        {
          title: "跟踪号",
          key: "ShippingMethodNo",
          align: "center",
        },
        {
          title: "平台发货时间",
          key: "PlatformShipTime",
          align: "center",
        },
        {
          title: "物流狀態",
          key: "DeliveredStatus",
          align: "center",
        },
      ],
      listData: [],
      totalCount: 1,
      currentPage: 1,
      pageSize: 100,
      filters: {
        search: "",
        OrderId: "",
        RefNo: "",
        Plateform: "",
        OrderType: "",
        PlatformUserName: "",
        startTime: "",
        endTime: "",
        deliveredStart: "",
        deliveredEnd: "",
        logistics__DeliveredStatus: "",
        DateWarehouseShipping_gte: "",
        DateWarehouseShipping_lte: "",
      },
      plateDisable: false,
      storeDisable: false,
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      loading: false,
      modelFilters: false,
    };
  },
  methods: {
    loadSelect() {
      const _this = this;
      let params = {
        data: { userId: this.$store.state.user.userId },
        method: "get",
      };
      getDataPerms(params).then((res) => {
        const resData = res.data;
        const plateShopList = resData.data;
        const plateList =
          plateShopList && plateShopList.length == 1
            ? plateShopList.map((item) => {
                return {
                  label: item.permssion.permName,
                  value: item.permssion.permCode,
                };
              })
            : [];
        const shopList =
          plateList.length == 1 &&
          plateShopList[0].permssion.childrens &&
          plateShopList[0].permssion.childrens.length == 1
            ? plateShopList[0].permssion.childrens.map((item) => {
                return {
                  label: item.permName,
                  value: item.permCode,
                };
              })
            : [];
        if (plateList.length == 1) {
          _this.plateDisable = true;
          _this.filters.Plateform = plateList[0].value;
        }
        if (shopList.length == 1) {
          _this.storeDisable = true;
          _this.filters.PlatformUserName = shopList[0].value;
        }
        _this.loadData();
      });
    },
    loadData() {
      let _this = this;
      let deliveredStatus = "";
      if (_this.filters.logistics__DeliveredStatus == "null") {
        deliveredStatus = null;
      } else {
        deliveredStatus = _this.filters.logistics__DeliveredStatus;
      }
      let data = {
        page: _this.currentPage,
        page_size: _this.pageSize,
        search: _this.filters.search,
        OrderId: _this.filters.OrderId,
        RefNo: _this.filters.RefNo,
        Plateform: _this.filters.Plateform,
        OrderType: _this.filters.OrderType,
        PlatformUserName: _this.filters.PlatformUserName,
        logistics__DeliveredStatus: deliveredStatus,
      };
      let paidTime = filtersDate(
        "paid_data_gte",
        "paid_data_lte",
        _this.filters.startTime,
        _this.filters.endTime
      );
      let deliveredTime = filtersDate(
        "DeliveredTime_gte",
        "DeliveredTime_lte",
        _this.filters.deliveredStart,
        _this.filters.deliveredEnd
      );
      let shipTime = filtersDate(
        "DateWarehouseShipping_gte",
        "DateWarehouseShipping_lte",
        _this.filters.DateWarehouseShipping_gte,
        _this.filters.DateWarehouseShipping_lte
      );
      if (paidTime) {
        data.paid_data_gte = paidTime["paid_data_gte"];
        data.paid_data_lte = paidTime["paid_data_lte"];
      }

      if (deliveredTime) {
        data.DeliveredTime_gte = deliveredTime["DeliveredTime_gte"];
        data.DeliveredTime_lte = deliveredTime["DeliveredTime_lte"];
      }
      if (shipTime) {
        data.DateWarehouseShipping_gte = shipTime["DateWarehouseShipping_gte"];
        data.DateWarehouseShipping_lte = shipTime["DateWarehouseShipping_lte"];
      }
      _this.loading = true;
      getList(data)
        .then((res) => {
          _this.loading = false;
          _this.listData = res.data.results;
          _this.totalCount = res.data.count;
        })
        .catch((err) => {
          _this.loading = false;
          console.log(err);
        });
    },
    exportExcel() {
      const _this = this;
      let deliveredStatus = "";
      if (_this.filters.logistics__DeliveredStatus == "null") {
        deliveredStatus = null;
      } else {
        deliveredStatus = _this.filters.logistics__DeliveredStatus;
      }
      let data = {
        search: _this.filters.search,
        OrderId: _this.filters.OrderId,
        RefNo: _this.filters.RefNo,
        Plateform: _this.filters.Plateform,
        OrderType: _this.filters.OrderType,
        PlatformUserName: _this.filters.PlatformUserName,
        logistics__DeliveredStatus: deliveredStatus,
      };
      let paidTime = filtersDate(
        "paid_data_gte",
        "paid_data_lte",
        _this.filters.startTime,
        _this.filters.endTime
      );
      let deliveredTime = filtersDate(
        "DeliveredTime_gte",
        "DeliveredTime_lte",
        _this.filters.deliveredStart,
        _this.filters.deliveredEnd
      );
      let shipTime = filtersDate(
        "DateWarehouseShipping_gte",
        "DateWarehouseShipping_lte",
        _this.filters.DateWarehouseShipping_gte,
        _this.filters.DateWarehouseShipping_lte
      );
      if (paidTime) {
        data.paid_data_gte = paidTime["paid_data_gte"];
        data.paid_data_lte = paidTime["paid_data_lte"];
      }
      if (deliveredTime) {
        data.DeliveredTime_gte = deliveredTime["DeliveredTime_gte"];
        data.DeliveredTime_lte = deliveredTime["DeliveredTime_lte"];
      }
      if (shipTime) {
        data.DateWarehouseShipping_gte = shipTime["DateWarehouseShipping_gte"];
        data.DateWarehouseShipping_lte = shipTime["DateWarehouseShipping_lte"];
      }
      this.$Spin.show();
      exportList(data)
        .then((res) => {
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "订单物流查询报表.xlsx";
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
        })
        .catch((err) => {
          let errData = err.response;
          if (errData.status == "400") {
            this.$Message.error({
              content: "一次最多导出10000条数据",
              duration: 10,
              closable: true,
            });
          } else {
            this.$Message.error({
              content: errData.statusText,
              duration: 10,
              closable: true,
            });
          }
          this.$Spin.hide();
        });
    },
    loadFilter() {
      const _this = this;
      _this.currentPage = 1;
      _this.loadData();
    },
    changePageSize(val) {
      const _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
    changePage(val) {
      const _this = this;
      _this.currentPage = val;
      _this.loadData();
    },
    filtersData() {
      const _this = this;
      _this.modelFilters = true;
    },
    filtersLoad() {
      const _this = this;
      _this.modelFilters = false;
      _this.loadData();
    },
  },
  mounted() {
    this.loadSelect();
  },
};
</script>

<style lang="less"></style>
