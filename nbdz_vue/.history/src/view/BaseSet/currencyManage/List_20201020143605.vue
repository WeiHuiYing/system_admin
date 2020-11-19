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
    <Modal
      title="详情"
      :mask-closable="false"
      v-model="modelDetils"
      width="90%"
      scrollable
      footer-hide
    >
      <Detils ref="detils" :parent="this" :detilsRow="detilsRow"></Detils>
    </Modal>
  </div>
</template>

<script>
import Detils from "./Detils";
import { getCurrency as getList, uploadCurrency } from "@/api/ResManage";
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
          title: "币种简称",
          key: "currencyCode",
        },
        {
          title: "币种",
          key: "currencyName",
        },
        {
          title: "对人民币汇率",
          key: "currencyRate2RMB",
        },
        {
          title: "对美元汇率",
          key: "currencyRate2USD",
        },
        {
          title: "汇率月份",
          key: "month",
        },
        {
          title: "操作",
          key: "action",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.handleEdit(params);
                    },
                  },
                },
                "编辑"
              ),
            ]);
          },
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
  components: {
    Detils,
  },
  methods: {
    loadData(type) {
      const _this = this;
      if (type == "filter") {
        _this.pageCurrent = 1;
      }
      let filterQuery = [];
      if (_this.filters.yearMonth !== "") {
        filterQuery.push({
          key: "month",
          option: "eq",
          value: _this.filters.yearMonth,
          isAnd: "true",
        });
      } else {
        _this.filters.yearMonth = dayjs().format("YYYY-MM");
        this.$Message.error({
          content: "请选择月份",
          duration: 10,
          closable: true,
        });
      }
      if (_this.filters.currencyCode !== "") {
        filterQuery.push({
          key: "currencyCode",
          option: "eq",
          value: _this.filters.currencyCode,
          isAnd: "true",
        });
      }
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
      if (_this.filters.yearMonth && _this.filters.yearMonth != "") {
        let params = {
          yearMonth: dayjs(_this.filters.yearMonth).format("YYYY-MM"),
        };
        const formData = new FormData();
        formData.append("excelFile", file);
        _this.tableLoading = true;
        uploadCurrency(formData, params)
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
          });
      } else {
        this.$Message.error({
          content: "请选择月份",
          duration: 10,
          closable: true,
        });
      }
      return false;
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>