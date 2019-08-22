<template>
  <div>github授权登录</div>
</template>

<script>
import { authen_url } from "@/lib/authenByGithub";
export default {
  name: "AuthenByGithub",
  created() {
    console.log(authen_url);
  }
};
</script>

<style>
</style>
