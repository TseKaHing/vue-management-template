<template>
  <div>
    <div>授权测试页面</div>
    <div>code: {{ code }}</div>
    <!-- <Button type="primary" @click="getAccessToken">获取access_token</Button> -->
    <div>
      github中获取到的用户信息：
      <br />
      {{ github_info }}
    </div>
  </div>
</template>

<script>
import {
  setCodeFromGithub,
  getCodeFromGithub,
  setToken,
  getToken
} from "@/lib/util";
import { getAccessToken } from "@/api/github";
export default {
  data() {
    return {
      code: "",
      github_info: "还未成功获取信息oh~"
    };
  },
  created() {
    const codeFromGithub = this.$route.query.code;
    if (codeFromGithub) {
      setCodeFromGithub(codeFromGithub);
      this.code = getCodeFromGithub();
    } else {
      console.log("授权失败！");
      setCodeFromGithub("");
    }
  },
  mounted() {
    getAccessToken(this.code).then(res => {
      console.log(res);
      // console.log("token", res.data.token);
      setToken(res.data.token);
      // console.log(getToken());
      this.github_info = res.data.resp;

      localStorage.setItem("github_info", JSON.stringify(res.data.resp));
      console.log(JSON.parse(localStorage.getItem("github_info")));
      this.$router.push({ name: "test" });
    });
    // }
  }
};
</script>

<style>
</style>
