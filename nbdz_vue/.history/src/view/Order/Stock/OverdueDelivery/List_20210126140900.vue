<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="20">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="100"
            inline
          >
            <FormItem label="品类">
              <Select
                v-model="filters.productType"
                clearable
                style="width: 150px"
              >
                <Option value="头套">头套</Option>
                <Option value="发帘">发帘</Option>
                <Option value="发块">发块</Option>
              </Select>
            </FormItem>
            <FormItem label="是否逾期">
              <Select v-model="filters.isExpiry" style="width: 150px" clearable>
                <Option value="0">否</Option>
                <Option value="1">是</Option>
              </Select>
            </FormItem>
            <FormItem label="生产开始时间">
              <DatePicker
                v-model="filters.sDate"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 150px"
                clearable
              >
              </DatePicker>
            </FormItem>
            <FormItem label="生产结束时间">
              <DatePicker
                v-model="filters.eDate"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 150px"
                clearable
              >
              </DatePicker>
            </FormItem>
            <FormItem :label-width="10">
              <Button
                style="margin-right: 10px"
                @click="loadFilter()"
                type="primary"
                >搜索</Button
              >
              <Button @click="exportData()" type="primary">导出</Button>
            </FormItem>
          </Form>
        </Col>
        <Col :span="4">
          <Upload
            action=""
            accept=".xls, .xlsx"
            :show-upload-list="false"
            :before-upload="importData"
          >
            <Button :loading="uploadLoading">导入</Button>
          </Upload>
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
    >
      <template slot-scope="{ row }" slot="isExpiry">
        <span v-if="row.isExpiry == 1">是</span>
        <span v-if="row.isExpiry == 0">否</span>
      </template>
    </Table>
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
  getProductExpiryList as getList,
  exportProductExpiryList as exportList,
  importProductionSku as importList,
} from "@/api/order";
import { filtersNewDate as filtersDate, fileToJson } from "@/libs/validator";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listColums: [
        {
          title: "生产编号",
          key: "productionCode",
        },
        {
          title: "SKU",
          key: "sku",
        },
        {
          title: "品类",
          key: "productType",
        },
        {
          title: "生产日期",
          key: "productionDate",
        },
        {
          title: "逾期天数",
          key: "expiryDays",
        },
        {
          title: "未入库数量",
          key: "notInStorage",
        },
        {
          title: "是否逾期",
          key: "isExpiry",
          slot: "isExpiry",
        },
      ],
      listData: [],
      filters: {
        productType: "",
        isExpiry: "",
        sDate: "",
        eDate: "",
      },
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      uploadLoading: false,
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      tableLoading: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      if (!_this.pageCurrent) _this.pageCurrent = 1;
      let filtersquery = _this.filtersObj();
      let filterDate = filtersDate(
        "productionDate",
        _this.filters.sDate,
        _this.filters.eDate,
        "productionDate"
      );
      if (filterDate && filterDate.length > 0) {
        filtersquery = filtersquery.concat(filterDate);
      }
      let data = {
        query: filtersquery,
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
      };
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          _this.tableLoading = false;
          if (res.data.code == 200) {
            _this.listData = res.data.data;
            _this.pageTotal = res.data.count;
          } else {
            this.$Message.error({
              content: res.data.msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          _this.tableLoading = false;
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
    filtersObj() {
      let _this = this;
      let filterQuery = [];
      Object.keys(_this.filters).forEach((keyItem) => {
        if (
          _this.filters[keyItem] &&
          _this.filters[keyItem] != "" &&
          keyItem != "sDate" &&
          keyItem != "eDate" &&
          keyItem != "type"
        ) {
          filterQuery.push({
            key: keyItem,
            value: _this.filters[keyItem],
            option: "eq",
            isAnd: "true",
          });
        }
      });
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
      let filtersquery = _this.filtersObj();
      let filterDate = filtersDate(
        "productionDate",
        _this.filters.sDate,
        _this.filters.eDate,
        "productionDate"
      );
      if (filterDate && filterDate.length > 0) {
        filtersquery = filtersquery.concat(filterDate);
      }
      let data = {
        query: filtersquery,
      };
      _this.tableLoading = true;
      exportList(data)
        .then((res) => {
          _this.tableLoading = false;
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "逾期未出货报表.xlsx";
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
    importData(file) {
      const _this = this;
      const formData = new FormData();
      formData.append("excelFile", file);
      _this.uploadLoading = true;
      importList(formData)
        .then((res) => {
          _this.uploadLoading = false;
          _this.loadData();
          _this.$Message.success({
            content: "操作成功",
            duration: 10,
            closable: true,
          });
        })
        .catch((err) => {
          _this.uploadLoading = false;
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
      return false;
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less"></style>
