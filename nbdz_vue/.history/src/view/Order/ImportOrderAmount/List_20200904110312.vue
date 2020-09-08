<template>
  <div class="content-main">
    <div class="content-header">
      <Row>
        <Col style="text-align:right" :span="24">
          <Upload
            action="http://8000.bitcoding.top:8888/api/OrderReport/ImportOrderAmount"
            name="excelFile"
            :headers="upHeaders"
            accept=".xls, .xlsx"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :before-upload="handleBefore"
            :disabled="uploadLoading"
          >
            <Button :loading="uploadLoading" type="primary">导入速卖通销售明细</Button>
          </Upload>
        </Col>
      </Row>
    </div>
    <Table
      ref="tables"
      :loading="uploadLoading"
      height="700"
      :data="listData"
      v-bind:columns="listColums"
      stripe
    ></Table>
  </div>
</template>

<script>
import store from "@/store";

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
          title: "商品总额",
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

