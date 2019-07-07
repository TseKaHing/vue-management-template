<template>
  <div>
    <Dropdown>
      <a href="javascript:void(0)">
        <img src="../../assets/images/avatar.png" class="avatar" />
      </a>
      <DropdownMenu slot="list" v-for="item in PersonInfoList" :key="`_${item.title}`">
        <div @click.prevent="personalFunc(item.title)">
          <DropdownItem>{{ item.title }}</DropdownItem>
        </div>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Avatar",
  data() {
    return {
      PersonInfoList: [
        {
          title: "个人设置"
        },
        {
          title: "退出登录"
        }
      ]
    };
  },
  methods: {
    ...mapActions(["logout"]),
    personalFunc(title) {
      if (title == "个人设置") {
        this.personalSettings();
      } else if (title == "退出登录") {
        this.logout();
        this.$router.push({ name: "login" });
      }
    },
    personalSettings() {
      console.log("个人设置");
      this.$router.push({ name: "changepwd" });
    }
  }
};
</script>

<style lang="less">
.avatar {
  height: 32px;
  width: 32px;
  border-radius: 50%;
  vertical-align: middle;
  // padding-right: 64px;
}
</style>
