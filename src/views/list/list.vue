<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="`item_${index}`"></li>
      <span>{{ item.name }}</span>
    </ul>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    };
  },
  methods: {}
};
</script>

<style>
</style>
