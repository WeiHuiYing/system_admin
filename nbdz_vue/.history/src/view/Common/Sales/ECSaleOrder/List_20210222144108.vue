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
        <Dropdown
          v-if="selectionList.length > 0"
          placement="bottom-start"
          @on-click="handleSelect"
        >
          <Button type="primary">
            操作
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="ESale">生成E贸易9610订单</DropdownItem>
            <DropdownItem name="Fedex">生成联邦9610订单</DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
  SaleOrderList as getList,
  createEorder9610,
  getOrderData,
  createFedexorder9610,
} from "@/api/common";
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
          title: "订单id",
          key: "OrderId",
          width: 100,
        },
        {
          title: "订单类型",
          key: "OrderType",
          width: 120,
          render: (h, params) => {
            let type = params.row.OrderType;
            let typeText = "";
            if (type === "sale") {
              typeText = "正常销售订单";
            } else if (type === "resend") {
              typeText = "重发订单";
            } else if (type === "line") {
              typeText = "线下订单";
            } else if (type === "buy") {
              typeText = "采购订单";
            }
            return h("span", typeText);
          },
        },
        {
          title: "订单编码",
          key: "SaleOrderCode",
          width: 220,
        },
        {
          title: "入库单号",
          key: "RefNo",
          width: 220,
        },
        {
          title: "平台代码",
          key: "Plateform",
          width: 100,
        },
        {
          title: "订单状态",
          key: "Status",
          width: 100,
          render: (h, params) => {
            {
              let status = params.row.Status;
              let statusText = "";
              if (status === "0") {
                statusText = "已废弃";
              } else if (status === "2") {
                statusText = "待发货审核";
              } else if (status === "3") {
                statusText = "待发货";
              } else if (status === "4") {
                statusText = "已发货";
              } else if (status === "5") {
                statusText = "冻结中";
              } else if (status === "6") {
                statusText = "缺货";
              } else if (status === "7") {
                statusText = "问题件";
              } else if (status === "8") {
                statusText = "未付款";
              }
              return h("span", statusText);
            }
          },
        },
        {
          title: "销售单号",
          key: "SaleOrderCode",
          width: 200,
        },
        {
          title: "系统单号",
          key: "SysOrderCode",
          width: 200,
        },
        {
          title: "仓库单号",
          key: "WarehouseOrderCode",
          width: 200,
        },
        {
          title: "仓库运输方式代码",
          key: "ShippingMethod",
          width: 200,
        },
        {
          title: "ShippingMethodPlatform",
          key: "ShippingMethodPlatform",
          width: 200,
        },
        {
          title: "仓库代码",
          key: "WarehouseCode",
          width: 200,
        },
        {
          title: "创建时间",
          key: "CreatedDate",
          width: 200,
        },
        {
          title: "平台付款时间",
          key: "DatePaidPlatform",
          width: 200,
        },
        {
          title: "平台发货时间",
          key: "DateWarehouseShipping",
          width: 200,
        },
        {
          title: "平台发货状态",
          key: "PlatformShipStatus",
          width: 200,
        },
        {
          title: "总金额",
          key: "Amountpaid",
          width: 200,
        },
        {
          title: "paypal交易号",
          key: "PaypalTransactionId",
          width: 200,
        },
        {
          title: "用户名称",
          key: "BuyerName",
          width: 200,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          fixed: "right",
          width: 100,
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
        return item.OrderId;
      });
    },
    createEOrder() {
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
              order_ids: _this.selectionList.join(","),
              company_name: _this.company,
            };
            _this.tableLoading = true;
            createEorder9610(data, "POST")
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
    createFedexOrder() {
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
              order_ids: _this.selectionList.join(","),
              company_name: _this.company,
            };
            _this.tableLoading = true;
            createEorder9610(data, "POST")
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
    handleSelect(name) {
      if (name == "ESale") {
        this.createEOrder();
      } else if (name == "Fedex") {
        this.createFedexOrder();
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>