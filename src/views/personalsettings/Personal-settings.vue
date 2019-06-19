<template>
  <div>
    <template>
      <Row>
        <i-col span="5">
          <Card dis-hover :width="100">
            <p slot="title">
              <Icon type="md-settings" size="22"/>
              <font class="font-padding">个人设置</font>
            </p>
            <template v-for="item in settingList">
              <Row :key="`setting_${item.title}`">
                <i-col>
                  <router-link to="/login/main/personalsettings/changepwd">
                    <div class="div-padding">
                      <span>{{ item.title }}</span>
                      <Icon class="icon-padding" :type="item.icon" size="20px"/>
                    </div>
                  </router-link>
                </i-col>
              </Row>
            </template>
          </Card>
        </i-col>
        <i-col span="18" offset="1">
          <Card dis-hover>
            <p slot="title">{{ $route.meta.title }}</p>
            <router-view></router-view>
          </Card>
        </i-col>
      </Row>
    </template>
  </div>
</template>
<script>
export default {
  name: "PersonalSettings",
  data() {
    return {
      settingList: [
        {
          title: "个人资料",
          icon: "ios-arrow-dropright"
        },
        {
          title: "修改密码",
          icon: "ios-arrow-dropright"
        },
        {
          title: "资源管理",
          icon: "ios-arrow-dropright"
        }
      ]
    };
  }
};
</script>

<style lang="less">
.font-padding {
  padding-left: 10px;
  vertical-align: middle;
}
.icon-padding {
  float: right;
  vertical-align: -webkit-baseline-middle;
  // padding-top: 14px;
  // line-height: 40px;
}
.div-padding {
  padding: 6px 6px;
  line-height: 1.1;
}
</style>
