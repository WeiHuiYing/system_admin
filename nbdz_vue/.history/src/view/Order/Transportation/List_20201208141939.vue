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
                  'http://report.uniceextension.cn:8888/api/UploadShippingFee/uploadShippingFee?type=' +
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
          <Button
            v-if="fileUrl != ''"
            :to="'http://report.uniceextension.cn:8888' + fileUrl"
            target="_blank"
            icon="ios-download-outline"
            type="primary"
            >订单运费导出</Button
          >
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
          title: "仓库单号",
          key: "warehourseOrderCode",
        },
        {
          title: "运单号",
          key: "shippingCode",
        },
        {
          title: "货币种类",
          key: "currency",
        },
        {
          title: "运费",
          key: "shippingFee",
        },
        {
          title: "提示信息",
          key: "message",
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
      this.uploadLoading = false;
      if (response.code == 200) {
        let _this = this;
        if (response.url) {
          _this.listData = response.data;
          _this.fileUrl = response.url;
        }
        _this.uploadLoading = false;
        this.$Message.info({
          content: response.msg,
          duration: 10,
          closable: true,
        });
      } else {
        this.$Message.error({
          content: response.msg,
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

