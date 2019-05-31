<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider :width="300" collapsible v-model="collapsed" hide-trigger>
        <side-menu :collapsed="collapsed" :list="menuList"></side-menu>
      </Sider>
      <Layout>
        <Header class="header-wrapper">
          <Icon type="md-menu" :size="32" @click.native="handleCollapsed" :class="triggerClasses"/>
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
import SideMenu from "./side-menu";
export default {
  data() {
    return {
      collapsed: true,
      menuList: [
        {
          title: "1",
          name: 'menu1',
          icon: "ios-alarm"
        },
        {
          title: "2",
          name: 'menu2',
          icon: "ios-alarm"
        },
        {
          title: "3",
          name: 'menu3',
          icon: "ios-alarm",
          children: [
            { title: "3-1", name: 'menu3-1',  icon: "ios-alarm" },
            {
              title: "3-2",
              name: 'menu3-2',
              icon: "ios-alarm",
              children: [
                { title: "3-2-1", name: 'menu3-2-1', icon: "ios-alarm" },
                { title: "3-2-2", name: 'menu3-2-2', icon: "ios-alarm" }
              ]
            }
          ]
        }
      ]
    };
  },
  components: {
    SideMenu
  },
  computed: {
    triggerClasses() {
      return ["trigger-icon", this.collapsed ? "rotate" : ""];
    }
  },
  methods: {
    handleCollapsed() {
      this.collapsed = !this.collapsed;
    }
  }
};
</script>

<style lang="less">
.layout-wrapper,
.layout-outer {
  height: 100%;
  .header-wrapper {
    background-color: #fff;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
    padding: 0 23px;
    .trigger-icon {
      transition: transform 0.3s ease;
      cursor: pointer;
      &.rotate {
        transform: rotateZ(-90deg);
        transition: transform 0.3s ease;
      }
    }
  }

  .content-con {
    padding: 10px;
  }
  .page-card {
    min-height: ~"calc(100vh - 84px)";
  }
}
</style>
