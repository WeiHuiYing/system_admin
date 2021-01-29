<template>
  <div>
    <Row>
      <Col :span="22">
        <Form label-position="right" :label-width="100" inline>
          <FormItem label="sku">
            <Input
              clearable
              v-model="filters.skuId"
              placeholder="请输入sku"
            ></Input>
          </FormItem>
          <FormItem label="开始时间">
            <DatePicker
              v-model="filters.sDate"
              type="date"
              :options="dateOptions"
              placeholder="请选择开始时间"
              style="width: 200px"
              clearable
            >
            </DatePicker>
          </FormItem>
          <FormItem label="结束时间">
            <DatePicker
              v-model="filters.eDate"
              type="date"
              :options="dateOptions"
              placeholder="请选择结束时间"
              style="width: 200px"
              clearable
            >
            </DatePicker>
          </FormItem>
          <FormItem>
            <Button @click="loadData('filter')" type="primary">搜索</Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="2">
        <Button @click="exportData()" type="primary">导出</Button>
      </Col>
    </Row>
    <Table
      :loading="tableLoading"
      v-bind:columns="tableColumns"
      :data="tableData"
      stripe
      height="670"
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
import { ExportTmallSkuList, TmallSkuList } from "@/api/order";
import { filtersNewDate as filtersDate, fileToJson } from "@/libs/validator";
import dayjs from "dayjs";
export default {
  data() {
    return {
      tableLoading: false,
      tableColumns: [
        {
          title: "sku",
          key: "skuId",
        },
        {
          title: "国际条形码",
          key: "skuCode",
        },
        {
          title: "销量",
          key: "saleQty",
        },
        {
          title: "库存量",
          key: "qty",
        },
      ],
      tableData: [],
      filters: {
        skuId: "",
        sDate: "",
        eDate: "",
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      pageCurrent: 1,
      pageTotal: 1,
      pageSize: 100,
    };
  },
  methods: {
    loadData(type) {
      const _this = this;
      if (type && type == "filter") {
        _this.pageCurrent = 1;
      }
      let filterQuery = [];
      let filterDate = filtersDate(
        "sDate",
        _this.filters.sDate,
        _this.filters.eDate,
        "eDate"
      );
      if (filterDate && filterDate.length > 0) {
        filterQuery = filterQuery.concat(filterDate);
      } else {
        this.$Message.error({
          content: "请选择时间",
          duration: 10,
          closable: true,
        });
        return false;
      }
      if (_this.filters.skuId && _this.filters.skuId != "") {
        filterQuery.push({
          key: "skuId",
          value: _this.filters.skuId,
          option: "lk",
          isAnd: "true",
        });
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      _this.tableLoading = true;
      TmallSkuList(data)
        .then((res) => {
          console.log(res);
          const resData = res.data;
          _this.tableLoading = false;
          _this.tableData = resData.data;
          _this.pageTotal = resData.totalCount;
        })
        .catch((err) => {
          console.log(err);
          _this.tableLoading = false;
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
    exportData() {
      const _this = this;
      let filterQuery = [];
      let filterDate = filtersDate(
        "sDate",
        _this.filters.sDate,
        _this.filters.eDate,
        "eDate"
      );
      if (filterDate && filterDate.length > 0) {
        filterQuery = filterQuery.concat(filterDate);
      } else {
        this.$Message.error({
          content: "请选择时间",
          duration: 10,
          closable: true,
        });
        return false;
      }
      if (_this.filters.skuId && _this.filters.skuId != "") {
        filterQuery.push({
          key: "skuId",
          value: _this.filters.skuId,
          option: "lk",
          isAnd: "true",
        });
      }
      let data = {
        query: filterQuery,
      };
      _this.tableLoading = true;
      ExportTmallSkuList(data)
        .then((res) => {
          _this.tableLoading = false;
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "天猫sku列表.xlsx";
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
        })
        .catch((err) => {
          _this.tableLoading = false;
          if (err.response && err.response.data) {
            fileToJson(err.response.data).then((errData) => {
              _this.$Message.error({
                content: errData.message,
                duration: 10,
                closable: true,
              });
            });
          }
        });
    },
  },
};
</script>