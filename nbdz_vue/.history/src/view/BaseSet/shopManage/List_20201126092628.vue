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
            <FormItem prop="plateform" label="平台">
              <Select
                v-model="filters.plateform"
                @on-change="loadShop"
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
            <FormItem prop="storename" label="店铺">
              <Select
                :disabled="
                  !filters.plateform || filters.plateform == '' ? true : false
                "
                v-model="filters.storename"
                clearable
                style="width: 200px"
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
            <FormItem prop="company" label="公司">
              <Input
                v-model="filters.company"
                placeholder="请输入公司名称"
              ></Input>
            </FormItem>
            <FormItem>
              <Button @click="loadData('filter')" type="primary">搜索</Button>
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
import { getShop as getList } from "@/api/ResManage";
import { GetPlateform, GetShop } from "@/api/order";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listData: [],
      filters: { storename: "", plateform: "", company: "" },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      listColumns: [
        {
          title: "店铺",
          key: "storename",
        },
        {
          title: "平台",
          key: "plateform",
        },
        {
          title: "对外店铺名称",
          key: "outStorename",
        },
        {
          title: "公司",
          key: "company",
        },
        {
          title: "PAYPAL账户",
          key: "payPalInstance",
        },
        {
          title: "付款方式",
          key: "acountType",
        },
        {
          title: "bankNo",
          key: "bankNo",
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
      plateList: [],
      shopList: [],
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
      Object.keys(_this.filters).forEach((key) => {
        if (_this.filters[key] && _this.filters[key] != "") {
          filterQuery.push({
            key: key,
            option: "eq",
            value: _this.filters[key],
            isAnd: "true",
          });
        }
      });
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
    loadShop() {
      let _this = this;
      GetShop(_this.filters.plateform)
        .then((res) => {
          _this.shopList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadPlateform() {
      let _this = this;
      let data = {};
      GetPlateform().then((res) => {
        _this.plateList = res.data;
      });
    },
    changePage(val) {
      const _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    changePageSize(val) {
      const _this = this;
      _this.pageSize = val;
      _this.loadData();
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
    this.loadPlateform();
  },
};
</script>