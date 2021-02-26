/* 
2021 / 02 / 22
weihuiying
联邦订单9610
*/
<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="24">
        <Form ref="formInline" label-position="right" :label-width="100" inline>
          <FormItem label="搜索内容">
            <Input
              v-model="filters.search"
              placeholder="请输入要搜索的内容"
            ></Input>
          </FormItem>
          <FormItem label="状态">
            <Select v-model="filters.state" clearable style="width: 150px">
              <Option value="not_maintaining">待维护</Option>
              <Option value="not_archived">待提交</Option>
              <Option value="archived">已提交</Option>
              <Option value="repeal">已撤销</Option>
            </Select>
          </FormItem>
          <FormItem :label-width="10">
            <Button
              @click="loadData()"
              style="margin-right: 10px"
              type="primary"
              >搜索</Button
            >
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
                <DropdownItem name="commitMsg">提交消息</DropdownItem>
                <DropdownItem name="commitOrder">提交订单</DropdownItem>
                <DropdownItem name="cancel">撤销报关单</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </FormItem>
        </Form>
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
    >
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
  getFedexOrder as getList,
  fedexSubmit,
  fedexOrder,
} from "@/api/common";
import rowColums from "./components/rowColums.vue";
export default {
  components: { rowColums },
  data() {
    return {
      listColums: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          width: 100,
          type: "expand",
          title: "产品列表",
          key: "lines",
          render: (h, params) => {
            return h(rowColums, {
              props: {
                data: params.row.lines,
              },
            });
          },
        },
        {
          title: "accountId",
          key: "accountId",
          width: 200,
        },
        {
          title: "批次号",
          key: "log",
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
          key: "OrderNo",
          sortable: true,
          width: 200,
        },
        {
          title: "物流企业代码",
          key: "logisticsRcvCode",
          sortable: true,
          width: 200,
        },
        {
          title: "物流企业名称",
          key: "logisticsName",
          width: 200,
        },
        {
          title: "提交时间",
          key: "commitTime",
          width: 200,
        },
        {
          title: "物流单号",
          key: "logisticsNo",
          width: 200,
        },
        {
          title: "大包裹号",
          key: "totalPackageNo",
          width: 200,
        },
        {
          title: "小包数量",
          key: "packageNum",
          width: 200,
        },
        {
          title: "商品金额",
          key: "totalPrice",
          width: 200,
        },
        {
          title: "运费",
          key: "freight",
          width: 200,
        },
        {
          title: "保价费",
          key: "insuredFee",
          width: 200,
        },
        {
          title: "保费币制",
          key: "iCurrency",
          width: 200,
        },
        {
          title: "币制",
          key: "currency",
          width: 200,
        },
        {
          title: "运费币制",
          key: "fCurrency",
          width: 200,
        },
        {
          title: "毛重",
          key: "grossWeight",
          width: 200,
        },
        {
          title: "净重",
          key: "netWeight",
          width: 200,
        },
        {
          title: "件数",
          key: "packNo",
          width: 200,
        },
        {
          title: "主要货物信息",
          key: "goodsInfo",
          width: 200,
        },
        {
          title: "提运单号",
          key: "billNo",
          width: 200,
        },
        {
          title: "收货人名称",
          key: "consignee",
          width: 200,
        },
        {
          title: "收货人电话",
          key: "consigneeTelephone",
          width: 200,
        },
        {
          title: "收货人地址",
          key: "consigneeAddress",
          width: 200,
        },
        {
          title: "收货人所在国",
          key: "consigneeCountry",
          width: 200,
        },
        {
          title: "航班航次号",
          key: "voyageNo",
          width: 200,
        },
        {
          title: "申报地海关代码",
          key: "customsCode",
          width: 200,
        },
        {
          title: "申报业务类型",
          key: "statisticsFlag",
          width: 200,
        },
        {
          title: "指运港代码",
          key: "POD",
          width: 200,
        },
        {
          title: "运输方式",
          key: "trafMode",
          width: 200,
        },
        {
          title: "运输工具名称",
          key: "trafName",
          width: 200,
        },
        {
          title: "包装种类代码",
          key: "wrapType",
          width: 200,
        },
        {
          title: "备注",
          key: "note",
          width: 200,
        },
        {
          title: "赠品",
          key: "giftsFlag",
          width: 200,
        },
        {
          title: "企业唯一编号",
          key: "copNo",
          width: 200,
        },
        {
          title: "创建时间",
          key: "CreateDate",
          width: 200,
        },
        {
          title: "更新时间",
          key: "UpdateDate",
          width: 200,
        },
        {
          title: "数量",
          key: "quantity",
          width: 200,
        },
        {
          title: "平台",
          key: "platform",
          width: 200,
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
    tableSelect(selection) {
      this.selectionList = selection.map((item) => {
        return item.id;
      });
    },
    handleSelect(name) {
      if (name == "commitMsg") {
        this.handleCommitMsg();
      } else if (name == "commitOrder") {
        this.handleCommitOrder();
      } else if (name == "cancel") {
        this.handleCancel();
      }
    },
    // 批量提交消息
    handleCommitMsg() {
      let data = {
        fedex_ids: _this.selectionList.join(","),
      };
      _this.tableLoading = true;
      fedexSubmit(data).then(
        (res) => {
          if (res.data.detail) {
            this.$Message.error({
              content: res.data.detail,
              duration: 10,
              closable: true,
            });
          } else {
            this.$Message.success({
              content: "操作成功",
              duration: 10,
              closable: true,
            });
          }
          _this.tableLoading = false;
          _this.loadData();
        },
        (err) => {
          _this.tableLoading = false;
          if (err.response && err.response.request) {
            const response = err.response.request;
            this.$Message.error({
              content: response.responseText,
              duration: 10,
              closable: true,
            });
          }
        }
      );
    },
    // 批量提交订单
    handleCommitOrder() {
      const _this = this;
      let confirm_send = "";
      this.$Modal.confirm({
        render: (h) => {
          return h(
            "Select",
            {
              props: {
                placeholder: "请选择是否推送收款单",
              },
              on: {
                "on-change": (val) => {
                  confirm_send = val;
                },
              },
            },
            [
              h(
                "Option",
                {
                  props: {
                    value: "1",
                  },
                },
                "是"
              ),
              h(
                "Option",
                {
                  props: {
                    value: "0",
                  },
                },
                "否"
              ),
            ]
          );
        },
        onOk: () => {
          let data = {
            fedex_ids: _this.selectionList.join(","),
            confirm_send: confirm_send,
          };
          _this.tableLoading = true;
          fedexOrder(data).then(
            (res) => {
              if (res.data.detail) {
                this.$Message.error({
                  content: res.data.detail,
                  duration: 10,
                  closable: true,
                });
              } else {
                this.$Message.success({
                  content: "操作成功",
                  duration: 10,
                  closable: true,
                });
              }
              _this.tableLoading = false;
              _this.loadData();
            },
            (err) => {
              _this.tableLoading = false;
              if (err.response && err.response.request) {
                const response = err.response.request;
                this.$Message.error({
                  content: response.responseText,
                  duration: 10,
                  closable: true,
                });
              }
            }
          );
        },
      });
    },
    // 批量撤销
    handleCancel() {
      const _this = this;
      let reason = "";
      this.$Modal.confirm({
        render: (h) => {
          return h("Input", {
            props: {
              autofocus: true,
              type: "textarea",
              rows: 4,
              placeholder: "请输入撤销原因",
            },
            on: {
              input: (val) => {
                reason = val;
              },
            },
          });
        },
        onOk: () => {
          let data = {
            fedex_ids: _this.selectionList.join(","),
            reason: reason,
          };
          _this.tableLoading = true;
          fedexConfirmRepeal(data).then(
            (res) => {
              if (res.data.detail) {
                this.$Message.error({
                  content: res.data.detail,
                  duration: 10,
                  closable: true,
                });
              } else {
                this.$Message.success({
                  content: "操作成功",
                  duration: 10,
                  closable: true,
                });
              }
              _this.tableLoading = false;
              _this.loadData();
            },
            (err) => {
              _this.tableLoading = false;
              if (err.response && err.response.request) {
                const response = err.response.request;
                this.$Message.error({
                  content: response.responseText,
                  duration: 10,
                  closable: true,
                });
              }
            }
          );
        },
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>