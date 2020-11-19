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
  data() {
    return {
      client_id: "report_client",
      client_secret: "longqi.123",
      grant_type: "password",
      redirect_uri: "http://218.28.44.115:9000/signin-oidc",
      scope: "roles email openid report_api adminClient_api",
    };
  },
  components: {
    LoginForm,
  },
  methods: {
    ...mapActions([
      "handleLogin",
      "getUserInfo",
      "gerUserPerm",
      "getUserClients",
      "handleLogOut",
    ]),
    handleSubmit({ userName, password }) {
      const _this = this;
      let data = {
        username: userName,
        password: password,
        client_id: _this.client_id,
        client_secret: _this.client_secret,
        grant_type: _this.grant_type,
        redirect_uri: _this.redirect_uri,
        scope: _this.scope,
      };
      this.handleLogin(data)
        .then((response) => {
          this.getUserClients(response).then((res) => {
            if (res.data) {
              this.getUserInfo(response).then((res) => {
                this.$router.push({
                  name: this.$config.homeName,
                });
              });
              this.gerUserPerm(response).then((res) => {
                this.$Message.success("欢迎登录");
              });
            } else {
              this.handleLogOut().then(() => {
                this.$Message.error("请联系管理员为您添加权限");
                this.$router.push({
                  name: "login",
                });
              });
            }
          });
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            let data = err.response.data;
            let content = "";
            Object.keys(data).forEach((key) => {
              if (data[key] && data[key] != "") {
                content += key + ":" + data[key] + ",";
              }
            });
            content = content.substring(0, content.lastIndexOf(","));
            this.$Message.error(content);
          } else {
            this.$Message.error("网络请求出错");
          }
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
