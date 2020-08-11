<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/login-form";
import { mapActions } from "vuex";
export default {
  // data() {
  //   return {
  //     client_id: "adminClient",
  //     client_secret: "adminClientSecret",
  //     grant_type: "password",
  //     redirect_uri: "http://192.168.1.234:30008/signin-oidc",
  //     scope: "roles  adminClient_api"
  //   };
  // },
  components: {
    LoginForm,
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo"]),
    handleSubmit({ userName, password }) {
      const _this = this;
      // let data = {
      //   username: userName,
      //   password: password,
      //   client_id: _this.client_id,
      //   client_secret: _this.client_secret,
      //   grant_type: _this.grant_type,
      //   redirect_uri: _this.redirect_uri
      // };
      // console.log(data);
      this.handleLogin(userName, password)
        .then((res) => {
          console.log(res);
          if (res.code != 1) {
            this.$Message.error(res.message);
            return;
          }
          this.getUserInfo().then((res) => {
            this.$router.push({
              name: this.$config.homeName,
            });
          });
        })
        .catch((err) => {
          this.$Message.error("网络请求出错");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/login-bg.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  &-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
    }
  }
}
</style>
