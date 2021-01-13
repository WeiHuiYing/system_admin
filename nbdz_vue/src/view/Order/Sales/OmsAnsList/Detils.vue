<template>
  <div>
    <Tabs>
      <TabPane label="详情">
        <Row class="info-warp">
          <Col span="11">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">入库单号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.receiveCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">交货方式:</Col>
                <Col v-if="rowInfo.incomeType == 0" :offset="1" :span="6"
                  >自送</Col
                >
                <Col v-else :offset="1" :span="6">揽收</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">交货仓库:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.transitWarehouseCode
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6"
                  >运输方式（自送时，需要填写到仓方式）:</Col
                >
                <Col :offset="1" :span="6">{{ rowInfo.shippingMethod }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">入库单状态:</Col>
                <Col v-if="rowInfo.receivingStatus == 'C'" :offset="1" :span="6"
                  >新建</Col
                >
                <Col
                  v-else-if="rowInfo.receivingStatus == 'W'"
                  :offset="1"
                  :span="6"
                  >头程在途</Col
                >
                <Col
                  v-else-if="rowInfo.receivingStatus == 'P'"
                  :offset="1"
                  :span="6"
                  >头程收货中</Col
                >
                <Col
                  v-else-if="rowInfo.receivingStatus == 'T'"
                  :offset="1"
                  :span="6"
                  >头程收货完成</Col
                >
                <Col
                  v-else-if="rowInfo.receivingStatus == 'Z'"
                  :offset="1"
                  :span="6"
                  >转运中</Col
                >
                <Col
                  v-else-if="rowInfo.receivingStatus == 'G'"
                  :offset="1"
                  :span="6"
                  >目的仓库收货中</Col
                >
                <Col
                  v-else-if="rowInfo.receivingStatus == 'F'"
                  :offset="1"
                  :span="6"
                  >目的仓收货完成</Col
                >
                <Col
                  v-else-if="rowInfo.receivingStatus == 'E'"
                  :offset="1"
                  :span="6"
                  >完成上架</Col
                >
                <Col
                  v-else-if="rowInfo.receivingStatus == 'X'"
                  :offset="1"
                  :span="6"
                  >废弃</Col
                >
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">入库单说明:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.receivingDesc }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">预计到达日期:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.etaDate }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">修改日期:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.receivingModifyTime
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">揽收地址:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.street }}</Col>
              </Row>
            </Card>
          </Col>
          <Col span="11" offset="2">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">客户参考单号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.referenceNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">目的仓库:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.warehouseCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">头程运输方式:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.smCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">跟踪号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.trackingNumber }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">联系电话:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.contactPhone }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">总箱数:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.boxTotal }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">产品总数:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.skuTotal }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">SKU种类:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.skuSpecies }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">计费时间:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.calculateFeeTime }}</Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="入库单成本">
        <Table
          ref="tables"
          :data="rowInfo.receivingCost"
          v-bind:columns="receivingColums"
          stripe
        ></Table>
      </TabPane>
      <TabPane label="商品列表">
        <Table
          ref="tables"
          :data="rowInfo.items"
          v-bind:columns="productColums"
          stripe
        ></Table>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { getOmsDetails } from "@/api/order";
export default {
  props: { detilsRow: Object, parent: Object },
  data() {
    return {
      rowInfo: {},
      receivingColums: [
        {
          title: "总成本",
          key: "totalCost",
        },
        {
          title: "运输费",
          key: "shippingCost",
        },
        {
          title: "报关费",
          key: "ccfCost",
        },
        {
          title: "关税",
          key: "dtCost",
        },
        {
          title: "其他费用",
          key: "otherCost",
        },
        {
          title: "客户币种",
          key: "customerCurrency",
        },
      ],
      productColums: [
        {
          title: "SKU",
          key: "productSku",
        },
        {
          title: "产品编码",
          key: "productBarcode",
        },
        {
          title: "数量",
          key: "quantity",
        },
        {
          title: "	收货数",
          key: "receivedQuantity",
        },
        {
          title: "箱号",
          key: "boxNo",
        },
        {
          title: "上架数量",
          key: "putawayQuantity",
        },
        {
          title: "产品单价",
          key: "productPrice",
        },
      ],
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
      getDetails(_this.rowInfo.id)
        .then((res) => {
          const resData = res.data;
          if (resData.code == 200) {
            _this.rowInfo = resData.data;
          }
        })
        .catch((err) => {
          console.log(err);
          const response = err.response;
          if (response.data && response.data.detail) {
            this.$Message.error({
              content: response.data.detail,
              duration: 10,
              closable: true,
            });
          } else if (response.data) {
            let msg = "";
            Object.keys(response.data).forEach((key) => {
              msg += key + ":" + response.data[key];
            });
            this.$Message.error({
              content: msg,
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
