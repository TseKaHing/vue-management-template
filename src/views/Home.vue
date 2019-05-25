<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>{{ appName }}</p>
    <!-- <p>{{ authorName }}</p> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  computed: {
    ...mapState([
      'appName'
    ])
    // appName() {
    //   return this.$store.state.appName
    // },
    // authorName() {
    //   return this.$store.state.user.authorName
    // }
  }
}
</script>
