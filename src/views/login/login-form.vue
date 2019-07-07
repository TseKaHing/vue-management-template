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
          <Icon :size="20" type="ios-person" />
        </span>
      </i-input>
    </FormItem>
    <FormItem prop="password">
      <i-input type="password" v-model="LoginForm.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="20" type="md-lock" />
        </span>
      </i-input>
    </FormItem>
    <FormItem>
      <slide-verify></slide-verify>
    </FormItem>
    <Checkbox v-model="checked">
      <span class="rememberKey">记住密码</span>
    </Checkbox>
    <br />
    <br />
    <FormItem>
      <!-- <Button type="primary" @click.native.prevent="register_submit('LoginForm')" long>注册</Button> -->
      <Button
        type="primary"
        @click.native.prevent="login_submit('LoginForm')"
        @keyup.enter="login_submit('LoginForm')"
        long
      >登录</Button>
    </FormItem>
  </Form>
</template>
<script>
// import http from "@/assets/js/http.js";
import SlideVerify from "_c/slide-verify";
import Format from "@/assets/js/Format.js";
import { mapActions } from "vuex";
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
      prefix_url: "/api/user",
      LoginForm: {
        userName: "",
        password: ""
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
    ...mapActions(["register", "login"]),
    register_submit(name) {
      this.$refs[name].validate(isValid => {
        if (isValid) {
          this.register({
            username: this.LoginForm.userName,
            password: this.LoginForm.password
          })
            .then(() => {
              return;
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    login_submit(name) {
      this.$refs[name].validate(isValid => {
        if (isValid) {
          this.login({
            username: this.LoginForm.userName,
            password: this.LoginForm.password
          })
            .then(res => {
              console.log("登陆成功！");

              this.$router.push({ name: "home" });
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>
