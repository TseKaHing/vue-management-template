<template>
  <div>
    <div class="header-left">
      <Icon type="md-menu" :size="32" @click.native="handleCollapsed" :class="triggerClasses" />
    </div>
    <div class="header-right">
      <Avatar />
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar";
export default {
  name: "HeaderBar",
  props: {
    collapsed: {
      type: Boolean
    }
  },
  components: {
    Avatar
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
