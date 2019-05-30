<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>appName:{{ appName }}</p>
    <p>authorName:{{ authorName }}</p>
    <input v-model="inputValue" placeholder="请输入一个数：" @input="handleInputValue"/>
    <p>inputValue's last letter is:{{ lastLetter}}</p>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import HelloWorld from "@/components/HelloWorld.vue";
import { CLIENT_RENEG_LIMIT } from 'tls';

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
    inputValue: ''
    }
  },
  computed: {
    ...mapState(["appName"]),
    authorName() {
      return this.$store.state.user.authorName;
    },
    lastLetter() {
     
      return this.inputValue
    }
    // appName() {
    //   return this.$store.state.appName
    // },
    // authorName() {
    //   return this.$store.state.user.authorName
    // }
  },
  methods: {
    handleInputValue(val) {
      this.inputValue = val;
    }
  }
};
</script>
