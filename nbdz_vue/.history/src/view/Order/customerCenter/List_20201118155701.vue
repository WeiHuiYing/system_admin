/* 2020 / 09 / 17
weihuiying
客户中心订单情况查询  */
<template>
  <div class="content-main">
    <div class="content-header">
      <Row>
        <Col :span="22">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="80"
            inline
          >
            <FormItem prop="starttime" label="开始时间">
              <DatePicker
                v-model="filters.starttime"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem prop="endtime" label="结束时间">
              <DatePicker
                v-model="filters.endtime"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 200px"
              ></DatePicker>
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
            <FormItem prop="store" label="店铺">
              <Select
                :disabled="
                  !filters.plateform || filters.plateform == '' ? true : false
                "
                v-model="filters.store"
                clearable
                style="width: 200px"
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
            <FormItem>
              <Button @click="loadFilters()" class="search-btn" type="primary"
                >搜索</Button
              >
            </FormItem>
          </Form>
        </Col>
        <Col style="text-align: right" :span="2">
          <Button type="primary" @click="exportAll()">导出</Button>
        </Col>
      </Row>
    </div>
    <Table
      height="700"
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColumns"
      border
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
  </div>
</template>

<script>
import {
  CsOrderQuery as getList,
  CsOrderQueryExport as exportReport,
  GetPlateform,
  GetShop,
} from "@/api/Order";
import { filtersDate } from "@/libs/validator";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listData: [],
      listColumns: [
        {
          title: "平台",
          key: "plateform",
          width: 100,
        },
        {
          title: "店铺",
          key: "store",
          width: 100,
        },
        {
          title: "总订单量",
          key: "zorderQty",
          width: 100,
        },
        {
          title: "总发货订单",
          key: "zfhQty",
          width: 100,
        },
        {
          title: "总发货销售额",
          key: "zfhAmount",
          width: 100,
        },
        {
          title: "24小时发货",
          align: "center",
          children: [
            {
              title: "发货订单量",
              width: 100,
              align: "center",
              key: "oqtyA",
            },
            {
              title: "发货销售额",
              width: 100,
              align: "center",
              key: "amountA",
            },
            {
              title: "发货率",
              width: 100,
              align: "center",
              key: "rateA",
            },
          ],
        },
        {
          title: "48小时发货",
          align: "center",
          children: [
            {
              title: "发货订单量",
              width: 100,
              align: "center",
              key: "oqtyB",
            },
            {
              title: "发货销售额",
              width: 100,
              align: "center",
              key: "amountB",
            },
            {
              title: "发货率",
              width: 100,
              align: "center",
              key: "rateB",
            },
          ],
        },
        {
          title: "3-4天发货",
          align: "center",
          children: [
            {
              title: "发货订单量",
              width: 100,
              align: "center",
              key: "oqtyC",
            },
            {
              title: "发货销售额",
              width: 100,
              align: "center",
              key: "amountC",
            },
            {
              title: "发货率",
              width: 100,
              align: "center",
              key: "rateC",
            },
          ],
        },
        {
          title: "5天发货",
          align: "center",
          children: [
            {
              title: "发货订单量",
              width: 100,
              align: "center",
              key: "oqtyD",
            },
            {
              title: "发货销售额",
              width: 100,
              align: "center",
              key: "amountD",
            },
            {
              title: "发货率",
              width: 100,
              align: "center",
              key: "rateD",
            },
          ],
        },
        {
          title: "退款情况",
          align: "center",
          children: [
            {
              title: "总订单量",
              width: 100,
              align: "center",
              key: "tkQty",
            },
            {
              title: "总退款金额",
              width: 100,
              align: "center",
              key: "tkAmount",
            },
            {
              title: "退货退款",
              align: "center",
              children: [
                {
                  title: "订单量",
                  width: 100,
                  align: "center",
                  key: "tkQtyA",
                },
                {
                  title: "退款金额",
                  width: 100,
                  align: "center",
                  key: "tkAmountA",
                },
              ],
            },
          ],
        },
        {
          title: "退款情况",
          align: "center",
          children: [
            {
              title: "全单退款",
              align: "center",
              children: [
                {
                  title: "订单量",
                  width: 100,
                  align: "center",
                  key: "tkQtyB",
                },
                {
                  title: "退款金额",
                  width: 100,
                  align: "center",
                  key: "tkAmountB",
                },
              ],
            },
          ],
        },
        {
          title: "售后工单情况",
          align: "center",
          children: [
            {
              title: "总订单数",
              width: 100,
              align: "center",
              key: "shQty",
            },
          ],
        },
        {
          title: "纠纷情况",
          align: "center",
          children: [
            {
              title: "总纠纷数",
              width: 100,
              align: "center",
              key: "jfQty",
            },
            {
              title: "总纠纷金额",
              width: 100,
              align: "center",
              key: "jfAmount",
            },
            {
              title: "纠纷失败数",
              width: 100,
              align: "center",
              key: "jfFailQty",
            },
            {
              title: "纠纷失败金额",
              width: 100,
              align: "center",
              key: "jfFailAmount",
            },
          ],
        },
        {
          title: "其他退款",
          align: "center",
          children: [
            {
              title: "其他退款金额",
              width: 100,
              align: "center",
              key: "qtAmount",
            },
          ],
        },
        {
          title: "未发货订单",
          align: "center",
          children: [
            {
              title: "订单量",
              width: 100,
              align: "center",
              key: "wfQty",
            },
            {
              title: "订单金额",
              width: 100,
              align: "center",
              key: "wfAmount",
            },
          ],
        },
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      filters: {
        starttime: "",
        endtime: "",
        plateform: "",
        store: "",
      },
      plateList: [],
      shopList: [],
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let filterQuery = _this.filtersObj();
      let filterTime = filtersDate(
        "starttime",
        _this.filters.starttime,
        _this.filters.endtime,
        "endtime"
      );
      if (filterTime) {
        if (filterTime.length > 0) {
          filterQuery = filterQuery.concat(filterTime);
        }
      } else {
        return false;
      }
      let data = {
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
    filtersObj() {
      let _this = this;
      let filterQuery = [];
      if (_this.filters.plateform && _this.filters.plateform != "") {
        let plateObj = {
          key: "plateform",
          binaryop: "eq",
          value: _this.filters.plateform,
          andorop: "and",
        };
        filterQuery.push(plateObj);
      }
      if (_this.filters.store && _this.filters.store != "") {
        let storeObj = {
          key: "store",
          binaryop: "eq",
          value: _this.filters.store,
          andorop: "and",
        };
        filterQuery.push(storeObj);
      }
      return filterQuery;
    },
    loadFilters() {
      const _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
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
      let _this = this;
      let filterQuery = _this.filtersObj();
      let filterTime = filtersDate(
        "starttime",
        _this.filters.starttime,
        _this.filters.endtime,
        "endtime"
      );
      if (filterTime) {
        if (filterTime.length > 0) {
          filterQuery = filterQuery.concat(filterTime);
        }
      } else {
        return false;
      }
      let data = {
        query: filterQuery,
      };
      this.$Spin.show();
      exportReport(data).then((res) => {
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel",
        });
        const fileName = "客户中心订单情况报表.xlsx";
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
    this.loadPlate();
  },
};
</script>

<style lang="less" scoped>
</style>