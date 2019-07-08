<template>
  <Submenu :name="parent.name">
    <template slot="title">
      <Icon :type="parent.meta.icon" :size="20" />
      {{ parent.meta.title }}
    </template>
    <template v-for="item in parent.children">
      <re-submenu
        v-if="item.children"
        :key="`menu_${item.name}`"
        :name="item.name"
        :parent="item"
        :size="20"
      ></re-submenu>
      <menu-item v-else :key="`menu_${item.name}`" :name="item.name">
        <Icon :type="item.meta.icon" :size="20" />
        {{ item.meta.title }}
      </menu-item>
    </template>
  </Submenu>
</template>

<script>
export default {
  name: "ReSubmenu",
  props: {
    parent: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style>
.ivu-select-dropdown {
  z-index: 10000;
}
</style>
