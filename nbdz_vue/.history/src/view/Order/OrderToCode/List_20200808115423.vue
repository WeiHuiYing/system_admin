<template>
  <div class="content-main">
    <div class="content-header">
      <Row>
        <Col :span="12">
          <Form ref="formInline" label-position="right" :label-width="100" inline>
            <FormItem>
              <Upload
                action="http://192.168.1.18:8817/api/OrderReport/SaleOrderTrans"
                name="excelFile"
                :headers="upHeaders"
                accept=".xls, .xlsx"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :before-upload="handleBefore"
                :disabled="uploadLoading"
              >
                <Button :loading="uploadLoading" type="primary">订单上传</Button>
              </Upload>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      uploadLoading: false,
      upHeaders: {
        Authorization: "Bearer " + store.state.user.token,
      },
    };
  },
  methods: {
    handleSuccess(response, file, fileList) {
      const content = response;
      const blob = new Blob([content.data], {
        type: "application/vnd.ms-excel",
      });
      const fileName = "订单转条形码.xlsx";
      if ("download" in document.createElement("a")) {
        // 非IE下载
        const elink = document.createElement("a");
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放 URL对象
        document.body.removeChild(elink);
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName);
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

