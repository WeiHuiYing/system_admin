<template>
  <div class="content-main">
    <div class="content-header">
      <Row>
        <Col :span="24">
          <Form ref="formInline" label-position="right" :label-width="100" inline>
            <FormItem>
              <Upload
                action="http://192.168.1.18:8817/api/OrderReport/ImportOrderAmount"
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
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <Table ref="tables" height="700" :data="listData" v-bind:columns="listColums" stripe></Table>
  </div>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      listColums: [
        {
          title: "订单号",
          key: "orderCode",
        },
        {
          title: "币种",
          key: "currency",
        },
        {
          title: "商品总额",
          key: "amountTotal",
        },
        {
          title: "放款金额",
          key: "amountLoan",
        },
        {
          title: "退款总额",
          key: "amountReturn",
        },
        {
          title: "平台佣金扣款",
          key: "amountPlateform",
        },
        {
          title: "联盟佣金扣款",
          key: "amountAlliance",
        },
        {
          title: "联盟佣金退款",
          key: "amountAllianceReturn",
        },
        {
          title: "平台佣金退款",
          key: "amountPlateformReturn",
        },
        {
          title: "sku",
          key: "sku",
        },
        {
          title: "商品数量",
          key: "qty",
        },
        {
          title: "下单时间",
          key: "buyTime",
        },
        {
          title: "付款时间",
          key: "paidTime",
        },
        {
          title: "发货时间",
          key: "shipTime",
        },
        {
          title: "商品名称",
          key: "skuName",
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
      fileUrl: "",
    };
  },
  methods: {
    handleSuccess(response, file, fileList) {
      if (response.code == 200) {
        let _this = this;
        if (response.url) {
          _this.listData = response.data;
        }
        _this.uploadLoading = false;
        this.$Message.info({
          content: response.msg,
          duration: 10,
          closable: true,
        });
      } else {
        this.$Message.error({
          content: response.msg,
          duration: 10,
          closable: true,
        });
      }
    },
    handleBefore() {
      let _this = this;
      _this.fileUrl = "";
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

