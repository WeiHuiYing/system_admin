<template>
  <div style="width:100%;background:#fff;height:75vh">
    <div style="width:50%;padding: 100px;">
      <Form
        ref="formChange"
        label-position="right"
        :rules="rule"
        :model="formData"
        :label-width="200"
      >
        <FormItem label="请输入密码" prop="password">
          <Input v-model="formData.password" placeholder="请输入新密码" clearable />
        </FormItem>
        <FormItem label="请确认密码" prop="confirmPassword">
          <Input v-model="formData.confirmPassword" placeholder="请确认新密码" clearable />
        </FormItem>
        <div style="text-align:center;">
          <Button style="margin-left:20px;" type="primary" @click="save('formChange')">保存</Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { checkPwd } from "@/libs/validator";
export default {
  data() {
    return {
      rule: {
        password: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
          {
            trigger: "blur",
            validator: checkPwd,
          },
        ],
        confirmPassword: [
          {
            required: true,
            message: "请确认新密码",
            trigger: "blur",
          },
          {
            trigger: "blur",
            validator: checkPwd,
          },
        ],
      },
      formData: {},
    };
  },
};
</script>

<style lang="less" scoped>
</style>