<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider :width="256" collapsible v-model="collapsed" :collapsed-width="64" hide-trigger>
        <side-menu :collapsed="collapsed" :list="authenList"></side-menu>
      </Sider>
      <Layout>
        <Header class="header-wrapper">
          <header-bar @on-coll-change="handleCollapsedChange" :collapsed="collapsed"></header-bar>
        </Header>
        <Content class="content-con">
          <Card shadow class="page-card">
            <router-view></router-view>
          </Card>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import "./Layout.less";
import SideMenu from "@/components/side-menu";
import HeaderBar from "@/components/header-bar";
export default {
  data() {
    return {
      collapsed: false
    };
  },
  components: {
    SideMenu,
    HeaderBar
  },
  computed: {
    authenList() {
      return this.$store.state.user.MenuList;
    }
  },
  methods: {
    handleCollapsedChange(state) {
      this.collapsed = state;
    }
  },
  created() {}
};
</script>
