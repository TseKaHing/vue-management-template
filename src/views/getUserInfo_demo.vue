<template>
  <div>
    <Button type="primary" @click="getInfo">获取用户信息</Button>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user";
// import { authen_url } from "@/lib/authenByGithub";
import { authenByGithub } from "@/api/github";
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
