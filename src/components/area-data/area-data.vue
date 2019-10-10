<template>
  <Cascader :data="areadata" trigger="hover" placeholder="请选择所在城市" style="width:600px"></Cascader>
</template>
<script>
import { AreaData } from "./data";
export default {
  name: "AreaData",
  data() {
    return {
      areadata: AreaData
    };
  }
};
</script>
