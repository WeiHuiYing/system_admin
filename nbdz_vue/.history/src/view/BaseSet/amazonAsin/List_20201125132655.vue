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
                :show-upload-list="false"
                :on-success="handleSuccess"
                :before-upload="handleBefore"
                :disabled="uploadLoading"
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
  </div>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      uploadLoading: false,
    };
  },
  methods: {},
};
</script>


<style lang="less" scoped>
.content-main {
  .content-header {
    padding: 5px;
  }
}
</style>

