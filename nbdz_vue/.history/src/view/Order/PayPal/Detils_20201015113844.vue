<template>
  <div>
    <Tabs>
      <TabPane label="详情">
        <Row class="info-warp">
          <Col span="11">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">入库单号:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoTransactionId
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">交易参考单号:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoPaypalReferenceId
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">交易号状态:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoPaypalReferenceIdType
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">交易类型:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoTransactionEventCode
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">交易开始时间:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoTransactionInitiationDate
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">交易更新时间:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoTransactionUpdatedDate
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">交易币种:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoTransactionAmountCurrencyCode
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">交易总额:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoTransactionAmountValue
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">交易费用币种:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoFeeAmountCurrencyCode
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">交易费用:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoFeeAmountValue
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">营业税币种:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoSalesTaxAmountCurrencyCode
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">营业税:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoSalesTaxAmountValue
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">账户期末余额:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoEndingBalance
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">可用余额:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoAvailableBalance
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">交易状态:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoTransactionStatus
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">原始平台账单号:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoInvoiceId
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">保险费币种:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoInsuranceAmountCurrencyCode
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">保险费用:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoInsuranceAmountVlaue
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">运费金额:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoShippingAmountValue
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">运费折扣币种:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoShippingDiscountAmountCurrencyCode
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">运费折扣费用:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoShippingDiscountAmountValue
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">交易主题:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoTransactionSubject
                }}</Col>
              </Row>
            </Card>
          </Col>
          <Col span="11" offset="2">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">交易备注:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoTransactionNote
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">交易自定义范围:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoCustomField
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">交易保护资格:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transactionInfoProtectionEligibility
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">paypal买家账户Id:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.payerInfoAccountId
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">paypal买家email:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.payerInfoEmailAddress
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">买家手机号国家前缀:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.payerInfoPhoneNumberCountryCode
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">买家手机号:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.payerInfoPhoneNumberNationalNumber
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">买家地址状态:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.payerInfoAddressStatus
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">买家状态:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.payerInfoPayerStatus
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">买家姓名:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.payerInfoPayerNameGivenName
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">总箱数:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.payerInfoPayerNameSurname
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">买家备用的全名:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.payerInfoPayerNameAlternateFullName
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">买家国家简称号:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.payerInfoCountryCode
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">物流信息(收件人姓名):</Col>
                <Col :offset="1" :span="6">{{ rowInfo.shippingInfoName }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">地址第一行:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.shippingInfoAddressLine1
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">地址第二行:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.shippingInfoAddressLine2
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">城镇/城市:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.shippingInfoAddressCity
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6"
                  >省/市/自治区/直辖市/特别行政区:</Col
                >
                <Col :offset="1" :span="6">{{
                  rowInfo.shippingInfoAddressState
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">国家/地区:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.shippingInfoAddressCountryCode
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">邮政编码:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.shippingInfoAddressPostalCode
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">店铺标识:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.shopMark }}</Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="产品列表">
        <Table
          height="500"
          ref="tables"
          :data="rowInfo.bnsPaypalTransactionDetailsCartInfos"
          v-bind:columns="CartColums"
          stripe
        ></Table>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  props: { detilsRow: Object, parent: Object },
  data() {
    return {
      rowInfo: {},
      CartColums: [
        {
          title: "产品编号",
          key: "cartInfoItemDetailsItemCode",
        },
        {
          title: "产品姓名",
          key: "cartInfoItemDetailsItemName",
        },
        {
          title: "产品描述",
          key: "cartInfoItemDetailsItemDescription",
        },
        {
          title: "数量",
          key: "cartInfoItemDetailsItemQuantity",
        },
        {
          title: "单价币种",
          key: "cartInfoItemDetailsItemUnitPriceCurrencyCode",
        },
        {
          title: "单价",
          key: "cartInfoItemDetailsItemUnitPriceValue",
        },
        {
          title: "总价币种",
          key: "cartInfoItemDetailsItemAmountCurrencyCode",
        },
        {
          title: "总价",
          key: "cartInfoItemDetailsItemAmountValue",
        },
        {
          title: "税额币种",
          key: "cartInfoItemDetailsTaxAmountTaxAmountCurrencyCode",
        },
        {
          title: "税额",
          key: "cartInfoItemDetailsTaxAmountTaxAmountValue",
        },
        {
          title: "总额币种",
          key: "cartInfoItemDetailsTotalItemAmountCurrencyCode",
        },
        {
          title: "总额",
          key: "cartInfoItemDetailsTotalItemAmountValue",
        },
        {
          title: "发票号码",
          key: "cartInfoItemDetailsInvoiceNumber",
        },
      ],
    };
  },
  watch: {
    detilsRow(newVal, oldVal) {
      this.rowInfo = Object.assign({}, newVal);
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
