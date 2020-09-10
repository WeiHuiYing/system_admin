<template>
  <div style="width:50%;margin: 200px auto;">
    <Form ref="formCurrency" label-position="right" :label-width="200">
      <FormItem label="请输入密码" prop="password">
        <Input clearable />
      </FormItem>
      <FormItem label="请确认密码" prop="confirmPassword">
        <Input clearable />
      </FormItem>
      <div style="text-align:center;">
        <Button style="margin-left:20px;" type="primary" @click="save('formChange')">保存</Button>
      </div>
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