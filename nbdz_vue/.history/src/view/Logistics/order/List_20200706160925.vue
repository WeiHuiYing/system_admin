<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="搜索内容">
            <Input clearable v-model="filters.search" placeholder="请输入搜索内容"></Input>
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
            <Button style="margin-right:5px" @click="loadFilter()" type="primary">搜索</Button>
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
    <Table ref="tables" height="700" :data="listData" v-bind:columns="listColums" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="totalCount"
          :current="currentPage"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size="pageSize"
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
      <Form ref="formInline" label-position="right" :label-width="120" inline>
        <FormItem label="搜索内容">
          <Input clearable v-model="filters.search" placeholder="请输入搜索内容"></Input>
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
        <FormItem prop="OrderId" label="订单id">
          <Input clearable style="width:200px" v-model="filters.OrderId" placeholder="请输入搜索的订单id"></Input>
        </FormItem>
        <FormItem prop="RefNo" label="参考单号">
          <Input clearable style="width:200px" v-model="filters.RefNo" placeholder="请输入搜索的参考单号"></Input>
        </FormItem>
        <FormItem prop="Plateform" label="平台代码">
          <Select clearable style="width:200px" v-model="filters.Plateform">
            <Option value="aliexpress" key="aliexpress">速卖通</Option>
            <Option value="aliexpresscn" key="aliexpresscn">aliexpresscn</Option>
            <Option value="amazon" key="amazon">亚马逊</Option>
            <Option value="ebay" key="ebay">ebay</Option>
            <Option value="magento" key="magento">magento</Option>
            <Option value="magento2" key="magento2">magento2</Option>
            <Option value="shopify" key="shopify">shopify</Option>
          </Select>
        </FormItem>
        <FormItem prop="OrderType" label="订单类型">
          <Select clearable style="width:200px" v-model="filters.OrderType">
            <Option value="sale" key="sale">正常销售订单</Option>
            <Option value="resend" key="resend">重发订单</Option>
            <Option value="line" key="line">线下订单</Option>
          </Select>
        </FormItem>
        <FormItem prop="PlatformUserName" label="账号别名">
          <Input
            clearable
            style="width:200px"
            v-model="filters.PlatformUserName"
            placeholder="请输入搜索的账号别名"
          ></Input>
        </FormItem>
        <div style="text-align:right;">
          <Button @click="filtersLoad()" class="search-btn" type="primary">搜索</Button>
        </div>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { order as getList, exportOrder as exportList } from "@/api/Logistics";
import rowColums from "./components/rowColums.vue";
import store from "@/store";
import dayjs from "dayjs";
export default {
  components: { rowColums },
  data() {
    return {
      listColums: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(rowColums, {
              props: {
                data: params.row.logistics
              }
            });
          }
        },
        {
          title: "系统单号",
          key: "SysOrderCode",
          align: "center",
          width: 150
        },
        {
          title: "订单id",
          key: "OrderId",
          align: "center",
          width: 150
        },

        {
          title: "仓库单号",
          key: "WarehouseOrderCode",
          align: "center",
          width: 130
        },
        {
          title: "仓库代码",
          key: "WarehouseCode",
          align: "center",
          width: 120
        },
        {
          title: "账号",
          key: "UserAccount",
          align: "center",
          width: 100
        },
        {
          title: "销售额",
          key: "Subtotal",
          align: "center",
          width: 80
        },
        {
          title: "跟踪号",
          key: "ShippingMethodNo",
          align: "center",
          width: 200
        },
        {
          title: "仓库运输方式代码",
          key: "ShippingMethod",
          align: "center",
          width: 200
        },
        {
          title: "跟踪平台",
          key: "ShippingMethodPlatform",
          align: "center",
          width: 200
        },
        {
          title: "运费",
          key: "ShipFee",
          align: "center",
          width: 80
        },
        {
          title: "销售单号",
          key: "SaleOrderCode",
          align: "center",
          width: 150
        },
        {
          title: "参考单号",
          key: "RefNo",
          align: "center",
          width: 150
        },
        {
          title: "待发货下的处理状态",
          key: "ProcessAgain",
          align: "center",
          width: 100,
          render: (h, params) => {
            let ProcessAgain = params.row.ProcessAgain;
            let ProcessAgainText = "";
            if (ProcessAgain == 1) {
              ProcessAgainText = "已处理";
            } else if (ProcessAgain == 2) {
              ProcessAgainText = "未处理";
            } else if (ProcessAgain == 3) {
              ProcessAgainText = "处理异常";
            }
            return h("span", ProcessAgainText);
          }
        },
        {
          title: "平台代码",
          key: "Plateform",
          align: "center",
          width: 100
        },
        {
          title: "账号别名",
          key: "PlatformUserName",
          align: "center",
          width: 100
        },
        {
          title: "平台发货状态",
          key: "PlatformShipStatus",
          align: "center",
          width: 100,
          render: (h, params) => {
            let PlatformShipStatus = params.row.PlatformShipStatus;
            let statusText = "";
            if (PlatformShipStatus == 1) {
              statusText = "已处理";
            } else if (PlatformShipStatus == 2) {
              statusText = "未处理";
            } else if (PlatformShipStatus == 3) {
              statusText = "处理异常";
            }
            return h("span", statusText);
          }
        },
        {
          title: "平台发货时间",
          key: "PlatformShipTime",
          align: "center",
          width: 100
        },
        {
          title: "paypal交易号",
          key: "PaypalTransactionId",
          align: "center",
          width: 100
        },
        {
          title: "订单类型",
          key: "OrderType",
          align: "center",
          width: 120,
          render: (h, params) => {
            let OrderType = params.row.OrderType;
            let OrderTypeText = "";
            if (OrderType == "sale") {
              OrderTypeText = "正常销售订单";
            } else if (OrderType == "resend") {
              OrderTypeText = "重发订单";
            } else if (OrderType == "line") {
              OrderTypeText = "线下订单";
            }
            return h("span", OrderTypeText);
          }
        },
        {
          title: "平台付款时间",
          key: "DatePaidPlatform",
          align: "center",
          width: 100
        },
        {
          title: "创建时间",
          key: "CreatedDate",
          align: "center",
          width: 100
        },
        {
          title: "总金额",
          key: "Amountpaid",
          align: "center",
          width: 80
        },
        {
          title: "公司代码",
          key: "CompanyCode",
          align: "center",
          width: 100
        }
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
        endTime: ""
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        }
      },
      modelFilters: false
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        page: _this.currentPage,
        page_size: _this.pageSize,
        search: _this.filters.search,
        OrderId: _this.filters.OrderId,
        RefNo: _this.filters.RefNo,
        Plateform: _this.filters.Plateform,
        OrderType: _this.filters.OrderType,
        PlatformUserName: _this.filters.PlatformUserName
      };
      if (_this.filters.startTime != "" && _this.filters.endTime != "") {
        if (
          !dayjs(_this.filters.endTime).isAfter(
            dayjs(_this.filters.startTime)
          ) &&
          dayjs(_this.filters.endTime).diff(
            dayjs(_this.filters.startTime),
            "day"
          ) != 0
        ) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true
          });
          return false;
        } else {
          data.paid_data_gte = dayjs(_this.filters.startTime).format(
            "YYYY-MM-DD"
          );
          data.paid_data_lte = dayjs(_this.filters.endTime).format(
            "YYYY-MM-DD"
          );
        }
      }
      getList(data)
        .then(res => {
          _this.listData = res.data.results;
          _this.totalCount = res.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    exportExcel() {
      const _this = this;
      let data = {
        search: _this.filters.search,
        OrderId: _this.filters.OrderId,
        RefNo: _this.filters.RefNo,
        Plateform: _this.filters.Plateform,
        OrderType: _this.filters.OrderType,
        PlatformUserName: _this.filters.PlatformUserName
      };
      if (_this.filters.startTime != "" && _this.filters.endTime != "") {
        if (
          !dayjs(_this.filters.endTime).isAfter(
            dayjs(_this.filters.startTime)
          ) &&
          dayjs(_this.filters.endTime).diff(
            dayjs(_this.filters.startTime),
            "day"
          ) != 0
        ) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true
          });
          return false;
        } else {
          data.paid_data_gte = dayjs(_this.filters.startTime).format(
            "YYYY-MM-DD"
          );
          data.paid_data_lte = dayjs(_this.filters.endTime).format(
            "YYYY-MM-DD"
          );
        }
      }
      this.$Spin.show();
      exportList(data)
        .then(res => {
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel"
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
        .catch(err => {
          let errData = err.response;
          if (errData.status == "400") {
            this.$Message.error({
              content: "一次最多导出10000条数据",
              duration: 10,
              closable: true
            });
          } else {
            this.$Message.error({
              content: errData.statusText,
              duration: 10,
              closable: true
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
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style lang="less"></style>
