<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="20">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="60"
            inline
          >
            <FormItem label="时间">
              <DatePicker
                v-model="filters.createTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择查询日期"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button
                @click="loadData('filter')"
                class="search-btn"
                type="primary"
                style="margin-right: 10px"
              >
                搜索
              </Button>
              <Button
                @click="exportData('list')"
                style="margin-right: 10px"
                type="primary"
              >
                导出导入数据
              </Button>
              <Button @click="exportData('sum')" type="primary">
                导出求和数据
              </Button>
            </FormItem>
          </Form>
        </Col>
        <Col :span="4">
          <Upload
            action=""
            name="excelFile"
            accept=".xls, .xlsx"
            :show-upload-list="false"
            :before-upload="handleUpload"
          >
            <Button :loading="uploadLoading">导入速卖通放款信息</Button>
          </Upload>
        </Col>
      </Row>
    </div>
    <Tabs v-model="currentTab" @on-click="changeTabs()">
      <TabPane label="导入收据" name="list">
        <Table
          ref="tables"
          height="650"
          :data="listData"
          v-bind:columns="listColums"
          stripe
        ></Table>
      </TabPane>
      <TabPane label="求和数据" name="sum">
        <Table
          ref="tables"
          height="650"
          :data="listData"
          v-bind:columns="sumColums"
          stripe
        ></Table>
      </TabPane>
    </Tabs>
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
import store from "@/store";
import {
  AliepressList,
  ExportAliepressList,
  GetSumList,
  ExportSumList,
  uploadLoanInfo,
} from "@/api/order";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listColums: [
        {
          title: "平台单号",
          key: "plateFormOrderCode",
        },
        {
          title: "流水号",
          key: "serialCode",
        },
        {
          title: "支付宝交易号",
          key: "alipayCode",
        },
        {
          title: "店铺",
          key: "plateForm",
        },
        {
          title: "金额",
          key: "amount",
          sortable: true,
        },
        {
          title: "币种",
          key: "currency",
        },
        {
          title: "备注",
          key: "memo",
        },
        {
          title: "导入时间",
          key: "enterTime",
        },
      ],
      sumColums: [
        {
          title: "平台单号",
          key: "plateFormOrderCode",
        },
        {
          title: "店铺",
          key: "plateForm",
        },
        {
          title: "首次放款信息",
          key: "firstLoanDate",
        },
        {
          title: "末次放款信息",
          key: "lastLoanDate",
        },
        {
          title: "金额",
          key: "amount",
          sortable: true,
        },
        {
          title: "币种",
          key: "currency",
        },
        {
          title: "备注",
          key: "memo",
        },
        {
          title: "导入时间",
          key: "createTime",
        },
      ],
      filters: {
        createTime: "",
      },
      currentTab: "list",
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      listData: [],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      uploadLoading: false,
    };
  },
  methods: {
    loadData(type) {
      const _this = this;
      if (type && type == "filter") {
        _this.pageCurrent = 1;
      }
      let filterQuery = [];
      if (_this.filters.createTime && _this.filters.createTime != "") {
        filterQuery.push({
          key: "createTime",
          value: _this.filters.createTime,
          option: "eq",
          isAnd: "true",
        });
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      if (_this.currentTab == "list") {
        AliepressList(data).then((res) => {
          const resData = res.data;
          _this.listData = resData.data;
          _this.pageTotal = resData.totalCount;
        });
      } else if (_this.currentTab == "sum") {
        GetSumList(data).then((res) => {
          const resData = res.data;
          _this.listData = resData.data;
          _this.pageTotal = resData.totalCount;
        });
      }
    },
    // 切换tab
    // 页码设置为1，筛选条件不变
    changeTabs() {
      let _this = this;
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
    handleUpload() {
      let _this = this;
      return false;
    },
    exportData(type) {
      let _this = this;
      let filterQuery = [];
      if (_this.filters.createTime && _this.filters.createTime != "") {
        filterQuery.push({
          key: "createTime",
          value: _this.filters.createTime,
          option: "eq",
          isAnd: "true",
        });
      }
      let data = {
        query: filterQuery,
      };
      this.$Spin.show();
      if (type == "list") {
        ExportAliepressList(data).then((res) => {
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "速卖通放款导入列表.xlsx";
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
      } else if (type == "sum") {
        ExportSumList(data).then((res) => {
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "速卖通放款求和列表.xlsx";
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
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less"></style>
