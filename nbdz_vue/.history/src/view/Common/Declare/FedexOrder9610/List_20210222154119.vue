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
                <DropdownItem name="commit">确认提交</DropdownItem>
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
  getFedexOrder as getList,
  fedexConfirmRepeal,
  fedexConfirmSubmit,
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
      if (name == "commit") {
        this.handleCommit();
      } else if (name == "cancel") {
        this.handleCancel();
      }
    },
    // 批量提交
    handleCommit() {
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
            e_trade_ids: _this.selectionList.join(","),
            confirm_send: confirm_send,
          };
          _this.tableLoading = true;
          fedexConfirmSubmit(data).then(
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
            e_trade_ids: _this.selectionList.join(","),
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