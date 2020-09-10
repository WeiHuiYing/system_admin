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
import { passwordChange } from "@/api/Auth";
import store from "@/store";
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
  methods: {
    save(name) {
      const _this = this;
      return this.$refs[name].validate((valid) => {
        if (!valid) {
          this.$Message.warning("请检查表单数据！");
        } else {
          console.log("222");
          _this.changePassword();
        }
      });
    },
    changePassword() {
      const _this = this;
      if (_this.formData.password == _this.formData.confirmPassword) {
        let data = {
          userId: store.state.user.userId,
          password: _this.formData.password,
          confirmPassword: _this.formData.confirmPassword,
        };
        console.log(data);
        passwordChange(data, "Post")
          .then((res) => {
            this.$message.success({
              message: "操作成功",
            });
          })
          .catch((err) => {
            this.$message.error({
              message: "错误",
            });
          });
      } else {
        this.$message.error({
          message: "错误",
          description: "请确认密码",
        });
        return false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>