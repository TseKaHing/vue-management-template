<template>
  <div align="center" class="success">
    <Icon type="ios-checkmark-circle" size="80" class="success_icon" />
    <div class="div1">密码修改成功</div>
    <div class="div2">您的密码已经修改成功，请牢记新密码。现在请重新登录。</div>
    <Button class="success_button" type="primary" @click="$router.replace({ name: 'login' })">跳转到登录页</Button>
    <br />
    <img src="@/assets/images/TBDS.png" alt />
  </div>
</template>
<script>
export default {};
</script>

<style lang="less">
.success {
  padding: 150px 0;
  &_icon {
    color: #1fb953;
    padding: 20px 0;
  }
  // &_button {
  // padding: 50px 50px;
  // }
}
.div1 {
  font-size: 24px;
  font-weight: 400;
  padding: 20px 0;
}
.div2 {
  font-size: 16px;
  font-weight: 300;
  padding: 20px 0;
}
</style>
