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
import { setCodeFromGithub, getCodeFromGithub } from "@/lib/util";
import { getAccessToken } from "@/api/github";
export default {
  data() {
    return {
      code: "",
      github_info: "未获取哦，请点击按钮！"
    };
  },
  mounted() {
    const codeFromGithub = this.$route.query.code;
    if (codeFromGithub) {
      setCodeFromGithub(codeFromGithub);
      this.code = getCodeFromGithub();
    } else {
      console.log("授权失败！");
      setCodeFromGithub("");
    }
  },
  created() {
    // getAccessToken() {
    getAccessToken(this.code).then(res => {
      console.log(res);
      this.github_info = res.data.resp;
      const _info = {
        avatar_url: "https://avatars1.githubusercontent.com/u/38938775?v=4",
        bio: "A front-end learner",
        blog: "",
        company: null,
        created_at: "2018-05-03T08:31:19Z",
        email: null,
        events_url: "https://api.github.com/users/jazzyXie/events{/privacy}",
        followers: 0,
        followers_url: "https://api.github.com/users/jazzyXie/followers",
        following: 4,
        following_url:
          "https://api.github.com/users/jazzyXie/following{/other_user}",
        gists_url: "https://api.github.com/users/jazzyXie/gists{/gist_id}",
        gravatar_id: "",
        hireable: null,
        html_url: "https://github.com/jazzyXie",
        id: 38938775,
        location: null,
        login: "jazzyXie",
        name: null,
        node_id: "MDQ6VXNlcjM4OTM4Nzc1",
        organizations_url: "https://api.github.com/users/jazzyXie/orgs",
        public_gists: 0,
        public_repos: 4,
        received_events_url:
          "https://api.github.com/users/jazzyXie/received_events",
        repos_url: "https://api.github.com/users/jazzyXie/repos",
        site_admin: false,
        starred_url:
          "https://api.github.com/users/jazzyXie/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/jazzyXie/subscriptions",
        type: "User",
        updated_at: "2019-08-26T09:47:22Z",
        url: "https://api.github.com/users/jazzyXie"
      };
      localStorage.setItem("github_info", JSON.stringify(res.data.resp));
      console.log(JSON.parse(localStorage.getItem("github_info")));
    });
    // }
  }
};
</script>

<style>
</style>
