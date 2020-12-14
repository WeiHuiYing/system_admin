<template>
  <div class="content-main">
    <div class="content-header">
      <Row>
        <Col :span="24">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="100"
            inline
          >
            <FormItem>
              <Upload
                action=""
                accept=".xls, .xlsx"
                :before-upload="importExcel"
                :show-upload-list="false"
              >
                <Button :loading="uploadLoading" type="primary">导入</Button>
              </Upload>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <Table
      ref="tables"
      border
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :loading="uploadLoading"
    ></Table>
  </div>
</template>

<script>
import { uploadAsin } from "@/api/ResManage";
export default {
  data() {
    return {
      uploadLoading: false,
      listData: [],
      listColums: [
        {
          title: "FbaAsin",
          key: "fbaAsin",
          align: "center",
        },
        {
          title: "销售人员",
          key: "personSeller",
          align: "center",
        },
      ],
    };
  },
  methods: {
    importExcel(file) {
      const _this = this;
      const formData = new FormData();
      formData.append("excelFile", file);
      _this.uploadLoading = true;
      uploadAsin(formData)
        .then((res) => {
          _this.uploadLoading = false;
          this.fileToJson(res.data).then((response) => {
            _this.listData = response.data;
            _this.$Message.success({
              content: response.message,
              duration: 10,
              closable: true,
            });
          });
        })
        .catch((err) => {
          _this.uploadLoading = false;
          console.log(err.response);
        });
      return false;
    },
    fileToJson(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (res) => {
          const { result } = res.target; // 得到字符串
          const data = JSON.parse(result); // 解析成json对象
          resolve(data);
        }; // 成功回调
        reader.onerror = (err) => {
          reject(err);
        }; // 失败回调
        reader.readAsText(new Blob([file]), "utf-8"); // 按照utf-8编码解析
      });
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

