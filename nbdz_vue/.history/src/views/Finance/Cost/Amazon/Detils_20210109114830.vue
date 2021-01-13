<template>
  <div>
    <Table
      height="500"
      ref="tables"
      :data="listData"
      v-bind:columns="Colums"
      stripe
    ></Table>
    <div style="margin: 10px; overflow: hidden">
      <Page
        :total="pageTotal"
        :current="pageCurrent"
        :page-size="50"
        @on-change="changePage"
        show-total
        show-elevator
        show-sizer
      ></Page>
    </div>
  </div>
</template>

<script>
import { GetAmazonDetailList as getDetils } from "@/api/order";

export default {
  props: { detilsRow: Object, parent: Object },
  data() {
    return {
      rowInfo: {},
      Colums: [
        {
          title: "邮寄时间",
          key: "postedDate",
          width: "200",
          sortable: true,
        },
        {
          title: "运输方式",
          key: "shipmentFeeType",
          width: "200",
        },
        {
          title: "下单时间",
          key: "depositDate",
          width: "200",
          sortable: true,
        },
        {
          title: "促销类型",
          key: "promotionType",
          width: "200",
        },
        {
          title: "其他费用描述",
          key: "otherFeeReasonDescription",
          width: "200",
        },
        {
          title: "币种",
          key: "currency",
          width: "200",
        },
        {
          title: "购买数量",
          key: "quantityPurchased",
          width: "200",
        },
        {
          title: "定居地",
          key: "settlementId",
          width: "200",
        },
        {
          title: "商品调整项目ID",
          key: "merchantAdjustmentItemId",
          width: "200",
        },
        {
          title: "税额",
          key: "fulfillmentId",
          width: "200",
        },
        {
          title: "总额币种",
          key: "promotionId",
          width: "200",
        },
        {
          title: "总额",
          key: "marketplaceName",
          width: "200",
        },
        {
          title: "发票号码",
          key: "sku",
          width: "200",
        },
        {
          title: "发票号码",
          key: "settlementStartDate",
          width: "200",
        },
        {
          title: "发票号码",
          key: "orderId",
          width: "200",
        },
        {
          title: "发票号码",
          key: "directPaymentType",
          width: "200",
        },
        {
          title: "发票号码",
          key: "merchantOrderId",
          width: "200",
        },
        {
          title: "发票号码",
          key: "orderItemCode",
          width: "200",
        },
        {
          title: "发票号码",
          key: "settlementEndDate",
          width: "200",
        },
        {
          title: "发票号码",
          key: "priceType",
          width: "200",
        },
        {
          title: "发票号码",
          key: "adjustmentId",
          width: "200",
        },
        {
          title: "发票号码",
          key: "transactionType",
          width: "200",
        },
        {
          title: "发票号码",
          key: "merchantOrderItemId",
          width: "200",
        },
        {
          title: "发票号码",
          key: "orderFeeType",
          width: "200",
        },
        {
          title: "发票号码",
          key: "shipmentId",
          width: "200",
        },
        {
          title: "发票号码",
          key: "itemRelatedFeeType",
          width: "200",
        },
        {
          title: "发票号码",
          key: "itemRelatedFeeAmount",
          width: "200",
        },
        {
          title: "发票号码",
          key: "otherFeeAmount",
          width: "200",
        },
        {
          title: "发票号码",
          key: "directPaymentAmount",
          width: "200",
        },
        {
          title: "发票号码",
          key: "promotionAmount",
          width: "200",
        },
        {
          title: "发票号码",
          key: "priceAmount",
          width: "200",
        },
        {
          title: "发票号码",
          key: "miscFeeAmount",
          width: "200",
        },
        {
          title: "发票号码",
          key: "otherAmount",
          width: "200",
        },
        {
          title: "发票号码",
          key: "orderFeeAmount",
          width: "200",
        },
        {
          title: "发票号码",
          key: "amazonReportOrderId",
          width: "200",
        },
        {
          title: "发票号码",
          key: "totalAmount",
          width: "200",
        },
        {
          title: "发票号码",
          key: "shipmentFeeAmount",
          width: "200",
        },
        {
          title: "发票号码",
          key: "store",
          width: "200",
        },
      ],
      listData: [],
      pageCurrent: 1,
      pageTotal: 1,
    };
  },
  watch: {
    detilsRow(newVal, oldVal) {
      this.rowInfo = Object.assign({}, newVal);
      if (this.rowInfo.id) {
        this.loadData();
      }
    },
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        id: _this.rowInfo.id,
        pageNum: _this.pageCurrent,
        pageSize: "50",
      };
      getDetils(data).then((res) => {
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
      });
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
  },
};
</script>

<style lang="less" scoped>
.info-warp {
  .info-item {
    font-size: 14px;
    line-height: 32px;
    .info-title {
      font-size: 16px;
      font-weight: 500;
      text-align: right;
    }
  }
}
</style>
