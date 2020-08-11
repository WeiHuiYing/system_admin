<template>
  <div>
    <Tabs>
      <TabPane label="详情">
        <Row class="info-warp">
          <Col span="11">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">订单号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.orderCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">入库单号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.referenceNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">创建时间:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.addTime }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">预计到货时间:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.expectedDate }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">跟踪号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.trackingNumber }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">参考号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.refNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">平台账号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.userAccount }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">目的仓库:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.toWarehouse }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">发运仓库:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.warehouse }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">系统重量（kg）:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.systemWeight }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">备注:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.remark }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.oabName }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">联系电话:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.oabPhone }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">传真:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.oabFax }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人公司:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.oabCompany }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人电子邮件:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.oabEmail }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人邮编:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.oabPostcode }}</Col>
              </Row>
            </Card>
          </Col>
          <Col span="11" offset="2">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">运输方式代码:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.smCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">运输方式代码中文名称:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.smNameCn }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">目的地:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.destination }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">头程费用:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.headFreight }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">头程关税:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.headTariff }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">头程费用币种:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.costCurrencyCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">头程关税币种:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.tariffCurrencyCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">内件数:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.parcelQuantity }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">数量（箱）:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.boxCount }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">金额:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.amount }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">包裹重量（kg）:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.soWeight }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人国家:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.oabCounty }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人州/区域:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.oabState }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人城市:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.oabCity }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人地址1:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.oabStreetAddress1 }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人地址2:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.oabStreetAddress2 }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人门牌号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.oabDoorplate }}</Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="装箱单信息">
        <Table ref="tables" :data="rowInfo.packingInfos" v-bind:columns="packingColums" stripe></Table>
      </TabPane>
      <TabPane label="订单产品信息">
        <Table ref="tables" :data="rowInfo.productInfos" v-bind:columns="productColums" stripe></Table>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { getShipList as getList } from "@/api/OmsAnsList";
export default {
  props: { detilsRow: Object, parent: Object },
  data() {
    return {
      rowInfo: {},
      packingColums: [
        {
          title: "参考号",
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
          title: "产品单重（kg）",
          key: "ProductWeight",
        },
        {
          title: "产品体积（cm³）",
          key: "Volume",
        },
        {
          title: "产品付款时间",
          key: "OpRefPaydate",
          sortable: true,
        },
        {
          title: "总重量",
          key: "TotalWeight",
        },
      ],
    };
  },
  watch: {
    detilsRow(newVal, oldVal) {
      this.loadData();
    },
  },
  methods: {
    loadData() {
      const _this = this;
      getList(_this.detilsRow, "GET").then((res) => {
        console.log(res);
      });
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
