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
            :loading="importLoading"
          >
            <Button type="primary">导入SPU</Button>
          </Upload>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { exportProductImage } from "@/api/Analysis";
export default {
  data() {
    return {
      importLoading: false,
    };
  },
  methods: {
    importExcel(file) {
      const _this = this;
      const formData = new FormData();
      formData.append("excelFile", file);
      _this.importLoading = true;
      // exportProductImage(formData)
      //   .then((res) => {
      //     const content = res;
      //     _this.importLoading = false;
      //     const blob = new Blob([content.data], {
      //       type: "application/vnd.ms-excel",
      //     });
      //     const fileName = "产品图片.xlsx";
      //     if ("download" in document.createElement("a")) {
      //       // 非IE下载
      //       const elink = document.createElement("a");
      //       elink.download = fileName;
      //       elink.style.display = "none";
      //       elink.href = URL.createObjectURL(blob);
      //       document.body.appendChild(elink);
      //       elink.click();
      //       URL.revokeObjectURL(elink.href); // 释放 URL对象
      //       document.body.removeChild(elink);
      //     } else {
      //       // IE10+下载
      //       navigator.msSaveBlob(blob, fileName);
      //     }
      //   })
      //   .catch((err) => {
      //     _this.importLoading = false;
      //     console.log(err);
      //   });
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

