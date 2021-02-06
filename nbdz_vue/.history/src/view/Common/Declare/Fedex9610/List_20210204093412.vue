/* 
2021 / 02 / 04
weihuiying
联邦9610
*/
<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="24">
        <Upload
          action=""
          accept=".xls, .xlsx"
          :show-upload-list="false"
          :before-upload="importExcel"
        >
          <Button :loading="importLoading" type="primary">联邦9610代推</Button>
        </Upload>
      </Col>
    </Row>
  </div>
</template>

<script>
import { pushDate9610 } from "@/api/common";
import { fileToJson } from "@/libs/validator";
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
      pushDate9610(formData)
        .then((res) => {
          const content = res;
          _this.importLoading = false;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "9610代推数据.xlsx";
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
          _this.importLoading = false;
          if (err.response && err.response.data) {
            fileToJson(err.response.data).then((errData) => {
              _this.$Message.error({
                content: errData.message,
                duration: 10,
                closable: true,
              });
            });
          }
        });
      return false;
    },
  },
};
</script>