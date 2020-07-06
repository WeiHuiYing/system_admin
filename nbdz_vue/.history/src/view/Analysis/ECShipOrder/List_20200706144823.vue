<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="100" inline>
          <FormItem label="订单号">
            <Input placeholder="请输入搜索订单号" clearable v-model="filters.ordercode" />
          </FormItem>
          <FormItem prop="startTime" label="制单开始时间">
            <DatePicker
              v-model="filters.startTime"
              type="date"
              :options="dateOptions"
              placeholder="请选择开始时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem prop="endTime" label="制单结束时间">
            <DatePicker
              v-model="filters.endTime"
              type="date"
              :options="dateOptions"
              placeholder="请选择结束时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem>
            <Button
              style="margin-right:5px"
              @click="loadFilter()"
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
        <Button @click="exportData()" class="search-btn" type="primary">导出</Button>
      </Col>
    </Row>
    <Table
      height="700"
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :border="true"
    ></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
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
      <Form ref="formInline" label-position="right" :label-width="100" inline>
        <FormItem label="订单号">
          <Input placeholder="请输入搜索订单号" clearable v-model="filters.ordercode" />
        </FormItem>
        <FormItem label="公司">
          <Input placeholder="请输入搜索公司" clearable v-model="filters.companyName" />
        </FormItem>
        <FormItem label="发货仓">
          <Input placeholder="请输入发货仓" clearable v-model="filters.warehouse" />
        </FormItem>
        <FormItem label="目的仓">
          <Input placeholder="请输入目的仓" clearable v-model="filters.towarehouse" />
        </FormItem>
        <FormItem prop="startTime" label="制单开始时间">
          <DatePicker
            v-model="filters.startTime"
            type="date"
            :options="dateOptions"
            placeholder="请选择开始时间"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem prop="endTime" label="制单结束时间">
          <DatePicker
            v-model="filters.endTime"
            type="date"
            :options="dateOptions"
            placeholder="请选择结束时间"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem label="店铺">
          <Select v-model="filters.shopName" style="width:200px" clearable>
            <Option v-for="(item,index) in shopList" :value="item" :key="index">{{ item }}</Option>
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
  GetECFbaHead,
  ExportECFbaHead,
  ECGetShop as GetShop
} from "@/api/Analysis";
import dayjs from "dayjs";
export default {
  data() {
    return {
      filters: {
        ordercode: "",
        shopName: "",
        startTime: "",
        endTime: "",
        companyName: "",
        warehouse: "",
        towarehouse: ""
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        }
      },
      shopList: [],
      tableLoading: false,
      listData: [],
      listColums: [
        {
          title: "订单号",
          key: "ordercode",
          width: 150
        },
        {
          title: "入库单号",
          key: "inNo",
          width: 150
        },
        {
          title: "服务商单号",
          key: "referenceNo",
          width: 150
        },
        {
          title: "制单日期",
          key: "addTime",
          width: 150
        },
        {
          title: " 预计到货日期",
          key: "expectedDate",
          width: 150
        },
        {
          title: "外部sku",
          key: "outSku",
          width: 150
        },
        {
          title: "子SKU",
          key: "itemSku",
          width: 150
        },
        {
          title: "店铺",
          key: "storeName",
          width: 150
        },
        {
          title: "公司简称",
          key: "companyName",
          width: 150
        },
        {
          title: "币种",
          key: "currery",
          width: 150
        },
        {
          title: "数量",
          key: "qty",
          width: 150
        },
        {
          title: "单价",
          key: "price",
          width: 150
        },
        {
          title: "总成本",
          key: "cost",
          width: 150
        },
        {
          title: "发货仓",
          key: "warehouse",
          width: 150
        },
        {
          title: "目的仓",
          key: "toWarehouse",
          width: 150
        },
        {
          title: "备注",
          key: "remark",
          width: 150
        }
      ],
      pageCurrent: 1,
      pageTotal: 1,
      pageSize: 100,
      modelFilters: false
    };
  },
  methods: {
    loadData() {
      let _this = this;
      if (!_this.pageCurrent) _this.pageCurrent = 1;
      let filtersquery = _this.filtersObj();
      if (_this.filters.startTime != "" && _this.filters.endTime != "") {
        if (
          !dayjs(_this.filters.endTime).isAfter(
            dayjs(_this.filters.startTime)
          ) &&
          dayjs(_this.filters.endTime).diff(
            dayjs(_this.filters.startTime),
            "day"
          ) != "0"
        ) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true
          });
          return false;
        } else {
          filtersquery.push({
            key: "addtime",
            binaryop: "gt",
            value: dayjs(_this.filters.startTime).format("YYYY-MM-DD "),
            andorop: "and"
          });
          filtersquery.push({
            key: "addtime",
            binaryop: "lt",
            value: dayjs(_this.filters.endTime).format("YYYY-MM-DD "),
            andorop: "and"
          });
        }
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filtersquery
      };
      _this.tableLoading = true;
      GetECFbaHead(data)
        .then(res => {
          _this.tableLoading = false;
          const resData = res.data;
          if (resData.code == 200) {
            _this.listData = resData.data;
            _this.pageTotal = res.data.totalCount;
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
    filtersObj() {
      let _this = this;
      let filtersquery = [];

      if (_this.filters.shopName && _this.filters.shopName != "") {
        filtersquery.push({
          key: "storename",
          binaryop: "eq",
          value: _this.filters.shopName,
          andorop: "and"
        });
      }
      if (_this.filters.ordercode && _this.filters.ordercode != "") {
        filtersquery.push({
          key: "ordercode",
          binaryop: "like",
          value: _this.filters.ordercode,
          andorop: "and"
        });
      }
      if (_this.filters.companyName && _this.filters.companyName != "") {
        filtersquery.push({
          key: "companyName",
          binaryop: "like",
          value: _this.filters.companyName,
          andorop: "and"
        });
      }
      if (_this.filters.warehouse && _this.filters.warehouse != "") {
        filtersquery.push({
          key: "warehouse",
          binaryop: "like",
          value: _this.filters.warehouse,
          andorop: "and"
        });
      }
      if (_this.filters.towarehouse && _this.filters.towarehouse != "") {
        filtersquery.push({
          key: "towarehouse",
          binaryop: "like",
          value: _this.filters.towarehouse,
          andorop: "and"
        });
      }
      return filtersquery;
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
      const _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
    },
    loadShop() {
      let _this = this;
      GetShop()
        .then(res => {
          if (res.status == 200) {
            _this.shopList = res.data;
          } else {
            this.$Message.error({
              content: res.data.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    exportData() {
      let data = {};
      let _this = this;
      this.$Spin.show();
      let filterQuery = _this.filtersObj();
      data = {
        query: filterQuery
      };
      ExportECFbaHead(data).then(res => {
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel"
        });
        const fileName = "头程出货单.xlsx";
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
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    changePageSize(size) {
      let _this = this;
      _this.pageSize = size;
      _this.loadData();
    }
  },
  mounted() {
    this.loadData();
    this.loadShop();
  }
};
</script>
