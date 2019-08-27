<template>
  <div>
    <Button type="primary" @click="authen">github授权登录</Button>
  </div>
</template>

<script>
import { authenByGithub } from "@/api/github";
import { authen_url } from "@/lib/authenByGithub";
export default {
  name: "AuthenByGithub",
  created() {
    console.log(authen_url);
  },
  methods: {
    authen() {
      authenByGithub().then(res => {
        window.location.href = res.data.authen_url;
        console.log(window.location.href);
      });
    }
  }
};
</script>

<style>
</style>
