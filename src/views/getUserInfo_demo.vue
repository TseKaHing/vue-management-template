<template>
  <div>
    <Button type="primary" @click="getInfo">获取用户信息</Button>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user";
export default {
  data() {
    return {};
  },
  methods: {
    getInfo() {
      getUserInfo({ userId: 21 }).then(res => {
        console.log("res:", res);
      });
    }
  }
};
</script>

<style>
</style>
