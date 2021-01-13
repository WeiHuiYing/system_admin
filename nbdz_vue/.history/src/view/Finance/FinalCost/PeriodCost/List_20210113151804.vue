/*  
2020 / 01/ 04
weihuiying
期间成本
 */
<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem prop="month" label="月份">
            <DatePicker
              :options="dateOptions"
              type="month"
              v-model="filters.month"
              placeholder="请选择月份"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem prop="productCategoryName" label="品类">
            <Input
              clearable
              v-model="filters.productCategoryName"
              placeholder="请输入品类"
            ></Input>
          </FormItem>
          <FormItem>
            <Button style="margin-right: 5px" @click="loadData()" type="primary"
              >搜索</Button
            >
            <Button
              style="margin-right: 5px"
              @click="PeriodEnd()"
              type="primary"
              >月末结转</Button
            >
            <Button @click="CancelPeriodEnd()" type="primary">反结账</Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="2">
        <Button @click="exportData()" type="primary">导出</Button>
      </Col>
    </Row>
    <Table
      ref="tables"
      border
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :loading="tableLoading"
      height="700"
    ></Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="totalCount"
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
  getPeriodCostList as getList,
  exportPeriodCostList as exportList,
  execPeriodEnd,
  execCancelPeriodEnd,
} from "@/api/finance";
import excel from "@/libs/excel";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listColums: [
        {
          title: "月份",
          key: "month",
          align: "center",
          width: 200,
        },
        {
          title: "sku",
          key: "sku",
          align: "center",
          width: 200,
        },
        {
          title: "品类",
          key: "productCategoryName",
          align: "center",
          width: 100,
        },
        {
          title: "期初",
          align: "center",
          children: [
            {
              title: "成本单价",
              key: "openPrice",
              align: "center",
              width: 100,
            },
            {
              title: "库存数量",
              key: "openQty",
              align: "center",
              width: 100,
            },
            {
              title: "成本",
              key: "openCost",
              align: "center",
              width: 100,
            },
          ],
        },
        {
          title: "期间",
          align: "center",
          children: [
            {
              title: "入库单价",
              key: "inPrice",
              align: "center",
              width: 100,
            },
            {
              title: "入库数量",
              key: "inQty",
              align: "center",
              width: 100,
            },
            {
              title: "入库成本",
              key: "inCost",
              align: "center",
              width: 100,
            },
            {
              title: "退件入库单价",
              key: "rePrice",
              align: "center",
              width: 110,
            },
            {
              title: "退件入库数量",
              key: "reQty",
              align: "center",
              width: 110,
            },
            {
              title: "退件入库成本",
              key: "reCost",
              align: "center",
              width: 110,
            },
            {
              title: "出库单价",
              key: "outPrice",
              align: "center",
              width: 100,
            },
            {
              title: "出库数量",
              key: "outQty",
              align: "center",
              width: 100,
            },
            {
              title: "出库成本",
              key: "outCost",
              align: "center",
              width: 100,
            },
          ],
        },
        {
          title: "期末",
          align: "center",
          children: [
            {
              title: "成本单价",
              key: "endPrice",
              align: "center",
              width: 100,
            },
            {
              title: "库存数量",
              key: "endQty",
              align: "center",
              width: 100,
            },
            {
              title: "成本",
              key: "endCost",
              align: "center",
              width: 100,
            },
          ],
        },
      ],
      listData: [],
      totalCount: 1,
      pageCurrent: 1,
      pageSize: 100,
      filters: {
        month: "",
      },
      tableLoading: false,
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
      if (!_this.pageCurrent) _this.pageCurrent = 1;
      if (_this.filters.month && _this.filters.month != "") {
        let filtersquery = [
          {
            key: "month",
            isAnd: "true",
            option: "eq",
            value: dayjs(_this.filters.month).format("YYYY-MM"),
          },
        ];
        if(){

        }
        let params = {
          method: "POST",
          data: {
            pageNum: _this.pageCurrent,
            pageSize: _this.pageSize,
            query: filtersquery,
          },
        };
        this.tableLoading = true;
        getList(params)
          .then((res) => {
            let resData = res.data;
            this.tableLoading = false;
            if (resData.code == "200") {
              _this.listData = resData.data;
              _this.totalCount = resData.totalCount;
            } else {
              this.$Message.error({
                content: resData.msg,
                duration: 10,
                closable: true,
              });
            }
          })
          .catch((err) => {
            console.log(err.response);
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
      } else {
        this.$Message.error({
          content: "请选择月份",
          duration: 10,
          closable: true,
        });
      }
    },
    // 月末结转
    PeriodEnd() {
      const _this = this;
      if (_this.filters.month && _this.filters.month != "") {
        let params = {
          method: "GET",
          data: {
            month: dayjs(_this.filters.month).format("YYYY-MM"),
          },
        };
        this.tableLoading = true;
        execPeriodEnd(params)
          .then((res) => {
            const resData = res.data;
            if (resData.code == 200) {
              this.$Message.error({
                content: resData.message,
                duration: 10,
                closable: true,
              });
            } else {
              this.$Message.success({
                content: resData.message,
                duration: 10,
                closable: true,
              });
            }
            this.tableLoading = false;
          })
          .catch((err) => {
            console.log(err.response);
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
      } else {
        this.$Message.error({
          content: "请选择月份",
          duration: 10,
          closable: true,
        });
      }
    },
    // 月末结转
    CancelPeriodEnd() {
      const _this = this;
      if (_this.filters.month && _this.filters.month != "") {
        let params = {
          method: "GET",
          data: {
            month: dayjs(_this.filters.month).format("YYYY-MM"),
          },
        };
        this.tableLoading = true;
        execCancelPeriodEnd(params)
          .then((res) => {
            const resData = res.data;
            if (resData.code == 200) {
              this.$Message.error({
                content: resData.message,
                duration: 10,
                closable: true,
              });
            } else {
              this.$Message.success({
                content: resData.message,
                duration: 10,
                closable: true,
              });
            }
            this.tableLoading = false;
          })
          .catch((err) => {
            console.log(err.response);
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
      } else {
        this.$Message.error({
          content: "请选择月份",
          duration: 10,
          closable: true,
        });
      }
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
    // 导出功能
    exportData() {
      let _this = this;
      if (_this.filters.month && _this.filters.month != "") {
        let filtersquery = [
          {
            key: "month",
            isAnd: "true",
            option: "eq",
            value: dayjs(_this.filters.month).format("YYYY-MM"),
          },
        ];
        let params = {
          method: "POST",
          data: {
            query: filtersquery,
          },
        };
        this.tableLoading = true;
        exportList(params)
          .then((res) => {
            const content = res;
            const blob = new Blob([content.data], {
              type: "application/vnd.ms-excel",
            });
            const fileName = "期间成本.xlsx";
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
            this.tableLoading = false;
          })
          .catch((err) => {
            console.log(err.response);
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
      } else {
        this.$Message.error({
          content: "请选择月份",
          duration: 10,
          closable: true,
        });
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less"></style>
