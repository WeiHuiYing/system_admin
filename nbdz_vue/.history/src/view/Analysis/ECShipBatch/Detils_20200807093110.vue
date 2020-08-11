<template>
  <div>
    <Tabs>
      <TabPane label="详情">
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
                <Col class="info-title" :span="6">参考号:</Col>
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
          </Col>
          <Col span="11" offset="2">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">运输方式代码:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.SmCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">运输方式代码中文名称:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.SmNameCn }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">目的地:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.Destination }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">头程费用:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.HeadFreight }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">头程关税:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.HeadTariff }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">头程费用币种:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.CostCurrencyCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">头程关税币种:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.TariffCurrencyCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">内件数:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.ParcelQuantity }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">数量（箱）:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.BoxCount }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">金额:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.Amount }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">包裹重量（kg）:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.SoWeight }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人国家:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.OabCounty }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人州/区域:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.OabState }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人城市:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.OabCity }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人地址1:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.OabStreetAddress1 }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人地址2:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.OabStreetAddress2 }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收件人门牌号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.OabDoorplate }}</Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="装箱单信息">
        <Table ref="tables" :data="rowInfo.PackingInfos" v-bind:columns="packingColums" stripe></Table>
      </TabPane>
      <TabPane label="订单产品信息">
        <Table ref="tables" :data="rowInfo.ProductInfos" v-bind:columns="productColums" stripe></Table>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { getShipList as getList } from "@/api/Analysis";
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
      getList(_this.detilsRow, "GET")
        .then((res) => {
          if (res.status == 200) {
            _this.rowInfo = res.data;
          }
        })
        .catch((err) => {
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
