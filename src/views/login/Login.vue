<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="Think Big and Debug the World" :bordered="false" :dis-hover="true">
        <div class="form-con">
          <login-form></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import LoginForm from "./login-form";

export default {
  components: {
    LoginForm
  }
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
    left: 200px;
    top: 50%;
    transform: translateY(-60%);
    width: 330px;
    height: 340px;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>
