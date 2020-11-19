<template>
  <div>
        <Row class="info-warp">
          <Col span="11">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">订单号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.OrderCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">入库单号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.ReferenceNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">创建时间:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.AddTime }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">预计到货时间:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.ExpectedDate }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">跟踪号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.TrackingNumber }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">参考单号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.RefNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">平台账号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.UserAccount }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">目的仓库:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.ToWarehouse }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">发运仓库:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.Warehouse }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">系统重量（kg）:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.SystemWeight }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">备注:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.Remark }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.OabName }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">联系电话:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.OabPhone }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">传真:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.OabFax }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人公司:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.OabCompany }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人电子邮件:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.OabEmail }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人邮编:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.OabPostcode }}</Col>
              </Row>
            </Card>
        <Table
          ref="tables"
          :data="rowInfo.products"
          v-bind:columns="productColums"
          stripe
        ></Table>
  </div>
</template>

<script>
export default {
  props: { detilsRow: Object, parent: Object },
  data() {
    return {
      rowInfo: {},
      packingColums: [
        {
          title: "参考单号",
          key: "ReferenceNo",
        },
        {
          title: "装箱单号",
          key: "TppCode",
        },
        {
          title: "产品数量",
          key: "TppQuantity",
          sortable: true,
        },
        {
          title: "重量（kg）",
          key: "TppWeight",
        },
        {
          title: "体积（cm³）",
          key: "TppVolume",
        },
      ],
      productColums: [
        {
          title: "产品名称",
          key: "ProductTitle",
        },
        {
          title: "产品代码",
          key: "ProductBarcode",
        },
        {
          title: "三方仓库产品代码",
          key: "BarcodeCode",
        },
        {
          title: "产品数量",
          key: "OpQuantity",
        },
        {
          title: "产品体积（cm³）",
          key: "Volume",
        },
      ],
    };
  },
  watch: {
    detilsRow(newVal, oldVal) {
      this.rowInfo = Object.assign({}, newVal);
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.info-warp {
  .info-item {
    font-size: 12px;
    line-height: 32px;
    .info-title {
      font-size: 14px;
      font-weight: 500;
      text-align: right;
    }
  }
}
</style>
