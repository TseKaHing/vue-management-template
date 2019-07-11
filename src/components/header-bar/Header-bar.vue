<template>
  <div>
    <div class="header-left">
      <Icon type="md-menu" :size="30" @click.native="handleCollapsed" :class="triggerClasses" />
      <!-- <bread-crumb style="margin-left: 30px"></bread-crumb> -->
    </div>
    <div class="header-right">
      <Avatar />
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar";
import BreadCrumb from "./Bread-crumb";
export default {
  name: "HeaderBar",
  props: {
    collapsed: {
      type: Boolean
    }
  },
  components: {
    Avatar,
    BreadCrumb
  },
  computed: {
    triggerClasses() {
      return ["trigger-icon", this.collapsed ? "rotate" : ""];
    }
  },
  methods: {
    handleCollapsed() {
      this.$emit("on-coll-change", !this.collapsed);
    }
  }
};
</script>

<style lang="less">
.header {
  &-left {
    float: left;
    // margin-left: 32px;
  }
  &-right {
    float: right;
    vertical-align: middle;
  }
}
</style>
