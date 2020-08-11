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
            </Card>
          </Col>
          <Col span="11" offset="2">
            <Card dis-hover :bordered="false">
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
      <TabPane label="装箱单信息"></TabPane>
      <TabPane label="订单产品信息"></TabPane>
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
