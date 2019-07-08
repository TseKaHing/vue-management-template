<template>
  <div>
    <div>UserId:{{ UserId }}</div>
    <div>Username:{{ Username }}</div>
    <div>Password:{{ Password }}</div>
    <div>Degree:{{ Degree }}</div>
    <div>Token: {{ Token }}</div>
  </div>
</template>

<script>
import {
  getUserId,
  getUserName,
  getPassword,
  getUserDegree,
  getToken
} from "@/lib/util";
export default {
  data() {
    return {
      UserId: getUserId(),
      Username: getUserName(),
      Password: getPassword(),
      Degree: getUserDegree(),
      Token: getToken()
    };
  }
};
</script>

<style>
</style>
