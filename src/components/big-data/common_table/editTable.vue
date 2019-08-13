<template>
  <Table :columns="columns" :data="data"></Table>
</template>

<script>
export default {
  name: "EditTable",
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style>
</style>
