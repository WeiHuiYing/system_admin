<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge>
        <Avatar :src="userAvatar" />
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="changePwd">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import "./user.less";
import { mapActions } from "vuex";
export default {
  name: "User",
  props: {
    userAvatar: {
      type: String,
      default: "",
    },
  },
  methods: {
    ...mapActions(["handleLogOut"]),
    logout() {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: "login",
        });
      });
    },
    changePwd() {
      this.$router.push({
        name: "change_pwd",
      });
    },
    handleClick(name) {
      switch (name) {
        case "logout":
          this.logout();
          break;
        case "changePwd":
          this.changePwd();
          break;
      }
    },
  },
};
</script>
