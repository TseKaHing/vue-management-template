<template>
  <div class="custom-bread-crumb">
    <Breadcrumb :style="{fontSize: `${fontSize}px`}">
      <BreadcrumbItem v-for="(item, index) in list" :key="`bread_crumb_${index}`" :to="item.to">
        <Icon style="margin-right:4px" type="ios-home-outline" />
        {{ showRouteTitle(item) }}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
import { showRouteTitle } from "@/lib/util";
export default {
  name: "customBreadCrumb",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    fontSize: {
      type: Number,
      default: 14
    }
  },
  methods: {
    showRouteTitle(item) {}
  },
  watch: {
    // $route(to, from, next) {
    //   console.log($route);
    // }
  },
  created() {
    console.log(this.$route);
    console.log(this.$route.path);
  }
};
</script>

<style lang="less">
.custom-bread-crumb {
  display: inline-block;
  vertical-align: top;
}
</style>
