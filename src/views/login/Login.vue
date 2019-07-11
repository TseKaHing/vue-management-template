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
        <p slot="title" style="height: 140px">
          <img src="../../assets/images/TBDS.png" style="width:140px" />
          <br />
          <span class="span-text">Think Big and Debug the World</span>
        </p>
        <div class="form-con">
          <login-form></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import "./Login.less";
import LoginForm from "./login-form";
export default {
  components: {
    LoginForm
  }
};
</script>

