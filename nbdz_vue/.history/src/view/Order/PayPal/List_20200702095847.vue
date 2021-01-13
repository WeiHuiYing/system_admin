<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="100"
            inline
          >
            <FormItem label="交易号">
              <Input
                clearable
                class="search-input"
                v-model="filters.transactionInfoTransactionId"
              />
            </FormItem>
            <FormItem label="原始平台账单号">
              <Input
                clearable
                class="search-input"
                v-model="filters.TransactionInfoInvoiceId"
              />
            </FormItem>
            <FormItem>
              <Button @click="loadFilter()" class="search-btn" type="primary"
                >搜索</Button
              >
            </FormItem>
          </Form>
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
import { GetPaypalList as getList } from "@/api/order";
import Detils from "./Detils";
export default {
  components: {
    Detils,
  },
  data() {
    return {
      filters: {
        TransactionInfoInvoiceId: "",
        transactionInfoTransactionId: "",
      },
      listData: [],
      listColumns: [
        {
          title: "原始平台账单号",
          key: "transactionInfoInvoiceId",
          width: "200",
        },
        {
          title: "交易号",
          key: "transactionInfoTransactionId",
          width: "200",
        },
        {
          title: "交易类型",
          key: "transactionInfoTransactionEventCode",
          width: "100",
        },
        {
          title: "交易开始时间",
          key: "transactionInfoTransactionInitiationDate",
          width: "200",
          sortable: true,
        },
        {
          title: "交易更新时间",
          key: "transactionInfoTransactionUpdatedDate",
          width: "200",
          sortable: true,
        },
        {
          title: "交易币种",
          key: "transactionInfoTransactionAmountCurrencyCode",
          width: "100",
        },
        {
          title: "交易总额",
          key: "transactionInfoTransactionAmountValue",
          width: "100",
        },
        {
          title: "交易费用币种",
          key: "transactionInfoFeeAmountCurrencyCode",
          width: "100",
        },
        {
          title: "交易费用",
          key: "transactionInfoFeeAmountValue",
          width: "100",
        },
        {
          title: "营业税币种",
          key: "transactionInfoSalesTaxAmountCurrencyCode",
          width: "100",
        },
        {
          title: "营业税",
          key: "transactionInfoSalesTaxAmountValue",
          width: "100",
        },
        {
          title: "paypal买家email",
          key: "payerInfoEmailAddress",
          width: "200",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: "150",
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
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      detilsRow: {},
      modelDetils: false,
      tableLoading: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let filtersQuery = [];
      if (_this.filters.TransactionInfoInvoiceId != "") {
        filtersQuery.push({
          key: "TransactionInfoInvoiceId",
          binaryop: "eq",
          value: _this.filters.TransactionInfoInvoiceId,
          andorop: "and",
        });
      }
      if (_this.filters.transactionInfoTransactionId != "") {
        filtersQuery.push({
          key: "transactionInfoTransactionId",
          binaryop: "eq",
          value: _this.filters.transactionInfoTransactionId,
          andorop: "and",
        });
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filtersQuery,
      };
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          _this.tableLoading = false;
          const resData = res.data;
          if (res.status == 200) {
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
          _this.tableLoading = false;
          console.log(err);
        });
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
    changePageSize(val) {
      let _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
    viewDetils(params) {
      let _this = this;
      _this.detilsRow = {};
      _this.detilsRow = params.row;
      _this.modelDetils = true;
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less">
</style>