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
        },
        {
          title: "提货日期",
          key: "deliveryDate",
        },
        {
          title: "运输方式",
          key: "shipMethod",
        },
        {
          title: "追踪号",
          key: "shipNo",
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

