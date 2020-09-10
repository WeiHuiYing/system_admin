<template>
  <div>
    <Tabs>
      <TabPane label="详情">
        <Row class="info-warp">
          <Col span="8">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">单据类型:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.MsgType }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">E贸易公司账号:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.e_trade_account }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">单据日期:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.OrderTime }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">订单金额:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.ordercharge }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">提交状态:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.state }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">Sellsrecord:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.Sellsrecord }}</Col>
              </Row>
            </Card>
          </Col>
          <Col span="8">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">出口口岸代码:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.portCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">发货人名称:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.shipper }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">发货人地址:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.shipperAddress }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">发货人电话:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.shipperTelephone }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">发货人所在国(检):</Col>
                <Col :offset="1" :span="17">{{ rowInfo.shipperCountryCiq }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">发货人所在国(关):</Col>
                <Col :offset="1" :span="17">{{ rowInfo.shipperCountryCus }}</Col>
              </Row>
            </Card>
          </Col>
          <Col span="8">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">操作类型:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.modifyMark }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">TrueFalse收款:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.receiptFlag }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">提交结果:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.result_state }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">订单编号:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.orderNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">创建时间:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.create_date }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">提交收款回执:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.submit_payreceipt }}</Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row class="info-warp">
          <Col span="8">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">证件类型:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.idType }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">证件号码:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.idNumber }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">贸易方式:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.tradeMode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">生产销售企业代码:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.companyCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">币制(检):</Col>
                <Col :offset="1" :span="17">{{ rowInfo.currencyCiq }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">币制(关):</Col>
                <Col :offset="1" :span="17">{{ rowInfo.currencyCus }}</Col>
              </Row>
            </Card>
          </Col>
          <Col span="8">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">推送清单结果:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.result_invtstate }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">区内企业代码:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.iacCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">进出口标志:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.ieType }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">集货/备货:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.stockFlag }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">申报业务类型:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.statisticsFlag }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">包装种类代码(关):</Col>
                <Col :offset="1" :span="17">{{ rowInfo.wrapType }}</Col>
              </Row>
            </Card>
          </Col>
          <Col span="8">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">账册编号:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.emsNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">电子口岸编号:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.preNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">许可证号:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.licenseNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">总包号:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.totalPackageNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">推送清单状态:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.invtstate }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">推送收款结果:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.result_paystate }}</Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row class="info-warp">
          <Col span="8">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">总费用:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.charge }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">优惠减免金额:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.discount }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">货值:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.goodsValue }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">运费:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.freight }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">运费标志:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.fFlag }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">保费:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.insuredFee }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">提交订单回执:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.submit_receipt }}</Col>
              </Row>
            </Card>
          </Col>
          <Col span="8">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">客户姓名:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.customer }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收货人名称:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.consignee }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收货人省份:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.consigneeProvince }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收货人城市:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.consigneeCity }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收货人地址:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.consigneeAddress }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收货人电话:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.consigneeTelephone }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收货人邮编:</Col>
                <Col :offset="1" :span="17">{{ rowInfo.consigneePostcode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收货人所在地(检):</Col>
                <Col :offset="1" :span="17">{{ rowInfo.consigneeCountryCiq }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收货人所在国(关):</Col>
                <Col :offset="1" :span="17">{{ rowInfo.consigneeCountryCus }}</Col>
              </Row>
            </Card>
          </Col>
          <Col span="8">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">代理企业(检):</Col>
                <Col :offset="1" :span="17">{{ rowInfo.agentCodeCiq }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">代理企业(关):</Col>
                <Col :offset="1" :span="17">{{ rowInfo.agentCodeCus }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">代理企业名称(检):</Col>
                <Col :offset="1" :span="17">{{ rowInfo.agentNameCiq }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">代理企业名称(关):</Col>
                <Col :offset="1" :span="17">{{ rowInfo.agentNameCus }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">包装种类(检):</Col>
                <Col :offset="1" :span="17">{{ rowInfo.packageTypeCiq }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">包装种类(关):</Col>
                <Col :offset="1" :span="17">{{ rowInfo.packageTypeCus }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">撤单原因:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.repeal_reason }}</Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="订单产品信息">
        <Table
          ref="tables"
          height="700"
          :data="rowInfo.lines"
          v-bind:columns="productColums"
          stripe
        ></Table>
      </TabPane>
      <TabPane label="报关单列表">
        <Table
          ref="tables"
          height="700"
          :data="rowInfo.lines_group"
          v-bind:columns="groupColums"
          stripe
        ></Table>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { getEOrder as getList } from "@/api/Analysis";
export default {
  props: { detilsRow: Object, parent: Object },
  data() {
    return {
      rowInfo: {},
      productColums: [
        {
          title: "E trade id",
          key: "e_trade_id",
          width: 200,
        },
        {
          title: "商品sku",
          key: "sku",
          width: 200,
        },
        {
          title: "账册备案料号",
          key: "itemRecordNo",
          width: 200,
        },
        {
          title: "备案商品编号(检)",
          key: "itemNoCiq",
          width: 200,
        },
        {
          title: "商品上架品名",
          key: "shelfGoodsName",
          width: 200,
        },
        {
          title: "申报品名",
          key: "goodsName",
          width: 200,
        },
        {
          title: "商品描述",
          key: "describe",
          width: 200,
        },
        {
          title: "HS编码",
          key: "codeTs",
          width: 200,
        },
        {
          title: "规格型号",
          key: "goodsModel",
          width: 200,
        },
        {
          title: "行邮税号",
          key: "taxCode",
          width: 200,
        },
        {
          title: "成交单价",
          key: "price",
          width: 200,
        },
        {
          title: "销售单价(含运费)",
          key: "tprice",
          width: 200,
        },
        {
          title: "报关价格",
          key: "customs_price",
          width: 200,
        },
        {
          title: "数量",
          key: "quantity",
          width: 200,
        },
        {
          title: "折扣优惠",
          key: "discount",
          width: 200,
        },
        {
          title: "用途",
          key: "usage",
          width: 200,
        },
        {
          title: "废旧物品",
          key: "wasteMaterials",
          width: 200,
        },
        {
          title: "内件包装种类(检)",
          key: "wrapTypeCiq",
          width: 200,
        },
        {
          title: "内件包装种类(关)",
          key: "wrapTypeCus",
          width: 200,
        },
        {
          title: "描述",
          key: "description",
          width: 200,
        },
        {
          title: "成交总价",
          key: "priceTotal",
          width: 200,
        },
        {
          title: "HS编码",
          key: "hs_code",
          width: 200,
        },
        {
          title: "计量单位",
          key: "unit",
          width: 200,
        },
        {
          title: "法定第一计量单位",
          key: "unit1",
          width: 200,
        },
        {
          title: "法定第二计量单位",
          key: "unit2",
          width: 200,
        },
        {
          title: "净重",
          key: "netweight",
          width: 200,
        },
        {
          title: "毛重",
          key: "weight",
          width: 200,
        },
      ],
      groupColums: [
        {
          title: "商品编号",
          key: "gcode",
        },
        {
          title: "商品名称",
          key: "itemNo",
          width: 200,
        },
        {
          title: "申报规格",
          key: "goods_model",
        },
        {
          title: "重量",
          key: "netweight",
        },
        {
          title: "数量",
          key: "quantity",
        },
        {
          title: "单位",
          key: "unit",
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
      this.$Spin.show();
      getList(_this.detilsRow)
        .then((res) => {
          this.$Spin.hide();
          if (res.status == 200) {
            _this.rowInfo = res.data;
          }
        })
        .catch((err) => {
          this.$Spin.hide();
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
