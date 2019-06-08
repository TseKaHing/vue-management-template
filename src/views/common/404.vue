<template>
  <div class="site-wrapper site-page--not-found">
    <div class="site-content__wrapper">
      <div class="site-content">
        <h2 class="not-found-title">404</h2>
        <p class="not-found-desc">
          抱歉！您访问的页面
          <em>失联</em>啦 ...
        </p>
        <ButtonGroup shape="circle">
          <Button type="primary" @click="$router.go(-1)">
            <Icon type="ios-arrow-back"></Icon>返回上一页
          </Button>
          <Button
            type="primary"
            class="not-found-btn-gohome"
            @click="$router.push({ name: 'login' })"
          >
            进入登录页
            <Icon type="ios-arrow-forward"></Icon>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "404"
    };
  },
  mounted() {
    console.log(this.msg);
  }
};
</script>

<style lang="less">
.site-wrapper.site-page--not-found {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  .site-content__wrapper {
    padding: 0;
    margin: 0;
    background-color: #fff;
  }
  .site-content {
    position: fixed;
    top: 15%;
    left: 50%;
    z-index: 2;
    padding: 30px;
    text-align: center;
    transform: translate(-50%, 0);
  }
  .not-found-title {
    margin: 20px 0 15px;
    font-size: 10em;
    font-weight: 400;
    color: rgb(55, 71, 79);
  }
  .not-found-desc {
    margin: 0 0 30px;
    font-size: 26px;
    text-transform: uppercase;
    color: rgb(118, 131, 143);
    > em {
      font-style: normal;
      color: #ee8145;
    }
  }
  .not-found-btn-gohome {
    margin-left: 30px;
  }
}
</style>
