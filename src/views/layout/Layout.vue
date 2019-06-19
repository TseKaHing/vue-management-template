<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider :width="256" collapsible v-model="collapsed" :collapsed-width="64" hide-trigger>
        <side-menu :collapsed="collapsed" :list="menuList"></side-menu>
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
      collapsed: false,
      menuList: [
        {
          title: "首页",
          name: "HomePge",
          icon: "md-pie"
        },
        {
          title: "上传资源",
          name: "UploadResources",
          icon: "ios-cloud-upload"
        },
        {
          title: "系统设置",
          name: "Settings",
          icon: "ios-settings",
          children: [
            { title: "个人设置", name: "PersonalSettings", icon: "md-contact" },
            {
              title: "管理资源",
              name: "ManageResources",
              icon: "ios-folder-open",
              children: [
                {
                  title: "下载资源",
                  name: "DownloadedResources",
                  icon: "md-download"
                },
                { title: "垃圾桶", name: "dropbox", icon: "logo-dropbox" }
              ]
            }
          ]
        }
      ]
    };
  },
  components: {
    SideMenu,
    HeaderBar
  },

  methods: {
    handleCollapsedChange(state) {
      this.collapsed = state;
    }
  },
  created() {}
};
</script>
