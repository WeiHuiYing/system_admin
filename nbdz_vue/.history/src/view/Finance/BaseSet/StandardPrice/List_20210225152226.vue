<template>
  <div class="content-main">
    <div style="margin-bottom: 10px">
      <Row>
        <Col :span="20">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="80"
            inline
          >
            <FormItem prop="yearMonth" label="月份">
              <DatePicker
                :options="dateOptions"
                type="month"
                v-model="filters.yearMonth"
                placeholder="请选择月份"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem prop="currencyCode" label="币种简称">
              <Input
                v-model="filters.currencyCode"
                placeholder="请输入币种简称"
              ></Input>
            </FormItem>
            <FormItem>
              <Button @click="loadData('filter')" type="primary">搜索</Button>
            </FormItem>
            <FormItem>
              <Upload
                action=""
                accept=".xls, .xlsx"
                :before-upload="importExcel"
                :show-upload-list="false"
              >
                <Button type="primary">导入</Button>
              </Upload>
            </FormItem>
          </Form>
        </Col>
        <Col :span="4">
          <Button type="primary" @click="handleAdd">新增</Button>
        </Col>
      </Row>
    </div>
    <Table
      :loading="tableLoading"
      :data="listData"
      :columns="listColumns"
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
  GetSkuBasePriceList as getList,
  ImportSkuBasePrice,
} from "@/api/finance";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listData: [],
      filters: { currencyCode: "", yearMonth: "" },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      listColumns: [
        {
          title: "月份",
          key: "month",
        },
        {
          title: "SKU",
          key: "productSku",
        },
        {
          title: "标准售价",
          key: "price",
        },
        {
          title: "导入日期",
          key: "enterdate",
        },
      ],
      tableLoading: false,
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      modelDetils: false,
      detilsRow: {},
      isAdd: false,
    };
  },
  methods: {
    loadData(type) {
      const _this = this;
      if (type == "filter") {
        _this.pageCurrent = 1;
      }
      let filterQuery = [];
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      getList(data)
        .then((res) => {
          const resData = res.data;
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
    changePage(val) {
      const _this = this;
      _this.pageCurrent = val;
    },
    changePageSize(val) {
      const _this = this;
      _this.pageSize = val;
    },
    handleAdd() {
      const _this = this;
      _this.isAdd = true;
      _this.modelDetils = true;
      _this.detilsRow = {};
    },
    handleEdit(params) {
      const _this = this;
      _this.isAdd = false;
      _this.modelDetils = true;
      _this.detilsRow = params.row;
    },
    handleDelete(params) {
      const _this = this;
      const row = params.row.id;
    },
    importExcel(file) {
      const _this = this;
      const formData = new FormData();
      formData.append("excelFile", file);
      _this.tableLoading = true;
      ImportSkuBasePrice(formData, params)
        .then((res) => {
          _this.tableLoading = false;
          _this.loadData();
          _this.$Message.success({
            content: "操作成功",
            duration: 10,
            closable: true,
          });
        })
        .catch((err) => {
          _this.tableLoading = false;
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
      return false;
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>