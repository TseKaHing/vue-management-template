<template>
  <div>{{ UserId }} --- {{ un }} --- {{ pwd }}</div>
</template>

<script>
export default {
  data() {
    return {
      UserId: this.$store.state.user.UserId,
      un: this.$store.state.user.UserName,
      pwd: this.$store.state.user.UserPwd
    };
  }
};
</script>

<style>
</style>
