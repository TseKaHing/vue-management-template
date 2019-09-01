<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider
        :width="256"
        collapsible
        v-model="collapsed"
        :collapsed-width="64"
        hide-trigger
        reverse-arrow
        class="sider-outer"
      >
        <side-menu :collapsed="collapsed" :list="routers"></side-menu>
      </Sider>
      <Layout>
        <Header class="header-wrapper">
          <header-bar @on-coll-change="handleCollapsedChange" :collapsed="collapsed"></header-bar>
        </Header>
        <Content class="content-con">
          <div>
            <Tabs
              type="card"
              closable
              :animated="false"
              :value="getTabNameByRoute($route)"
              @on-click="handleClickTab"
              class="content-tab"
            >
              <TabPane
                :label="labelRender(item)"
                :name="getTabNameByRoute(item)"
                v-for="(item, index) in tabList"
                :key="`tabNav_${index}`"
              ></TabPane>
            </Tabs>
          </div>
          <div class="view-box">
            <Card shadow class="page-card">
              <router-view></router-view>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import "./Layout.less";
import SideMenu from "_c/side-menu";
import HeaderBar from "_c/header-bar";
import { mapState, mapMutations, mapActions } from "vuex";
import { getTabNameByRoute, getRouteById } from "@/lib/util";
export default {
  data() {
    return {
      collapsed: false,
      getTabNameByRoute
    };
  },
  components: {
    SideMenu,
    HeaderBar
  },
  computed: {
    ...mapState({
      tabList: state => state.tabNav.tabList,
      routers: state =>
        state.router.routers.filter(item => {
          return (
            item.path !== "/" &&
            item.path !== "*" &&
            item.name !== "login" &&
            item.name !== "pwdsuccess" &&
            item.name !== "authenbygithub" &&
            item.name !== "authentest"
          );
        })
    })
  },
  methods: {
    handleCollapsedChange(state) {
      this.collapsed = state;
    },
    ...mapActions(["handleRemove"]),
    handleClickTab(id) {
      let route = getRouteById(id);
      this.$router.push(route);
    },
    handleTabRemove(id, event) {
      event.stopPropagation(); // 阻止冒泡
      this.handleRemove({
        id,
        $route: this.$route
      }).then(nextRoute => {
        this.$router.push(nextRoute);
      });
    },
    labelRender(item) {
      return h => {
        return (
          <div>
            <span style="marginLeft: 10px">{item.meta.title}</span>
            <icon
              type="md-backspace"
              style="line-height:12px;marginLeft: 10px"
              nativeOn-click={this.handleTabRemove.bind(
                this,
                getTabNameByRoute(item)
              )}
            ></icon>
          </div>
        );
      };
    }
  },
  created() {}
};
</script>