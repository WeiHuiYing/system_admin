/* 2020 / 08 / 05
weihuiying
作废订单报表  */
<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="90"
            inline
          >
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
            <FormItem prop="platformUserName" label="店铺">
              <Select
                :disabled="filters.plateform == '' ? true : false"
                v-model="filters.platformUserName"
                clearable
                style="width: 150px"
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
            <FormItem prop="refNo" label="参考单号">
              <Input
                v-model="filters.refNo"
                placeholder="请输入参考单号"
              ></Input>
            </FormItem>
            <FormItem prop="FkStart" label="付款开始时间">
              <DatePicker
                v-model="filters.FkStart"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
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
            <FormItem>
              <Button
                @click="loadFilter()"
                style="margin-right: 5px"
                class="search-btn"
                type="primary"
                >搜索</Button
              >
              <Button @click="exportData()" class="search-btn" type="primary"
                >导出</Button
              >
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <Table
      ref="tables"
      height="700"
      :data="listData"
      v-bind:columns="listColums"
      :loading="tableLoading"
      stripe
    ></Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
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
  </div>
</template>

<script>
import {
  CancelOrderReport as getList,
  ExportCancelOrderReport as exportReport,
  GetPlateform,
  GetShop,
} from "@/api/order";
import { filtersNewDate as filtersDate } from "@/libs/validator";
import dayjs from "dayjs";
import store from "@/store";
export default {
  data() {
    return {
      listColums: [
        {
          title: "参考单号",
          key: "refNo",
        },
        {
          title: "sku",
          key: "trueSku",
        },
        {
          title: "数量",
          key: "trueQty",
          sortable: true,
        },
        {
          title: "平台",
          key: "plateForm",
          sortable: true,
        },
        {
          title: "店铺",
          key: "platFormUserName",
        },
        {
          title: "国家",
          key: "countryCode",
        },
        {
          title: "备注",
          key: "customerServiceNote",
        },
        {
          title: "系统备注",
          key: "systemNote",
        },
      ],
      listData: [],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      plateList: [],
      shopList: [],
      filters: {
        plateform: "",
        platformUserName: "",
        FkStart: "",
        FkEnd: "",
        refNo: "",
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
      let filterQuery = _this.filtersObj();
      let filterFk = filtersDate(
        "FkStart",
        _this.filters.FkStart,
        _this.filters.FkEnd,
        "FkEnd"
      );
      if (filterFk) {
        if (filterFk.length > 0) {
          filterQuery = filterQuery.concat(filterFk);
        }
      } else {
        return false;
      }
      let data = {
        page: _this.pageCurrent,
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
          }
        })
        .catch((err) => {
          console.log(err);
          _this.tableLoading = false;
        });
    },
    // 筛选条件字段拼接
    filtersObj() {
      let _this = this;
      let filterQuery = [];
      if (_this.filters.refNo && _this.filters.refNo != "") {
        filterQuery.push({
          key: "refNo",
          value: _this.filters.refNo,
          option: "lk",
          isAnd: "true",
        });
      }
      if (_this.filters.plateform && _this.filters.plateform != "") {
        filterQuery.push({
          key: "plateForm",
          value: _this.filters.plateform,
          option: "eq",
          isAnd: "true",
        });
      }
      if (
        _this.filters.platformUserName &&
        _this.filters.platformUserName != ""
      ) {
        filterQuery.push({
          key: "platFormUserName",
          value: _this.filters.platformUserName,
          option: "eq",
          isAnd: "true",
        });
      }
      return filterQuery;
    },
    loadFilter() {
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
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    changePageSize(size) {
      let _this = this;
      _this.pageSize = size;
      _this.loadData();
    },
    exportData() {
      let _this = this;
      let filterQuery = _this.filtersObj();
      let filterFk = filtersDate(
        "FkStart",
        _this.filters.FkStart,
        _this.filters.FkEnd,
        "FkEnd"
      );
      if (filterFk) {
        if (filterFk.length > 0) {
          filterQuery = filterQuery.concat(filterFk);
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
        const fileName = "作废订单报表.xlsx";
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

<style lang="less"></style>
