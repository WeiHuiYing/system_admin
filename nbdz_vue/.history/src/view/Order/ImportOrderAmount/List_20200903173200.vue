<template>
  <div class="content-main">
    <div class="content-header">
      <Row>
        <Col :span="24>
          <Form ref="formInline" label-position="right" :label-width="100" inline>
            
            <FormItem>
              <Upload
                action="http://8000.bitcoding.top:8888/api/UploadShippingFee/uploadShippingFee"
                name="excelFile"
                :headers="upHeaders"
                accept=".xls, .xlsx"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :before-upload="handleBefore"
                :disabled="uploadLoading"
              >
                <Button :loading="uploadLoading" type="primary">导入速卖通销售明细</Button>
              </Upload>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <Table ref="tables" height="700" :data="listData" v-bind:columns="listColums" stripe></Table>
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
          key: "warehourseOrderCode"
        },
        {
          title: "运单号",
          key: "shippingCode"
        },
        {
          title: "货币种类",
          key: "currency"
        },
        {
          title: "运费",
          key: "shippingFee"
        },
        {
          title: "提示信息",
          key: "message"
        }
      ],
      uploadLoading: false,
      upHeaders: {
        Authorization: "Bearer " + store.state.user.token
      },
      upData: {
        type: ""
      },
      listData: [],
      fileUrl: ""
    };
  },
  methods: {
    handleSuccess(response, file, fileList) {
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
          closable: true
        });
      } else {
        this.$Message.error({
          content: response.msg,
          duration: 10,
          closable: true
        });
      }
    },
    handleBefore() {
      let _this = this;
      _this.fileUrl = "";
      _this.listData = [];
      _this.uploadLoading = true;
    }
  }
};
</script>


<style lang="less" scoped>
.content-main {
  .content-header {
    padding: 5px;
  }
}
</style>

