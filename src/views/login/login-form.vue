<style lang="less" scoped>
.rememberKey {
  padding-left: 10px;
  font-size: 14px;
}
.form-class {
  width: 88%;
  padding-left: 20px;
}
</style>
<template>
  <Form
    ref="LoginForm"
    :model="LoginForm"
    :rules="rule_LoginForm"
    @keydown.enter.native="login"
    class="form-class"
  >
    <FormItem prop="userName">
      <i-input v-model="LoginForm.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="20" type="ios-person"/>
        </span>
      </i-input>
    </FormItem>
    <FormItem prop="password">
      <i-input type="password" v-model="LoginForm.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="20" type="md-lock"/>
        </span>
      </i-input>
    </FormItem>
    <FormItem>
      <slide-verify></slide-verify>
    </FormItem>
    <Checkbox v-model="checked">
      <span class="rememberKey">记住密码</span>
    </Checkbox>
    <br>
    <br>
    <FormItem>
      <Button type="primary" @click.native.prevent="register(LoginForm)" long>注册</Button>
      <Button :loading="loading" @click.native.prevent="login(LoginForm)" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import http from "@/assets/js/http.js";
import SlideVerify from "_c/slide-verify";
import Format from "@/assets/js/Format.js";
export default {
  component: {
    SlideVerify
  },
  data() {
    return {
      // 这里的 checked 表示 记住密码那个 checkbox 的状态
      checked: false,
      // loading 表示点击 登陆 按钮 的加载状态，初始化为 false
      loading: false,
      systemName: "",
      LoginForm: {
        userName: Lockr.get("userName"),
        password: Lockr.get("rememberKey")
      },
      rule_LoginForm: {
        userName: [
          {
            required: true,
            validator: Format.FormValidate.Form_Login().UserName,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: Format.FormValidate.Form_Login().Pwd,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    register(name) {
      this.$refs.LoginForm.validate(isValid => {
        if (isValid) {
          const register_params = {
            username: this.LoginForm.userName,
            password: this.LoginForm.password
          };
          this.$axios
            .post("/api/user/register/", register_params)
            .then(res => {
              // 把从服务端获取到的_id写入到浏览器缓存并持久化存储到本地
              const UserId = res.data._id;
              Lockr.set("UserId", res.data._id);
              this.$store.commit("setUserId", res.data._id);
              console.log("register-UserId：" + this.$store.state.user.UserId);

              this.$store.commit("setUserName", this.LoginForm.userName);
              this.$store.commit("setUserPwd", this.LoginForm.password);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    login(name) {
      this.$refs.LoginForm.validate(isValid => {
        if (isValid) {
          const login_params = {
            username: this.LoginForm.userName,
            password: this.LoginForm.password
          };
          console.log(login_params.username);
          this.$axios
            .post("/api/user/login", login_params)
            .then(res => {
              console.log(res);
              if (res.data.status == 404) {
                this.$Message.error(res.data.message);
              }
              if (res.data.status == 2) {
                this.$Message.error(res.data.message);
              }
              if (res.data.status == 403) {
                this.$Message.error(res.data.message);
                const oldToken = Lockr.get("token");
                Lockr.rm("token");
                this.getAuthenrazation(res);
                Lockr.get("token");
                const newToken = Lockr.get("token");
                if (oldToken != newToken) {
                  this.$router.push({ name: "test" });
                }
                console.log("newToken:" + token);
              }
              if (res.data.reset) {
                const oldToken = Lockr.get("token");
                // 删除旧的token
                Lockr.rm("token");
                this.getAuthenrazation(res);
                console.log(Lockr.get("token"));
                // 重新写入新的token
                Lockr.set("token", res.headers.token);
                const newToken = Lockr.get("token");
                if (oldToken != newToken) {
                  this.$router.push({ name: "test" });
                }
                console.log(Lockr.get("token"));
              }
              Lockr.set("UserId", res.data._id);
              this.$store.commit("setUserId", res.data._id);
              console.log("login-UserId:" + this.$store.state.user.UserId);
              this.$store.commit("setUserName", this.LoginForm.userName);
              this.$store.commit("setUserPwd", this.LoginForm.password);
              if (!this.checked) {
                Lockr.rm("userName");
                Lockr.rm("rememberKey");
              } else {
                Lockr.set("userName", this.LoginForm.userName);
                Lockr.set("rememberKey", this.LoginForm.password);
              }

              this.LoginAuthenrization(res, "main"); // 调用http.js文件中混入的LoginAuthenrization方法，main指向路由name为main的组件
              // 获取http头部的token之后渲染主页菜单项
              this.getAuthenMenuList(login_params);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    getAuthenMenuList(login_params) {
      console.log("menu");
      console.log(login_params);
      this.$axios
        .get("/api/user/authenlist", {
          params: { username: login_params.username }
        })
        .then(res => {
          console.log(res.data.menuList);
          this.$store.commit("setMenuList", res.data.menuList);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getUserNameAndRememberKey();
  },
  mixins: [http]
};
</script>
