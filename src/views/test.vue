<template>
  <div>{{ un }} --- {{ pwd }}</div>
</template>

<script>
export default {
  data() {
    return {
      un: this.$store.state.user.UserName,
      pwd: this.$store.state.user.UserPwd
    };
  }
};
</script>

<style>
</style>
