<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  naem: "App",
  data() {
    return {};
  },
  mounted() {}
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
