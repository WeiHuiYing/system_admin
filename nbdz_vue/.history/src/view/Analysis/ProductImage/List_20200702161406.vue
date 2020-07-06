<template>
  <div class="content-main">
    <div class="content-header">
      <Row>
        <Col :span="12">
          <Upload
            action="http://8000.bitcoding.top:8888/api/FinancialStatement/productTrans"
            name="excelFile"
            :headers="upHeaders"
            accept=".xls, .xlsx"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :before-upload="handleBefore"
            :disabled="uploadLoading"
          >
            <Button :loading="uploadLoading" type="primary">导入SKU</Button>
          </Upload>
        </Col>
        <Col style="text-align:right" :span="12">
          <Button
            v-if="fileUrl !=''"
            :to="'http://8000.bitcoding.top:8888/'+fileUrl"
            target="_blank"
            icon="ios-download-outline"
            type="primary"
          >导出SKU</Button>
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
          title: "图片",
          key: "image",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.image,
                style: "max-width: 100px;max-height:100px"
              }
            });
          }
        },
        {
          title: "sku",
          key: "sku"
        }
      ],
      uploadLoading: false,
      upHeaders: {
        Authorization: "Bearer " + store.state.user.token
      },
      listData: [],
      fileUrl: ""
    };
  },
  methods: {
    handleSuccess(response, file, fileList) {
      if (response.code == 200) {
        let _this = this;
        _this.listData = response.data;
        _this.fileUrl = response.url;
        _this.uploadLoading = false;
        this.$Message.info({
          content: "上传成功",
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

