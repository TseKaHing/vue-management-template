<template>
  <div>
    <Button type="primary" style="marginBottom:10px" @click="getIPS"
      >重新获取IP</Button
    >
    <Table
      :height="height"
      border
      ref="selection"
      :columns="columns"
      :data="data"
    ></Table>
    <div style="marginTop:10px">
      <Button @click="handleSelectAll(true)">全选</Button>
      <Button @click="handleSelectAll(false)">取消全选</Button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      height: 500,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "IP",
          key: "ip"
        },
        {
          title: "端口",
          key: "port"
        },
        {
          title: "服务器地址",
          key: "address"
        },
        {
          title: "是否匿名",
          key: "isAnonymous"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "速度/秒",
          key: "speed"
        },
        {
          title: "连接时间",
          key: "connectTime"
        },
        {
          title: "存活时间",
          key: "survivalTime"
        },
        {
          title: "验证时间",
          key: "verifyTime"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "切换代理IP"
              )
            ]);
          }
        }
      ],
      data: []
    };
  },
  methods: {
    getIPS() {
      axios.get("/ips/fetch").then(res => {
        let ips = res.data.ips;

        this.data = ips;
        console.log(this.data);
      });
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    show(index) {
      this.$Message.info({
        title: "User Info",
        content: `切换为${this.data[index].ip}，3秒后自动关闭`,
        duration: 3,
        closable: true
      });
    },
    remove(index) {
      this.data.splice(index, 1);
    }
  },
  mounted() {
    this.getIPS();
  }
};
</script>

<style></style>
