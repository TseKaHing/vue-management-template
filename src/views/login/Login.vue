<style lang="less" scoped>
.span-text {
  padding: 20px;
  font-size: 16px;
}
.card-style {
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.65);
}
</style>

<template>
  <div class="login">
    <div class="login-con">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import "./RegLogin.less";
import { authen_url } from "@/lib/authenByGithub";
export default {
  components: {
    // LoginForm,
    // RegisterForm
  },
  methods: {
    AuthenByGithub() {
      this.$router.push({ name: "authenbygithub" });
    }
  }
};
</script>

