/* 2020 / 08 / 05
weihuiying
发货时效报表  */
<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form ref="formInline" label-position="right" :label-width="90" inline>
            <FormItem prop="FhStart" label="发货开始时间">
              <DatePicker
                v-model="filters.FhStart"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
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
            <FormItem>
              <Button
                @click="loadFilter()"
                style="margin-right:5px"
                class="search-btn"
                type="primary"
              >搜索</Button>
              <Button @click="exportData()" class="search-btn" type="primary">导出</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <Table ref="tables" height="700" :data="listData" v-bind:columns="listColums" stripe></Table>
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
  </div>
</template>

<script>
import {
  DeliveryTimeReport as getList,
  ExportDeliveryTimeReport as exportReport,
} from "@/api/Order";

import dayjs from "dayjs";
import store from "@/store";
export default {
  data() {
    return {
      listColums: [
        {
          title: "参考号",
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
          key: "plateform",
          sortable: true,
        },
        {
          title: "店铺",
          key: "platformUserName",
        },
        {
          title: "国家",
          key: "countryCode",
        },
        {
          title: "备注",
          key: "orderDesc",
        },
      ],
      listData: [],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      plateList: [],
      shopList: [],
      filters: {
        FhStart: "",
        FhEnd: "",
      },
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
      let filterQuery = [];
      let filterFh = _this.filtersDate(
        "FhStart",
        "FhEnd",
        _this.filters.FhStart,
        _this.filters.FhEnd
      );
      if (filterFh) {
        if (filterFh.length > 0) {
          filterQuery = filterQuery.concat(filterFh);
        }
      } else {
        return false;
      }
      let data = {
        page: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      getList(data)
        .then((res) => {
          console.log(res);
          const resData = res.data;
          if (resData.code == 200) {
            _this.listData = resData.data;
            _this.pageTotal = resData.totalCount;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filtersDate(startString, endString, startTime, endTime) {
      const _this = this;
      let filterQuery = [];
      if (startTime != "" && endTime != "") {
        endTime = dayjs(endTime).add(1, "day");
        if (!dayjs(endTime).isAfter(dayjs(startTime))) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true,
          });
          return false;
        } else {
          let Start = {
            key: startString,
            binaryop: "gte",
            value: dayjs(startTime).format("YYYY-MM-DD"),
            andorop: "and",
          };
          let End = {
            key: endString,
            binaryop: "lt",
            value: dayjs(endTime).format("YYYY-MM-DD"),
            andorop: "and",
          };
          filterQuery.push(Start);
          filterQuery.push(End);
        }
      }
      return filterQuery;
    },
    loadFilter() {
      const _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
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
      let filterFh = _this.filtersDate(
        "FhStart",
        "FhEnd",
        _this.filters.FhStart,
        _this.filters.FhEnd
      );
      if (filterFh) {
        if (filterFh.length > 0) {
          filterQuery = filterQuery.concat(filterFh);
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
        const fileName = "发货时效报表.xlsx";
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
  },
};
</script>

<style lang="less"></style>
