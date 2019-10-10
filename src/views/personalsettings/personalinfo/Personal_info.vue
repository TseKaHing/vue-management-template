<template>
  <div class="wraper">
    <!-- 个人资料 -->

    <div class="personalCard">
      <!-- 背景图 -->
      <div class="backgroundPic">
        <Button
          icon="ios-image-outline"
          type="dashed"
          ghost
          style="position:relative;left:845px;top:15px;"
        >修改背景图片</Button>
      </div>

      <!-- 个人资料内容 -->

      <div class="personalCont">
        <Row style="height:130px;">
          <!-- 头像 -->
          <i-col span="5">
            <div class="personalHead">
              <img style="border-radius:4px;" src="../../../assets/img/头像.jpg" alt />
            </div>
          </i-col>

          <!-- 个人信息 -->
          <i-col span="19">
            <div class="userInfo">
              <span class="userName">曲终·人尽</span>
              <span>
                <img src="../../../assets/img/vip.png" alt />
              </span>
              <span style="font-size:15px;margin-left:5px;">普通会员</span>
            </div>

            <div class="userDetail" style="background-color:#ffffff;">
              <div class="icon-group" style="margin:5px 0;">
                <Icon type="ios-briefcase" style="margin-right:5px;" />北京理工大学珠海学院
                <span style="color:#cccccc;margin:0 5px;">|</span>
                <Icon type="ios-pin" style="margin-right:5px;" />广东深圳
                <span style="color:#cccccc;margin:0 5px;">|</span>
                <Icon type="md-female" />
              </div>
              <span>
                初闻不识曲中意，再听已是曲中人。
                <Button
                  icon="ios-create-outline"
                  @click.prevent="SettingInfo()"
                  style="margin-left:415px;"
                >修改个人资料</Button>
              </span>
            </div>
          </i-col>
        </Row>
      </div>
    </div>

    <!-- 个人关注 -->
    <div class="personalAttention">
      <div class="AttentionCont">
        <Row>
          <!-- 左侧内容板块 -->
          <i-col span="18">
            <!-- 导航栏 -->
            <Affix>
              <div class="AttentionNav">
                <Menu mode="horizontal" theme="light" active-name="网站推荐">
                  <MenuItem
                    v-for="(item) in list"
                    :name="`menu_item${item.name}`"
                    :key="`menu_item${item.name}`"
                  >
                    <Icon :type="item.icon" />
                    {{ item.name }}
                  </MenuItem>
                  <!-- <MenuItem name="网站推荐">
                    <Icon type="md-globe" />网站推荐
                  </MenuItem>
                  <MenuItem name="提问">
                    <Icon type="ios-help" />提问
                  </MenuItem>
                  <MenuItem name="收藏">
                    <Icon type="ios-folder-open-outline" />收藏
                  </MenuItem>
                  <MenuItem name="关注的人">
                    <Icon type="ios-people-outline" />关注的人
                  </MenuItem>
                  <MenuItem name="关注者">
                    <Icon type="ios-man-outline" />关注者
                  </MenuItem>-->
                </Menu>
              </div>
            </Affix>
            <div class="Show">
              <div class="NothingPic">
                <img src="../../../assets/img/没有内容.png" alt />
              </div>
              <p style="text-align:center;color:#cccccc;font-size:18px;padding-bottom:30px;">{{msg}}</p>
            </div>
          </i-col>

          <!-- 右侧足迹板块 -->
          <i-col span="6">
            <div class="Footmark" style="padding-top:20px;">
              <div class="FootPic">
                <img src="../../../assets/img/足迹.png" alt />
              </div>
              <p style="text-align:center;font-size:15px;margin:5px 0 20px 0;font-weight:bold;">我的足迹</p>
              <div class="Mark">
                <p style="text-align:center;color:#9c9c9c;padding:30px 0;">暂时没有内容</p>
              </div>
            </div>
          </i-col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import "./Personal_info.less";
// import "./Personal_info"
export default {
  data() {
    return {
      msg: "暂时没有内容",
      list: [
        {
          name: "网站推荐",
          icon: "md-globe"
        },
        {
          name: "提问",
          icon: "ios-help"
        },
        {
          name: "关注",
          icon: "ios-folder-open-outline"
        },
        {
          name: "收藏",
          icon: "ios-people-outline"
        },
        {
          name: "关注的人",
          icon: "ios-people-outline"
        }
      ]
    };
  },
  methods: {
    SettingInfo() {
      this.$router.push({ name: "maininfo" });
    },

    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of" +
          file.name +
          "is incorrect, please select jpg, jpeg or png!"
      });
    },

    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 5M."
      });
    }
    // handleScroll() {
    //   var Top =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;

    //   console.log(Top);
    // },
    // initAffix() {
    //   if (!this.affixInit) {
    //     //affix组件有bug，需要触发一次resize事件才能正常
    //     this.affixInit = true;
    //     if (document.createEvent) {
    //       let event = document.createEvent("HTMLEvents");
    //       event.initEvent("resize", true, true);
    //       window.dispatchEvent(event);
    //     } else if (document.createEventObject) {
    //       window.fireEvent("onresize");
    //     }
    //     console.log("resize dispatched");
    //   }
    // }
  }
};
</script>