/* 
2020 / 11 / 16
weihuiying
E贸易9610
*/
<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="20">
        <Form ref="formInline" label-position="right" :label-width="100" inline>
          <FormItem label="搜索内容">
            <Input
              v-model="filters.search"
              placeholder="请输入要搜索的内容"
            ></Input>
          </FormItem>
          <FormItem>
            <Button @click="loadData()" class="search-btn" type="primary"
              >搜索</Button
            >
          </FormItem>
        </Form>
      </Col>
      <Col :span="4">
        <Button
          v-if="selectionList.length > 0"
          @click="createOrder()"
          type="primary"
          >生成E贸易订单</Button
        >
      </Col>
    </Row>
    <Table
      ref="tables"
      height="700"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      @on-selection-change="tableSelect"
      stripe
    ></Table>
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
    <Modal
      title="详情"
      :mask-closable="false"
      v-model="modelDetils"
      width="90%"
      scrollable
      footer-hide
    >
      <Detils ref="detils" :parent="this" :detils-row="detilsRow"></Detils>
    </Modal>
  </div>
</template>

<script>
import {
  SaleOrder9610 as getList,
  createEorder,
  getOrderData,
} from "@/api/Analysis";
import Detils from "./Detils";
export default {
  components: {
    Detils,
  },
  data() {
    return {
      listColums: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "E贸易公司账号",
          key: "account_name",
          width: 200,
        },
        {
          title: "批次号",
          key: "e_trade_log",
          width: 200,
        },
        {
          title: "状态",
          key: "state",
          width: 200,
          render: (h, params) => {
            let state = params.row.state;
            let stateText = "";
            if (state == "not_maintaining") {
              stateText = "待维护";
            } else if (state == "not_archived") {
              stateText = "待提交";
            } else if (state == "archived") {
              stateText = "已提交";
            } else if (state == "repeal") {
              stateText = "已撤销";
            }
            return h("span", stateText);
          },
        },
        {
          title: "订单编号",
          key: "orderNo",
          sortable: true,
          width: 200,
        },
        {
          title: "订单金额",
          key: "ordercharge",
          sortable: true,
          width: 200,
        },
        {
          title: "收货人名称",
          key: "consignee",
          width: 200,
        },
        {
          title: "收货人省份",
          key: "consigneeProvince",
          width: 200,
        },
        {
          title: "收货人城市",
          key: "consigneeCity",
          width: 200,
        },
        {
          title: "收货人地址",
          key: "consigneeAddress",
          width: 200,
        },
        {
          title: "收货人电话",
          key: "consigneeTelephone",
          width: 200,
        },
        {
          title: "收货人邮编",
          key: "consigneePostcode",
          width: 200,
        },
        {
          title: "创建时间",
          key: "create_date",
          width: 200,
        },
        {
          title: "更新时间",
          key: "update_date",
          width: 200,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 200,
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.viewDetils(params);
                    },
                  },
                },
                "详细"
              ),
            ]);
          },
        },
      ],
      filters: {
        search: "",
        e_status: "",
      },
      listData: [],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      detilsRow: {},
      modelDetils: false,
      modelAdd: false,
      selectionList: [],
      company: "",
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        page: _this.pageCurrent,
        pageSize: _this.pageSize,
      };
      data = Object.assign(data, _this.filters);
      _this.tableLoading = true;
      getList(data, "GET")
        .then((res) => {
          _this.tableLoading = false;
          let resData = res.data;
          if (res.status == 200) {
            _this.listData = resData.results;
            _this.pageTotal = resData.count;
          } else {
            this.$Message.error({
              content: resData.results,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          _this.tableLoading = false;
          if (err.response && err.response.request) {
            const response = err.response.request;
            this.$Message.error({
              content: response.responseText,
              duration: 10,
              closable: true,
            });
          }
        });
    },
    viewDetils(params) {
      let _this = this;
      _this.detilsRow = {};
      _this.detilsRow = params.row;
      _this.modelDetils = true;
    },
    tableSelect(selection) {
      this.selectionList = selection.map((item) => {
        return item.id;
      });
    },
    createOrder() {
      const _this = this;
      this.$Modal.confirm({
        render: (h) => {
          return h(
            "Select",
            {
              props: {
                value: _this.company,
                placeholder: "请选择公司",
              },
              on: {
                "on-change": (val) => {
                  _this.company = val;
                },
              },
            },
            _this.$store.state.companyList.map((item) => {
              return h("Option", {
                props: {
                  value: item,
                  label: item,
                },
              });
            })
          );
        },
        onOk: () => {
          if (_this.company && _this.company != "") {
            let data = {
              batch_ids: _this.selectionList.join(","),
              company_name: _this.company,
            };
            _this.tableLoading = true;
            createEorder(data, "POST")
              .then((res) => {
                if (
                  res.data.detail &&
                  res.data.detail.constructor == Array &&
                  res.data.detail.length > 0
                ) {
                  this.$Message.error({
                    content: res.data.detail.join(","),
                    duration: 10,
                    closable: true,
                  });
                } else {
                  this.$Message.success({
                    content: "成功",
                    duration: 10,
                    closable: true,
                  });
                }
                _this.tableLoading = false;
              })
              .catch((err) => {
                _this.tableLoading = false;
                if (err.response && err.response.request) {
                  const response = err.response.request;
                  this.$Message.error({
                    content: response.responseText,
                    duration: 10,
                    closable: true,
                  });
                }
              });
          } else {
            this.$Message.error({
              content: "请选择公司",
              duration: 10,
              closable: true,
            });
          }
        },
      });
    },
    getOrder() {
      const _this = this;
      getOrderData()
        .then((res) => {
          _this.tableLoading = false;
          this.$Message.success({
            content: "操作成功",
            duration: 10,
            closable: true,
          });
        })
        .catch((err) => {
          _this.tableLoading = false;
          if (err.response && err.response.request) {
            const response = err.response.request;
            this.$Message.error({
              content: response.responseText,
              duration: 10,
              closable: true,
            });
          }
        });
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    changePageSize(val) {
      let _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>