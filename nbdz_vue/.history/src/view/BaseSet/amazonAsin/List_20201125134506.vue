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
            <FormItem>
              <Upload
                action=""
                accept=".xls, .xlsx"
                :before-upload="importExcel"
                :show-upload-list="false"
              >
                <Button :loading="uploadLoading" type="primary"
                  >订单上传</Button
                >
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
          _this.$Message.success({
            content: "操作成功",
            duration: 10,
            closable: true,
          });
        })
        .catch((err) => {
          _this.uploadLoading = false;
          console.log(err.response);
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

