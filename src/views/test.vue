<template>
  <div>
    <div>UserId:{{ UserId }}</div>
    <div>Username:{{ Username }}</div>
    <div>RawPwd: {{ RawPwd}}</div>
    <div>Password:{{ Password }}</div>
    <div>Degree:{{ Degree }}</div>
    <div>Token: {{ Token }}</div>
    <div>Code: {{ Code }}</div>
  </div>
</template>

<script>
// import stack from "@/stack";
import {
  getUserId,
  getUserName,
  getRawPwd,
  getPassword,
  getUserDegree,
  getToken,
  getCodeFromGithub
} from "@/lib/util";
export default {
  data() {
    return {
      UserId: getUserId(),
      Username: getUserName(),
      RawPwd: getRawPwd(),
      Password: getPassword(),
      Degree: getUserDegree(),
      Token: getToken(),
      Code: getCodeFromGithub()
    };
  },
  mounted() {
    // console.log(stack);
  }
};
</script>

<style>
</style>
