<style lang="less" scoped>
.rememberKey {
  padding-left: 5px;
}
</style>
<template>
  <Form ref="form" :model="form" :rules="rules" @keydown.enter.native="login">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"/>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="16" type="md-lock"/>
        </span>
      </Input>
    </FormItem>
    <Checkbox v-model="checked">
      <span class="rememberKey">记住密码</span>
    </Checkbox>
    <br>
    <br>
    <FormItem>
      <!-- <Button :loading="loading" @click.native.prevent="register" type="primary" long>注册</Button> -->
      <Button :loading="loading" @click.native.prevent="login(form)" type="primary" long>登录</Button>
      <!-- <Button :loading="loading" @click.native.prevent="getAllAccount" type="primary" long>获取所有的用户</Button> -->
    </FormItem>
  </Form>
</template>
<script>
import http from "@/assets/js/http.js";
export default {
  data() {
    return {
      // 这里的 checked 表示 记住密码那个 checkbox 的状态
      checked: false,
      // loading 表示点击 登陆 按钮 的加载状态，初始化为 false
      loading: false,
      systemName: "",
      rules: {
        userName: [
          {
            required: true,

            trigger: "blur",
            message: "请输入有效的用户名"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入有效的密码",
            trigger: "blur"
          }
          // {
          //   type: "string",
          //   min: 6,
          //   message: "至少需要六位密码",
          //   trigger: "blur"
          // }
        ]
      },
      form: {
        userName: Lockr.get("userName"),
        password: Lockr.get("rememberKey")
      }
    };
  },
  methods: {
    register() {
      let register_params = {
        username: this.form.userName,
        password: this.form.password
      };
      console.log(register_params);
      this.$axios
        .post("/api/user/register", register_params)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    login(name) {
      this.$refs.form.validate(isValid => {
        if (isValid) {
          const login_params = {
            username: this.form.userName,
            password: this.form.password
          };
          this.$axios
            .post("/api/user/login", login_params)
            .then(res => {
              if (!this.checked) {
                Lockr.rm("userName");
                Lockr.rm("rememberKey");
              } else {
                Lockr.set("userName", this.form.userName);
                Lockr.set("rememberKey", this.form.password);
              }
              this.LoginAuthenrization(res, "main"); // 调用http.js文件中混入的LoginAuthenrization方法，main指向路由name为main的组件
            })
            .catch(err => {
              console.log(err);
            });
        }
        //   const rememberKey = Lockr.get("rememberKey");
        //   console.log(rememberKey);
        //   console.log(this.form.password);
        //   if (
        //     this.form.password == "rememberKey" &&
        //     rememberKey !== "undefined"
        //   ) {
        //     const login_params = {
        //       username: this.form.userName,
        //       password: this.form.password
        //     };
        //     console.log(login_params);
        //     this.$axios
        //       .post("/api/user/login", login_params)
        //       .then(res => {
        //         console.log(res.data);
        //         this.LoginAuthenrization(res, "main"); // 调用http.js文件中混入的LoginAuthenrization方法，main指向路由name为main的组件
        //       })
        //       .catch(err => {
        //         console.log(err);
        //       });
        //   } else {
        //     Lockr.set("userName", this.form.userName);
        //     Lockr.set("rememberKey", this.form.password);
        //     this.login(form);
        //   }
      });
    },
    getAllAccount() {
      this.$axios
        .get("/api/user/all")
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    Lockr.get("userName");
    Lockr.get("rememberKey");
  },
  mixins: [http]
};
</script>
