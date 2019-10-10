<template>
  <div>
    <template>
      <div class="padding-box"></div>
      <Row>
        <i-col span="4">
          <Card dis-hover :width="100">
            <p slot="title">
              <Icon type="md-settings" size="22" />
              <font class="font-padding">个人设置</font>
            </p>
            <template v-for="item in settingList">
              <Row :key="`setting_${item.title}`">
                <i-col>
                  <!-- <router-link to="/settings/personalsettings/changepwd"> -->
                  <router-link :to="item.link">
                    <div class="div-padding">
                      <span>{{ item.title }}</span>
                      <Icon class="icon-padding" :type="item.icon" size="20px" />
                    </div>
                  </router-link>
                </i-col>
              </Row>
            </template>
          </Card>
        </i-col>
        <i-col span="12" offset="1">
          <router-view></router-view>
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
          icon: "ios-arrow-dropright",
          link: "/settings/personalsettings/maininfo"
        },
        {
          title: "修改密码",
          icon: "ios-arrow-dropright",
          link: "/settings/personalsettings/changepwd"
        },
        {
          title: "重置密码",
          icon: "ios-arrow-dropright",
          link: "/settings/personalSettings/resetpwdbyemail"
        }
      ]
    };
  }
};
</script>

<style lang="less">
.padding-box {
  padding-top: 30px;
}
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
