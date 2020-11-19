<template>
  <div class="content-main">
    <div class="content-header">
      <Row>
        <Col :span="20">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="80"
            inline
          >
            <FormItem label="sku">
              <Input clearable v-model="filters.sku" />
            </FormItem>
            <FormItem label="订单号">
              <Input clearable v-model="filters.orderCode" />
            </FormItem>
            <FormItem label="平台付款额">
              <Input clearable v-model="filters.amountTotal" />
            </FormItem>

            <FormItem>
              <Button
                @click="loadFilter()"
                style="margin-right: 5px"
                class="search-btn"
                type="primary"
                >搜索</Button
              >
            </FormItem>
          </Form>
        </Col>
        <Col style="text-align: right" :span="4">
          <Upload
            action="http://192.168.1.8817:8888/api/OrderReport/ImportOrderAmount"
            name="excelFile"
            :headers="upHeaders"
            accept=".xls, .xlsx"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :before-upload="handleBefore"
            :disabled="uploadLoading"
          >
            <Button :loading="uploadLoading" type="primary"
              >导入速卖通销售明细</Button
            >
          </Upload>
        </Col>
      </Row>
    </div>
    <Table
      ref="tables"
      :loading="uploadLoading"
      height="660"
      :data="listData"
      v-bind:columns="listColums"
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
  </div>
</template>

<script>
import store from "@/store";
import { OrderAmount } from "@/api/Order";
export default {
  data() {
    return {
      listColums: [
        {
          title: "商品名称",
          key: "skuName",
          width: 400,
          align: "center",
        },
        {
          title: "sku",
          key: "sku",
          width: 200,
          align: "center",
        },
        {
          title: "订单号",
          key: "orderCode",
          width: 200,
          align: "center",
        },
        {
          title: "币种",
          key: "currency",
          width: 100,
          align: "center",
        },
        {
          title: "平台付款金额",
          key: "amountTotal",
          width: 100,
          align: "center",
        },
        {
          title: "放款金额",
          key: "amountLoan",
          width: 100,
          align: "center",
        },
        {
          title: "退款总额",
          key: "amountReturn",
          width: 100,
          align: "center",
        },
        {
          title: "平台佣金扣款",
          key: "amountPlateform",
          width: 200,
          align: "center",
        },
        {
          title: "联盟佣金扣款",
          key: "amountAlliance",
          width: 200,
          align: "center",
        },
        {
          title: "联盟佣金退款",
          key: "amountAllianceReturn",
          width: 200,
          align: "center",
        },
        {
          title: "平台佣金退款",
          key: "amountPlateformReturn",
          width: 200,
          align: "center",
        },
        {
          title: "商品数量",
          key: "qty",
          width: 100,
          align: "center",
        },
        {
          title: "下单时间",
          key: "buyTime",
          width: 200,
          align: "center",
        },
        {
          title: "付款时间",
          key: "paidTime",
          width: 200,
          align: "center",
        },
        {
          title: "发货时间",
          key: "shipTime",
          width: 200,
          align: "center",
        },
      ],
      uploadLoading: false,
      upHeaders: {
        Authorization: "Bearer " + store.state.user.token,
      },
      upData: {
        type: "",
      },
      listData: [],
      filters: {},
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
    };
  },
  methods: {
    handleSuccess(response, file, fileList) {
      let _this = this;
      if (response.code == 200) {
        _this.listData = response.data;
        _this.uploadLoading = false;
        this.$Message.info({
          content: response.msg,
          duration: 10,
          closable: true,
        });
      } else {
        this.$Message.error({
          content: response.msg,
          duration: 0,
          closable: true,
        });
      }
      _this.uploadLoading = false;
    },
    handleBefore() {
      let _this = this;
      _this.listData = [];
      _this.uploadLoading = true;
    },
    loadData() {
      const _this = this;
      let filtersquery = [];
      if (_this.filters.sku && _this.filters.sku != "") {
        filtersquery.push({
          key: "sku",
          binaryop: "like",
          value: _this.filters.sku,
          andorop: "and",
        });
      }
      if (_this.filters.orderCode && _this.filters.orderCode != "") {
        filtersquery.push({
          key: "orderCode",
          binaryop: "like",
          value: _this.filters.orderCode,
          andorop: "and",
        });
      }
      if (_this.filters.amountTotal && _this.filters.amountTotal != "") {
        filtersquery.push({
          key: "amountTotal",
          binaryop: "eq",
          value: _this.filters.amountTotal,
          andorop: "and",
        });
      }

      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filtersquery,
      };
      _this.uploadLoading = true;
      OrderAmount(data)
        .then((res) => {
          _this.uploadLoading = false;
          let resData = res.data;
          if (resData.code == "200") {
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
    loadFilter() {
      const _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>


<style lang="less" scoped>
.content-main {
  .content-header {
    padding: 5px;
  }
}
</style>

