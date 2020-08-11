<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="22">
          <Form ref="formInline" label-position="right" :label-width="60" inline>
            <FormItem prop="startTime" label="开始时间">
              <DatePicker
                v-model="filters.startTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem prop="endTime" label="结束时间">
              <DatePicker
                v-model="filters.endTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 200px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button @click="loadFilter()" class="search-btn" type="primary">
                <Icon type="search" />&nbsp;&nbsp;搜索
              </Button>
            </FormItem>
          </Form>
        </Col>
        <Col :span="2">
          <Button @click="exportData()" type="primary">导出</Button>
        </Col>
      </Row>
    </div>
    <Table
      ref="tables"
      height="700"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :span-method="handleSpan"
      border
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
  </div>
</template>

<script>
import { agingReport as getList } from "@/api/Logistics";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listColums: [
        {
          title: "sku",
          key: "sku"
        },
        {
          title: "数量",
          key: "qty"
        },
        {
          title: "出库数量",
          key: "outQty"
        },
        {
          title: "散单销量",
          key: "saleQty"
        },
        {
          title: "头程出库数量",
          key: "shipBatchQty"
        }
      ],
      listData: [],
      filters: {
        startTime: "",
        endTime: ""
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        }
      },
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false
    };
  },
  methods: {
    loadData() {
      let _this = this;
      _this.tableLoading = true;
      let startTime = "",
        endTime = "";
      if (
        _this.filters.startTime &&
        _this.filters.endTime &&
        _this.filters.startTime != "" &&
        _this.filters.endTime != ""
      ) {
        startTime = _this.filters.startTime;
        endTime = dayjs(_this.filters.endTime).add("day", 1);
        if (!dayjs(endTime).isAfter(dayjs(startTime))) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true
          });
          return false;
        }
      } else {
        this.$Message.error({
          content: "请选择时间段",
          duration: 10,
          closable: true
        });
        return false;
      }
      let data = {
        date_gte: dayjs(startTime).format("YYYY-MM-DD"),
        date_lte: dayjs(endTime).format("YYYY-MM-DD")
      };
      getList(data)
        .then(res => {
          _this.tableLoading = false;
          if (res.data.code == 200) {
            _this.listData = res.data.data;
            _this.pageTotal = res.data.totalCount;
          } else {
            this.$Message.error({
              content: res.data.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          _this.tableLoading = false;
          console.log(err);
        });
    },
    exportData() {
      let _this = this;
      let filtersquery = [];
      if (_this.filters["sku"] && _this.filters["sku"] != "") {
        filtersquery.push({
          key: "Sku",
          binaryop: "like",
          value: _this.filters["sku"],
          andorop: "and"
        });
      }
      if (
        _this.filters.startTime &&
        _this.filters.endTime &&
        _this.filters.startTime != "" &&
        _this.filters.endTime != ""
      ) {
        let startTime = _this.filters.startTime;
        let endTime = dayjs(_this.filters.endTime).add(1, "day");
        if (!dayjs(endTime).isAfter(dayjs(startTime))) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true
          });
          return false;
        } else {
          filtersquery.push({
            key: "time",
            binaryop: "gte",
            value: dayjs(startTime).format("YYYY-MM-DD"),
            andorop: "and"
          });
          filtersquery.push({
            key: "time",
            binaryop: "lt",
            value: dayjs(endTime).format("YYYY-MM-DD"),
            andorop: "and"
          });
        }
      }
      let data = {
        query: filtersquery
      };
      this.$Spin.show();
      exportList(data).then(res => {
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel"
        });
        const fileName = "出库报表.xlsx";
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
    handleSpan({ row, column, rowIndex, columnIndex }) {
      console.log({ row, column, rowIndex, columnIndex });
      //   if (rowIndex === 0 && columnIndex === 0) {
      //     return {
      //       rowspan: this.listData.length,
      //       colspan: 1
      //     };
      //   } else if (columnIndex === 0) {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      //   if (rowIndex === 0 && columnIndex === 1) {
      //     return {
      //       rowspan: this.listData.length,
      //       colspan: 1
      //     };
      //   } else if (columnIndex === 1) {
      //     return {
      //       rowspan: 0,
      //       colspan: 1
      //     };
      //   }
    }
  },
  mounted() {}
};
</script>

<style lang="less"></style>
