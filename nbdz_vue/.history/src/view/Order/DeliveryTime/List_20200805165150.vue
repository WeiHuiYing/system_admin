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
                @click="loadData()"
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
    <Table ref="tables" height="700" :data="listData" border v-bind:columns="listColums" stripe></Table>
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
          title: "产品类型",
          key: "productType",
        },
        {
          title: "总发货单量",
          key: "totalQty",
        },
        {
          title: "24小时内发货",
          align: "center",
          children: [
            {
              title: "单量",
              key: "qty24hh",
              align: "center",
              sortable: true,
            },
            {
              title: "占比",
              key: "rate24hh",
              align: "center",
              sortable: true,
            },
          ],
        },
        {
          title: "24-48小时内发货",
          align: "center",
          children: [
            {
              title: "单量",
              key: "qty48hh",
              align: "center",
              sortable: true,
            },
            {
              title: "占比",
              key: "rate48hh",
              align: "center",
              sortable: true,
            },
          ],
        },
        {
          title: "48-72小时内发货",
          align: "center",
          children: [
            {
              title: "单量",
              key: "qty72hh",
              align: "center",
              sortable: true,
            },
            {
              title: "占比",
              key: "rate72hh",
              align: "center",
              sortable: true,
            },
          ],
        },
        {
          title: "3-5天内发货",
          align: "center",
          children: [
            {
              title: "单量",
              key: "qty325dd",
              align: "center",
              sortable: true,
            },
            {
              title: "占比",
              key: "rate325dd",
              align: "center",
              sortable: true,
            },
          ],
        },
        {
          title: "5-10天内发货",
          align: "center",
          children: [
            {
              title: "单量",
              key: "qty5210dd",
              align: "center",
              sortable: true,
            },
            {
              title: "占比",
              key: "rate5210dd",
              align: "center",
              sortable: true,
            },
          ],
        },
        {
          title: "大于10天内发货",
          align: "center",
          children: [
            {
              title: "单量",
              key: "qty10dd",
              align: "center",
              sortable: true,
            },
            {
              title: "占比",
              key: "rate10dd",
              align: "center",
              sortable: true,
            },
          ],
        },
      ],
      listData: [],
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
        query: filterQuery,
      };
      getList(data)
        .then((res) => {
          const resData = res.data;
          if (resData.code == 200) {
            _this.listData = resData.data;
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
