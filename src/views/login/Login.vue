
<template>
  <div class="login">
    <div class="login-con">
      <router-view></router-view>
    </div>
    <!-- <center>
      <footer class="footer">
        <bei-an></bei-an>
      </footer>
    </center>-->
  </div>
</template>
<script>
import { authen_url } from "@/lib/authenByGithub";
// import BeiAn from "_v/common/beian";
export default {
  components: {
    // BeiAn
  },
  methods: {
    AuthenByGithub() {
      this.$router.push({ name: "authenbygithub" });
    }
  }
};
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-con {
    margin: 0 auto;
    transform: translateY(40%);
    width: 410px;
    border-color: transparent;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
    border-radius: 0.25rem;
  }
}

.footer {
  // transform: translateY(500%);
  position: absolute;
  top: 90%;
}
</style>

