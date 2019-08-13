<template>
  <Select v-model="selectData" style="width:200px">
    <Option v-for="item in commonList" :value="item.value" :key="item.value">{{ item.label }}</Option>
  </Select>
</template>
<script>
import { doCustomTimes } from "@/lib/tools";
import VirtualList from "vue-virtual-scroll-list";
export default {
  name: "CommonList",
  data() {
    return {
      commonList: [],
      selectData: ""
    };
  },
  components: {
    VirtualList
  },
  mounted() {
    let commonList = [];
    doCustomTimes(600, index => {
      commonList.push({
        value: index,
        label: `select_${index}`
      });
    });
    this.commonList = commonList;
  }
};
</script>

<style>
</style>
