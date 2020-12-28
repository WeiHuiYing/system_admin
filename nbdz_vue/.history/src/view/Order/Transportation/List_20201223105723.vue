<template>
  <div class="content-main">
    <div class="content-header">
      <Row>
        <Col :span="12">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="100"
            inline
          >
            <FormItem label="上传类型">
              <Select v-model="upData.type" style="width: 200px">
                <Option value="正常">正常</Option>
                <Option value="累加">累加</Option>
                <Option value="覆盖">覆盖</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Upload
                :action="
                  'http://192.168.1.18:7776/newApi/order/uploadShipFee?type=' +
                  upData.type
                "
                name="excelFile"
                :headers="upHeaders"
                accept=".xls, .xlsx"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :before-upload="handleBefore"
                :disabled="uploadLoading"
              >
                <Button :loading="uploadLoading" type="primary"
                  >订单运费上传</Button
                >
              </Upload>
            </FormItem>
          </Form>
        </Col>
        <Col style="text-align: right" :span="12">
          <Button type="primary">订单运费导出</Button>
        </Col>
      </Row>
    </div>
    <Table
      ref="tables"
      height="700"
      :data="listData"
      v-bind:columns="listColums"
      stripe
    ></Table>
  </div>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      listColums: [
        {
          title: "货代名称",
          key: "forwardName",
          align: "center",
          width: 100,
        },
        {
          title: "账单日期",
          key: "billingDate",
          align: "center",
          width: 200,
        },
        {
          title: "提货日期",
          key: "deliveryDate",
          align: "center",
          width: 200,
        },
        {
          title: "运输方式",
          key: "shipMethod",
          align: "center",
          width: 200,
        },
        {
          title: "追踪号",
          key: "shipNo",
          align: "center",
          width: 200,
        },
        {
          title: "平台单号（仓库单号）",
          key: "plateFormCode",
          align: "center",
          width: 200,
        },
        {
          title: "订单编号（参考号）",
          key: "refNo",
          align: "center",
          width: 200,
        },
        {
          title: "出发地",
          key: "fromArea",
          align: "center",
          width: 200,
        },
        {
          title: "目的国家",
          key: "toArea",
          align: "center",
          width: 200,
        },
        {
          title: "件数",
          key: "qty",
          align: "center",
          width: 200,
        },
        {
          title: "货物品类",
          key: "style",
          align: "center",
          width: 200,
        },
        {
          title: "实重(KG)",
          key: "trueWeight",
          align: "center",
          width: 200,
        },
        {
          title: "材积重(KG)",
          key: "volumeWeight",
          align: "center",
          width: 200,
        },
        {
          title: "计费重量(KG)",
          key: "billingWeight",
          align: "center",
          width: 200,
        },
        {
          title: "应收费用",
          key: "receivableFee",
          align: "center",
          width: 200,
        },
        {
          title: "挂号费",
          key: "registrationFee",
          align: "center",
          width: 200,
        },
        {
          title: "偏远费",
          key: "longWayFee",
          align: "center",
          width: 200,
        },
        {
          title: "改址费",
          key: "changAddressFee",
          align: "center",
          width: 200,
        },
        {
          title: "燃油附加费",
          key: "fuelFee",
          align: "center",
          width: 200,
        },
        {
          title: "旺季附加费",
          key: "busyFee",
          align: "center",
          width: 200,
        },
        {
          title: "私人住址费",
          key: "personalAddressFee",
          align: "center",
          width: 200,
        },
        {
          title: "关税",
          key: "tariff",
          align: "center",
          width: 200,
        },
        {
          title: "补差价",
          key: "refund",
          align: "center",
          width: 200,
        },
        {
          title: "杂费",
          key: "otherFee",
          align: "center",
          width: 200,
        },
        {
          title: "总金额",
          key: "totalAmount",
          align: "center",
          width: 200,
        },
        {
          title: "币种",
          key: "currency",
          align: "center",
          width: 200,
        },
        {
          title: "备注",
          key: "memo",
          align: "center",
          width: 200,
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
      console.log(response);
      this.uploadLoading = false;
      if (response.code == 200) {
        let _this = this;
        if (response.url) {
          _this.listData = response.data;
        }
        this.$Message.info({
          content: response.message,
          duration: 10,
          closable: true,
        });
      } else {
        this.$Message.error({
          content: response.message,
          duration: 10,
          closable: true,
        });
      }
    },
    handleBefore() {
      let _this = this;
      _this.fileUrl = "";
      if (_this.upHeaders.type == "") {
        this.$Message.error({
          content: "请选择上传类型",
          duration: 10,
          closable: true,
        });
        return false;
      }
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

