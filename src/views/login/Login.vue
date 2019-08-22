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
      <Card icon="log-in" :bordered="false" :dis-hover="true" class="card-style">
        <p slot="title" style="height: 80px">
          <img src="../../assets/images/TBDS.png" style="height:80px" />
          <!-- <br />
          <span class="span-text">Think Big and Debug the World</span>-->
        </p>
        <div class="form-con">
          <login-form></login-form>
          <div @click="AuthenByGithub()">
            <img src="../../../public/github.png" alt="github授权登录" />
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import "./Login.less";
import LoginForm from "./login-form";
import { authen_url } from "@/lib/authenByGithub";
export default {
  components: {
    LoginForm
  },
  methods: {
    AuthenByGithub() {
      // console.log("AuthenByGithub");
      // console.log(this.$router.push({ name: "login" }));
      this.$router.push({ name: "authenbygithub" });
      // window.location.href = authen_url;
    }
  }
};
</script>

