/* 2020 / 08 / 26
weihuiying
服装动销率  */
<template>
  <div class="content-main">
    <div style="margin: 10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="22">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="80"
            inline
          >
            <FormItem label="sku">
              <Input clearable v-model="filters.sku" />
            </FormItem>
            <FormItem prop="yearMonth" label="月份">
              <DatePicker
                :options="dateOptions"
                type="month"
                v-model="filters.yearMonth"
                placeholder="请选择月份"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button
                @click="filtersLoad()"
                style="margin-right: 5px"
                class="search-btn"
                type="primary"
                >搜索</Button
              >
              <Button @click="exportAll()" class="search-btn" type="primary"
                >导出</Button
              >
            </FormItem>
          </Form>
        </Col>
        <Col :span="2">
          <Upload
            action=""
            accept=".xls, .xlsx"
            :show-upload-list="false"
            :before-upload="handleBefore"
            :disabled="uploadLoading"
          >
            <Button :loading="uploadLoading" type="primary">导入</Button>
          </Upload>
        </Col>
      </Row>
    </div>
    <Table
      height="700"
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColumns"
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
  OrderTurnoverRate as getList,
  ExportOrderTurnoverRate as exportReport,
  ImportOrderTurnoverRate as importReport,
} from "@/api/Order";
import store from "@/store";
import dayjs from "dayjs";
export default {
  data() {
    return {
      filters: { sku: "", yearMonth: "" },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      listData: [],
      uploadLoading: false,
      listColumns: [
        {
          title: "日期",
          key: "yearMonth",
          width: "200",
        },
        {
          title: "sku",
          key: "sku",
          width: "200",
        },
        {
          title: "期初库存",
          key: "beginInventory",
          width: "100",
          sortable: true,
        },
        {
          title: "当月发货数量",
          key: "outQty",
          width: "200",
          sortable: true,
        },
        {
          title: "当月销售金额",
          key: "salesAmount",
          width: "200",
          sortable: true,
        },
        {
          title: "入库数量",
          key: "inQty",
          width: "200",
          sortable: true,
        },
        {
          title: "期末库存",
          key: "endInventory",
          width: "200",
          sortable: true,
        },
        {
          title: "动销率",
          key: "outInventoryRate",
          width: "200",
          sortable: true,
        },
        {
          title: "产销率",
          key: "outInRate",
          width: "200",
          sortable: true,
        },
        {
          title: "存货周转收件",
          key: "turnDays",
          width: "200",
          sortable: true,
        },
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {};
      let filterQuery = _this.filtersObj();
      data = {
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
    // 筛选条件字段拼接
    filtersObj() {
      let _this = this;
      let filterQuery = [];
      if (_this.filters.sku && _this.filters.sku != "") {
        let skuObj = {
          key: "sku",
          binaryop: "like",
          value: _this.filters.sku,
          andorop: "and",
        };
        filterQuery.push(skuObj);
      }
      if (_this.filters.yearMonth && _this.filters.yearMonth != "") {
        let yearMonthObj = {
          key: "yearMonth",
          binaryop: "eq",
          value: dayjs(_this.filters.yearMonth).format("YYYY-MM"),
          andorop: "and",
        };
        filterQuery.push(yearMonthObj);
      }
      return filterQuery;
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
      let data = {};
      let _this = this;
      let filterQuery = _this.filtersObj();
      data = {
        query: filterQuery,
      };
      this.$Spin.show();
      exportReport(data).then((res) => {
        const content = res;
        const blob = new Blob([content.data], {
          type: "application/vnd.ms-excel",
        });
        const fileName = "服装动销率报表.xlsx";
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
    handleSuccess(response, file, fileList) {
      if (response.code == 200) {
        let _this = this;
        console.log(response);
        _this.uploadLoading = false;
        this.$Message.info({
          content: "上传成功",
          duration: 10,
          closable: true,
        });
      } else {
        this.$Message.error({
          content: response.msg,
          duration: 10,
          closable: true,
        });
      }
    },
    handleBefore(file) {
      let _this = this;
      console.log(file);
      if (_this.filters.yearMonth && _this.filters.yearMonth != "") {
      } else {
        this.$Message.error({
          content: "请选择月份",
          duration: 10,
          closable: true,
        });
        return false;
      }
    },
    filtersLoad() {
      let _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
</style>