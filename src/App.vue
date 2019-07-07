<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  watch: {
    $route(newRoute) {
      this.UPDATE_ROUTER(newRoute);
    }
  },
  methods: {
    ...mapMutations(["UPDATE_ROUTER"])
  }
};
</script>

<style lang="less">
html,
body {
  height: 100%;
}
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
