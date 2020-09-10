<template>
  <div>
    <Form ref="formCurrency" label-position="right" :model="Row" :rules="rule" :label-width="200">
      <Row>
        <Col span="12">
          <FormItem label="请输入密码">
            <Input clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="请确认密码">
            <Input clearable />
          </FormItem>
        </Col>
        <Col span="24">
          <div style="text-align:center;">
            <Button style="margin-left:20px;" type="primary" @click="save('formChange')">保存</Button>
          </div>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
</style>