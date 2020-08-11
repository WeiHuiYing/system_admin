<template>
  <div>
    <Tabs>
      <TabPane label="详情">
        <Row class="info-warp">
          <Col span="11">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">E贸易公司账号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.e_trade_account }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">批次号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.e_trade_log }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">订单编号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.orderNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">订单编号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.orderNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">创建时间:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.create_date }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">更新时间:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.update_date }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">订单金额:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.ordercharge }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">运费:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.freight }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">客户姓名:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.customer }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收货人名称 :</Col>
                <Col :offset="1" :span="6">{{ rowInfo.consignee }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收货人省份:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.consigneeCity }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收货人地址:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.consigneeAddress }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收货人电话:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.consigneeTelephone }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收货人邮编:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.consigneePostcode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收获人所在国(检):</Col>
                <Col :offset="1" :span="6">{{ rowInfo.consigneeCountryCiq }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">收获人所在国(关):</Col>
                <Col :offset="1" :span="6">{{ rowInfo.consigneeCountryCus }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">证件类型:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.idType }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">证件号码:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.idNumber }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">进出口标志:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.ieType }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">集货/备货:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.stockFlag }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">贸易方式:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.tradeMode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">申报业务类型:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.statisticsFlag }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">账册编号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.emsNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">区内企业代码:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.iacCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">电子口岸编号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.preNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">许可证号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.licenseNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">出口口岸代码:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.portCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">包装种类代码(关):</Col>
                <Col :offset="1" :span="6">{{ rowInfo.wrapType }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">优惠减免金额:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.discount }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">运费标志:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.fFlag }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">保费:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.insuredFee }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">保费标志:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.iFlag }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">币制(检):</Col>
                <Col :offset="1" :span="6">{{ rowInfo.currencyCiq }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">币制(关):</Col>
                <Col :offset="1" :span="6">{{ rowInfo.currencyCus }}</Col>
              </Row>
            </Card>
          </Col>
          <Col span="11" offset="2">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">总运单号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.totalLogisticsNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">代理企业(检):</Col>
                <Col :offset="1" :span="6">{{ rowInfo.agentCodeCiq }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">代理企业(关):</Col>
                <Col :offset="1" :span="6">{{ rowInfo.agentCodeCus }}</Col>
              </Row>

              <Row class="info-item">
                <Col class="info-title" :span="6">代理企业名称(检):</Col>
                <Col :offset="1" :span="6">{{ rowInfo.agentNameCiq }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">代理企业名称(关):</Col>
                <Col :offset="1" :span="6">{{ rowInfo.agentNameCus }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">包装种类(检):</Col>
                <Col :offset="1" :span="6">{{ rowInfo.packageTypeCiq }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">包装种类(关):</Col>
                <Col :offset="1" :span="6">{{ rowInfo.packageTypeCus }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">操作类型:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.modifyMark }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">总费用:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.charge }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">TrueFalse收款:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.receiptFlag }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">备注:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.note }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">代理企业(关):</Col>
                <Col :offset="1" :span="6">{{ rowInfo.agentCodeCus }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">单据类型:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.MsgType }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">单据日期:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.OrderTime }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">Sellsrecord:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.Sellsrecord }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">描述:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.description }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">提交状态:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.state }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">提交结果:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.result_state }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">提交订单回执:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.submit_receipt }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">推送收款状态:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.paystate }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">推送收款结果:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.result_paystate }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">提交收款回执:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.submit_payreceipt }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">推送清单状态:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.invtstate }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">推送清单结果:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.result_invtstate }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">提交清单回执:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.submit_invtreceipt }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">推送撤单结果:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.result_repealstate }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">提交撤单回执:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.submit_repealreceipt }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">撤单原因:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.repeal_reason }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">推送汇总单状态:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.summarizestate }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">推送汇总单结果:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.result_summarizestate }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">提交汇总单回执:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.submit_summarizereceipt }}</Col>
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
      getList(_this.detilsRow)
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
