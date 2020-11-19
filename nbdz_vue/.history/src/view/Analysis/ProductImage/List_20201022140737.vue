<template>
  <div class="content-main">
    <div class="content-header">
      <Row>
        <Col :span="24">
          <Upload
            action=""
            accept=".xls, .xlsx"
            :show-upload-list="false"
            :before-upload="importExcel"
          >
            <Button type="primary">导入SPU</Button>
          </Upload>
        </Col>
        <!-- <Col :span="12">
          <Col :span="12">
            <Upload
              action="http://report.uniceextension.cn:8888/api/FinancialStatement/productTrans"
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
          <Col :span="12">
            <Upload
              action=""
              accept=".xls, .xlsx"
              :show-upload-list="false"
              :before-upload="importExcel"
            >
              <Button type="primary">导入SPU</Button>
            </Upload>
          </Col>
        </Col>
        <Col style="text-align: right" :span="12">
          <Button
            v-if="fileUrl != ''"
            :to="'http://report.uniceextension.cn:8888' + fileUrl"
            target="_blank"
            icon="ios-download-outline"
            type="primary"
            >导出SKU</Button
          >
        </Col> -->
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
import { exportProductImage } from "@/api/Analysis";
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
                style: "max-width: 100px;max-height:100px",
              },
            });
          },
        },
        {
          title: "sku",
          key: "sku",
        },
      ],
      uploadLoading: false,
      upHeaders: {
        Authorization: "Bearer " + store.state.user.token,
      },
      listData: [],
      fileUrl: "",
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
      _this.uploadLoading = true;
    },
    importExcel(file) {
      const _this = this;
      const formData = new FormData();
      formData.append("excelFile", file);
      exportProductImage(formData)
        .then((res) => {
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "产品图片.xlsx";
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
        })
        .catch((err) => {
          console.log(err);
        });
      return false;
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

