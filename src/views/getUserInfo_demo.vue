<template>
  <div>
    <Button type="primary" @click="getInfo">获取用户信息</Button>
    <Button type="primary" @click="dequeue" style="marginLeft: 20px">push到队列</Button>
    <Button type="primary" @click="printqueue" style="marginLeft: 20px">打印队列</Button>
    <Button type="primary" @click="authen" style="marginLeft: 20px">github授权</Button>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user";
// import { authen_url } from "@/lib/authenByGithub";
import { authenByGithub } from "@/api/github";
// import stack from "@/stack";
import queue from "@/queue";
export default {
  data() {
    return {};
  },
  methods: {
    getInfo() {
      getUserInfo({ userId: 21 }).then(res => {
        console.log("res:", res);
      });
    },
    printMatrix(myMatrix) {
      for (let i = 0; i < myMatrix.length; i++) {
        for (let j = 0; j < myMatrix[i].length; j++) {
          // console.log(myMatrix[i][j]);
        }
      }
    },
    dequeue() {
      for (let i = 0; i < 10; i++) {
        queue.enqueue(i);
      }
    },
    printqueue() {
      console.log(queue.items);
      console.log(queue.toString());
    },
    authen() {
      authenByGithub().then(res => {
        console.log(res);
      });

      // console.log(authenByGithub);
      // window.location.href = authen_url;
    }
  },
  mounted() {}
};
</script>

<style>
</style>
